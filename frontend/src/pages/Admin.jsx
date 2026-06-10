import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const BARBEIROS = ['Iego Costa', 'Choze', 'Margarida', 'Karina', 'Elizabeth']

const STATUS_CONFIG = {
  pendente:  { label: 'Pendente',  bg: 'bg-amber-500/15 border-amber-500/30 text-amber-400'    },
  concluido: { label: 'Concluído', bg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400' },
  remarcado: { label: 'Remarcado', bg: 'bg-blue-500/15 border-blue-500/30 text-blue-400'       },
  cancelado: { label: 'Cancelado', bg: 'bg-red-500/15 border-red-500/30 text-red-400'          },
}

function Badge({ status }) {
  const c = STATUS_CONFIG[status] || STATUS_CONFIG.pendente
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-xs font-medium ${c.bg}`}>
      {c.label}
    </span>
  )
}

function hojeLocal() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export default function Admin() {
  const [agendamentos, setAgendamentos]   = useState([])
  const [stats, setStats]                 = useState({ hoje: 0, pendentes: 0, concluidosHoje: 0, pendentesHoje: 0 })
  const [filtros, setFiltros]             = useState({ data: '', barbeiro: '', status: '' })
  const [filtrosAtivos, setFiltrosAtivos] = useState({ data: '', barbeiro: '', status: '' })
  const [sidebarAberta, setSidebarAberta] = useState(false)
  const [carregando, setCarregando]       = useState(true)
  const [atualizandoId, setAtualizandoId] = useState(null)
  const [erroStatus, setErroStatus]       = useState('')
  const navigate = useNavigate()

  async function carregarTudo(filtrosAplicados = filtrosAtivos) {
    setCarregando(true)
    setErroStatus('')
    try {
      const params = new URLSearchParams()
      if (filtrosAplicados.data)     params.set('data',     filtrosAplicados.data)
      if (filtrosAplicados.barbeiro) params.set('barbeiro', filtrosAplicados.barbeiro)
      if (filtrosAplicados.status)   params.set('status',   filtrosAplicados.status)

      const [resLista, resStats] = await Promise.all([
        fetch(`/api/agendamentos?${params}`, { credentials: 'include' }),
        fetch(`/api/agendamentos/stats`, { credentials: 'include' }),
      ])

      const lista = await resLista.json()
      setAgendamentos(Array.isArray(lista) ? lista : [])

      if (resStats.ok) {
        const s = await resStats.json()
        setStats(s)
      }
    } catch {
      setAgendamentos([])
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => { carregarTudo() }, [])

  async function atualizarStatus(id, novoStatus) {
    setAtualizandoId(id)
    setErroStatus('')
    try {
      const res = await fetch(`/api/agendamentos/${id}/status`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: novoStatus }),
      })
      if (!res.ok) {
        const data = await res.json()
        setErroStatus(data.erro || 'Erro ao atualizar status')
        return
      }
      setAgendamentos(prev => prev.map(a => a._id === id ? { ...a, status: novoStatus } : a))
      const resStats = await fetch('/api/agendamentos/stats', { credentials: 'include' })
      if (resStats.ok) setStats(await resStats.json())
    } catch {
      setErroStatus('Erro de conexão ao atualizar status')
    } finally {
      setAtualizandoId(null)
    }
  }

  async function remover(id) {
    if (!window.confirm('Remover este agendamento?')) return
    const res = await fetch(`/api/agendamentos/${id}`, { method: 'DELETE', credentials: 'include' })
    if (res.ok) {
      setAgendamentos(prev => prev.filter(a => a._id !== id))
      const resStats = await fetch('/api/agendamentos/stats', { credentials: 'include' })
      if (resStats.ok) setStats(await resStats.json())
    }
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' })
    navigate('/admin/login')
  }

  function aplicarFiltros() {
    setFiltrosAtivos({ ...filtros })
    carregarTudo(filtros)
  }

  function limparFiltros() {
    const limpo = { data: '', barbeiro: '', status: '' }
    setFiltros(limpo)
    setFiltrosAtivos(limpo)
    carregarTudo(limpo)
  }

  const temFiltro = filtrosAtivos.data || filtrosAtivos.barbeiro || filtrosAtivos.status

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

        {sidebarAberta && (
          <div className="fixed inset-0 bg-black/60 z-20 lg:hidden" onClick={() => setSidebarAberta(false)} />
        )}

        <aside className={`
          fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-56 bg-dark-900 border-r border-dark-700 z-20
          flex flex-col py-8 px-4 gap-1 transition-transform duration-300
          ${sidebarAberta ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:h-auto lg:z-auto
        `}>
          <p className="text-gray-700 text-xs uppercase tracking-[0.2em] px-3 mb-3">Navegação</p>
          <a href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:text-gold hover:bg-dark-800 transition-all text-sm">
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

        <main className="flex-1 p-6 lg:p-8 min-w-0">

          <div className="mb-6">
            <h1 className="font-bebas text-4xl text-white tracking-wide">Agendamentos</h1>
            <p className="text-gray-600 text-xs mt-0.5">Gerencie os agendamentos da barbearia</p>
          </div>

          {/* Cards de stats — sempre do banco completo, independente dos filtros */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Hoje',               valor: stats.hoje,          cor: 'text-white'         },
              { label: 'Pendentes total',     valor: stats.pendentes,     cor: 'text-amber-400'     },
              { label: 'Concluídos hoje',     valor: stats.concluidosHoje, cor: 'text-emerald-400'  },
              { label: 'Pendentes hoje',      valor: stats.pendentesHoje, cor: 'text-blue-400'      },
            ].map(s => (
              <div key={s.label} className="bg-dark-900 border border-dark-700 rounded-xl px-5 py-4">
                <p className="text-gray-600 text-xs uppercase tracking-[0.15em] mb-1">{s.label}</p>
                <p className={`font-bebas text-3xl tracking-wide ${s.cor}`}>{s.valor}</p>
              </div>
            ))}
          </div>

          {erroStatus && (
            <div className="bg-red-900/30 border border-red-700/50 text-red-400 text-xs rounded-lg px-4 py-2.5 mb-4">
              {erroStatus}
            </div>
          )}

          {/* Filtros — só aplica ao clicar em Filtrar */}
          <div className="bg-dark-900 border border-dark-700 rounded-xl p-4 mb-6">
            <p className="text-gray-600 text-xs uppercase tracking-[0.15em] mb-3">Filtrar por</p>
            <div className="flex flex-wrap gap-3 items-end">
              <div className="flex flex-col gap-1">
                <label className="text-gray-600 text-xs">Data</label>
                <input
                  type="date"
                  className="bg-dark-800 border border-dark-600 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-gold transition-colors"
                  style={{ colorScheme: 'dark' }}
                  value={filtros.data}
                  onChange={e => setFiltros(f => ({ ...f, data: e.target.value }))}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-gray-600 text-xs">Barbeiro</label>
                <select
                  className="bg-dark-800 border border-dark-600 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-gold transition-colors"
                  value={filtros.barbeiro}
                  onChange={e => setFiltros(f => ({ ...f, barbeiro: e.target.value }))}
                >
                  <option value="">Todos</option>
                  {BARBEIROS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-gray-600 text-xs">Status</label>
                <select
                  className="bg-dark-800 border border-dark-600 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-gold transition-colors"
                  value={filtros.status}
                  onChange={e => setFiltros(f => ({ ...f, status: e.target.value }))}
                >
                  <option value="">Todos</option>
                  <option value="pendente">Pendente</option>
                  <option value="concluido">Concluído</option>
                  <option value="remarcado">Remarcado</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>
              <div className="flex gap-2 pb-0.5">
                <button
                  onClick={aplicarFiltros}
                  className="bg-gold text-black text-xs font-bold px-4 py-2 rounded-lg hover:bg-gold-hover transition-colors cursor-pointer"
                >
                  Filtrar
                </button>
                {temFiltro && (
                  <button
                    onClick={limparFiltros}
                    className="border border-dark-600 text-gray-500 hover:text-white text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    Limpar
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-600 text-xs">
              {carregando ? 'Carregando...' : `${agendamentos.length} registro${agendamentos.length !== 1 ? 's' : ''}`}
              {temFiltro && <span className="text-gold ml-1">(filtrado)</span>}
            </p>
          </div>

          {carregando ? (
            <div className="text-center py-20 text-gray-700 text-sm">Carregando agendamentos...</div>
          ) : agendamentos.length === 0 ? (
            <div className="text-center py-24 text-gray-700">
              <svg className="w-10 h-10 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm">Nenhum agendamento encontrado.</p>
            </div>
          ) : (
            <>
              {/* Desktop */}
              <div className="hidden md:block rounded-xl border border-dark-700 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-dark-900 border-b border-dark-700">
                      {['Cliente', 'Telefone', 'Data', 'Hora', 'Serviço', 'Barbeiro', 'Status', 'Ações'].map(h => (
                        <th key={h} className="text-left py-3 px-4 text-gold font-bebas text-sm tracking-[0.1em] font-normal">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-700">
                    {agendamentos.map(a => (
                      <tr key={a._id} className="hover:bg-dark-800 transition-colors">
                        <td className="py-3.5 px-4 text-white font-medium">{a.nome}</td>
                        <td className="py-3.5 px-4 text-gray-500 text-xs">{a.telefone}</td>
                        <td className="py-3.5 px-4 text-gray-400 text-xs">{a.data}</td>
                        <td className="py-3.5 px-4 text-gray-400 text-xs">{a.hora}</td>
                        <td className="py-3.5 px-4">
                          <span className="bg-gold/10 border border-gold/20 text-gold text-xs px-2 py-0.5 rounded-full">{a.servico}</span>
                        </td>
                        <td className="py-3.5 px-4 text-gray-400 text-xs">{a.barbeiro || '—'}</td>
                        <td className="py-3.5 px-4">
                          <Badge status={a.status || 'pendente'} />
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1 flex-wrap">
                            {a.status !== 'concluido' && (
                              <button
                                onClick={() => atualizarStatus(a._id, 'concluido')}
                                disabled={atualizandoId === a._id}
                                title="Marcar como concluído"
                                className="text-emerald-500 hover:text-emerald-300 border border-emerald-500/30 hover:border-emerald-400/50 p-1.5 rounded transition-all cursor-pointer disabled:opacity-40"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </button>
                            )}
                            {a.status !== 'remarcado' && (
                              <button
                                onClick={() => atualizarStatus(a._id, 'remarcado')}
                                disabled={atualizandoId === a._id}
                                title="Marcar como remarcado"
                                className="text-blue-400 hover:text-blue-300 border border-blue-400/30 hover:border-blue-400/50 p-1.5 rounded transition-all cursor-pointer disabled:opacity-40"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </button>
                            )}
                            {a.status !== 'cancelado' && (
                              <button
                                onClick={() => atualizarStatus(a._id, 'cancelado')}
                                disabled={atualizandoId === a._id}
                                title="Cancelar agendamento"
                                className="text-red-500 hover:text-red-300 border border-red-500/30 hover:border-red-400/50 p-1.5 rounded transition-all cursor-pointer disabled:opacity-40"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            )}
                            <button
                              onClick={() => navigate(`/admin/editar/${a._id}`)}
                              title="Editar"
                              className="text-gray-500 hover:text-gold border border-dark-600 hover:border-gold/40 p-1.5 rounded transition-all cursor-pointer"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => remover(a._id)}
                              title="Remover"
                              className="text-gray-600 hover:text-red-400 border border-dark-600 hover:border-red-400/40 p-1.5 rounded transition-all cursor-pointer"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile */}
              <div className="md:hidden flex flex-col gap-3">
                {agendamentos.map(a => (
                  <div key={a._id} className="bg-dark-900 rounded-xl border border-dark-700 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-white text-sm">{a.nome}</p>
                        <p className="text-gray-600 text-xs mt-0.5">{a.telefone}</p>
                      </div>
                      <Badge status={a.status || 'pendente'} />
                    </div>
                    <div className="flex gap-2 flex-wrap mb-3">
                      <span className="text-gray-500 text-xs">{a.data} às {a.hora}</span>
                      <span className="bg-gold/10 border border-gold/20 text-gold text-xs px-2 py-0.5 rounded-full">{a.servico}</span>
                      {a.barbeiro && <span className="text-gray-500 text-xs">{a.barbeiro}</span>}
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {a.status !== 'concluido' && (
                        <button onClick={() => atualizarStatus(a._id, 'concluido')} disabled={atualizandoId === a._id} className="flex-1 text-xs border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 py-2 rounded transition-all cursor-pointer disabled:opacity-40">✓ Concluído</button>
                      )}
                      {a.status !== 'remarcado' && (
                        <button onClick={() => atualizarStatus(a._id, 'remarcado')} disabled={atualizandoId === a._id} className="flex-1 text-xs border border-blue-400/30 text-blue-400 hover:bg-blue-500/10 py-2 rounded transition-all cursor-pointer disabled:opacity-40">↩ Remarcar</button>
                      )}
                      {a.status !== 'cancelado' && (
                        <button onClick={() => atualizarStatus(a._id, 'cancelado')} disabled={atualizandoId === a._id} className="flex-1 text-xs border border-red-500/30 text-red-400 hover:bg-red-500/10 py-2 rounded transition-all cursor-pointer disabled:opacity-40">✗ Cancelar</button>
                      )}
                      <button onClick={() => navigate(`/admin/editar/${a._id}`)} className="flex-1 text-xs border border-dark-600 text-gray-500 hover:border-gold/50 hover:text-gold py-2 rounded transition-all cursor-pointer">Editar</button>
                      <button onClick={() => remover(a._id)} className="flex-1 text-xs border border-dark-600 text-gray-600 hover:border-red-500/50 hover:text-red-400 py-2 rounded transition-all cursor-pointer">Remover</button>
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
