import { useState } from 'react'

/* ── SVG Icons ───────────────────────────────────────────────── */
const IconScissors = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="6" r="2.8" />
    <circle cx="6" cy="18" r="2.8" />
    <path d="M8.8 7.5L18 5" />
    <path d="M8.8 16.5L18 19" />
    <path d="M8.8 7.5L14 12M8.8 16.5L14 12" />
  </svg>
)

const IconRazor = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="8.5" width="15" height="7" rx="2" />
    <path d="M17 12h5" />
    <path d="M6.5 8.5V6.5M10.5 8.5V6.5" />
  </svg>
)

const IconBarberPole = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8.5" y="1.5" width="7" height="21" rx="3.5" />
    <path d="M8.5 7L15.5 10" />
    <path d="M8.5 12L15.5 15" />
    <path d="M8.5 17L15.5 20" />
  </svg>
)

const IconAward = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="9" r="6" />
    <path d="M8.5 14.8L6.5 22l5.5-2 5.5 2-2-7.2" />
  </svg>
)

const IconSparkle = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2z" />
  </svg>
)

const IconSofa = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 9V7a2 2 0 00-2-2H6a2 2 0 00-2 2v2" />
    <path d="M2 13a2 2 0 012-2h1a2 2 0 012 2v3H2m20 0v-3a2 2 0 00-2-2h-1a2 2 0 00-2 2v3" />
    <path d="M7 16h10v2H7zM2 16h20" />
  </svg>
)

const IconCalendar = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2.5" />
    <path d="M16 2v4M8 2v4M3 10h18" />
    <path d="M8 14.5h.01M12 14.5h.01M16 14.5h.01M8 18.5h.01M12 18.5h.01" />
  </svg>
)

const IconStar = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.9 5.95 6.6.95-4.77 4.65 1.12 6.55L12 17.25 6.14 20.1l1.12-6.55L2.5 8.9l6.6-.95L12 2z" />
  </svg>
)

/* ── Data ────────────────────────────────────────────────────── */
const barbeiros = [
  { nome: 'IEGO COSTA', role: 'Fundador & Barbeiro', img: '/img/barbeiro1.jpg', desc: 'Especialista em cortes clássicos e barba desenhada.' },
  { nome: 'CHOZE', role: 'Barbeiro', img: '/img/barbeiro2.jpg', desc: 'Barbeiro moderno, tendências com estilo único.' },
  { nome: 'MARGARIDA', role: 'Barbeira', img: '/img/barbeiro3.jpg', desc: 'Mais de 10 anos em cortes masculinos.' },
  { nome: 'KARINA', role: 'Barbeira', img: '/img/barbeiro5.jpg', desc: 'Técnica apurada e acabamento impecável.' },
  { nome: 'ELIZABETH', role: 'Barbeira', img: '/img/barbeiro4.jpg', desc: 'Especialista em degradês e barba esculpida.' },
]

const horarios = [
  { dia: 'Segunda', hora: '09:00 – 18:00', aberto: true },
  { dia: 'Terça', hora: '09:00 – 18:00', aberto: true },
  { dia: 'Quarta', hora: '09:00 – 18:00', aberto: true },
  { dia: 'Quinta', hora: '09:00 – 18:00', aberto: true },
  { dia: 'Sexta', hora: '09:00 – 18:00', aberto: true },
  { dia: 'Sábado', hora: '09:00 – 14:00', aberto: true },
  { dia: 'Domingo', hora: 'Fechado', aberto: false },
]

const servicos = [
  {
    nome: 'Corte',
    preco: 'R$ 30',
    desc: 'Corte masculino com acabamento perfeito, lavagem e finalização incluídas.',
    Icon: IconScissors,
    destaque: false,
  },
  {
    nome: 'Corte + Barba',
    preco: 'R$ 45',
    desc: 'Combo completo: corte impecável + barba desenhada com navalha quente.',
    Icon: IconBarberPole,
    destaque: true,
  },
  {
    nome: 'Barba',
    preco: 'R$ 20',
    desc: 'Barba esculpida com navalha, toalha quente e hidratante pós-barba.',
    Icon: IconRazor,
    destaque: false,
  },
]

