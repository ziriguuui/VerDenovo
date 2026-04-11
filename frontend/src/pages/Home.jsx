import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Home() {
  const { mostrarMensagemLogout, usuario, isLogado } = useAuth();

  const botaoSecundario = () => {
    if (!isLogado()) {
      return (
        <Link to="/cadastro-usuario" className="btn btn-outline-success btn-lg px-5 py-3" style={{borderRadius: '12px', fontWeight: '600', borderWidth: '2px', transition: 'all 0.3s ease'}}>
          <i className="bi bi-person-plus me-2"></i>Criar Conta
        </Link>
      );
    }
    if (usuario?.pontoVinculado) {
      return (
        <Link to="/personalizar-ponto" className="btn btn-outline-success btn-lg px-5 py-3" style={{borderRadius: '12px', fontWeight: '600', borderWidth: '2px', transition: 'all 0.3s ease'}}>
          <i className="bi bi-gear me-2"></i>Gerenciar Meu Ponto
        </Link>
      );
    }
    if (usuario?.tipo === 'usuario') {
      return (
        <Link to="/cadastrar" className="btn btn-outline-success btn-lg px-5 py-3" style={{borderRadius: '12px', fontWeight: '600', borderWidth: '2px', transition: 'all 0.3s ease'}}>
          <i className="bi bi-plus-circle me-2"></i>Cadastrar Ponto
        </Link>
      );
    }
    return null;
  };
  return (
    <div>
      {/* Mensagem de Logout */}
      {mostrarMensagemLogout && (
        <div className="alert text-white text-center" style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9999,
          background: 'linear-gradient(135deg, #10b981, #059669)',
          border: 'none',
          borderRadius: '15px',
          padding: '1rem 1.5rem',
          fontSize: '1rem',
          fontWeight: '600',
          boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)',
          animation: 'slideInRight 0.5s ease-out',
          minWidth: '300px'
        }}>
          <div className="d-flex align-items-center">
            <i className="bi bi-check-circle-fill me-2" style={{fontSize: '1.2rem'}}></i>
            <span>Logout realizado com sucesso!</span>
          </div>
        </div>
      )}
      
      <div className="hero-section mb-5 position-relative overflow-hidden" style={{minHeight: '70vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)', borderRadius: '25px', padding: '4rem 2rem'}}>
        <div className="position-absolute" style={{top: '15%', right: '10%', width: '80px', height: '80px', background: 'rgba(5, 150, 105, 0.1)', borderRadius: '50%', animation: 'float 6s ease-in-out infinite'}}></div>
        <div className="position-absolute" style={{bottom: '20%', left: '5%', width: '60px', height: '60px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', animation: 'float 4s ease-in-out infinite reverse'}}></div>
        <div className="row align-items-center position-relative" style={{zIndex: 2}}>
          <div className="col-lg-6 mb-4 mb-lg-0 animate-slideInLeft">
            <div className="d-inline-flex align-items-center bg-success bg-opacity-10 text-success px-4 py-2 rounded-pill mb-4 animate-fadeInUp animate-delay-1" style={{fontSize: '0.95rem', fontWeight: '600'}}>
              <i className="bi bi-leaf me-2 bounce"></i>Sustentabilidade em Ação
            </div>
            <h1 className="display-1 fw-bold mb-4 animate-fadeInUp animate-delay-2" style={{lineHeight: '1.1', color: '#1e293b', letterSpacing: '-0.02em'}}>
              Ver<span style={{color: '#059669'}}>Denovo</span>
            </h1>
            <p className="fs-4 mb-5 text-muted animate-fadeInUp animate-delay-3" style={{lineHeight: '1.6', maxWidth: '500px'}}>
              Conectando você aos pontos de coleta de materiais recicláveis.
              <strong className="text-success d-block mt-2">Juntos construímos um futuro sustentável.</strong>
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 animate-fadeInUp animate-delay-4">
              <Link to="/pontos" className="btn btn-success btn-lg px-5 py-3 position-relative" style={{borderRadius: '12px', fontWeight: '600', border: 'none', boxShadow: '0 8px 25px rgba(5, 150, 105, 0.25)', transition: 'all 0.3s ease'}}>
                <i className="bi bi-geo-alt me-2"></i>Encontrar Pontos
              </Link>
              {botaoSecundario()}
            </div>
          </div>
          <div className="col-lg-6 animate-slideInRight">
            <div className="text-center">
              <img src="/image.png" 
                   className="img-fluid hover-scale" 
                   alt="Sustentabilidade" 
                   style={{borderRadius: '20px', maxWidth: '100%', height: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', transform: 'perspective(1000px) rotateY(-3deg)', transition: 'transform 0.3s ease'}} />
            </div>
          </div>
        </div>
      </div>

      {/* Carrossel */}
      <div id="carouselSustentavel" className="carousel slide mb-5 animate-scaleIn" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselSustentavel" data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#carouselSustentavel" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#carouselSustentavel" data-bs-slide-to="2"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/natureza1.avif" className="d-block w-100" alt="Coleta Seletiva" style={{height: '400px', objectFit: 'cover'}} />
            <div className="carousel-caption d-none d-md-block">
              <h5 className="text-white">Coleta Seletiva</h5>
              <p className="text-white">Separação correta dos materiais para reciclagem eficiente</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="/natureza2.jpg" className="d-block w-100" alt="Economia Circular" style={{height: '400px', objectFit: 'cover'}} />
            <div className="carousel-caption d-none d-md-block">
              <h5 className="text-white">Economia Circular</h5>
              <p className="text-white">Reduzir, reutilizar e reciclar para um mundo sustentável</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="/natureza2.jpg" className="d-block w-100" alt="Futuro Verde" style={{height: '400px', objectFit: 'cover'}} />
            <div className="carousel-caption d-none d-md-block">
              <h5 className="text-white">Futuro Verde</h5>
              <p className="text-white">Construindo um amanhã mais limpo e sustentável</p>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselSustentavel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselSustentavel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* Features Section */}
      <div className="row mb-5 py-5" style={{background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '30px', margin: '0 -15px'}}>
        <div className="col-12 text-center mb-5 animate-fadeInUp">
          <div className="badge bg-success bg-opacity-10 text-success px-4 py-2 rounded-pill mb-3 animate-scaleIn">
            <i className="bi bi-gear me-2"></i>Processo Simples
          </div>
          <h2 className="display-4 fw-bold mb-4" style={{color: '#1f2937', background: 'linear-gradient(135deg, #059669, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Como Funciona</h2>
          <p className="lead text-muted fs-4 mx-auto" style={{maxWidth: '600px'}}>Três passos simples para fazer a diferença no meio ambiente</p>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100 text-center border-0 position-relative overflow-hidden hover-lift animate-fadeInUp animate-delay-1" 
               style={{background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', borderRadius: '25px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', transition: 'all 0.4s ease'}}>
            <div className="card-body p-5">
              <div className="position-relative mb-4">
                <div className="d-inline-flex align-items-center justify-content-center position-relative" 
                     style={{width: '100px', height: '100px', background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)', borderRadius: '50%', boxShadow: '0 10px 30px rgba(5, 150, 105, 0.3)'}}>
                  <i className="bi bi-search" style={{fontSize: '3rem', color: '#059669'}}></i>
                </div>
                <div className="position-absolute top-0 start-50 translate-middle" 
                     style={{width: '30px', height: '30px', background: '#059669', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <span className="text-white fw-bold">1</span>
                </div>
              </div>
              <h5 className="card-title fw-bold mb-3" style={{color: '#1f2937', fontSize: '1.5rem'}}>Encontre</h5>
              <p className="card-text text-muted fs-6">Localize pontos de coleta próximos usando nosso sistema inteligente de busca</p>
            </div>
            <div className="position-absolute bottom-0 start-0 w-100" style={{height: '5px', background: 'linear-gradient(90deg, #059669, #10b981)'}}></div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100 text-center border-0 position-relative overflow-hidden hover-lift animate-fadeInUp animate-delay-2" 
               style={{background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', borderRadius: '25px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', transition: 'all 0.4s ease'}}>
            <div className="card-body p-5">
              <div className="position-relative mb-4">
                <div className="d-inline-flex align-items-center justify-content-center position-relative" 
                     style={{width: '100px', height: '100px', background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)', borderRadius: '50%', boxShadow: '0 10px 30px rgba(5, 150, 105, 0.3)'}}>
                  <i className="bi bi-recycle" style={{fontSize: '3rem', color: '#059669'}}></i>
                </div>
                <div className="position-absolute top-0 start-50 translate-middle" 
                     style={{width: '30px', height: '30px', background: '#059669', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <span className="text-white fw-bold">2</span>
                </div>
              </div>
              <h5 className="card-title fw-bold mb-3" style={{color: '#1f2937', fontSize: '1.5rem'}}>Recicle</h5>
              <p className="card-text text-muted fs-6">Leve seus materiais aos pontos cadastrados e contribua com o planeta</p>
            </div>
            <div className="position-absolute bottom-0 start-0 w-100" style={{height: '5px', background: 'linear-gradient(90deg, #059669, #10b981)'}}></div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100 text-center border-0 position-relative overflow-hidden hover-lift animate-fadeInUp animate-delay-3" 
               style={{background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', borderRadius: '25px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', transition: 'all 0.4s ease'}}>
            <div className="card-body p-5">
              <div className="position-relative mb-4">
                <div className="d-inline-flex align-items-center justify-content-center position-relative" 
                     style={{width: '100px', height: '100px', background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)', borderRadius: '50%', boxShadow: '0 10px 30px rgba(5, 150, 105, 0.3)'}}>
                  <i className="bi bi-award" style={{fontSize: '3rem', color: '#059669'}}></i>
                </div>
                <div className="position-absolute top-0 start-50 translate-middle" 
                     style={{width: '30px', height: '30px', background: '#059669', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <span className="text-white fw-bold">3</span>
                </div>
              </div>
              <h5 className="card-title fw-bold mb-3" style={{color: '#1f2937', fontSize: '1.5rem'}}>Impacte</h5>
              <p className="card-text text-muted fs-6">Faça a diferença na comunidade e construa um futuro sustentável</p>
            </div>
            <div className="position-absolute bottom-0 start-0 w-100" style={{height: '5px', background: 'linear-gradient(90deg, #059669, #10b981)'}}></div>
          </div>
        </div>
      </div>


    </div>
  );
}

export default Home;