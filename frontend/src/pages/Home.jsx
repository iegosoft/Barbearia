import { useState } from 'react'

const barbeiros = [
  { nome: 'IEGO COSTA', img: '/img/barbeiro1.jpg', desc: 'Especialista em cortes clássicos e barba desenhada.' },
  { nome: 'CHOZE', img: '/img/barbeiro2.jpg', desc: 'Barbeiro moderno, traz tendências com estilo único.' },
  { nome: 'MARGARIDA', img: '/img/barbeiro3.jpg', desc: 'Mais de 10 anos de experiência com cortes masculinos.' },
  { nome: 'KARINA', img: '/img/barbeiro5.jpg', desc: 'Mais de 10 anos de experiência com cortes masculinos.' },
  { nome: 'ELIZABETH', img: '/img/barbeiro4.jpg', desc: 'Mais de 10 anos de experiência com cortes masculinos.' },
]

const horarios = [
  { dia: 'Segunda', hora: '09:00 às 18:00' },
  { dia: 'Terça', hora: '09:00 às 18:00' },
  { dia: 'Quarta', hora: '09:00 às 18:00' },
  { dia: 'Quinta', hora: '09:00 às 18:00' },
  { dia: 'Sexta', hora: '09:00 às 18:00' },
  { dia: 'Sábado', hora: '09:00 às 14:00' },
  { dia: 'Domingo', hora: 'Fechado' },
]

