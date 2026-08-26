'use client'

import { useEffect, useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
  ResponsiveContainer, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts'

const MONTH_LABELS = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
const LINE_COLORS = ['#1E00DC', '#E0457B', '#00A870', '#FF7A29', '#7A5CFF', '#00B4D8', '#B08900']

type YearlyData = Record<number, number[]> // year -> [12 monthly totals]
type SaleRow = { date: string; name: string; amount: number }
type ArchiveDetailRow = { year: number; month: number; date: string | null; name: string; amount: number }

export default function ReportsPage() {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<YearlyData>({})
  const [rawSales, setRawSales] = useState<SaleRow[]>([])
  const [archiveDetail, setArchiveDetail] = useState<ArchiveDetailRow[]>([])
  const [tab, setTab] = useState<'yearly' | 'monthly' | 'compare' | 'customers'>('yearly')
  const [selectedYear, setSelectedYear] = useState<number | null>(null)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    setLoading(true)
    const merged: YearlyData = {}

    const { data: archive } = await supabase.from('sales_archive').select('year, month, total')
    ;(archive ?? []).forEach((row: any) => {
      if (!merged[row.year]) merged[row.year] = Array(12).fill(0)
      merged[row.year][row.month - 1] = row.total
    })

    const { data: sales } = await supabase.from('sales').select('date, name, amount')
    setRawSales((sales as SaleRow[]) ?? [])
    ;(sales ?? []).forEach((row: any) => {
      const year = Number(row.date.slice(0, 4))
      const month = Number(row.date.slice(5, 7))
      if (!merged[year]) merged[year] = Array(12).fill(0)
      merged[year][month - 1] += row.amount
    })

    const { data: detail } = await supabase.from('sales_archive_detail').select('year, month, date, name, amount')
    setArchiveDetail((detail as ArchiveDetailRow[]) ?? [])

    setData(merged)
    const years = Object.keys(merged).map(Number).sort((a, b) => b - a)
    setSelectedYear(years[0] ?? new Date().getFullYear())
    setLoading(false)
  }

  const years = useMemo(() => Object.keys(data).map(Number).sort((a, b) => a - b), [data])

  const yearlyTotals = useMemo(
    () => years.map((y) => ({ year: `${y}年`, 売上: data[y].reduce((s, v) => s + v, 0) })),
    [years, data]
  )

  const monthlyForSelectedYear = useMemo(() => {
    if (!selectedYear || !data[selectedYear]) return []
    return MONTH_LABELS.map((m, i) => ({ month: m, 売上: data[selectedYear][i] }))
  }, [selectedYear, data])

  const compareByMonth = useMemo(() => {
    return MONTH_LABELS.map((m, i) => {
      const row: Record<string, any> = { month: m }
      years.forEach((y) => { row[`${y}年`] = data[y][i] })
      return row
    })
  }, [years, data])

  const [customerMonth, setCustomerMonth] = useState<string>('')

  // 明細データを "YYYY-MM" キーの一覧に正規化（sales: 実データ / archiveDetail: 過去データ）
  const combinedMonthlyEntries = useMemo(() => {
    const map = new Map<string, { day: number | null; name: string; amount: number }[]>()

    rawSales.forEach((s) => {
      const key = s.date.slice(0, 7)
      const day = Number(s.date.slice(8, 10))
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push({ day, name: s.name, amount: s.amount })
    })

    archiveDetail.forEach((r) => {
      const key = `${r.year}-${String(r.month).padStart(2, '0')}`
      const day = r.date ? Number(r.date.slice(8, 10)) : null
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push({ day, name: r.name, amount: r.amount })
    })

    return map
  }, [rawSales, archiveDetail])

  const customerMonthOptions = useMemo(
    () => [...combinedMonthlyEntries.keys()].sort().reverse(),
    [combinedMonthlyEntries]
  )

  const customerEntriesForMonth = useMemo(() => {
    if (!customerMonth) return []
    const list = combinedMonthlyEntries.get(customerMonth) ?? []
    return [...list].sort((a, b) => (a.day ?? 99) - (b.day ?? 99))
  }, [combinedMonthlyEntries, customerMonth])

  useEffect(() => {
    if (!customerMonth && customerMonthOptions.length > 0) {
      setCustomerMonth(customerMonthOptions[0])
    }
  }, [customerMonthOptions, customerMonth])

  if (loading) {
    return <div style={{ padding: 40, textAlign: 'center', color: '#6B6B76' }}>読み込み中…</div>
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F7F7F9', fontFamily: 'sans-serif', color: '#1C1C22' }}>
      <header style={{ background: '#3A3A44', color: '#fff', padding: '1rem 1.25rem' }}>
        <h1 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>売上レポート（年次分析）</h1>
        <a href="/admin/sales" style={{ fontSize: 12, color: '#C9C9D6' }}>← 売上入力に戻る</a>
      </header>

      <main style={{ maxWidth: 720, margin: '0 auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[
            { key: 'yearly', label: '年商推移' },
            { key: 'monthly', label: '年別詳細' },
            { key: 'compare', label: '月ごと比較' },
            { key: 'customers', label: '月別記録' },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as any)}
              style={{
                flex: '1 1 auto', minWidth: 70, padding: '10px 0', borderRadius: 10, border: '1px solid #E2E2E8',
                background: tab === t.key ? '#1E00DC' : '#fff',
                color: tab === t.key ? '#fff' : '#1C1C22',
                fontWeight: 700, fontSize: 13,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'yearly' && (
          <div style={card()}>
            <p style={sectionLabel()}>年ごとの年間売上</p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={yearlyTotals}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E2E8" />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `¥${(v / 10000).toFixed(0)}万`} />
                <Tooltip formatter={(v) => `¥${Number(v).toLocaleString()}`} />
                <Bar dataKey="売上" fill="#1E00DC" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {tab === 'monthly' && (
          <div style={card()}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
              {years.map((y) => (
                <button
                  key={y}
                  onClick={() => setSelectedYear(y)}
                  style={{
                    padding: '6px 12px', borderRadius: 8, fontSize: 12, border: '1px solid #E2E2E8',
                    background: selectedYear === y ? '#1E00DC' : '#fff',
                    color: selectedYear === y ? '#fff' : '#1C1C22',
                  }}
                >
                  {y}年
                </button>
              ))}
            </div>
            <p style={sectionLabel()}>{selectedYear}年 月別売上</p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyForSelectedYear}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E2E8" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `¥${(v / 10000).toFixed(0)}万`} />
                <Tooltip formatter={(v) => `¥${Number(v).toLocaleString()}`} />
                <Bar dataKey="売上" fill="#FF7A29" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {tab === 'compare' && (
          <div style={card()}>
            <p style={sectionLabel()}>同じ月を年ごとに比較</p>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={compareByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E2E8" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `¥${(v / 10000).toFixed(0)}万`} />
                <Tooltip formatter={(v) => `¥${Number(v).toLocaleString()}`} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                {years.map((y, i) => (
                  <Line key={y} type="monotone" dataKey={`${y}年`} stroke={LINE_COLORS[i % LINE_COLORS.length]} strokeWidth={2} dot={{ r: 2 }} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {tab === 'customers' && (
          <div style={card()}>
            <p style={sectionLabel()}>月ごとの記録（誰がいくら）</p>
            <select
              value={customerMonth}
              onChange={(e) => setCustomerMonth(e.target.value)}
              style={{ width: '100%', height: 40, border: '1px solid #E2E2E8', borderRadius: 10, padding: '0 10px', fontSize: 14, marginBottom: 12 }}
            >
              {customerMonthOptions.map((k) => {
                const [y, m] = k.split('-')
                return <option key={k} value={k}>{y}年{parseInt(m)}月</option>
              })}
            </select>

            {customerEntriesForMonth.length === 0 ? (
              <p style={{ fontSize: 13, color: '#9A9AA4' }}>この月の記録がありません。</p>
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 4px', borderBottom: '2px solid #E2E2E8', fontSize: 12, color: '#6B6B76', fontWeight: 700 }}>
                  <span>この月の合計</span>
                  <span>¥{customerEntriesForMonth.reduce((s, e) => s + e.amount, 0).toLocaleString()}</span>
                </div>
                {customerEntriesForMonth.map((e, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 4px', borderBottom: '1px solid #E2E2E8', fontSize: 13 }}>
                    <span style={{ width: 32, color: '#6B6B76', flexShrink: 0 }}>{e.day ? `${e.day}日` : ''}</span>
                    <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.name}</span>
                    <span style={{ textAlign: 'right', fontWeight: 700 }}>¥{e.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  )
}

function card(): React.CSSProperties {
  return { background: '#fff', border: '1px solid #E2E2E8', borderRadius: 12, padding: '1rem' }
}
function sectionLabel(): React.CSSProperties {
  return { fontSize: 13, color: '#6B6B76', margin: '0 0 10px', fontWeight: 700 }
}

