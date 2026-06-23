import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Home() {
  const { mostrarMensagemLogout, usuario, isLogado } = useAuth();

  const botaoSecundario = () => {
    if (!isLogado()) return (
      <Link to="/cadastro-usuario" className="btn btn-outline-success btn-lg px-5">
        <i className="bi bi-person-plus me-2"></i>Criar Conta
      </Link>
    );
    if (usuario?.pontoVinculado) return (
      <Link to="/personalizar-ponto" className="btn btn-outline-success btn-lg px-5">
        <i className="bi bi-gear me-2"></i>Gerenciar Meu Ponto
      </Link>
    );
    if (usuario?.tipo === 'usuario') return (
      <Link to="/cadastrar" className="btn btn-outline-success btn-lg px-5">
        <i className="bi bi-plus-circle me-2"></i>Cadastrar Ponto
      </Link>
    );
    return null;
  };

  return (
    <div className="page-content">
      {/* Toast logout */}
      {mostrarMensagemLogout && (
        <div style={{
          position: 'fixed', top: '88px', right: '20px', zIndex: 9999,
          background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)',
          borderRadius: '18px', padding: '1rem 1.5rem',
          border: '2px solid rgba(74,222,128,0.5)',
          boxShadow: '5px 5px 0px rgba(0,0,0,0.10), 0 12px 32px rgba(34,197,94,0.2)',
          animation: 'fadeInUp 0.5s ease-out',
          display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          <i className="bi bi-check-circle-fill" style={{ color: '#16a34a', fontSize: '1.2rem' }}></i>
          <span style={{ fontWeight: 600, color: '#166534' }}>Logout realizado com sucesso!</span>
        </div>
      )}

      <div className="container" style={{ paddingBottom: '3rem' }}>

        {/* Hero */}
        <div className="clay animate-fadeInUp mb-5" style={{
          padding: '4rem 2.5rem',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.75) 0%, rgba(220,252,231,0.7) 100%)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Orbs decorativos */}
          <div className="animate-float" style={{ position: 'absolute', top: '10%', right: '8%', width: '90px', height: '90px', background: 'rgba(74,222,128,0.2)', borderRadius: '50%', border: '2px solid rgba(74,222,128,0.3)' }} />
          <div className="animate-float animate-delay-2" style={{ position: 'absolute', bottom: '15%', left: '4%', width: '60px', height: '60px', background: 'rgba(34,197,94,0.15)', borderRadius: '50%', border: '2px solid rgba(34,197,94,0.25)' }} />
          <div style={{ position: 'absolute', top: '50%', right: '20%', width: '40px', height: '40px', background: 'rgba(134,239,172,0.25)', borderRadius: '50%' }} />

          <div className="row align-items-center position-relative" style={{ zIndex: 2 }}>
            <div className="col-lg-6 mb-4 mb-lg-0 animate-slideInLeft">
              <div className="d-inline-flex align-items-center px-4 py-2 mb-4 animate-fadeInUp animate-delay-1"
                style={{ background: 'rgba(74,222,128,0.25)', borderRadius: '999px', border: '2px solid rgba(74,222,128,0.4)', boxShadow: '3px 3px 0px rgba(0,0,0,0.08)', fontSize: '0.88rem', fontWeight: 700, color: '#166534' }}>
                <i className="bi bi-leaf me-2 animate-bounce"></i>Sustentabilidade em Ação
              </div>
              <h1 className="animate-fadeInUp animate-delay-2" style={{ fontSize: 'clamp(3rem,7vw,5rem)', fontWeight: 800, lineHeight: 1.05, color: '#14532d', letterSpacing: '-0.04em', marginBottom: '1.25rem' }}>
                Ver<span style={{ color: '#16a34a' }}>Denovo</span>
              </h1>
              <p className="animate-fadeInUp animate-delay-3" style={{ fontSize: '1.1rem', color: '#3d5a3d', lineHeight: 1.7, maxWidth: '480px', marginBottom: '2rem' }}>
                Conectando você aos pontos de coleta de materiais recicláveis.
                <strong style={{ color: '#16a34a', display: 'block', marginTop: '6px' }}>Juntos construímos um futuro sustentável.</strong>
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 animate-fadeInUp animate-delay-4">
                <Link to="/pontos" className="btn btn-success btn-lg px-5">
                  <i className="bi bi-geo-alt me-2"></i>Encontrar Pontos
                </Link>
                {botaoSecundario()}
              </div>
            </div>
            <div className="col-lg-6 animate-slideInRight">
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', inset: '-8px', background: 'rgba(74,222,128,0.15)', borderRadius: '28px', border: '2px solid rgba(74,222,128,0.25)' }} />
                <img src="/image.png" alt="Sustentabilidade"
                  style={{ borderRadius: '22px', width: '100%', height: 'auto', position: 'relative', boxShadow: '8px 8px 0px rgba(0,0,0,0.12)' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Carrossel */}
        <div id="carouselSustentavel" className="carousel slide mb-5 animate-scaleIn" data-bs-ride="carousel"
          style={{ borderRadius: '24px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.6)', boxShadow: '6px 6px 0px rgba(0,0,0,0.12)' }}>
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselSustentavel" data-bs-slide-to="0" className="active"></button>
            <button type="button" data-bs-target="#carouselSustentavel" data-bs-slide-to="1"></button>
            <button type="button" data-bs-target="#carouselSustentavel" data-bs-slide-to="2"></button>
          </div>
          <div className="carousel-inner">
            {[
              { src: '/natureza1.avif', title: 'Coleta Seletiva', desc: 'Separação correta dos materiais para reciclagem eficiente' },
              { src: '/natureza2.jpg',  title: 'Economia Circular', desc: 'Reduzir, reutilizar e reciclar para um mundo sustentável' },
              { src: '/natureza2.jpg',  title: 'Futuro Verde', desc: 'Construindo um amanhã mais limpo e sustentável' },
            ].map((item, i) => (
              <div key={i} className={`carousel-item ${i === 0 ? 'active' : ''}`}>
                <img src={item.src} className="d-block w-100" alt={item.title} style={{ height: '380px', objectFit: 'cover' }} />
                <div className="carousel-caption d-none d-md-block" style={{ background: 'rgba(0,0,0,0.35)', borderRadius: '16px', padding: '1rem 1.5rem', backdropFilter: 'blur(8px)' }}>
                  <h5 className="text-white fw-bold">{item.title}</h5>
                  <p className="text-white mb-0" style={{ opacity: 0.85 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselSustentavel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselSustentavel" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>

        {/* Como Funciona */}
        <div className="clay mb-5 animate-fadeInUp" style={{ padding: '3rem 2rem', background: 'rgba(255,255,255,0.6)' }}>
          <div className="text-center mb-5">
            <div className="d-inline-flex align-items-center px-4 py-2 mb-3"
              style={{ background: 'rgba(74,222,128,0.2)', borderRadius: '999px', border: '2px solid rgba(74,222,128,0.35)', boxShadow: '3px 3px 0px rgba(0,0,0,0.07)', fontSize: '0.85rem', fontWeight: 700, color: '#166534' }}>
              <i className="bi bi-gear me-2"></i>Processo Simples
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 800, color: '#14532d', letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>Como Funciona</h2>
            <p style={{ color: '#3d5a3d', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto' }}>Três passos simples para fazer a diferença no meio ambiente</p>
          </div>

          <div className="row g-4">
            {[
              { icon: 'bi-search',  num: '1', title: 'Encontre',  desc: 'Localize pontos de coleta próximos usando nosso sistema inteligente de busca' },
              { icon: 'bi-recycle', num: '2', title: 'Recicle',   desc: 'Leve seus materiais aos pontos cadastrados e contribua com o planeta' },
              { icon: 'bi-award',   num: '3', title: 'Impacte',   desc: 'Faça a diferença na comunidade e construa um futuro sustentável' },
            ].map((item, i) => (
              <div key={i} className="col-md-4">
                <div className="clay-sm hover-lift h-100 text-center animate-fadeInUp" style={{ padding: '2.5rem 1.5rem', animationDelay: `${(i+1)*0.1}s`, background: 'rgba(255,255,255,0.8)' }}>
                  <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1.5rem' }}>
                    <div style={{ width: '90px', height: '90px', background: 'linear-gradient(135deg, rgba(74,222,128,0.3), rgba(34,197,94,0.2))', borderRadius: '50%', border: '2px solid rgba(74,222,128,0.4)', boxShadow: '4px 4px 0px rgba(0,0,0,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <i className={`bi ${item.icon}`} style={{ fontSize: '2.5rem', color: '#16a34a' }}></i>
                    </div>
                    <div style={{ position: 'absolute', top: '-4px', right: '-4px', width: '28px', height: '28px', background: 'linear-gradient(135deg,#16a34a,#22c55e)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '2px 2px 0px rgba(0,0,0,0.15)', border: '2px solid white' }}>
                      <span style={{ color: 'white', fontWeight: 800, fontSize: '0.75rem' }}>{item.num}</span>
                    </div>
                  </div>
                  <h5 style={{ fontWeight: 800, color: '#14532d', fontSize: '1.3rem', marginBottom: '0.75rem' }}>{item.title}</h5>
                  <p style={{ color: '#3d5a3d', fontSize: '0.92rem', lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;
