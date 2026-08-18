'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { RESERVATION_MENUS } from '@/lib/constants'

export const dynamic = 'force-dynamic'

type Reservation = {
  id: string
  name: string
  email: string
  phone: string | null
  menu: string
  preferred_datetime: string
  location: string
  referral_source: string
  referral_source_other: string | null
  note: string | null
  status: 'pending' | 'confirmed' | 'cancelled'
  created_at: string
}

export default function ReservationsAdminPage() {
  const supabase = createClient()
  const router = useRouter()

  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    setLoading(true)
    const { data } = await supabase
      .from('reservations')
      .select('*')
      .order('created_at', { ascending: false })
    setReservations(data ?? [])
    setLoading(false)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  async function updateStatus(id: string, status: string) {
    await supabase.from('reservations').update({ status }).eq('id', id)
    await load()
  }

  async function copyPaymentLink(reservation: Reservation) {
    const menu = RESERVATION_MENUS.find((m) => m.id === reservation.menu)
    if (!menu) return
    await navigator.clipboard.writeText(menu.squareLink)
    setCopiedId(reservation.id)
    setTimeout(() => {
      setCopiedId((current) => (current === reservation.id ? null : current))
    }, 2000)
  }

  function formatDatetime(value: string) {
    return new Date(value).toLocaleString('ja-JP', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
    })
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <h1 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>e-CHIRO 予約管理</h1>
          <Link href="/admin/sales" style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12 }}>
            売上管理へ
          </Link>
          <Link href="/admin/orders" style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12 }}>
            注文管理へ
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
        {reservations.length === 0 ? (
          <p style={{ fontSize: 13, color: '#9A9AA4', textAlign: 'center', padding: '2rem 0' }}>
            予約リクエストはまだありません。
          </p>
        ) : (
          reservations.map((r) => {
            const menu = RESERVATION_MENUS.find((m) => m.id === r.menu)
            return (
              <div key={r.id} style={{ background: '#fff', border: '1px solid #E2E2E8', borderRadius: 12, padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 14, margin: 0 }}>{r.name}</p>
                    <p style={{ fontSize: 12, color: '#6B6B76', margin: '2px 0 0' }}>
                      {r.email}
                      {r.phone ? ` ・ ${r.phone}` : ''}
                    </p>
                  </div>
                  <select
                    value={r.status}
                    onChange={(e) => updateStatus(r.id, e.target.value)}
                    style={{ fontSize: 12, padding: '4px 8px', borderRadius: 8, border: '1px solid #E2E2E8', background: '#FFFDE7' }}
                  >
                    <option value="pending">未確定</option>
                    <option value="confirmed">確定</option>
                    <option value="cancelled">キャンセル</option>
                  </select>
                </div>

                <div style={{ marginTop: 10, fontSize: 13, lineHeight: 1.7 }}>
                  <p style={{ margin: 0 }}>メニュー: {menu ? `${menu.label} ${menu.price}` : r.menu}</p>
                  <p style={{ margin: 0 }}>希望日時: {formatDatetime(r.preferred_datetime)}</p>
                  <p style={{ margin: 0 }}>希望場所: {r.location}</p>
                  <p style={{ margin: 0 }}>
                    流入経路: {r.referral_source}
                    {r.referral_source_other ? `（${r.referral_source_other}）` : ''}
                  </p>
                  {r.note && <p style={{ margin: 0 }}>備考: {r.note}</p>}
                </div>

                <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: '#9A9AA4' }}>
                    {new Date(r.created_at).toLocaleString('ja-JP')} 受付
                  </span>
                  <button
                    onClick={() => copyPaymentLink(r)}
                    style={{ fontSize: 12, padding: '6px 12px', borderRadius: 8, border: '1px solid #1E00DC', color: '#1E00DC', background: '#fff' }}
                  >
                    {copiedId === r.id ? 'コピーしました' : 'Squareリンクをコピー'}
                  </button>
                </div>
              </div>
            )
          })
        )}
      </main>
    </div>
  )
}