const galeria = [
  { img: '/img/corte2.jpg',         titulo: 'Degradê Clássico' },
  { img: '/img/corte1.jpg',         titulo: 'Corte Social' },
  { img: '/img/barber-cutting.jpg', titulo: 'Corte + Barba' },
  { img: '/img/corte5.jpg',         titulo: 'Máquina Precisa' },
  { img: '/img/corte3.jpg',         titulo: 'Atendimento Duplo' },
  { img: '/img/corte4.jpg',         titulo: 'Estilo Premium' },
]

const diferenciais = [
  { Icon: IconAward,    titulo: 'Barbeiros Especializados', desc: 'Equipe com anos de experiência e formação especializada em cortes masculinos.' },
  { Icon: IconSparkle,  titulo: 'Ferramentas Premium',      desc: 'Apenas produtos e equipamentos de alta qualidade para o melhor resultado.' },
  { Icon: IconSofa,     titulo: 'Ambiente Confortável',     desc: 'Wi-Fi gratuito, café e TV — um espaço pensado para você relaxar.' },
  { Icon: IconCalendar, titulo: 'Agendamento Online',       desc: 'Agende a qualquer hora pelo site, sem filas, no horário que preferir.' },
]

const depoimentos = [
  { nome: 'João Mendes',     texto: 'Melhor barbearia da cidade! Sempre saio satisfeito com o resultado. Recomendo demais!', estrelas: 5 },
  { nome: 'Carlos Ferreira', texto: 'Atendimento impecável, ambiente top e preço justo. Virei cliente fiel!', estrelas: 5 },
  { nome: 'André Souza',     texto: 'Meu corte favorito! A equipe é muito talentosa e cada detalhe é perfeito.', estrelas: 5 },
]

