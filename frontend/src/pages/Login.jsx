import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, senha }),
      })
      const data = await res.json()
      if (res.ok) {
        navigate('/admin/painel')
      } else {
        setErro(data.erro || 'Erro ao fazer login')
      }
    } catch {
      setErro('Erro de conexão com o servidor')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1f1f1f] to-[#0d0d0d] flex items-center justify-center px-4">
      <div className="bg-[#1a1a1a] rounded-2xl p-10 w-full max-w-sm shadow-[0_0_30px_rgba(255,215,0,0.1)]">
        <h1 className="font-bebas text-gold text-4xl text-center mb-2 tracking-wide">Login BarberShop</h1>
        <img src="/img/logo2.png" alt="Logo" className="w-24 mx-auto mb-6" />

        {erro && (
          <p className="bg-red-900/50 text-red-300 text-center rounded p-2 mb-4 text-sm">{erro}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="bg-[#1e1e1e] border border-[#444] text-white rounded p-3 focus:outline-none focus:border-gold"
            type="text" name="usuario" placeholder="Usuário" required
            value={usuario} onChange={e => setUsuario(e.target.value)}
          />
          <input
            className="bg-[#1e1e1e] border border-[#444] text-white rounded p-3 focus:outline-none focus:border-gold"
            type="password" name="senha" placeholder="Senha" required
            value={senha} onChange={e => setSenha(e.target.value)}
          />
          <button
            type="submit"
            className="bg-gold text-black font-bold py-3 rounded hover:bg-gold-hover transition-colors cursor-pointer"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}
