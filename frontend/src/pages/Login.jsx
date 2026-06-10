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
    <div className="min-h-screen flex font-roboto">

      {/* Left — form */}
      <div className="w-full lg:w-[42%] flex flex-col justify-center px-8 sm:px-16 py-12 bg-white">
        <div className="max-w-sm w-full mx-auto">
          <img src="/img/logo.png" alt="BarberShop" className="h-10 mb-10" />

          <p className="font-playfair italic text-gold text-sm mb-2">Bem-vindo de volta</p>
          <h1 className="font-bebas text-stone-900 text-5xl tracking-wide mb-8">
            Área Administrativa
          </h1>

          {erro && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 mb-6">
              {erro}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-stone-500 text-xs uppercase tracking-[0.15em] mb-2">Usuário</label>
              <input
                className="w-full px-4 py-3 border border-stone-300 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-gold transition-colors text-sm"
                type="text" name="usuario" placeholder="admin" required
                value={usuario} onChange={e => setUsuario(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-stone-500 text-xs uppercase tracking-[0.15em] mb-2">Senha</label>
              <input
                className="w-full px-4 py-3 border border-stone-300 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-gold transition-colors text-sm"
                type="password" name="senha" placeholder="••••••" required
                value={senha} onChange={e => setSenha(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full mt-2 bg-stone-900 text-white font-bold py-3.5 hover:bg-gold hover:text-black transition-colors text-xs tracking-[0.2em] uppercase cursor-pointer"
            >
              Entrar
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-stone-200">
            <a href="/" className="text-stone-400 hover:text-gold text-xs transition-colors">
              ← Voltar ao site
            </a>
          </div>
        </div>
      </div>

      {/* Right — image */}
      <div className="hidden lg:block flex-1 relative overflow-hidden">
        <img
          src="/img/barbershop-interior.jpg"
          alt="BarberShop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-stone-900/40" />
        <div className="absolute inset-0 flex flex-col justify-end p-12">
          <h2 className="font-bebas text-white text-6xl leading-none tracking-wide mb-3">
            BARBER<span className="text-gold">SHOP</span>
          </h2>
          <p className="text-stone-300 text-sm font-playfair italic max-w-xs">
            Cortes precisos. Estilo sem igual. Experiência que você merece.
          </p>
        </div>
      </div>

    </div>
  )
}