/* ── Component ───────────────────────────────────────────────── */
export default function Home() {
  const [form, setForm] = useState({ nome: '', telefone: '', data: '', hora: '', servico: '' })
  const [status, setStatus] = useState(null)
  const [erroMsg, setErroMsg] = useState('')
  const [menuAberto, setMenuAberto] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus(null)
    setErroMsg('')
    try {
      const res = await fetch('/api/agendamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('sucesso')
        setForm({ nome: '', telefone: '', data: '', hora: '', servico: '' })
      } else {
        setStatus('erro')
        setErroMsg(data.erro || 'Erro ao realizar agendamento.')
      }
    } catch {
      setStatus('erro')
      setErroMsg('Erro de conexão com o servidor.')
    }
  }

  function irPara(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuAberto(false)
  }

  return (
    <div className="bg-white font-roboto text-stone-900">

      {/* ── Header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/96 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-5 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/img/logo.png" alt="BarberShop" className="h-14" />
            <span className="font-bebas text-stone-900 text-2xl tracking-[0.2em] hidden md:block">BARBERSHOP</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: 'Sobre',       id: 'sobre' },
              { label: 'Serviços',    id: 'servicos' },
              { label: 'Galeria',     id: 'galeria' },
              { label: 'Equipe',      id: 'equipe' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => irPara(item.id)}
                className="text-stone-500 hover:text-stone-900 text-sm tracking-wide transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => irPara('agendamento')}
              className="bg-stone-900 text-white px-5 py-2 rounded-lg text-xs tracking-widest uppercase hover:bg-gold transition-colors cursor-pointer"
            >
              Agendar
            </button>
            <a href="/admin/login" className="text-stone-400 hover:text-gold text-xs transition-colors">Admin</a>
          </nav>

          <button
            onClick={() => setMenuAberto(v => !v)}
            className="md:hidden text-stone-900 p-2 cursor-pointer"
            aria-label="Menu"
          >
            {menuAberto ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {menuAberto && (
          <div className="md:hidden bg-white border-t border-stone-200 px-5 py-4 flex flex-col gap-4">
            {[
              { label: 'Sobre',        id: 'sobre' },
              { label: 'Serviços',     id: 'servicos' },
              { label: 'Galeria',      id: 'galeria' },
              { label: 'Equipe',       id: 'equipe' },
              { label: 'Agendamento',  id: 'agendamento' },
            ].map(item => (
              <button key={item.id} onClick={() => irPara(item.id)} className="text-stone-600 text-left text-sm cursor-pointer">
                {item.label}
              </button>
            ))}
            <a href="/admin/login" className="text-stone-400 text-sm">Área Admin</a>
          </div>
        )}
      </header>

      {/* Header offset */}
      <div className="h-20" />

      {/* ── Hero ── */}
      <section className="flex flex-col lg:flex-row h-auto lg:h-[620px]">
        {/* Conteúdo */}
        <div className="order-2 lg:order-1 lg:w-[45%] flex items-center bg-cream px-8 sm:px-12 lg:px-16 xl:px-20 py-14 lg:py-0">
          <div className="max-w-md">
            <p className="font-playfair italic text-gold text-sm tracking-wide mb-4">Premium Barbershop</p>
            <h1 className="font-bebas text-stone-900 text-[4.5rem] sm:text-[5.5rem] lg:text-[5.5rem] xl:text-[6rem] leading-none tracking-wide mb-5">
              CORTES QUE<br />
              <span className="text-gold">DEFINEM</span><br />
              ESTILO
            </h1>
            <p className="text-stone-500 text-sm lg:text-base leading-relaxed mb-7 max-w-xs">
              Precisão, cuidado e estilo em cada atendimento.
              Venha viver a experiência de uma barbearia de verdade.
            </p>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => irPara('agendamento')}
                className="bg-gold text-white font-bold px-7 py-3 rounded-lg hover:bg-gold-hover transition-colors text-xs tracking-[0.15em] uppercase cursor-pointer"
              >
                Agendar Agora
              </button>
              <button
                onClick={() => irPara('servicos')}
                className="border border-stone-300 text-stone-600 px-7 py-3 rounded-lg hover:border-gold hover:text-gold transition-all text-xs tracking-[0.15em] uppercase cursor-pointer"
              >
                Ver Serviços
              </button>
            </div>
          </div>
        </div>
        {/* Imagem */}
        <div className="order-1 lg:order-2 w-full h-[55vw] sm:h-[420px] lg:h-full lg:flex-1 relative overflow-hidden">
          <img
            src="/img/barbershop-interior.jpg"
            alt="Interior da BarberShop"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-stone-900/10" />
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-stone-900 text-white py-8">
        <div className="max-w-3xl mx-auto px-6 grid grid-cols-3 gap-4 text-center divide-x divide-stone-700">
          {[
            { num: '500+', label: 'Clientes Atendidos' },
            { num: '5',    label: 'Barbeiros Especializados' },
            { num: '3+',   label: 'Anos de Experiência' },
          ].map(s => (
            <div key={s.label} className="px-4">
              <p className="font-bebas text-gold text-3xl sm:text-4xl">{s.num}</p>
              <p className="text-stone-400 text-xs mt-1 uppercase tracking-wider leading-tight">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sobre ── */}
      <section id="sobre" className="flex flex-col lg:flex-row lg:h-[480px]">
        <div className="w-full h-[70vw] sm:h-[420px] lg:h-full lg:w-5/12 relative overflow-hidden">
          <img
            src="/img/barber-cutting.jpg"
            alt="Barbeiro trabalhando"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="flex-1 bg-white px-8 sm:px-12 lg:px-14 py-12 lg:py-16 flex flex-col justify-center">
          <p className="font-playfair italic text-gold text-sm tracking-wide mb-3">Nossa história</p>
          <h2 className="font-bebas text-stone-900 text-4xl sm:text-5xl tracking-wide mb-5 leading-none">
            TRADIÇÃO &<br />MODERNIDADE
          </h2>
          <p className="text-stone-500 text-sm leading-relaxed mb-6 max-w-sm">
            A BarberShop nasceu com um propósito: oferecer cortes de qualidade
            num ambiente acolhedor. Técnicas tradicionais com as tendências mais atuais.
          </p>
          <ul className="space-y-2.5">
            {[
              'Equipe formada e constantemente atualizada',
              'Produtos premium nacionais e importados',
              'Ambiente climatizado com Wi-Fi e entretenimento',
              'Agendamento online sem filas',
            ].map(item => (
              <li key={item} className="flex items-start gap-3 text-stone-600 text-sm">
                <span className="text-gold font-bold flex-shrink-0 mt-0.5">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Serviços ── */}
      <section id="servicos" className="py-20 px-6 bg-cream">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-playfair italic text-gold text-sm tracking-wide mb-2">O que fazemos</p>
            <h2 className="font-bebas text-stone-900 text-5xl tracking-wide">Nossos Serviços</h2>
            <div className="w-10 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {servicos.map(s => (
              <div
                key={s.nome}
                className={`relative rounded-2xl p-8 text-center border-2 transition-all ${
                  s.destaque
                    ? 'border-gold bg-stone-900'
                    : 'border-stone-200 bg-white hover:border-gold/40 hover:shadow-md'
                }`}
              >
                {s.destaque && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gold text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest">
                    Mais Popular
                  </span>
                )}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5 ${
                  s.destaque ? 'bg-stone-800' : 'bg-stone-100'
                }`}>
                  <s.Icon className={`w-7 h-7 ${s.destaque ? 'text-gold' : 'text-stone-600'}`} />
                </div>
                <h3 className={`font-bebas text-2xl tracking-wide mb-3 ${s.destaque ? 'text-gold' : 'text-stone-900'}`}>
                  {s.nome}
                </h3>
                <p className={`text-sm mb-6 leading-relaxed ${s.destaque ? 'text-stone-400' : 'text-stone-500'}`}>
                  {s.desc}
                </p>
                <span className={`font-playfair text-3xl font-semibold ${s.destaque ? 'text-white' : 'text-stone-900'}`}>
                  {s.preco}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Galeria ── */}
      <section id="galeria" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-playfair italic text-gold text-sm tracking-wide mb-2">Nosso trabalho</p>
            <h2 className="font-bebas text-stone-900 text-5xl tracking-wide">Galeria de Cortes</h2>
            <div className="w-10 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {galeria.map((g, i) => (
              <div
                key={g.titulo}
                className={`relative overflow-hidden rounded-2xl group ${i === 0 || i === 3 ? 'row-span-2' : ''}`}
              >
                <div className={`relative overflow-hidden ${i === 0 || i === 3 ? 'h-full min-h-[300px] sm:min-h-[400px]' : 'h-44 sm:h-52'}`}>
                  <img
                    src={g.img}
                    alt={g.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/55 transition-all duration-300 flex items-end p-4 rounded-2xl">
                    <p className="text-white font-bebas text-base tracking-wide translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      {g.titulo}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Diferenciais ── */}
      <section
        className="py-20 px-6 bg-cover bg-center relative"
        style={{ backgroundImage: "url('/img/barber-tools.jpg')" }}
      >
        <div className="absolute inset-0 bg-stone-900/88" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-playfair italic text-gold text-sm tracking-wide mb-2">Por que nos escolher</p>
            <h2 className="font-bebas text-white text-5xl tracking-wide">Nossos Diferenciais</h2>
            <div className="w-10 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {diferenciais.map(d => (
              <div key={d.titulo} className="rounded-2xl border border-stone-700 bg-stone-900/60 p-6 hover:border-gold/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-stone-800 flex items-center justify-center mb-4">
                  <d.Icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-bebas text-gold text-lg tracking-wide mb-2">{d.titulo}</h3>
                <p className="text-stone-400 text-sm leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Agendamento ── */}
      <section id="agendamento" className="py-20 px-6 bg-stone-900">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-10">
            <p className="font-playfair italic text-gold text-sm tracking-wide mb-2">Marque seu horário</p>
            <h2 className="font-bebas text-white text-5xl tracking-wide">Agendamento</h2>
            <div className="w-10 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                className="w-full px-4 py-3 rounded-lg border border-stone-300 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-gold transition-colors text-sm"
                type="text" name="nome" placeholder="Nome completo" required
                value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })}
              />
              <input
                className="w-full px-4 py-3 rounded-lg border border-stone-300 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-gold transition-colors text-sm"
                type="text" name="telefone" placeholder="Telefone" required
                value={form.telefone} onChange={e => setForm({ ...form, telefone: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:border-gold transition-colors text-sm"
                  type="date" name="data" required
                  value={form.data} onChange={e => setForm({ ...form, data: e.target.value })}
                />
                <input
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:border-gold transition-colors text-sm"
                  type="time" name="hora" required
                  value={form.hora} onChange={e => setForm({ ...form, hora: e.target.value })}
                />
              </div>
              <select
                className="w-full px-4 py-3 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:border-gold transition-colors text-sm bg-white"
                name="servico" required
                value={form.servico} onChange={e => setForm({ ...form, servico: e.target.value })}
              >
                <option value="">Selecione um serviço</option>
                <option value="Corte">Corte — R$ 30</option>
                <option value="Barba">Barba — R$ 20</option>
                <option value="Corte + Barba">Corte + Barba — R$ 45</option>
              </select>

              {status === 'sucesso' && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm text-center px-4 py-3 rounded-lg">
                  Agendamento realizado com sucesso!
                </div>
              )}
              {status === 'erro' && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm text-center px-4 py-3 rounded-lg">
                  {erroMsg}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gold text-white font-bold py-3.5 rounded-lg hover:bg-gold-hover transition-colors text-xs tracking-[0.15em] uppercase cursor-pointer mt-1"
              >
                Confirmar Agendamento
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── Horários ── */}
      <section id="horarios" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="overflow-hidden rounded-2xl h-72 lg:h-[400px] relative">
            <img
              src="/img/barber-chair.jpg"
              alt="Cadeira de barbeiro"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-stone-900/20 rounded-2xl" />
          </div>
          <div>
            <p className="font-playfair italic text-gold text-sm tracking-wide mb-2">Quando estamos abertos</p>
            <h2 className="font-bebas text-stone-900 text-5xl tracking-wide mb-1">Horários</h2>
            <div className="w-10 h-0.5 bg-gold mb-8" />
            <div className="divide-y divide-stone-200">
              {horarios.map(h => (
                <div key={h.dia} className="flex justify-between items-center py-3.5">
                  <span className={`text-sm font-medium ${h.aberto ? 'text-stone-800' : 'text-stone-400'}`}>
                    {h.dia}
                  </span>
                  <span className={`text-sm font-playfair ${h.aberto ? 'text-gold font-semibold' : 'text-stone-400 line-through'}`}>
                    {h.hora}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Equipe ── */}
      <section id="equipe" className="py-20 px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-playfair italic text-gold text-sm tracking-wide mb-2">Conheça quem cuida de você</p>
            <h2 className="font-bebas text-stone-900 text-5xl tracking-wide">Nossa Equipe</h2>
            <div className="w-10 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6">
            {barbeiros.map(b => (
              <div key={b.nome} className="group text-center">
                <div className="relative overflow-hidden rounded-2xl mb-3 aspect-square">
                  <img
                    src={b.img}
                    alt={b.nome}
                    className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gold/40 transition-all duration-300" />
                </div>
                <h3 className="font-bebas text-stone-900 text-sm tracking-wider">{b.nome}</h3>
                <p className="text-gold text-xs font-playfair italic">{b.role}</p>
                <p className="text-stone-500 text-xs mt-1 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Depoimentos ── */}
      <section className="py-20 px-6 bg-stone-900 text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-playfair italic text-gold text-sm tracking-wide mb-2">O que dizem nossos clientes</p>
            <h2 className="font-bebas text-white text-5xl tracking-wide">Depoimentos</h2>
            <div className="w-10 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {depoimentos.map(d => (
              <div key={d.nome} className="rounded-2xl border border-stone-700 bg-stone-800/50 p-6 hover:border-gold/40 transition-colors">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: d.estrelas }).map((_, i) => (
                    <IconStar key={i} className="w-4 h-4 text-gold" />
                  ))}
                </div>
                <p className="text-stone-300 text-sm leading-relaxed mb-5 italic">"{d.texto}"</p>
                <p className="text-white font-bebas tracking-wide text-base">{d.nome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-stone-950 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <img src="/img/logo.png" alt="BarberShop" className="h-8 opacity-50" />
          <p className="text-stone-600 text-sm font-playfair text-center">
            © 2025 BarberShop. Todos os direitos reservados.
          </p>
          <a href="/admin/login" className="text-stone-700 hover:text-gold text-xs transition-colors">
            Área Administrativa
          </a>
        </div>
      </footer>

    </div>
  )
}
