import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Sobre() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const objetivos = [
    { icon: 'bi-geo-alt-fill', cor: '#3b82f6', bg: 'rgba(59,130,246,0.12)', titulo: 'Foco em Barueri', texto: 'Contribuir para o desenvolvimento sustentável do município de Barueri, facilitando o acesso da população aos pontos de coleta seletiva.' },
    { icon: 'bi-people-fill', cor: '#16a34a', bg: 'rgba(22,163,74,0.12)', titulo: 'Engajamento Comunitário', texto: 'Criar uma rede colaborativa onde cidadãos, empresas e organizações trabalhem juntos para construir um futuro mais sustentável.' },
    { icon: 'bi-graph-up-arrow', cor: '#d97706', bg: 'rgba(217,119,6,0.12)', titulo: 'Impacto Mensurável', texto: 'Aumentar os índices de reciclagem em Barueri, contribuindo para a redução de resíduos em aterros sanitários.' },
    { icon: 'bi-lightbulb-fill', cor: '#7c3aed', bg: 'rgba(124,58,237,0.12)', titulo: 'Inovação Tecnológica', texto: 'Utilizar tecnologia para democratizar o acesso à informação sobre reciclagem, tornando mais fácil encontrar pontos de coleta.' },
  ];

  const acoes = [
    { icon: 'bi-geo-alt', titulo: 'Encontre Pontos', texto: 'Localize pontos de coleta próximos a você' },
    { icon: 'bi-plus-circle', titulo: 'Cadastre Pontos', texto: 'Ajude a expandir nossa rede de coleta' },
    { icon: 'bi-share', titulo: 'Compartilhe', texto: 'Espalhe a consciência ambiental' },
  ];

  return (
    <div className="page-content" style={{ paddingBottom: '2rem' }}>

      {/* Hero */}
      <div className="clay mb-5 animate-fadeInUp" style={{ padding: '4rem 2rem', background: 'rgba(255,255,255,0.7)', position: 'relative', overflow: 'hidden' }}>
        <div className="animate-float" style={{ position: 'absolute', top: '15%', right: '10%', width: '80px', height: '80px', background: 'rgba(74,222,128,0.2)', borderRadius: '50%', border: '2px solid rgba(74,222,128,0.3)' }}></div>
        <div className="animate-float animate-delay-2" style={{ position: 'absolute', bottom: '20%', left: '5%', width: '60px', height: '60px', background: 'rgba(34,197,94,0.15)', borderRadius: '50%' }}></div>
        <div className="text-center position-relative" style={{ zIndex: 2 }}>
          <div className="d-inline-flex align-items-center px-4 py-2 rounded-pill mb-4 animate-fadeInUp"
            style={{ background: 'rgba(74,222,128,0.2)', border: '2px solid rgba(74,222,128,0.4)', boxShadow: '3px 3px 0px rgba(0,0,0,0.08)', fontSize: '0.9rem', fontWeight: 700, color: '#166534' }}>
            <i className="bi bi-people me-2"></i>Quem Somos
          </div>
          <h1 className="animate-fadeInUp animate-delay-1" style={{ fontSize: 'clamp(2.2rem,5vw,3.5rem)', fontWeight: 800, color: '#14532d', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
            Sobre o <span style={{ color: '#16a34a' }}>VerDenovo</span>
          </h1>
          <p className="animate-fadeInUp animate-delay-2" style={{ fontSize: '1.05rem', color: '#3d5a3d', maxWidth: '560px', margin: '0 auto 1.5rem', lineHeight: 1.7 }}>
            Conheça nossa história, missão e compromisso com a sustentabilidade
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap animate-fadeInUp animate-delay-3">
            {[
              { icon: 'bi-mortarboard', label: 'Projeto TCC', color: '#16a34a', bg: 'rgba(22,163,74,0.12)' },
              { icon: 'bi-geo-alt', label: 'Barueri, SP', color: '#2563eb', bg: 'rgba(37,99,235,0.12)' },
              { icon: 'bi-recycle', label: 'Sustentabilidade', color: '#d97706', bg: 'rgba(217,119,6,0.12)' },
            ].map((s, i) => (
              <div key={i} className="clay-sm d-flex align-items-center gap-2 px-4 py-2" style={{ background: s.bg }}>
                <i className={`bi ${s.icon}`} style={{ color: s.color, fontSize: '1rem' }}></i>
                <span style={{ color: s.color, fontWeight: 700, fontSize: '0.88rem' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Nossa Origem */}
      <div className="clay mb-5 animate-fadeInUp animate-delay-1" style={{ overflow: 'hidden', background: 'rgba(255,255,255,0.75)' }}>
        <div style={{ background: 'linear-gradient(135deg, #16a34a, #22c55e)', padding: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '2px solid rgba(255,255,255,0.3)' }}>
          <div style={{ width: '60px', height: '60px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '3px 3px 0px rgba(0,0,0,0.12)', flexShrink: 0 }}>
            <i className="bi bi-book text-white" style={{ fontSize: '1.5rem' }}></i>
          </div>
          <div>
            <h2 className="text-white fw-bold mb-0" style={{ letterSpacing: '-0.02em' }}>Nossa Origem</h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', margin: 0, fontSize: '0.88rem' }}>Como tudo começou</p>
          </div>
        </div>
        <div className="p-4 p-md-5">
          <div className="row align-items-center g-4">
            <div className="col-md-8">
              <p style={{ fontSize: '1.05rem', color: '#14532d', lineHeight: 1.75, marginBottom: '1rem' }}>
                O projeto VerDenovo nasceu como um Trabalho de Conclusão de Curso (TCC) desenvolvido por estudantes comprometidos com a transformação ambiental de nossa comunidade.
              </p>
              <p style={{ color: '#3d5a3d', lineHeight: 1.75, marginBottom: '1rem' }}>
                Durante nossos estudos, identificamos a necessidade urgente de facilitar o acesso da população aos pontos de coleta seletiva e promover a educação ambiental.
              </p>
              <p style={{ color: '#3d5a3d', lineHeight: 1.75, margin: 0 }}>
                O que começou como um projeto acadêmico se transformou em uma iniciativa real de impacto social e ambiental.
              </p>
            </div>
            <div className="col-md-4">
              <div className="clay-sm text-center p-4" style={{ background: 'rgba(220,252,231,0.6)' }}>
                <i className="bi bi-mortarboard" style={{ fontSize: '3.5rem', color: '#16a34a' }}></i>
                <h5 style={{ color: '#14532d', fontWeight: 800, marginTop: '0.75rem', marginBottom: '0.25rem' }}>Projeto Acadêmico</h5>
                <p style={{ color: '#3d5a3d', margin: 0, fontSize: '0.85rem' }}>Transformando conhecimento em ação</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nossos Objetivos */}
      <div className="mb-5">
        <div className="d-flex align-items-center mb-4 animate-slideInLeft">
          <div style={{ width: '46px', height: '46px', background: 'linear-gradient(135deg,#2563eb,#3b82f6)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '1rem', boxShadow: '4px 4px 0px rgba(0,0,0,0.12)', flexShrink: 0 }}>
            <i className="bi bi-bullseye text-white" style={{ fontSize: '1.2rem' }}></i>
          </div>
          <div>
            <h2 style={{ fontWeight: 800, color: '#14532d', margin: 0, letterSpacing: '-0.02em' }}>Nossos Objetivos</h2>
            <small style={{ color: '#6b8f6b' }}>Metas que nos guiam rumo a um futuro sustentável</small>
          </div>
        </div>
        <div className="row g-4">
          {objetivos.map((obj, i) => (
            <div key={i} className={`col-md-6 animate-scaleIn animate-delay-${i + 1}`}>
              <div className="clay hover-lift h-100" style={{ overflow: 'hidden', background: 'rgba(255,255,255,0.75)' }}>
                <div style={{ padding: '1.75rem' }}>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div style={{ width: '50px', height: '50px', background: obj.bg, borderRadius: '14px', border: `2px solid ${obj.cor}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '3px 3px 0px rgba(0,0,0,0.08)' }}>
                      <i className={`bi ${obj.icon}`} style={{ fontSize: '1.3rem', color: obj.cor }}></i>
                    </div>
                    <h5 style={{ fontWeight: 800, color: obj.cor, margin: 0 }}>{obj.titulo}</h5>
                  </div>
                  <p style={{ color: '#3d5a3d', lineHeight: 1.7, margin: 0, fontSize: '0.92rem' }}>{obj.texto}</p>
                </div>
                <div style={{ height: '4px', background: obj.cor }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="clay-dark animate-scaleIn animate-delay-4" style={{ overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.04)', borderRadius: '50%' }}></div>
        <div className="p-5 position-relative text-center">
          <div style={{ width: '70px', height: '70px', background: 'rgba(255,255,255,0.15)', borderRadius: '20px', border: '2px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', boxShadow: '4px 4px 0px rgba(0,0,0,0.15)' }}>
            <i className="bi bi-heart" style={{ fontSize: '2rem', color: '#4ade80' }}></i>
          </div>
          <h3 style={{ fontWeight: 800, color: 'white', fontSize: '2rem', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>Junte-se ao VerDenovo</h3>
          <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '2.5rem' }}>Faça parte desta transformação! Juntos podemos construir um Barueri mais sustentável.</p>
          <div className="row g-4 justify-content-center mb-4">
            {acoes.map((a, i) => (
              <div key={i} className="col-md-4">
                <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '20px', padding: '1.75rem', border: '2px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', transition: 'all 0.3s ease', boxShadow: '3px 3px 0px rgba(0,0,0,0.12)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'translateY(-6px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'none'; }}>
                  <div style={{ width: '48px', height: '48px', background: 'rgba(74,222,128,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', boxShadow: '2px 2px 0px rgba(0,0,0,0.10)' }}>
                    <i className={`bi ${a.icon}`} style={{ fontSize: '1.4rem', color: '#4ade80' }}></i>
                  </div>
                  <h5 style={{ fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>{a.titulo}</h5>
                  <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0, fontSize: '0.88rem' }}>{a.texto}</p>
                </div>
              </div>
            ))}
          </div>
          <Link to="/pontos" className="btn" style={{ background: 'rgba(255,255,255,0.9)', color: '#16a34a', fontWeight: 700, padding: '0.85rem 2.5rem', borderRadius: '16px', border: '2px solid rgba(255,255,255,0.6)', boxShadow: '4px 4px 0px rgba(0,0,0,0.15)', fontSize: '1rem' }}>
            <i className="bi bi-geo-alt me-2"></i>Ver Pontos de Coleta
          </Link>
        </div>
      </div>

    </div>
  );
}

export default Sobre;
