import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CORES = [
  { cor: '#3b82f6', nome: 'Azul', material: 'Papel e Papelão', exemplos: ['Jornais', 'Revistas', 'Papelão', 'Caixas'], icone: 'bi-file-text' },
  { cor: '#ef4444', nome: 'Vermelho', material: 'Plástico', exemplos: ['Garrafas PET', 'Embalagens', 'Sacolas', 'Potes'], icone: 'bi-cup-straw' },
  { cor: '#059669', nome: 'Verde', material: 'Vidro', exemplos: ['Garrafas', 'Potes', 'Frascos', 'Copos'], icone: 'bi-cup' },
  { cor: '#f59e0b', nome: 'Amarelo', material: 'Metal', exemplos: ['Latas de alumínio', 'Latas de aço', 'Tampas', 'Arames'], icone: 'bi-gear' },
  { cor: '#64748b', nome: 'Cinza', material: 'Rejeito', exemplos: ['Papel higiênico', 'Fraldas', 'Cigarro', 'Cerâmica'], icone: 'bi-trash' },
  { cor: '#f97316', nome: 'Laranja', material: 'Resíduos Perigosos', exemplos: ['Pilhas', 'Baterias', 'Eletrônicos', 'Lâmpadas'], icone: 'bi-exclamation-triangle' },
];

const BANCO_QUIZ = [
  { pergunta: 'Onde jogar uma garrafa PET?', opcoes: ['Azul', 'Vermelho', 'Verde', 'Amarelo'], correta: 1 },
  { pergunta: 'Onde descartar uma lata de refrigerante?', opcoes: ['Vermelho', 'Verde', 'Amarelo', 'Cinza'], correta: 2 },
  { pergunta: 'Onde vai uma garrafa de vidro?', opcoes: ['Azul', 'Verde', 'Vermelho', 'Amarelo'], correta: 1 },
  { pergunta: 'Onde jogar papel de jornal?', opcoes: ['Cinza', 'Vermelho', 'Azul', 'Verde'], correta: 2 },
  { pergunta: 'Onde vai uma lata de alumínio amassada?', opcoes: ['Cinza', 'Amarelo', 'Laranja', 'Azul'], correta: 1 },
  { pergunta: 'Onde vai uma caixa de papelão?', opcoes: ['Azul', 'Vermelho', 'Cinza', 'Verde'], correta: 0 },
  { pergunta: 'Onde descartar restos de comida?', opcoes: ['Verde', 'Cinza', 'Azul', 'Laranja'], correta: 1 },
  { pergunta: 'Onde descartar um pote de geleia vazio?', opcoes: ['Cinza', 'Amarelo', 'Azul', 'Verde'], correta: 3 },
  { pergunta: 'Onde vai uma revista velha?', opcoes: ['Amarelo', 'Laranja', 'Cinza', 'Azul'], correta: 3 },
  { pergunta: 'Onde descartar um pote de iogurte plástico?', opcoes: ['Azul', 'Vermelho', 'Verde', 'Cinza'], correta: 1 },
  { pergunta: 'Onde vai um copo de vidro quebrado limpo?', opcoes: ['Verde', 'Cinza', 'Azul', 'Laranja'], correta: 0 },
  { pergunta: 'Onde descartar uma embalagem de shampoo?', opcoes: ['Cinza', 'Amarelo', 'Vermelho', 'Azul'], correta: 2 },
];

const RODADA_SIZE = 6;

function sortearPerguntas() {
  return [...BANCO_QUIZ].sort(() => Math.random() - 0.5).slice(0, RODADA_SIZE);
}

function getMensagem(acertos) {
  if (acertos <= 2) return 'Vale revisar sobre reciclagem ♻️';
  if (acertos <= 4) return 'Bom trabalho! 👍';
  return 'Mandou muito bem! 🎉';
}

