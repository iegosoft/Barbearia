import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Admin() {
  const [agendamentos, setAgendamentos] = useState([])
  const [sidebarAberta, setSidebarAberta] = useState(false)
  const navigate = useNavigate()

  const carregarAgendamentos = useCallback(async () => {
    try {
      const res = await fetch('/api/agendamentos', { credentials: 'include' })
      const data = await res.json()
      setAgendamentos(Array.isArray(data) ? data : [])
    } catch {
      setAgendamentos([])
    }
  }, [])

  useEffect(() => {
    carregarAgendamentos()
  }, [carregarAgendamentos])

  async function remover(id) {
    if (!window.confirm('Remover este agendamento?')) return
    await fetch(`/api/agendamentos/${id}`, { method: 'DELETE', credentials: 'include' })
    carregarAgendamentos()
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
          <span className="text-gray-600 text-xs hidden sm:block tracking-wider">PAINEL ADMINISTRATIVO</span>
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
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-dark-800 transition-all text-sm w-full text-left cursor-pointer"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sair
          </button>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6 lg:p-10 min-w-0 dark-form">
          <div className="mb-8">
            <h1 className="font-bebas text-4xl text-white tracking-wide">Agendamentos</h1>
            <p className="text-gray-600 text-xs mt-1">
              {agendamentos.length} registro{agendamentos.length !== 1 ? 's' : ''} encontrado{agendamentos.length !== 1 ? 's' : ''}
            </p>
          </div>

          {agendamentos.length === 0 ? (
            <div className="text-center py-24 text-gray-700">
              <svg className="w-10 h-10 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm">Nenhum agendamento encontrado.</p>
            </div>
          ) : (
            <>
              {/* Desktop — tabela */}
              <div className="hidden md:block rounded-xl border border-dark-700 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-dark-900 border-b border-dark-700">
                      {['Nome', 'Telefone', 'Data', 'Hora', 'Serviço', 'Ações'].map(h => (
                        <th key={h} className="text-left py-3 px-5 text-gold font-bebas text-sm tracking-[0.1em] font-normal">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-700">
                    {agendamentos.map(a => (
                      <tr key={a._id} className="hover:bg-dark-800 transition-colors">
                        <td className="py-4 px-5 text-white font-medium">{a.nome}</td>
                        <td className="py-4 px-5 text-gray-500">{a.telefone}</td>
                        <td className="py-4 px-5 text-gray-500">{a.data}</td>
                        <td className="py-4 px-5 text-gray-500">{a.hora}</td>
                        <td className="py-4 px-5">
                          <span className="bg-gold/10 border border-gold/20 text-gold text-xs px-2.5 py-0.5 rounded-full">
                            {a.servico}
                          </span>
                        </td>
                        <td className="py-4 px-5">
                          <div className="flex gap-2">
                            <button
                              onClick={() => navigate(`/admin/editar/${a._id}`)}
                              className="text-xs border border-dark-600 text-gray-500 hover:border-gold/50 hover:text-gold px-3 py-1.5 rounded transition-all cursor-pointer"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => remover(a._id)}
                              className="text-xs border border-dark-600 text-gray-500 hover:border-red-500/50 hover:text-red-400 px-3 py-1.5 rounded transition-all cursor-pointer"
                            >
                              Remover
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile — cards */}
              <div className="md:hidden flex flex-col gap-3">
                {agendamentos.map(a => (
                  <div key={a._id} className="bg-dark-900 rounded-xl border border-dark-700 p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-medium text-white text-sm">{a.nome}</p>
                        <p className="text-gray-600 text-xs mt-0.5">{a.telefone}</p>
                      </div>
                      <span className="bg-gold/10 border border-gold/20 text-gold text-xs px-2 py-0.5 rounded-full">{a.servico}</span>
                    </div>
                    <p className="text-gray-600 text-xs mb-4">{a.data} às {a.hora}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/admin/editar/${a._id}`)}
                        className="flex-1 text-xs border border-dark-600 text-gray-500 hover:border-gold/50 hover:text-gold py-2 rounded transition-all cursor-pointer"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => remover(a._id)}
                        className="flex-1 text-xs border border-dark-600 text-gray-500 hover:border-red-500/50 hover:text-red-400 py-2 rounded transition-all cursor-pointer"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