const servicos = [
  { nome: 'Corte', preco: 'R$30' },
  { nome: 'Barba', preco: 'R$20' },
  { nome: 'Corte + Barba', preco: 'R$45' },
]

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Home() {
  const [form, setForm] = useState({ nome: '', telefone: '', data: '', hora: '', servico: '' })
  const [status, setStatus] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus(null)
    try {
      const res = await fetch('/api/agendamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('sucesso')
        setForm({ nome: '', telefone: '', data: '', hora: '', servico: '' })
      } else {
        setStatus('erro')
      }
    } catch {
      setStatus('erro')
    }
  }

  return (
    <div className="bg-[#d1c6c6] font-roboto min-h-screen">

      {/* Header */}
      <header className="bg-[#202020] sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-5 py-2 flex justify-between items-center flex-wrap gap-3">
          <img src="/img/logo.png" alt="Logo Barbearia" className="h-24" />
          <nav className="flex flex-wrap gap-5">
            <a
              href="#agendamento"
              onClick={e => { e.preventDefault(); scrollTo('agendamento') }}
              className="text-gold font-bold hover:text-white transition-colors"
            >
              Agendar Serviço
            </a>
            <a
              href="#horarios"
              onClick={e => { e.preventDefault(); scrollTo('horarios') }}
              className="text-gold font-bold hover:text-white transition-colors"
            >
              Horários
            </a>
            <a href="/admin/login" className="text-gold font-bold hover:text-white transition-colors">
              <i className="bi bi-shield-lock mr-1" />
              Área do Administrador
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Banner */}
      <section
        className="bg-center bg-cover text-center py-24 px-16"
        style={{
          backgroundImage: "url('/img/barbearia-banner.png')",
          backgroundColor: 'rgba(61,60,60,0.6)',
          backgroundBlendMode: 'darken',
        }}
      >
        <h1 className="font-bebas text-gold text-7xl mb-2 tracking-wide leading-none">Bem-vindo à BarberShop</h1>
        <p className="text-2xl text-white">Estilo, cuidado e atendimento de qualidade</p>
      </section>

      {/* Agendamento */}
      <section
        id="agendamento"
        className="mx-4 my-10 rounded-2xl overflow-hidden shadow-[0_0_15px_rgba(255,215,0,0.2)] bg-center bg-cover relative flex flex-wrap min-h-[500px]"
        style={{ backgroundImage: "url('/img/banner1.png')" }}
      >
        <div className="absolute inset-0 bg-black/40 rounded-2xl z-[1]" />

        {/* Imagem */}
        <div className="flex-1 min-w-[280px] z-10 flex items-center justify-center p-8">
          <img src="/img/agendamento1.jpg" alt="Barbeiro" className="max-w-[80%] rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.7)]" />
        </div>

        {/* Formulário */}
        <div className="flex-1 min-w-[280px] z-10 p-10 flex flex-col justify-center">
          <h2 className="font-bebas text-gold text-4xl mb-4 tracking-wide">Agende seu horário</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              className="w-full p-3 rounded bg-[#2c2c2c] border border-[#555] text-white text-base focus:outline-none focus:border-gold"
              type="text" name="nome" placeholder="Nome completo" required
              value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })}
            />
            <input
              className="w-full p-3 rounded bg-[#2c2c2c] border border-[#555] text-white text-base focus:outline-none focus:border-gold"
              type="text" name="telefone" placeholder="Telefone" required
              value={form.telefone} onChange={e => setForm({ ...form, telefone: e.target.value })}
            />
            <input
              className="w-full p-3 rounded bg-[#2c2c2c] border border-[#555] text-white text-base focus:outline-none focus:border-gold"
              type="date" name="data" required
              value={form.data} onChange={e => setForm({ ...form, data: e.target.value })}
            />
            <input
              className="w-full p-3 rounded bg-[#2c2c2c] border border-[#555] text-white text-base focus:outline-none focus:border-gold"
              type="time" name="hora" required
              value={form.hora} onChange={e => setForm({ ...form, hora: e.target.value })}
            />
            <select
              className="w-full p-3 rounded bg-[#2c2c2c] border border-[#555] text-white text-base focus:outline-none focus:border-gold"
              name="servico" required
              value={form.servico} onChange={e => setForm({ ...form, servico: e.target.value })}
            >
              <option value="">Selecione um serviço</option>
              <option value="Corte">Corte - R$30</option>
              <option value="Barba">Barba - R$20</option>
              <option value="Corte + Barba">Corte + Barba - R$45</option>
            </select>

            {status === 'sucesso' && (
              <p className="text-green-400 font-bold">✅ Agendamento realizado com sucesso!</p>
            )}
            {status === 'erro' && (
              <p className="text-red-400 font-bold">❌ Erro ao realizar agendamento.</p>
            )}

            <button
              type="submit"
              className="bg-gold text-black font-bold py-3 px-5 rounded hover:bg-gold-hover transition-colors text-base cursor-pointer"
            >
              <i className="bi bi-calendar-check mr-2" />
              Agendar
            </button>
          </form>
        </div>
      </section>

      {/* Horários */}
      <section
        id="horarios"
        className="mx-4 my-10 rounded-2xl overflow-hidden shadow-[0_0_15px_rgba(255,215,0,0.2)] bg-center bg-cover relative flex flex-wrap min-h-[500px]"
        style={{ backgroundImage: "url('/img/banner-horarios.png')" }}
      >
        <div className="absolute inset-0 bg-black/40 rounded-2xl z-[1]" />
        <div className="flex-1 min-w-[280px] z-10 flex items-center justify-center p-8">
          <img src="/img/horarios.jpg" alt="Horários" className="max-w-[80%] rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.7)]" />
        </div>
        <div className="flex-1 min-w-[280px] z-10 p-10 flex flex-col justify-center">
          <h2 className="font-bebas text-gold text-4xl mb-4 tracking-wide">Horários Disponíveis na Semana</h2>
          <ul className="list-none p-0 m-0">
            {horarios.map(h => (
              <li key={h.dia} className="flex justify-between py-2 border-b border-[#444] text-lg gap-5">
                <span className="font-bold text-gold">{h.dia}</span>
                <span className="text-gray-200">{h.hora}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Serviços */}
      <section
        className="mx-4 my-10 rounded-2xl overflow-hidden shadow-[0_0_15px_rgba(255,215,0,0.2)] bg-center bg-cover relative flex flex-wrap min-h-[500px]"
        style={{ backgroundImage: "url('/img/servicos-banner.png')" }}
      >
        <div className="absolute inset-0 bg-black/40 rounded-2xl z-[1]" />
        <div className="flex-1 min-w-[280px] z-10 flex items-center justify-center p-8">
          <img src="/img/barbeiro-extra2.jpg" alt="Serviço" className="max-w-[80%] rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.7)]" />
        </div>
        <div className="flex-1 min-w-[280px] z-10 p-10 flex flex-col justify-center">
          <h2 className="font-bebas text-gold text-4xl mb-4 tracking-wide">💈 Nossos Serviços</h2>
          <ul className="list-none p-0 m-0">
            {servicos.map(s => (
              <li key={s.nome} className="flex justify-between py-7 border-b border-[#444] text-xl">
                <span className="font-bold text-gold">{s.nome}</span>
                <span className="text-gray-200">{s.preco}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Barbeiros */}
      <section
        className="mx-4 my-10 rounded-2xl overflow-hidden bg-center bg-cover relative"
        style={{ backgroundImage: "url('/img/barbeiros-banner.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40 rounded-2xl z-[1]" />
        <div className="relative z-10 bg-black/80 p-8 rounded-2xl">
          <h2 className="font-bebas text-gold text-4xl mb-6 text-center tracking-wide">Nossos Barbeiros 💈</h2>
          <div className="flex flex-wrap justify-center gap-8 py-4">
            {barbeiros.map(b => (
              <div
                key={b.nome}
                className="flex-1 min-w-[180px] max-w-[220px] bg-[#3b3b3b] rounded-3xl p-4 text-center hover:scale-105 transition-transform shadow-md"
              >
                <img
                  src={b.img} alt={b.nome}
                  className="w-44 h-60 object-cover rounded-3xl mx-auto mb-3 shadow-md"
                />
                <h3 className="text-gold font-bebas text-xl">{b.nome}</h3>
                <p className="text-gold text-sm mt-1">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gold text-center py-5 mt-10 font-playfair">
        <p>&copy; 2025 BarberShop. Todos os direitos reservados.</p>
      </footer>

    </div>
  )
}