function QuizCard() {
  const [perguntas, setPerguntas] = useState(() => sortearPerguntas());
  const [idx, setIdx] = useState(0);
  const [selecionado, setSelecionado] = useState(null);
  const [acertos, setAcertos] = useState(0);
  const [fim, setFim] = useState(false);

  const responder = (i) => {
    if (selecionado !== null) return;
    setSelecionado(i);
    if (i === perguntas[idx].correta) setAcertos(a => a + 1);
  };

  const avancar = () => {
    if (idx + 1 >= perguntas.length) setFim(true);
    else { setIdx(i => i + 1); setSelecionado(null); }
  };

  const reiniciar = () => {
    setPerguntas(sortearPerguntas());
    setIdx(0);
    setSelecionado(null);
    setAcertos(0);
    setFim(false);
  };

  if (fim) return (
    <div className="text-center py-4">
      <div className="d-inline-flex align-items-center justify-content-center mb-3"
        style={{ width: '70px', height: '70px', background: 'linear-gradient(135deg, #059669, #10b981)', borderRadius: '20px' }}>
        <i className="bi bi-trophy text-white" style={{ fontSize: '2rem' }}></i>
      </div>
      <h4 className="fw-bold mt-2" style={{ color: '#059669' }}>Você acertou {acertos} de {RODADA_SIZE}!</h4>
      <p className="text-muted">{getMensagem(acertos)}</p>
      <button className="btn btn-success" onClick={reiniciar} style={{ borderRadius: '12px' }}>Tentar novamente</button>
    </div>
  );

  const q = perguntas[idx];
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted small">Pergunta {idx + 1} de {RODADA_SIZE}</span>
        <span className="badge bg-success">{acertos} acerto{acertos !== 1 ? 's' : ''}</span>
      </div>
      <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '2px', marginBottom: '1.5rem' }}>
        <div style={{ height: '100%', width: `${(idx / RODADA_SIZE) * 100}%`, background: 'linear-gradient(135deg, #059669, #10b981)', borderRadius: '2px', transition: 'width 0.3s' }} />
      </div>
      <h5 className="fw-bold mb-4" style={{ color: '#1e293b' }}>{q.pergunta}</h5>
      <div className="row g-2">
        {q.opcoes.map((op, i) => {
          const corLixeira = CORES.find(c => c.nome === op);
          let bg = '#f8fafc', shadow = 'inset 0 0 0 2px #e2e8f0', textColor = '#1e293b';
          if (selecionado !== null) {
            if (i === q.correta) { bg = 'rgba(5,150,105,0.1)'; shadow = 'inset 0 0 0 2px #059669'; textColor = '#059669'; }
            else if (i === selecionado) { bg = 'rgba(239,68,68,0.1)'; shadow = 'inset 0 0 0 2px #ef4444'; textColor = '#ef4444'; }
          }
          return (
            <div key={i} className="col-6">
              <button onClick={() => responder(i)}
                style={{ width: '100%', height: '48px', padding: '0 12px', borderRadius: '8px', fontWeight: '600', background: bg, border: 'none', outline: 'none', boxShadow: shadow, color: textColor, cursor: selecionado !== null ? 'default' : 'pointer', transition: 'background 0.2s, color 0.2s, box-shadow 0.2s', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                {corLixeira && <span style={{ display: 'inline-block', width: '12px', height: '12px', background: corLixeira.cor, borderRadius: '50%', marginRight: '8px' }} />}
                {op}
              </button>
            </div>
          );
        })}
      </div>
      {selecionado !== null && (
        <button onClick={avancar} className="btn btn-success w-100 mt-3 fw-bold" style={{ borderRadius: '12px' }}>
          {idx + 1 >= perguntas.length ? 'Ver resultado' : 'Próxima pergunta'}
        </button>
      )}
    </div>
  );
}

