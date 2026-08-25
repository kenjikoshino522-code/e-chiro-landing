'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export const dynamic = 'force-dynamic'

type Sale = {
  id: string
  date: string // YYYY-MM-DD
  name: string
  amount: number
  location: string | null
  payment_method: '現金' | 'カード' | '振込' | null
  headcount: number
}

const LOCATIONS_DEFAULT = ['渋谷', '新宿', '池袋', 'その他', '川崎', '新橋', '横浜']
const WD = ['日', '月', '火', '水', '木', '金', '土']

export default function SalesAdminPage() {
  const supabase = createClient()
  const router = useRouter()

  const [sales, setSales] = useState<Sale[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [location, setLocation] = useState('')
  const [headcount, setHeadcount] = useState('1')
  const [payment, setPayment] = useState<'現金' | 'カード' | '振込'>('現金')

  const [month, setMonth] = useState(date.slice(0, 7))

  useEffect(() => {
    load()
  }, [])

  async function load() {
    setLoading(true)
    const { data } = await supabase.from('sales').select('*').order('date', { ascending: true })
    setSales(data ?? [])
    setLoading(false)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  const monthOptions = useMemo(() => {
    const keys = new Set(sales.map((s) => s.date.slice(0, 7)))
    keys.add(month)
    return [...keys].sort().reverse()
  }, [sales, month])

  const knownNames = useMemo(() => [...new Set(sales.map((s) => s.name))], [sales])
  const knownLocations = useMemo(() => {
    const fromData = sales.map((s) => s.location).filter(Boolean) as string[]
    return [...new Set([...LOCATIONS_DEFAULT, ...fromData])]
  }, [sales])

  const monthList = useMemo(
    () => sales.filter((s) => s.date.slice(0, 7) === month),
    [sales, month]
  )

  const stats = useMemo(() => {
    const total = monthList.reduce((s, e) => s + e.amount, 0)
    const count = monthList.reduce((s, e) => s + (e.headcount || 1), 0)
    const cash = monthList.filter((e) => e.payment_method === '現金').reduce((s, e) => s + e.amount, 0)
    const card = monthList.filter((e) => e.payment_method === 'カード').reduce((s, e) => s + e.amount, 0)
    const transfer = monthList.filter((e) => e.payment_method === '振込').reduce((s, e) => s + e.amount, 0)
    return { total, count, cash, card, transfer }
  }, [monthList])

  const weekdayCounts = useMemo(() => {
    return ['月', '火', '水', '木', '金', '土', '日'].map((w) => ({
      w,
      c: monthList.filter((e) => WD[new Date(e.date).getDay()] === w).length,
    }))
  }, [monthList])

  const locationCounts = useMemo(() => {
    const used = [...new Set(monthList.map((e) => e.location).filter(Boolean))] as string[]
    return used.map((loc) => ({ loc, c: monthList.filter((e) => e.location === loc).length }))
  }, [monthList])

  const yearSummary = useMemo(() => {
    const year = month.slice(0, 4)
    const months = Array.from({ length: 12 }, (_, i) => {
      const mk = `${year}-${String(i + 1).padStart(2, '0')}`
      return sales.filter((s) => s.date.slice(0, 7) === mk).reduce((s, e) => s + e.amount, 0)
    })
    const yearTotal = months.reduce((a, b) => a + b, 0)
    const active = months.filter((v) => v > 0).length
    const avg = active ? Math.round(yearTotal / active) : 0
    return { year, months, yearTotal, avg }
  }, [sales, month])

  function resetForm() {
    setEditingId(null)
    setName('')
    setAmount('')
    setLocation('')
    setHeadcount('1')
    setPayment('現金')
    setDate(new Date().toISOString().slice(0, 10))
  }

  function startEdit(s: Sale) {
    setEditingId(s.id)
    setDate(s.date)
    setName(s.name)
    setAmount(String(s.amount))
    setLocation(s.location ?? '')
    setHeadcount(String(s.headcount ?? 1))
    setPayment((s.payment_method as any) ?? '現金')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!date || !name.trim() || !amount) return

    const payload = {
      date,
      name: name.trim(),
      amount: Number(amount),
      location: location.trim() || null,
      payment_method: payment,
      headcount: Number(headcount) || 1,
    }

    if (editingId) {
      await supabase.from('sales').update(payload).eq('id', editingId)
    } else {
      await supabase.from('sales').insert(payload)
    }

    resetForm()
    setMonth(date.slice(0, 7))
    await load()
  }

  async function handleDelete(id: string) {
    await supabase.from('sales').delete().eq('id', id)
    await load()
  }

  function exportCsv() {
    const years = [...new Set(sales.map((s) => s.date.slice(0, 4)))].sort()
    const esc = (v: any) => {
      const s = String(v ?? '')
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
    }
    const lines: string[] = []
    years.forEach((year) => {
      lines.push(`${year}年 月別売上`)
      lines.push(['月', '売上'].join(','))
      const totals: number[] = []
      for (let m = 1; m <= 12; m++) {
        const mk = `${year}-${String(m).padStart(2, '0')}`
        const sum = sales.filter((s) => s.date.slice(0, 7) === mk).reduce((s, e) => s + e.amount, 0)
        totals.push(sum)
        lines.push([`${m}月`, sum].join(','))
      }
      const yt = totals.reduce((a, b) => a + b, 0)
      const active = totals.filter((v) => v > 0).length
      lines.push(['年間合計', yt].join(','))
      lines.push(['月平均', active ? Math.round(yt / active) : 0].join(','))
      lines.push('')
    })
    lines.push('明細記録')
    lines.push(['日付', '名前', '支払い', '場所', '決済', '人数'].map(esc).join(','))
    ;[...sales].sort((a, b) => a.date.localeCompare(b.date)).forEach((s) => {
      lines.push([s.date, s.name, s.amount, s.location ?? '', s.payment_method ?? '', s.headcount].map(esc).join(','))
    })
    const csv = lines.join('\r\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const d = new Date()
    const fname = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}.csv`
    const a = document.createElement('a')
    a.href = url
    a.download = fname
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return <div style={{ padding: 40, textAlign: 'center', color: '#6B6B76' }}>読み込み中…</div>
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F7F7F9', fontFamily: 'sans-serif', color: '#1C1C22' }}>
      <header style={{ background: '#1E00DC', color: '#fff', padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <h1 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>e-CHIRO 売上管理</h1>
          <Link href="/admin/reservations" style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12 }}>
            予約管理へ
          </Link>
          <Link href="/admin/orders" style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12 }}>
            注文管理へ
          </Link>
        </div>
        <button onClick={handleLogout} style={{ background: 'transparent', border: '1px solid #fff', color: '#fff', borderRadius: 8, padding: '6px 12px', fontSize: 12 }}>
          ログアウト
        </button>
      </header>

      <main style={{ maxWidth: 560, margin: '0 auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
        <form onSubmit={handleSubmit} style={card()}>
          <div style={row2()}>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={input()} />
            <input list="loc-list" placeholder="場所（新規は入力でOK）" value={location} onChange={(e) => setLocation(e.target.value)} style={input()} />
            <datalist id="loc-list">
              {knownLocations.map((l) => <option key={l} value={l} />)}
            </datalist>
          </div>
          <div style={row2()}>
            <input list="name-list" placeholder="名前（法人名など）" value={name} onChange={(e) => setName(e.target.value)} style={input()} />
            <datalist id="name-list">
              {knownNames.map((n) => <option key={n} value={n} />)}
            </datalist>
            <input type="number" placeholder="支払い（円）" value={amount} onChange={(e) => setAmount(e.target.value)} style={input()} />
          </div>
          <div style={row2()}>
            <input type="number" min={1} placeholder="人数" value={headcount} onChange={(e) => setHeadcount(e.target.value)} style={input()} />
            <select value={payment} onChange={(e) => setPayment(e.target.value as any)} style={input()}>
              <option value="現金">現金</option>
              <option value="カード">カード</option>
              <option value="振込">振込</option>
            </select>
          </div>
          <button type="submit" style={{ width: '100%', height: 44, background: '#1E00DC', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700 }}>
            {editingId ? '✓ この内容で更新' : '＋ 追加'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} style={{ width: '100%', height: 40, marginTop: 8, background: '#fff', border: '1px solid #E2E2E8', borderRadius: 8 }}>
              キャンセル
            </button>
          )}
        </form>

        <select value={month} onChange={(e) => setMonth(e.target.value)} style={{ ...input(), height: 42 }}>
          {monthOptions.map((k) => {
            const [y, m] = k.split('-')
            return <option key={k} value={k}>{y}年{parseInt(m)}月</option>
          })}
        </select>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div style={statCard()}><p style={statLabel()}>当月売上</p><p style={statValue()}>¥{stats.total.toLocaleString()}</p></div>
          <div style={statCard()}><p style={statLabel()}>施術人数</p><p style={statValue()}>{stats.count}</p></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          <div style={statCard()}><p style={statLabel()}>現金総額</p><p style={{ ...statValue(), fontSize: 16 }}>¥{stats.cash.toLocaleString()}</p></div>
          <div style={statCard()}><p style={statLabel()}>カード総額</p><p style={{ ...statValue(), fontSize: 16 }}>¥{stats.card.toLocaleString()}</p></div>
          <div style={statCard()}><p style={statLabel()}>振込総額</p><p style={{ ...statValue(), fontSize: 16 }}>¥{stats.transfer.toLocaleString()}</p></div>
        </div>

        <div>
          <p style={sectionLabel()}>曜日別（件数）</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
            {weekdayCounts.map(({ w, c }) => (
              <div key={w} style={statCard()}>
                <div style={{ fontSize: 15, fontWeight: 700, textAlign: 'center' }}>{c}</div>
                <div style={{ fontSize: 10, color: '#6B6B76', textAlign: 'center' }}>{w}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p style={sectionLabel()}>場所別（件数）</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {locationCounts.length === 0 && <p style={{ fontSize: 12, color: '#9A9AA4' }}>記録なし</p>}
            {locationCounts.map(({ loc, c }) => (
              <div key={loc} style={{ ...statCard(), padding: '6px 12px' }}>
                <div style={{ fontSize: 15, fontWeight: 700, textAlign: 'center' }}>{c}</div>
                <div style={{ fontSize: 10, color: '#6B6B76', textAlign: 'center' }}>{loc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={card()}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <p style={{ ...sectionLabel(), margin: 0 }}>記録一覧</p>
            <button onClick={exportCsv} style={{ fontSize: 12, padding: '4px 10px', border: '1px solid #E2E2E8', borderRadius: 8, background: '#fff' }}>
              CSVで保存
            </button>
          </div>
          {monthList.length === 0 ? (
            <p style={{ fontSize: 13, color: '#9A9AA4', padding: '10px 0' }}>この月の記録はまだありません。</p>
          ) : (
            monthList.map((e) => {
              const d = new Date(e.date)
              const label = `${d.getMonth() + 1}/${d.getDate()}(${WD[d.getDay()]})`
              return (
                <div key={e.id} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 4px', borderBottom: '1px solid #E2E2E8', fontSize: 13 }}>
                  <span style={{ width: 52, color: '#6B6B76', flexShrink: 0 }}>{label}</span>
                  <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {e.name}{e.headcount > 1 ? ` ×${e.headcount}` : ''}
                  </span>
                  <span style={{ width: 44, color: '#6B6B76', fontSize: 11, flexShrink: 0 }}>{e.location}</span>
                  <span style={{ width: 34, color: '#6B6B76', fontSize: 11, flexShrink: 0 }}>{e.payment_method}</span>
                  <span style={{ width: 76, textAlign: 'right', flexShrink: 0 }}>¥{e.amount.toLocaleString()}</span>
                  <button onClick={() => startEdit(e)} style={{ border: 'none', background: 'transparent', color: '#1E00DC', fontSize: 12 }}>編集</button>
                  <button onClick={() => handleDelete(e.id)} style={{ border: 'none', background: 'transparent', color: '#B33', fontSize: 15 }}>×</button>
                </div>
              )
            })
          )}
        </div>

        <div style={card()}>
          <p style={sectionLabel()}>{yearSummary.year}年 年間サマリー</p>
          {yearSummary.months.map((v, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 4px', borderBottom: '1px solid #E2E2E8', fontSize: 13 }}>
              <span style={{ color: '#6B6B76' }}>{i + 1}月</span><span>¥{v.toLocaleString()}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 4px 0', fontWeight: 700, fontSize: 13 }}>
            <span>年間売上（計）</span><span>¥{yearSummary.yearTotal.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 4px 0', fontWeight: 700, fontSize: 13 }}>
            <span>月平均</span><span>¥{yearSummary.avg.toLocaleString()}</span>
          </div>
                  <div style={{ textAlign: 'center', padding: '4px 0 20px' }}>
          <a href="/admin/reports" style={{ fontSize: 12, color: '#9A9AA4' }}>
            📊 年次レポートを見る
          </a>
        </div>
        </div>
      </main>
    </div>
  )
}

function card(): React.CSSProperties {
  return { background: '#fff', border: '1px solid #E2E2E8', borderRadius: 12, padding: '1rem' }
}
function row2(): React.CSSProperties {
  return { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }
}
function input(): React.CSSProperties {
  return { width: '100%', height: 40, border: '1px solid #E2E2E8', borderRadius: 10, padding: '0 10px', fontSize: 14, background: '#FFFDE7' }
}
function statCard(): React.CSSProperties {
  return { background: '#fff', border: '1px solid #E2E2E8', borderRadius: 10, padding: '0.9rem' }
}
function statLabel(): React.CSSProperties {
  return { fontSize: 12, color: '#6B6B76', margin: '0 0 4px' }
}
function statValue(): React.CSSProperties {
  return { fontSize: 22, fontWeight: 700, margin: 0 }
}
function sectionLabel(): React.CSSProperties {
  return { fontSize: 13, color: '#6B6B76', margin: '0 0 6px' }
}
