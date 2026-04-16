import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Sobre() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const objetivos = [
    { icon: 'bi-geo-alt-fill', cor: '#3b82f6', bg: 'rgba(59,130,246,0.08)', titulo: 'Foco em Barueri', texto: 'Contribuir para o desenvolvimento sustentável do município de Barueri, facilitando o acesso da população aos pontos de coleta seletiva.' },
    { icon: 'bi-people-fill', cor: '#059669', bg: 'rgba(5,150,105,0.08)', titulo: 'Engajamento Comunitário', texto: 'Criar uma rede colaborativa onde cidadãos, empresas e organizações trabalhem juntos para construir um futuro mais sustentável.' },
    { icon: 'bi-graph-up-arrow', cor: '#f59e0b', bg: 'rgba(245,158,11,0.08)', titulo: 'Impacto Mensurável', texto: 'Aumentar os índices de reciclagem em Barueri, contribuindo para a redução de resíduos em aterros sanitários.' },
    { icon: 'bi-lightbulb-fill', cor: '#a855f7', bg: 'rgba(168,85,247,0.08)', titulo: 'Inovação Tecnológica', texto: 'Utilizar tecnologia para democratizar o acesso à informação sobre reciclagem, tornando mais fácil encontrar pontos de coleta.' },
  ];

  const acoes = [
    { icon: 'bi-geo-alt', titulo: 'Encontre Pontos', texto: 'Localize pontos de coleta próximos a você', delay: 1 },
    { icon: 'bi-plus-circle', titulo: 'Cadastre Pontos', texto: 'Ajude a expandir nossa rede de coleta', delay: 2 },
    { icon: 'bi-share', titulo: 'Compartilhe', texto: 'Espalhe a consciência ambiental', delay: 3 },
  ];

  return (
    <div>
      {/* Hero */}
      <div className="mb-5 position-relative overflow-hidden" style={{ minHeight: '50vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)', borderRadius: '25px', padding: '4rem 2rem' }}>
        <div className="position-absolute animate-float" style={{ top: '15%', right: '10%', width: '80px', height: '80px', background: 'rgba(5,150,105,0.1)', borderRadius: '50%' }}></div>
        <div className="position-absolute animate-float animate-delay-2" style={{ bottom: '20%', left: '5%', width: '60px', height: '60px', background: 'rgba(16,185,129,0.1)', borderRadius: '50%' }}></div>
        <div className="position-absolute animate-rotate" style={{ top: '30%', left: '15%', width: '40px', height: '40px', background: 'rgba(34,197,94,0.08)', borderRadius: '50%' }}></div>
        <div className="text-center position-relative" style={{ zIndex: 2 }}>
          <div className="d-inline-flex align-items-center bg-success bg-opacity-10 text-success px-4 py-2 rounded-pill mb-4 animate-fadeInUp" style={{ fontSize: '0.95rem', fontWeight: '600' }}>
            <i className="bi bi-people me-2"></i>Quem Somos
          </div>
          <h1 className="display-3 fw-bold mb-4 animate-fadeInUp animate-delay-1" style={{ lineHeight: '1.1', color: '#1e293b', letterSpacing: '-0.02em' }}>
            Sobre o <span style={{ color: '#059669' }}>VerDenovo</span>
          </h1>
          <p className="fs-4 mb-4 text-muted animate-fadeInUp animate-delay-2" style={{ lineHeight: '1.6', maxWidth: '600px', margin: '0 auto' }}>
            Conheça nossa história, missão e compromisso com a sustentabilidade
          </p>
          <div className="d-flex justify-content-center gap-4 flex-wrap animate-fadeInUp animate-delay-3">
            {[
              { icon: 'bi-mortarboard', label: 'Projeto TCC', color: '#059669', bg: 'rgba(5,150,105,0.1)' },
              { icon: 'bi-geo-alt', label: 'Barueri, SP', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
              { icon: 'bi-recycle', label: 'Sustentabilidade', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
            ].map((s, i) => (
              <div key={i} className="d-flex align-items-center gap-2 px-4 py-2 rounded-pill" style={{ background: s.bg }}>
                <i className={`bi ${s.icon}`} style={{ color: s.color, fontSize: '1.1rem' }}></i>
                <span style={{ color: s.color, fontWeight: '600', fontSize: '0.95rem' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Nossa Origem */}
      <div className="modern-card mb-5 animate-fadeInUp animate-delay-1" style={{ border: 'none', overflow: 'hidden' }}>
        <div className="d-flex align-items-center p-4 p-md-5" style={{ background: '#059669', borderRadius: '25px 25px 0 0' }}>
          <div className="d-flex align-items-center justify-content-center me-4 flex-shrink-0" style={{ width: '70px', height: '70px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', border: '3px solid rgba(255,255,255,0.3)' }}>
            <i className="bi bi-book text-white" style={{ fontSize: '2rem' }}></i>
          </div>
          <div>
            <h2 className="text-white fw-bold mb-1">Nossa Origem</h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', margin: 0 }}>Como tudo começou</p>
          </div>
        </div>
        <div className="p-4 p-md-5">
          <div className="row align-items-center g-4">
            <div className="col-md-8">
              <p className="fs-5 mb-4" style={{ color: '#1f2937', lineHeight: '1.7' }}>
                O projeto VerDenovo nasceu como um Trabalho de Conclusão de Curso (TCC) desenvolvido por estudantes comprometidos com a transformação ambiental de nossa comunidade.
              </p>
              <p className="mb-4 text-muted" style={{ lineHeight: '1.7' }}>
                Durante nossos estudos, identificamos a necessidade urgente de facilitar o acesso da população aos pontos de coleta seletiva e promover a educação ambiental. Assim surgiu a ideia de criar uma plataforma digital que conectasse pessoas, empresas e pontos de reciclagem de forma simples e eficiente.
              </p>
              <p className="mb-0 text-muted" style={{ lineHeight: '1.7' }}>
                O que começou como um projeto acadêmico se transformou em uma iniciativa real de impacto social e ambiental, demonstrando como a educação pode gerar soluções práticas para problemas do mundo real.
              </p>
            </div>
            <div className="col-md-4">
              <div className="text-center p-4 rounded-4" style={{ background: 'rgba(5,150,105,0.05)', border: '2px solid rgba(5,150,105,0.1)' }}>
                <i className="bi bi-mortarboard animate-pulse" style={{ fontSize: '4rem', color: '#059669' }}></i>
                <h5 className="text-success mt-3 fw-bold">Projeto Acadêmico</h5>
                <p className="text-muted mb-0 small">Transformando conhecimento em ação</p>
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: '4px', background: '#059669' }}></div>
      </div>

      {/* Nossos Objetivos */}
      <div className="mb-5">
        <div className="d-flex align-items-center mb-4 animate-slideInLeft">
          <div className="d-flex align-items-center justify-content-center me-3" style={{ width: '48px', height: '48px', background: '#3b82f6', borderRadius: '14px', boxShadow: '0 8px 20px rgba(59,130,246,0.3)' }}>
            <i className="bi bi-bullseye text-white" style={{ fontSize: '1.3rem' }}></i>
          </div>
          <div>
            <h2 className="fw-bold mb-0" style={{ color: '#1e293b' }}>Nossos Objetivos</h2>
            <small className="text-muted">Metas que nos guiam rumo a um futuro sustentável</small>
          </div>
        </div>
        <div className="row g-4">
          {objetivos.map((obj, i) => (
            <div key={i} className={`col-md-6 animate-scaleIn animate-delay-${i + 1}`}>
              <div className="modern-card interactive-card h-100" style={{ border: 'none', overflow: 'hidden' }}>
                <div className="p-4">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '52px', height: '52px', background: obj.bg, borderRadius: '14px' }}>
                      <i className={`bi ${obj.icon}`} style={{ fontSize: '1.4rem', color: obj.cor }}></i>
                    </div>
                    <h5 className="fw-bold mb-0" style={{ color: obj.cor }}>{obj.titulo}</h5>
                  </div>
                  <p className="text-muted mb-0" style={{ lineHeight: '1.7', paddingLeft: '4px' }}>{obj.texto}</p>
                </div>
                <div style={{ height: '4px', background: obj.cor }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="modern-card animate-scaleIn animate-delay-4" style={{ background: 'linear-gradient(135deg, #059669, #10b981)', overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', bottom: '-60px', left: '-30px', width: '250px', height: '250px', background: 'rgba(255,255,255,0.04)', borderRadius: '50%' }}></div>
        <div className="p-5 position-relative text-center">
          <div className="d-inline-flex align-items-center justify-content-center animate-pulse mb-3" style={{ width: '70px', height: '70px', background: 'rgba(255,255,255,0.2)', borderRadius: '20px', boxShadow: '0 8px 25px rgba(0,0,0,0.15)' }}>
            <i className="bi bi-heart" style={{ fontSize: '2rem', color: 'white' }}></i>
          </div>
          <h3 className="fw-bold text-white mb-1" style={{ fontSize: '2rem' }}>Junte-se ao VerDenovo</h3>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem', marginBottom: '2.5rem' }}>Faça parte desta transformação! Juntos podemos construir um Barueri mais sustentável.</p>
          <div className="row g-4 justify-content-center">
            {acoes.map((a, i) => (
              <div key={i} className={`col-md-4 animate-fadeInUp animate-delay-${a.delay}`}>
                <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '20px', padding: '2rem', border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(10px)', transition: 'all 0.3s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; e.currentTarget.style.transform = 'translateY(-6px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '52px', height: '52px', background: 'rgba(255,255,255,0.2)', borderRadius: '14px' }}>
                      <i className={`bi ${a.icon}`} style={{ fontSize: '1.5rem', color: 'white' }}></i>
                    </div>
                    <h5 className="fw-bold mb-0 text-white">{a.titulo}</h5>
                  </div>
                  <p className="mb-0" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem' }}>{a.texto}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link to="/pontos" className="btn fw-bold px-5 py-3" style={{ background: 'white', color: '#059669', borderRadius: '14px', border: 'none', fontSize: '1rem', boxShadow: '0 8px 25px rgba(0,0,0,0.15)' }}>
              <i className="bi bi-geo-alt me-2"></i>Ver Pontos de Coleta
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sobre;
