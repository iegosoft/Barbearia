import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Admin() {
  const [agendamentos, setAgendamentos] = useState([])
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
    <div className="flex min-h-screen bg-[#1a1a1a] text-white">

      {/* Sidebar */}
      <aside className="w-60 bg-[#111] flex flex-col items-center py-6 gap-6 fixed h-full z-10">
        <img src="/img/logo2.png" alt="Logo" className="w-24" />
        <nav className="flex flex-col gap-4 w-full px-6">
          <a href="/" className="text-gold hover:text-white flex items-center gap-2 transition-colors">
            <i className="bi bi-house" /> Início
          </a>
          <button
            onClick={logout}
            className="text-gold hover:text-white flex items-center gap-2 text-left cursor-pointer bg-transparent border-none p-0"
          >
            <i className="bi bi-box-arrow-right" /> Sair
          </button>
        </nav>
      </aside>

      {/* Main */}
      <main className="ml-60 flex-1 p-8">
        <header className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <h1 className="font-bebas text-gold text-4xl tracking-wide">
            <i className="bi bi-calendar-check mr-2" />
            Painel de Agendamentos
          </h1>
          <button
            onClick={logout}
            className="bg-gold text-black font-bold px-4 py-2 rounded hover:bg-gold-hover cursor-pointer transition-colors"
          >
            Sair
          </button>
        </header>

        {agendamentos.length === 0 ? (
          <p className="text-gray-400">Nenhum agendamento encontrado.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gold">
                  {['Nome', 'Telefone', 'Data', 'Hora', 'Serviço', 'Ações'].map(h => (
                    <th key={h} className="text-left py-3 px-4 text-gold font-bebas text-lg tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {agendamentos.map(a => (
                  <tr key={a._id} className="border-b border-[#333] hover:bg-[#2a2a2a] transition-colors">
                    <td className="py-3 px-4">{a.nome}</td>
                    <td className="py-3 px-4">{a.telefone}</td>
                    <td className="py-3 px-4">{a.data}</td>
                    <td className="py-3 px-4">{a.hora}</td>
                    <td className="py-3 px-4">{a.servico}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() => navigate(`/admin/editar/${a._id}`)}
                          className="bg-gold text-black text-sm font-bold px-3 py-1 rounded hover:bg-gold-hover cursor-pointer transition-colors"
                        >
                          <i className="bi bi-pencil-square mr-1" />
                          Editar
                        </button>
                        <button
                          onClick={() => remover(a._id)}
                          className="bg-[#ff4d4d] text-white text-sm font-bold px-3 py-1 rounded hover:bg-red-700 cursor-pointer transition-colors"
                        >
                          <i className="bi bi-trash mr-1" />
                          Remover
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

    </div>
  )
}
