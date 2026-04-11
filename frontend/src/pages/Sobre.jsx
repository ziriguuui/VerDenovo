import { useEffect } from 'react';

function Sobre() {
  const animationStyles = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-40px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(40px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    @keyframes glow {
      0%, 100% { box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3); }
      50% { box-shadow: 0 8px 35px rgba(59, 130, 246, 0.5); }
    }
    .animate-fadeInUp { animation: fadeInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both; }
    .animate-slideInLeft { animation: slideInLeft 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both; }
    .animate-slideInRight { animation: slideInRight 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both; }
    .animate-scaleIn { animation: scaleIn 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both; }
    .animate-delay-1 { animation-delay: 0.1s; }
    .animate-delay-2 { animation-delay: 0.2s; }
    .animate-delay-3 { animation-delay: 0.3s; }
    .animate-delay-4 { animation-delay: 0.4s; }
    .hover-lift { transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
    .hover-lift:hover { transform: translateY(-8px) scale(1.02); box-shadow: 0 20px 40px rgba(0,0,0,0.15); }
    .icon-pulse { animation: pulse 2s ease-in-out infinite; }
    .icon-float { animation: float 3s ease-in-out infinite; }
    .icon-glow { animation: glow 2s ease-in-out infinite; }
  `;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{background: '#ffffff', minHeight: '100vh', padding: '2rem 0', marginTop: '72px'}}>
      <style>{animationStyles}</style>
      <div className="container">

        {/* Hero Section */}
        <div className="text-center mb-5 animate-fadeInUp">
          <div className="d-inline-flex align-items-center justify-content-center mb-4 icon-float" style={{width: '80px', height: '80px', background: 'linear-gradient(135deg, #10b981, #059669)', borderRadius: '50%', boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)'}}>
            <i className="bi bi-people text-white" style={{fontSize: '2rem'}}></i>
          </div>
          <h1 className="display-4 fw-bold text-success mb-3 animate-slideInLeft">
            Sobre o VerDenovo
          </h1>
          <p className="lead text-muted mb-0 animate-fadeInUp animate-delay-1" style={{maxWidth: '600px', margin: '0 auto'}}>
            Conheça nossa história, missão e compromisso com a sustentabilidade
          </p>
        </div>

        {/* Nossa Origem */}
        <div className="row mb-5 animate-fadeInUp animate-delay-1">
          <div className="col-12">
            <div className="card border-0 shadow-lg hover-lift" style={{borderRadius: '25px', background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)', backdropFilter: 'blur(15px)', boxShadow: '0 15px 35px rgba(0,0,0,0.08)'}}>
              <div className="card-body p-5">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <div className="d-flex align-items-center mb-4">
                      <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '60px', height: '60px', background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)'}}>
                        <i className="bi bi-book text-white" style={{fontSize: '1.5rem'}}></i>
                      </div>
                      <h3 className="text-success fw-bold mb-0">Nossa Origem</h3>
                    </div>
                    <p className="lead mb-4" style={{color: '#1f2937'}}>
                      O projeto VerDenovo nasceu como um Trabalho de Conclusão de Curso (TCC) desenvolvido por estudantes comprometidos com a transformação ambiental de nossa comunidade.
                    </p>
                    <p className="mb-4" style={{color: '#4b5563', lineHeight: '1.7'}}>
                      Durante nossos estudos, identificamos a necessidade urgente de facilitar o acesso da população aos pontos de coleta seletiva e promover a educação ambiental. Assim surgiu a ideia de criar uma plataforma digital que conectasse pessoas, empresas e pontos de reciclagem de forma simples e eficiente.
                    </p>
                    <p className="mb-0" style={{color: '#4b5563', lineHeight: '1.7'}}>
                      O que começou como um projeto acadêmico se transformou em uma iniciativa real de impacto social e ambiental, demonstrando como a educação pode gerar soluções práticas para problemas do mundo real.
                    </p>
                  </div>
                  <div className="col-md-4 text-center">
                    <div className="p-4 rounded-4" style={{background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.1)'}}>
                      <i className="bi bi-mortarboard text-success icon-pulse" style={{fontSize: '4rem'}}></i>
                      <h5 className="text-success mt-3 fw-bold">Projeto Acadêmico</h5>
                      <p className="text-muted mb-0">Transformando conhecimento em ação</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nossos Objetivos */}
        <div className="row mb-5 animate-fadeInUp animate-delay-2">
          <div className="col-12 mb-4">
            <div className="text-center">
              <div className="d-inline-flex align-items-center justify-content-center mb-3 icon-glow" style={{width: '60px', height: '60px', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', borderRadius: '50%'}}>
                <i className="bi bi-bullseye text-white icon-pulse" style={{fontSize: '1.5rem'}}></i>
              </div>
              <h3 className="text-primary fw-bold mb-2">Nossos Objetivos</h3>
              <p className="text-muted">Metas que nos guiam rumo a um futuro sustentável</p>
            </div>
          </div>
          <div className="col-md-6 mb-4 animate-slideInLeft animate-delay-3">
            <div className="card border-0 shadow-lg hover-lift" style={{borderRadius: '20px', background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.1)', height: '100%'}}>
              <div className="card-body p-4">
                <div className="d-flex align-items-start">
                  <div className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{width: '50px', height: '50px', background: 'linear-gradient(135deg, #3b82f6, #2563eb)'}}>
                    <i className="bi bi-geo-alt-fill text-white" style={{fontSize: '1.2rem'}}></i>
                  </div>
                  <div>
                    <h5 className="text-primary fw-bold mb-3">Foco em Barueri</h5>
                    <p className="text-muted mb-0" style={{lineHeight: '1.6'}}>
                      Nosso objetivo principal é contribuir para o desenvolvimento sustentável do município de Barueri, facilitando o acesso da população aos pontos de coleta seletiva e promovendo práticas ambientalmente responsáveis em nossa cidade.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4 animate-slideInRight animate-delay-3">
            <div className="card border-0 shadow-lg hover-lift" style={{borderRadius: '20px', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.1)', height: '100%'}}>
              <div className="card-body p-4">
                <div className="d-flex align-items-start">
                  <div className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{width: '50px', height: '50px', background: 'linear-gradient(135deg, #10b981, #059669)'}}>
                    <i className="bi bi-people-fill text-white" style={{fontSize: '1.2rem'}}></i>
                  </div>
                  <div>
                    <h5 className="text-success fw-bold mb-3">Engajamento Comunitário</h5>
                    <p className="text-muted mb-0" style={{lineHeight: '1.6'}}>
                      Queremos criar uma rede colaborativa onde cidadãos, empresas e organizações trabalhem juntos para construir um futuro mais sustentável, fortalecendo os laços comunitários através da consciência ambiental.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4 animate-slideInLeft animate-delay-4">
            <div className="card border-0 shadow-lg hover-lift" style={{borderRadius: '20px', background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.1)', height: '100%'}}>
              <div className="card-body p-4">
                <div className="d-flex align-items-start">
                  <div className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{width: '50px', height: '50px', background: 'linear-gradient(135deg, #f59e0b, #d97706)'}}>
                    <i className="bi bi-graph-up-arrow text-white" style={{fontSize: '1.2rem'}}></i>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-3" style={{color: '#f59e0b'}}>Impacto Mensurável</h5>
                    <p className="text-muted mb-0" style={{lineHeight: '1.6'}}>
                      Buscamos aumentar significativamente os índices de reciclagem em Barueri, contribuindo para a redução de resíduos em aterros sanitários e promovendo a economia circular em nossa região.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4 animate-slideInRight animate-delay-4">
            <div className="card border-0 shadow-lg hover-lift" style={{borderRadius: '20px', background: 'rgba(168, 85, 247, 0.05)', border: '1px solid rgba(168, 85, 247, 0.1)', height: '100%'}}>
              <div className="card-body p-4">
                <div className="d-flex align-items-start">
                  <div className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{width: '50px', height: '50px', background: 'linear-gradient(135deg, #a855f7, #9333ea)'}}>
                    <i className="bi bi-lightbulb-fill text-white" style={{fontSize: '1.2rem'}}></i>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-3" style={{color: '#a855f7'}}>Inovação Tecnológica</h5>
                    <p className="text-muted mb-0" style={{lineHeight: '1.6'}}>
                      Utilizamos tecnologia para democratizar o acesso à informação sobre reciclagem, tornando mais fácil para todos encontrarem pontos de coleta e aprenderem sobre práticas sustentáveis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="row">
          <div className="col-12">
            <div className="card border-0 shadow-lg animate-scaleIn animate-delay-4" style={{borderRadius: '25px', background: 'linear-gradient(135deg, #10b981, #059669)', position: 'relative', overflow: 'hidden'}}>
              <div className="position-absolute" style={{top: '-50px', right: '-50px', width: '150px', height: '150px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%'}}></div>
              <div className="position-absolute" style={{bottom: '-30px', left: '-30px', width: '100px', height: '100px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%'}}></div>
              <div className="card-body text-center text-white p-5 position-relative">
                <div className="d-inline-flex align-items-center justify-content-center mb-4 icon-float" style={{width: '80px', height: '80px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%'}}>
                  <i className="bi bi-heart text-white icon-pulse" style={{fontSize: '2rem'}}></i>
                </div>
                <h3 className="fw-bold mb-3">Junte-se ao VerDenovo</h3>
                <p className="lead mb-5" style={{maxWidth: '600px', margin: '0 auto'}}>
                  Faça parte desta transformação! Juntos podemos construir um Barueri mais sustentável e consciente.
                </p>
                <div className="row">
                  <div className="col-md-4 mb-4">
                    <div className="p-4 rounded-4 hover-lift" style={{background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)'}}>
                      <i className="bi bi-geo-alt icon-pulse" style={{fontSize: '3rem'}}></i>
                      <h5 className="mt-3 fw-bold">Encontre Pontos</h5>
                      <p className="mb-0">Localize pontos de coleta próximos a você</p>
                    </div>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="p-4 rounded-4 hover-lift" style={{background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)'}}>
                      <i className="bi bi-plus-circle icon-pulse" style={{fontSize: '3rem'}}></i>
                      <h5 className="mt-3 fw-bold">Cadastre Pontos</h5>
                      <p className="mb-0">Ajude a expandir nossa rede de coleta</p>
                    </div>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="p-4 rounded-4 hover-lift" style={{background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)'}}>
                      <i className="bi bi-share icon-pulse" style={{fontSize: '3rem'}}></i>
                      <h5 className="mt-3 fw-bold">Compartilhe</h5>
                      <p className="mb-0">Espalhe a consciência ambiental</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Sobre;
