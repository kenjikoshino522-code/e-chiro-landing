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

export default function ReportsPage() {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<YearlyData>({})
  const [rawSales, setRawSales] = useState<SaleRow[]>([])
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

  const customerSummary = useMemo(() => {
    const map = new Map<string, { total: number; count: number; last: string }>()
    rawSales.forEach((s) => {
      const cur = map.get(s.name) ?? { total: 0, count: 0, last: s.date }
      cur.total += s.amount
      cur.count += 1
      if (s.date > cur.last) cur.last = s.date
      map.set(s.name, cur)
    })
    return [...map.entries()]
      .map(([name, v]) => ({ name, ...v }))
      .sort((a, b) => b.total - a.total)
  }, [rawSales])

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
            { key: 'customers', label: '顧客別' },
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
            <p style={sectionLabel()}>顧客別 合計（データがある期間のみ）</p>
            <p style={{ fontSize: 11, color: '#9A9AA4', margin: '0 0 12px' }}>
              ※ 場所・名前を記録し始めた期間分のみの集計です（2021〜2025年の古いデータは月合計しかないため含まれません）
            </p>
            {customerSummary.length === 0 ? (
              <p style={{ fontSize: 13, color: '#9A9AA4' }}>データがありません。</p>
            ) : (
              <div>
                {customerSummary.map((c) => (
                  <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 4px', borderBottom: '1px solid #E2E2E8', fontSize: 13 }}>
                    <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</span>
                    <span style={{ fontSize: 11, color: '#6B6B76', width: 50, textAlign: 'right' }}>{c.count}回</span>
                    <span style={{ width: 90, textAlign: 'right', fontWeight: 700 }}>¥{c.total.toLocaleString()}</span>
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

