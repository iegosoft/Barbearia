import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function Editar() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ nome: '', telefone: '', data: '', hora: '', servico: '', barbeiro: '', status: 'pendente' })
  const [erro, setErro] = useState('')
  const [sidebarAberta, setSidebarAberta] = useState(false)

  useEffect(() => {
    fetch(`/api/agendamentos/${id}`, { credentials: 'include' })
      .then(r => r.json())
      .then(data => setForm({
        nome: data.nome || '',
        telefone: data.telefone || '',
        data: data.data || '',
        hora: data.hora || '',
        servico: data.servico || '',
        barbeiro: data.barbeiro || '',
        status: data.status || 'pendente',
      }))
  }, [id])

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')
    try {
      const res = await fetch(`/api/agendamentos/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) {
        navigate('/admin/painel')
      } else {
        setErro(data.erro || 'Erro ao atualizar agendamento')
      }
    } catch {
      setErro('Erro de conexão com o servidor')
    }
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' })
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-dark-950 text-white font-roboto">

      {/* Topbar */}
      <header className="bg-dark-900 border-b border-dark-700 h-14 flex items-center justify-between px-5 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarAberta(v => !v)}
            className="lg:hidden text-gold p-1 rounded cursor-pointer"
            aria-label="Menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <img src="/img/logo2.png" alt="Logo" className="h-8" />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-600 text-xs hidden sm:block tracking-wider">EDITAR AGENDAMENTO</span>
          <button
            onClick={logout}
            className="border border-dark-600 text-gray-500 hover:border-gold/50 hover:text-gold text-xs px-3 py-1.5 rounded transition-all cursor-pointer"
          >
            Sair
          </button>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-3.5rem)]">

        {/* Backdrop mobile */}
        {sidebarAberta && (
          <div
            className="fixed inset-0 bg-black/60 z-20 lg:hidden"
            onClick={() => setSidebarAberta(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-56 bg-dark-900 border-r border-dark-700 z-20
          flex flex-col py-8 px-4 gap-1
          transition-transform duration-300
          ${sidebarAberta ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:h-auto lg:z-auto
        `}>
          <p className="text-gray-700 text-xs uppercase tracking-[0.2em] px-3 mb-3">Navegação</p>
          <a
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:text-gold hover:bg-dark-800 transition-all text-sm"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Início
          </a>
          <a
            href="/admin/painel"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:text-gold hover:bg-dark-800 transition-all text-sm"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Agendamentos
          </a>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6 lg:p-10 dark-form">
          <div className="mb-8 flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/painel')}
              className="text-gray-600 hover:text-gold transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="font-bebas text-4xl text-white tracking-wide">Editar Agendamento</h1>
              <p className="text-gray-600 text-xs mt-1">Atualize os dados abaixo</p>
            </div>
          </div>

          {erro && (
            <div className="bg-red-900/30 border border-red-800/50 text-red-400 text-sm rounded-lg px-4 py-3 mb-6 max-w-md">
              {erro}
            </div>
          )}

          <div className="bg-dark-900 rounded-xl border border-dark-700 p-6 max-w-md">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-gray-600 text-xs uppercase tracking-[0.2em] mb-2">Nome Completo</label>
                <input
                  className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-600 text-white focus:outline-none focus:border-gold transition-colors text-sm"
                  type="text" name="nome" required
                  value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-gray-600 text-xs uppercase tracking-[0.2em] mb-2">Telefone</label>
                <input
                  className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-600 text-white focus:outline-none focus:border-gold transition-colors text-sm"
                  type="text" name="telefone" required
                  value={form.telefone} onChange={e => setForm({ ...form, telefone: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 text-xs uppercase tracking-[0.2em] mb-2">Data</label>
                  <input
                    className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-600 text-white focus:outline-none focus:border-gold transition-colors text-sm"
                    type="date" name="data" required
                    value={form.data} onChange={e => setForm({ ...form, data: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-gray-600 text-xs uppercase tracking-[0.2em] mb-2">Hora</label>
                  <input
                    className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-600 text-white focus:outline-none focus:border-gold transition-colors text-sm"
                    type="time" name="hora" required
                    value={form.hora} onChange={e => setForm({ ...form, hora: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-600 text-xs uppercase tracking-[0.2em] mb-2">Serviço</label>
                <select
                  className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-600 text-white focus:outline-none focus:border-gold transition-colors text-sm"
                  name="servico" required
                  value={form.servico} onChange={e => setForm({ ...form, servico: e.target.value })}
                >
                  <option value="">Selecione um serviço</option>
                  <option value="Corte">Corte — R$ 30</option>
                  <option value="Barba">Barba — R$ 20</option>
                  <option value="Corte + Barba">Corte + Barba — R$ 45</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-600 text-xs uppercase tracking-[0.2em] mb-2">Barbeiro</label>
                <select
                  className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-600 text-white focus:outline-none focus:border-gold transition-colors text-sm"
                  name="barbeiro" required
                  value={form.barbeiro} onChange={e => setForm({ ...form, barbeiro: e.target.value })}
                >
                  <option value="">Selecione o barbeiro</option>
                  {['Iego Costa', 'Choze', 'Margarida', 'Karina', 'Elizabeth'].map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-600 text-xs uppercase tracking-[0.2em] mb-2">Status</label>
                <select
                  className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-600 text-white focus:outline-none focus:border-gold transition-colors text-sm"
                  name="status"
                  value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
                >
                  <option value="pendente">Pendente</option>
                  <option value="concluido">Concluído</option>
                  <option value="remarcado">Remarcado</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>

              <div className="flex gap-3 pt-1 flex-wrap">
                <button
                  type="submit"
                  className="flex-1 bg-gold text-black font-bold py-3 rounded-lg hover:bg-gold-hover cursor-pointer transition-colors text-xs tracking-[0.2em] uppercase"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/admin/painel')}
                  className="flex-1 border border-dark-600 text-gray-500 hover:border-white/20 hover:text-white py-3 rounded-lg cursor-pointer transition-all text-sm"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
