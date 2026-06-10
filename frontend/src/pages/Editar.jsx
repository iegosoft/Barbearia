import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function Editar() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ nome: '', telefone: '', data: '', hora: '', servico: '' })
  const [erro, setErro] = useState('')

  useEffect(() => {
    fetch(`/api/agendamentos/${id}`, { credentials: 'include' })
      .then(r => r.json())
      .then(data => setForm({
        nome: data.nome || '',
        telefone: data.telefone || '',
        data: data.data || '',
        hora: data.hora || '',
        servico: data.servico || '',
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

  return (
    <div className="flex min-h-screen bg-[#1a1a1a] text-white">

      {/* Sidebar */}
      <aside className="w-60 bg-[#111] flex flex-col items-center py-6 gap-6 fixed h-full z-10">
        <img src="/img/logo2.png" alt="Logo" className="w-24" />
        <nav className="flex flex-col gap-4 w-full px-6">
          <a href="/" className="text-gold hover:text-white flex items-center gap-2 transition-colors">
            <i className="bi bi-house" /> Início
          </a>
          <a href="/admin/painel" className="text-gold hover:text-white flex items-center gap-2 transition-colors">
            <i className="bi bi-calendar-check" /> Painel
          </a>
        </nav>
      </aside>

      {/* Main */}
      <main className="ml-60 flex-1 p-8">
        <header className="mb-8">
          <h1 className="font-bebas text-gold text-4xl tracking-wide">
            <i className="bi bi-pencil-square mr-2" />
            Editar Agendamento
          </h1>
        </header>

        {erro && <p className="text-red-400 mb-4">{erro}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
          <input
            className="bg-[#2c2c2c] border border-[#555] text-white rounded p-3 focus:outline-none focus:border-gold"
            type="text" name="nome" placeholder="Nome completo" required
            value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })}
          />
          <input
            className="bg-[#2c2c2c] border border-[#555] text-white rounded p-3 focus:outline-none focus:border-gold"
            type="text" name="telefone" placeholder="Telefone" required
            value={form.telefone} onChange={e => setForm({ ...form, telefone: e.target.value })}
          />
          <input
            className="bg-[#2c2c2c] border border-[#555] text-white rounded p-3 focus:outline-none focus:border-gold"
            type="date" name="data" required
            value={form.data} onChange={e => setForm({ ...form, data: e.target.value })}
          />
          <input
            className="bg-[#2c2c2c] border border-[#555] text-white rounded p-3 focus:outline-none focus:border-gold"
            type="time" name="hora" required
            value={form.hora} onChange={e => setForm({ ...form, hora: e.target.value })}
          />
          <select
            className="bg-[#2c2c2c] border border-[#555] text-white rounded p-3 focus:outline-none focus:border-gold"
            name="servico" required
            value={form.servico} onChange={e => setForm({ ...form, servico: e.target.value })}
          >
            <option value="">Selecione um serviço</option>
            <option value="Corte">Corte - R$30</option>
            <option value="Barba">Barba - R$20</option>
            <option value="Corte + Barba">Corte + Barba - R$45</option>
          </select>

          <div className="flex gap-4 flex-wrap">
            <button
              type="submit"
              className="bg-gold text-black font-bold py-3 px-6 rounded hover:bg-gold-hover cursor-pointer transition-colors"
            >
              <i className="bi bi-save mr-2" />
              Salvar Alterações
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/painel')}
              className="bg-[#444] text-white font-bold py-3 px-6 rounded hover:bg-[#555] cursor-pointer transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </main>

    </div>
  )
}