function Conscientizacao() {
  const navigate = useNavigate();
  return (
    <div>

      {/* HERO */}
      <div className="mb-5 position-relative overflow-hidden" style={{ minHeight: '50vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)', borderRadius: '25px', padding: '4rem 2rem' }}>
        <div className="position-absolute animate-float" style={{ top: '15%', right: '10%', width: '80px', height: '80px', background: 'rgba(5,150,105,0.1)', borderRadius: '50%' }}></div>
        <div className="position-absolute animate-float animate-delay-2" style={{ bottom: '20%', left: '5%', width: '60px', height: '60px', background: 'rgba(16,185,129,0.1)', borderRadius: '50%' }}></div>
        <div className="position-absolute animate-rotate" style={{ top: '30%', left: '15%', width: '40px', height: '40px', background: 'rgba(34,197,94,0.08)', borderRadius: '50%' }}></div>
        <div className="text-center position-relative" style={{ zIndex: 2 }}>
          <div className="d-inline-flex align-items-center bg-success bg-opacity-10 text-success px-4 py-2 rounded-pill mb-4 animate-fadeInUp" style={{ fontSize: '0.95rem', fontWeight: '600' }}>
            <i className="bi bi-leaf me-2"></i>Educação Ambiental
          </div>
          <h1 className="display-3 fw-bold mb-4 animate-fadeInUp animate-delay-1" style={{ lineHeight: '1.1', color: '#1e293b', letterSpacing: '-0.02em' }}>
            Conscientização <span style={{ color: '#059669' }}>Ambiental</span>
          </h1>
          <p className="fs-4 mb-4 text-muted animate-fadeInUp animate-delay-2" style={{ lineHeight: '1.6', maxWidth: '600px', margin: '0 auto' }}>
            Entenda o impacto dos seus hábitos e aprenda como fazer a diferença todos os dias.
          </p>
          <div className="d-flex justify-content-center gap-4 flex-wrap animate-fadeInUp animate-delay-3">
            {[
              { icon: 'bi-recycle', label: 'Reciclagem', color: '#059669', bg: 'rgba(5,150,105,0.1)' },
              { icon: 'bi-palette', label: 'Guia de Cores', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
              { icon: 'bi-lightbulb', label: 'Quiz', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
              { icon: 'bi-star', label: 'Dicas', color: '#a855f7', bg: 'rgba(168,85,247,0.1)' },
            ].map((s, i) => (
              <div key={i} className="d-flex align-items-center gap-2 px-4 py-2 rounded-pill" style={{ background: s.bg }}>
                <i className={`bi ${s.icon}`} style={{ color: s.color, fontSize: '1.1rem' }}></i>
                <span style={{ color: s.color, fontWeight: '600', fontSize: '0.95rem' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DADOS IMPACTO */}
      <div className="mb-5">
        <div className="d-flex align-items-center mb-4 animate-slideInLeft">
          <div className="d-flex align-items-center justify-content-center me-3" style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #ef4444, #f97316)', borderRadius: '14px', boxShadow: '0 8px 20px rgba(239,68,68,0.3)' }}>
            <i className="bi bi-bar-chart-fill text-white" style={{ fontSize: '1.3rem' }}></i>
          </div>
          <div>
            <h2 className="fw-bold mb-0" style={{ color: '#1e293b' }}>Impacto Ambiental</h2>
            <small className="text-muted">Dados reais sobre resíduos no Brasil</small>
          </div>
        </div>
        <div className="row g-4">
          {[
            { icon: 'bi-trash', numero: '79M', unidade: 'ton/ano', desc: 'de resíduos produzidos no Brasil', cor: '#ef4444', bg: 'rgba(239,68,68,0.08)' },
            { icon: 'bi-recycle', numero: '4%', unidade: 'apenas', desc: 'do lixo brasileiro é reciclado', cor: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
            { icon: 'bi-water', numero: '8M', unidade: 'ton/ano', desc: 'de plástico vão para os oceanos', cor: '#3b82f6', bg: 'rgba(59,130,246,0.08)' },
            { icon: 'bi-hourglass-split', numero: '400', unidade: 'anos', desc: 'para um plástico se decompor', cor: '#8b5cf6', bg: 'rgba(139,92,246,0.08)' },
          ].map((item, i) => (
            <div key={i} className={`col-6 col-md-3 animate-scaleIn animate-delay-${i + 1}`}>
              <div className="modern-card interactive-card h-100 text-center" style={{ border: 'none', overflow: 'hidden' }}>
                <div className="p-4">
                  <div className="d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '56px', height: '56px', background: item.bg, borderRadius: '16px' }}>
                    <i className={`bi ${item.icon}`} style={{ fontSize: '1.5rem', color: item.cor }}></i>
                  </div>
                  <div className="fw-bold" style={{ fontSize: '2rem', color: item.cor, lineHeight: 1 }}>{item.numero}</div>
                  <div className="text-muted small fw-semibold mb-1">{item.unidade}</div>
                  <div className="text-muted" style={{ fontSize: '0.82rem', lineHeight: '1.4' }}>{item.desc}</div>
                </div>
                <div style={{ height: '4px', background: item.cor }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* OS 3 Rs */}
      <div className="mb-5">
        <div className="d-flex align-items-center mb-4 animate-slideInLeft">
          <div className="d-flex align-items-center justify-content-center me-3" style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #059669, #10b981)', borderRadius: '14px', boxShadow: '0 8px 20px rgba(5,150,105,0.3)' }}>
            <i className="bi bi-arrow-repeat text-white" style={{ fontSize: '1.3rem' }}></i>
          </div>
          <div>
            <h2 className="fw-bold mb-0" style={{ color: '#1e293b' }}>Os 3 Rs da Sustentabilidade</h2>
            <small className="text-muted">A hierarquia correta para reduzir o impacto ambiental</small>
          </div>
        </div>
        <div className="row g-4">
          {[
            { icon: 'bi-graph-down-arrow', titulo: '1. Reduzir', cor: '#059669', sombra: 'rgba(5,150,105,0.3)', desc: 'O melhor resíduo é o que não existe. Compre apenas o necessário, evite embalagens desnecessárias e prefira produtos duráveis.', dicas: ['Leve sacola reutilizável', 'Evite produtos descartáveis', 'Compre a granel quando possível'] },
            { icon: 'bi-arrow-clockwise', titulo: '2. Reutilizar', cor: '#3b82f6', sombra: 'rgba(59,130,246,0.3)', desc: 'Antes de descartar, pense em como dar uma nova vida ao objeto. Criatividade e economia andam juntas.', dicas: ['Potes de vidro como porta-temperos', 'Garrafas PET como vasos', 'Caixas de papelão como organizadores'] },
            { icon: 'bi-recycle', titulo: '3. Reciclar', cor: '#f59e0b', sombra: 'rgba(245,158,11,0.3)', desc: 'Quando não for possível reduzir ou reutilizar, recicle. Separe corretamente e leve ao ponto de coleta mais próximo.', dicas: ['Separe o lixo em casa', 'Limpe as embalagens antes', 'Use os pontos de coleta'] },
          ].map((r, i) => (
            <div key={i} className={`col-md-4 animate-scaleIn animate-delay-${i + 1}`}>
              <div className="modern-card interactive-card h-100" style={{ border: 'none', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div className="d-flex align-items-center justify-content-center" style={{ height: '140px', background: r.cor }}>
                  <div className="d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', border: '4px solid rgba(255,255,255,0.3)', boxShadow: `0 10px 30px ${r.sombra}` }}>
                    <i className={`bi ${r.icon}`} style={{ fontSize: '2.5rem', color: 'white' }}></i>
                  </div>
                </div>
                <div className="p-4" style={{ flex: 1 }}>
                  <h4 className="fw-bold mb-2" style={{ color: r.cor }}>{r.titulo}</h4>
                  <p className="text-muted mb-3" style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>{r.desc}</p>
                  {r.dicas.map((d, j) => (
                    <div key={j} className="d-flex align-items-center gap-3 mb-2">
                      <div className="d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '24px', height: '24px', background: `${r.cor}15`, borderRadius: '50%' }}>
                        <i className="bi bi-check" style={{ fontSize: '0.8rem', color: r.cor }}></i>
                      </div>
                      <span className="text-muted small">{d}</span>
                    </div>
                  ))}
                </div>
                <div style={{ height: '4px', background: r.cor }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GUIA DE CORES */}
      <div className="mb-5">
        <div className="d-flex align-items-center mb-4 animate-slideInLeft">
          <div className="d-flex align-items-center justify-content-center me-3" style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #3b82f6, #6366f1)', borderRadius: '14px', boxShadow: '0 8px 20px rgba(59,130,246,0.3)' }}>
            <i className="bi bi-palette text-white" style={{ fontSize: '1.3rem' }}></i>
          </div>
          <div>
            <h2 className="fw-bold mb-0" style={{ color: '#1e293b' }}>Guia das Cores das Lixeiras</h2>
            <small className="text-muted">Descarte correto começa com conhecer as cores</small>
          </div>
        </div>
        <div className="row g-4">
          {CORES.map((c, i) => (
            <div key={i} className={`col-md-4 animate-scaleIn animate-delay-${(i % 4) + 1}`}>
              <div className="h-100" style={{
                background: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
                border: `1px solid ${c.cor}20`,
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                display: 'flex',
                flexDirection: 'column',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = `0 16px 40px ${c.cor}30`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.07)'; }}>

                {/* Topo com gradiente suave */}
                <div style={{ background: `linear-gradient(135deg, ${c.cor}22 0%, ${c.cor}10 100%)`, padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '56px', height: '56px', background: c.cor, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 20px ${c.cor}50`, flexShrink: 0 }}>
                    <i className={`bi ${c.icone}`} style={{ fontSize: '1.6rem', color: 'white' }}></i>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', fontWeight: '700', letterSpacing: '1.5px', color: c.cor, textTransform: 'uppercase', marginBottom: '2px' }}>Lixeira {c.nome}</div>
                    <h6 className="fw-bold mb-0" style={{ color: '#1e293b', fontSize: '1rem' }}>{c.material}</h6>
                  </div>
                </div>

                {/* Divisor */}
                <div style={{ height: '1px', background: `${c.cor}15`, margin: '0 1.25rem' }}></div>

                {/* Chips */}
                <div style={{ padding: '1.25rem', flex: 1 }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: '600', color: '#94a3b8', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Exemplos</div>
                  <div className="d-flex flex-wrap gap-2">
                    {c.exemplos.map((e, j) => (
                      <span key={j} style={{
                        background: `${c.cor}12`,
                        color: c.cor,
                        padding: '5px 12px',
                        borderRadius: '100px',
                        fontSize: '0.78rem',
                        fontWeight: '600',
                        border: `1px solid ${c.cor}25`,
                        letterSpacing: '0.2px',
                      }}>{e}</span>
                    ))}
                  </div>
                </div>

                {/* Barra inferior */}
                <div style={{ height: '5px', background: `linear-gradient(90deg, ${c.cor}, ${c.cor}60)`, borderRadius: '0 0 20px 20px' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* QUIZ */}
      <div className="mb-5">
        <div className="d-flex align-items-center mb-4 animate-slideInLeft">
          <div className="d-flex align-items-center justify-content-center me-3" style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #059669, #10b981)', borderRadius: '14px', boxShadow: '0 8px 20px rgba(5,150,105,0.3)' }}>
            <i className="bi bi-lightbulb text-white" style={{ fontSize: '1.3rem' }}></i>
          </div>
          <div>
            <h2 className="fw-bold mb-0" style={{ color: '#1e293b' }}>Quiz de Reciclagem</h2>
            <small className="text-muted">Teste seus conhecimentos!</small>
          </div>
        </div>
        <div className="row g-4">
          <div className="col-md-6 animate-scaleIn animate-delay-1">
            <div className="modern-card h-100" style={{ border: 'none', overflow: 'hidden' }}>
              <div className="p-4" style={{ background: 'linear-gradient(135deg, #059669, #10b981)', borderRadius: '25px 25px 0 0' }}>
                <div className="d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', background: 'rgba(255,255,255,0.2)', borderRadius: '14px' }}>
                    <i className="bi bi-lightbulb text-white" style={{ fontSize: '1.3rem' }}></i>
                  </div>
                  <div>
                    <h5 className="text-white fw-bold mb-0">Quiz de Reciclagem</h5>
                    <small style={{ color: 'rgba(255,255,255,0.75)' }}>Teste seus conhecimentos!</small>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <QuizCard />
              </div>
            </div>
          </div>
          <div className="col-md-6 animate-scaleIn animate-delay-2">
            <div className="modern-card h-100" style={{ border: 'none', overflow: 'hidden', background: 'linear-gradient(135deg, #059669, #10b981)' }}>
              <div className="p-4 p-md-5 h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-3" style={{ background: 'rgba(255,255,255,0.15)' }}>
                    <i className="bi bi-play-circle text-white" style={{ fontSize: '0.9rem' }}></i>
                    <small className="text-white fw-bold">Vídeo Educativo</small>
                  </div>
                  <h3 className="text-white fw-bold mb-3" style={{ fontSize: '1.6rem' }}>Aprenda sobre Reciclagem</h3>
                  <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: '1.7', fontSize: '0.95rem' }}>
                    Assista a um vídeo educativo e entenda de forma prática como a reciclagem funciona e qual o impacto real das suas escolhas no dia a dia.
                  </p>
                  <blockquote style={{ color: 'rgba(255,255,255,0.75)', borderLeft: '3px solid rgba(255,255,255,0.3)', paddingLeft: '1rem', fontSize: '0.9rem', fontStyle: 'italic', marginTop: '1rem' }}>
                    "A Terra fornece o suficiente para satisfazer as necessidades de cada homem, mas não a ganância de cada homem." — Gandhi
                  </blockquote>
                </div>
                <button onClick={() => window.open('https://www.tiktok.com/@haileydollie/video/7463768126761504005', '_blank')}
                  className="btn fw-bold mt-4 w-100"
                  style={{ background: 'white', color: '#059669', borderRadius: '14px', border: 'none', padding: '0.85rem', fontSize: '1rem', boxShadow: '0 8px 25px rgba(0,0,0,0.15)' }}>
                  <i className="bi bi-play-fill me-2"></i>Assistir Agora
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BENEFICIOS */}
      <div className="mb-5">
        <div className="d-flex align-items-center mb-4 animate-slideInLeft">
          <div className="d-flex align-items-center justify-content-center me-3" style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #059669, #10b981)', borderRadius: '14px', boxShadow: '0 8px 20px rgba(5,150,105,0.3)' }}>
            <i className="bi bi-recycle text-white" style={{ fontSize: '1.3rem' }}></i>
          </div>
          <div>
            <h2 className="fw-bold mb-0" style={{ color: '#1e293b' }}>Benefícios da Reciclagem</h2>
            <small className="text-muted">Impactos reais de pequenas ações cotidianas</small>
          </div>
        </div>
        <div className="row g-4">
          {[
            { icon: 'bi-tree', cor: '#059669', bg: 'rgba(5,150,105,0.08)', titulo: 'Preserva Recursos Naturais', texto: '1 tonelada de papel reciclado evita o corte de 17 árvores e economiza 26.000 litros de água.' },
            { icon: 'bi-lightning-charge', cor: '#f59e0b', bg: 'rgba(245,158,11,0.08)', titulo: 'Economiza Energia', texto: 'Reciclar alumínio consome 95% menos energia do que produzir a partir do minério bruto.' },
            { icon: 'bi-wind', cor: '#0ea5e9', bg: 'rgba(14,165,233,0.08)', titulo: 'Reduz Poluição', texto: 'Cada tonelada de plástico reciclado evita a emissão de 2 toneladas de CO₂ na atmosfera.' },
            { icon: 'bi-briefcase', cor: '#8b5cf6', bg: 'rgba(139,92,246,0.08)', titulo: 'Gera Empregos', texto: 'A reciclagem pode gerar mais de 1 milhão de empregos no Brasil, movimentando toda a cadeia produtiva.' },
          ].map((item, i) => (
            <div key={i} className={`col-md-6 animate-scaleIn animate-delay-${i + 1}`}>
              <div className="modern-card interactive-card h-100" style={{ border: 'none', overflow: 'hidden' }}>
                <div className="d-flex gap-3 p-4">
                  <div className="d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '52px', height: '52px', background: item.bg, borderRadius: '14px' }}>
                    <i className={`bi ${item.icon}`} style={{ fontSize: '1.4rem', color: item.cor }}></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1" style={{ color: item.cor }}>{item.titulo}</h6>
                    <p className="text-muted mb-0 small" style={{ lineHeight: '1.6' }}>{item.texto}</p>
                  </div>
                </div>
                <div style={{ height: '4px', background: item.cor }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA FINAL */}
      <div className="modern-card animate-scaleIn animate-delay-4" style={{ background: 'linear-gradient(135deg, #059669, #10b981)', overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', bottom: '-60px', left: '-30px', width: '250px', height: '250px', background: 'rgba(255,255,255,0.04)', borderRadius: '50%' }}></div>
        <div className="p-5 position-relative text-center">
          <div className="d-inline-flex align-items-center justify-content-center animate-pulse mb-3" style={{ width: '70px', height: '70px', background: 'rgba(255,255,255,0.2)', borderRadius: '20px', boxShadow: '0 8px 25px rgba(0,0,0,0.15)' }}>
            <i className="bi bi-heart" style={{ fontSize: '2rem', color: 'white' }}></i>
          </div>
          <h3 className="fw-bold text-white mb-1" style={{ fontSize: '2rem' }}>Pronto para fazer a diferença?</h3>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem', marginBottom: '2.5rem' }}>Encontre o ponto de coleta mais próximo e comece a reciclar hoje mesmo. Cada gesto conta!</p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <button onClick={() => navigate('/pontos')} className="btn fw-bold px-5 py-3"
              style={{ background: 'white', color: '#059669', borderRadius: '14px', border: 'none', fontSize: '1rem', boxShadow: '0 8px 25px rgba(0,0,0,0.15)' }}>
              <i className="bi bi-geo-alt me-2"></i>Ver Pontos de Coleta
            </button>
            <button onClick={() => navigate('/cadastrar')} className="btn fw-bold px-5 py-3"
              style={{ background: 'rgba(255,255,255,0.15)', color: 'white', borderRadius: '14px', border: '2px solid rgba(255,255,255,0.4)', fontSize: '1rem' }}>
              <i className="bi bi-plus-circle me-2"></i>Cadastrar Ponto
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Conscientizacao;
