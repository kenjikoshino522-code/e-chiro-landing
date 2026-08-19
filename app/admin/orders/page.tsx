'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { TSHIRT_PRICE, TSHIRT_SQUARE_LINK } from '@/lib/constants'

export const dynamic = 'force-dynamic'

type Order = {
  id: string
  name: string
  email: string
  phone: string
  size: string
  quantity: number
  shipping_address: string
  status: 'pending' | 'confirmed' | 'shipped' | 'cancelled'
  created_at: string
}

const STATUS_LABELS: Record<Order['status'], string> = {
  pending: '未確認',
  confirmed: '入金確認済み',
  shipped: '発送済み',
  cancelled: 'キャンセル',
}

export default function OrdersAdminPage() {
  const supabase = createClient()
  const router = useRouter()

  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    setLoading(true)
    const { data } = await supabase
      .from('tshirt_orders')
      .select('*')
      .order('created_at', { ascending: false })
    setOrders(data ?? [])
    setLoading(false)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  async function updateStatus(id: string, status: string) {
    await supabase.from('tshirt_orders').update({ status }).eq('id', id)
    await load()
  }

  function unitPrice() {
    return Number(TSHIRT_PRICE.replace(/[^0-9]/g, ''))
  }

  async function copyPaymentLink(orderId: string) {
    await navigator.clipboard.writeText(TSHIRT_SQUARE_LINK)
    setCopiedId(orderId)
    setTimeout(() => {
      setCopiedId((current) => (current === orderId ? null : current))
    }, 2000)
  }

  if (loading) {
    return <div style={{ padding: 40, textAlign: 'center', color: '#6B6B76' }}>読み込み中…</div>
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F7F7F9', fontFamily: 'sans-serif', color: '#1C1C22' }}>
      <header
        style={{
          background: '#1E00DC',
          color: '#fff',
          padding: '1rem 1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          <h1 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>e-CHIRO 注文管理</h1>
          <Link href="/admin/sales" style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12 }}>
            売上管理へ
          </Link>
          <Link href="/admin/reservations" style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12 }}>
            予約管理へ
          </Link>
        </div>
        <button
          onClick={handleLogout}
          style={{ background: 'transparent', border: '1px solid #fff', color: '#fff', borderRadius: 8, padding: '6px 12px', fontSize: 12 }}
        >
          ログアウト
        </button>
      </header>

      <main style={{ maxWidth: 720, margin: '0 auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
        {orders.length === 0 ? (
          <p style={{ fontSize: 13, color: '#9A9AA4', textAlign: 'center', padding: '2rem 0' }}>
            注文はまだありません。
          </p>
        ) : (
          orders.map((o) => (
            <div key={o.id} style={{ background: '#fff', border: '1px solid #E2E2E8', borderRadius: 12, padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 14, margin: 0 }}>{o.name}</p>
                  <p style={{ fontSize: 12, color: '#6B6B76', margin: '2px 0 0' }}>
                    {o.email} ・ {o.phone}
                  </p>
                </div>
                <select
                  value={o.status}
                  onChange={(e) => updateStatus(o.id, e.target.value)}
                  style={{ fontSize: 12, padding: '4px 8px', borderRadius: 8, border: '1px solid #E2E2E8', background: '#FFFDE7' }}
                >
                  {Object.entries(STATUS_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginTop: 10, fontSize: 13, lineHeight: 1.7 }}>
                <p style={{ margin: 0 }}>
                  サイズ: {o.size} ・ 枚数: {o.quantity}枚
                </p>
                <p style={{ margin: 0 }}>
                  合計金額: ¥{(unitPrice() * o.quantity).toLocaleString('ja-JP')}
                </p>
                <p style={{ margin: 0 }}>配送先: {o.shipping_address}</p>
              </div>

              <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: '#9A9AA4' }}>
                  {new Date(o.created_at).toLocaleString('ja-JP')} 受付
                </span>
                <button
                  onClick={() => copyPaymentLink(o.id)}
                  style={{ fontSize: 12, padding: '6px 12px', borderRadius: 8, border: '1px solid #1E00DC', color: '#1E00DC', background: '#fff' }}
                >
                  {copiedId === o.id ? 'コピーしました' : 'Squareリンクをコピー'}
                </button>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  )
}
