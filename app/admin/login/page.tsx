'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export const dynamic = 'force-dynamic'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      setError('メールアドレスまたはパスワードが違います')
      return
    }
    router.push('/admin/sales')
    router.refresh()
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F7F7F9' }}>
      <form onSubmit={handleLogin} style={{ background: '#fff', padding: '2rem', borderRadius: 12, width: 320, border: '1px solid #E2E2E8' }}>
        <h1 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>e-CHIRO 管理者ログイン</h1>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', height: 40, marginBottom: 10, padding: '0 10px', border: '1px solid #E2E2E8', borderRadius: 8 }}
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', height: 40, marginBottom: 14, padding: '0 10px', border: '1px solid #E2E2E8', borderRadius: 8 }}
        />
        {error && <p style={{ color: '#B33', fontSize: 13, marginBottom: 10 }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          style={{ width: '100%', height: 42, background: '#1E00DC', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700 }}
        >
          {loading ? 'ログイン中…' : 'ログイン'}
        </button>
      </form>
    </div>
  )
}
