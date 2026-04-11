import { useEffect } from 'react';

function Residuos() {
  useEffect(() => {}, []);

  const residuosComuns = [
    {
      id: 1,
      nome: "Resíduos Orgânicos",
      cor: "bg-success",
      icone: "bi-flower1",
      exemplos: ["Restos de comida", "Cascas de frutas", "Folhas", "Galhos", "Borra de café"],
      tempoDecomposicao: "2 semanas a 6 meses",
      tratamento: "Compostagem doméstica ou industrial",
      cuidados: ["Separar de outros resíduos", "Evitar carnes e laticínios na compostagem"]
    },
    {
      id: 2,
      nome: "Resíduos Secos",
      cor: "bg-info",
      icone: "bi-box",
      exemplos: ["Papel limpo", "Plástico", "Vidro", "Metal", "Embalagens"],
      tempoDecomposicao: "Varia por material",
      tratamento: "Coleta seletiva e reciclagem",
      cuidados: ["Limpar antes do descarte", "Separar por tipo de material"]
    }
  ];

  const residuosEspeciais = [
    {
      id: 1,
      nome: "Eletrônicos",
      cor: "bg-primary",
      icone: "bi-phone",
      exemplos: ["Celulares", "Computadores", "TVs", "Pilhas", "Baterias"],
      perigos: "Metais pesados tóxicos",
      tratamento: "Pontos de coleta especializados",
      cuidados: ["Nunca descartar no lixo comum", "Procurar fabricantes ou lojas"]
    },
    {
      id: 2,
      nome: "Medicamentos",
      cor: "bg-danger",
      icone: "bi-capsule",
      exemplos: ["Comprimidos vencidos", "Xaropes", "Pomadas", "Injeções", "Termômetros"],
      perigos: "Contaminação do solo e água",
      tratamento: "Farmácias e postos de saúde",
      cuidados: ["Manter na embalagem original", "Não jogar no vaso sanitário"]
    },
    {
      id: 3,
      nome: "Óleo de Cozinha",
      cor: "bg-warning",
      icone: "bi-droplet-fill",
      exemplos: ["Óleo de fritura", "Gordura animal", "Azeite usado", "Margarina"],
      perigos: "Entupimento de tubulações, poluição da água",
      tratamento: "Pontos de coleta para produção de biodiesel",
      cuidados: ["Armazenar em recipiente fechado", "Nunca despejar no ralo"]
    },
    {
      id: 4,
      nome: "Lâmpadas",
      cor: "bg-secondary",
      icone: "bi-lightbulb",
      exemplos: ["Fluorescentes", "LED", "Halógenas", "Incandescentes"],
      perigos: "Mercúrio e outros metais pesados",
      tratamento: "Lojas de materiais elétricos",
      cuidados: ["Embalar com cuidado", "Não quebrar antes do descarte"]
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section mb-5 position-relative overflow-hidden" style={{minHeight: '50vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)', borderRadius: '25px', padding: '4rem 2rem'}}>
        <div className="position-absolute animate-float" style={{top: '15%', right: '10%', width: '80px', height: '80px', background: 'rgba(5, 150, 105, 0.1)', borderRadius: '50%'}}></div>
        <div className="position-absolute animate-float animate-delay-2" style={{bottom: '20%', left: '5%', width: '60px', height: '60px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%'}}></div>
        <div className="position-absolute animate-rotate" style={{top: '30%', left: '15%', width: '40px', height: '40px', background: 'rgba(34, 197, 94, 0.08)', borderRadius: '50%'}}></div>
        <div className="position-absolute animate-pulse" style={{bottom: '40%', right: '20%', width: '50px', height: '50px', background: 'rgba(5, 150, 105, 0.06)', borderRadius: '50%'}}></div>
        <div className="text-center position-relative" style={{zIndex: 2}}>
          <div className="d-inline-flex align-items-center bg-success bg-opacity-10 text-success px-4 py-2 rounded-pill mb-4 animate-fadeInUp" style={{fontSize: '0.95rem', fontWeight: '600'}}>
            <i className="bi bi-trash me-2"></i>Gestão de Resíduos
          </div>
          <h1 className="display-3 fw-bold mb-4 animate-fadeInUp animate-delay-1" style={{lineHeight: '1.1', color: '#1e293b', letterSpacing: '-0.02em'}}>
            Resíduos <span style={{color: '#059669'}}>Comuns e Especiais</span>
          </h1>
          <p className="fs-4 mb-4 text-muted animate-fadeInUp animate-delay-2" style={{lineHeight: '1.6', maxWidth: '600px', margin: '0 auto'}}>
            Aprenda a identificar e descartar corretamente diferentes tipos de resíduos
          </p>
        </div>
      </div>

      {/* Resíduos Comuns */}
      <div className="mb-5">
        <h2 className="text-success mb-4 animate-slideInLeft animate-delay-2">
          <i className="bi bi-house me-2"></i>
          Resíduos Comuns
        </h2>
        <div className="row">
          {residuosComuns.map((residuo, index) => (
            <div key={residuo.id} className="col-lg-6 mb-4">
              <div className={`modern-card h-100 interactive-card animate-scaleIn animate-delay-${(index % 2) + 1}`} style={{border: 'none', overflow: 'hidden', background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,252,0.9))', backdropFilter: 'blur(15px)', boxShadow: '0 20px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)'}}>

                <div className="position-relative p-0">
                  <div className="d-flex align-items-center justify-content-center mb-4" style={{height: '140px', borderRadius: '25px 25px 0 0', background: residuo.cor === 'bg-success' ? 'linear-gradient(135deg, #059669, #10b981)' : 'linear-gradient(135deg, #0ea5e9, #0284c7)'}}>
                    <div className="d-flex align-items-center justify-content-center icon-hover" style={{width: '80px', height: '80px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', border: '4px solid rgba(255,255,255,0.3)'}}>
                      <i className={`bi ${residuo.icone}`} style={{fontSize: '2.5rem', color: 'white'}}></i>
                    </div>
                  </div>
                  <div className="px-5 pb-5">
                    <div className="text-center mb-4">
                      <h4 className="fw-bold mb-2" style={{color: '#1f2937', fontSize: '1.5rem'}}>{residuo.nome}</h4>
                      <div className="badge" style={{background: residuo.cor === 'bg-success' ? 'rgba(5,150,105,0.1)' : 'rgba(14,165,233,0.1)', color: residuo.cor === 'bg-success' ? '#059669' : '#0ea5e9', fontSize: '0.8rem', padding: '6px 16px', borderRadius: '20px'}}>Resíduo Comum</div>
                    </div>

                    <div className="mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <div className="d-flex align-items-center justify-content-center me-2" style={{width: '24px', height: '24px', background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)', borderRadius: '50%'}}>
                        <i className="bi bi-check-circle" style={{fontSize: '0.8rem', color: '#059669'}}></i>
                      </div>
                      <h6 className="fw-bold mb-0" style={{color: '#059669'}}>Exemplos</h6>
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                      {residuo.exemplos.map((exemplo, index) => (
                        <span key={index} className="badge" style={{background: 'rgba(5, 150, 105, 0.1)', color: '#059669', padding: '6px 12px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: '500'}}>
                          {exemplo}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <div className="d-flex align-items-center justify-content-center me-2" style={{width: '24px', height: '24px', background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)', borderRadius: '50%'}}>
                        <i className="bi bi-clock" style={{fontSize: '0.8rem', color: '#3b82f6'}}></i>
                      </div>
                      <h6 className="fw-bold mb-0" style={{color: '#3b82f6'}}>Decomposição</h6>
                    </div>
                    <p className="mb-0 text-muted" style={{paddingLeft: '32px'}}>{residuo.tempoDecomposicao}</p>
                  </div>

                  <div className="mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <div className="d-flex align-items-center justify-content-center me-2" style={{width: '24px', height: '24px', background: 'linear-gradient(135deg, #e0e7ff, #c7d2fe)', borderRadius: '50%'}}>
                        <i className="bi bi-gear" style={{fontSize: '0.8rem', color: '#6366f1'}}></i>
                      </div>
                      <h6 className="fw-bold mb-0" style={{color: '#6366f1'}}>Tratamento</h6>
                    </div>
                    <p className="mb-0 text-muted" style={{paddingLeft: '32px'}}>{residuo.tratamento}</p>
                  </div>

                  <div className="mb-0">
                    <div className="d-flex align-items-center mb-2">
                      <div className="d-flex align-items-center justify-content-center me-2" style={{width: '24px', height: '24px', background: 'linear-gradient(135deg, #fef3c7, #fde68a)', borderRadius: '50%'}}>
                        <i className="bi bi-exclamation-triangle" style={{fontSize: '0.8rem', color: '#f59e0b'}}></i>
                      </div>
                      <h6 className="fw-bold mb-0" style={{color: '#f59e0b'}}>Cuidados</h6>
                    </div>
                    <ul className="mb-0" style={{paddingLeft: '32px', listStyle: 'none'}}>
                      {residuo.cuidados.map((cuidado, index) => (
                        <li key={index} className="text-muted mb-1" style={{position: 'relative', paddingLeft: '16px'}}>
                          <span style={{position: 'absolute', left: '0', top: '8px', width: '4px', height: '4px', background: '#f59e0b', borderRadius: '50%'}}></span>
                          {cuidado}
                        </li>
                      ))}
                    </ul>
                    </div>
                  </div>
                  <div className="position-absolute bottom-0 start-0 w-100" style={{height: '4px', background: residuo.cor === 'bg-success' ? 'linear-gradient(90deg, #059669, #10b981)' : 'linear-gradient(90deg, #0ea5e9, #0284c7)', borderRadius: '0 0 25px 25px'}}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resíduos Especiais */}
      <div className="mb-5">
        <h2 className="text-danger mb-4 animate-slideInLeft animate-delay-3">
          <i className="bi bi-exclamation-triangle me-2"></i>
          Resíduos Especiais
        </h2>
        <div className="row">
          {residuosEspeciais.map((residuo, index) => (
            <div key={residuo.id} className="col-lg-6 mb-4">
              <div className={`modern-card h-100 interactive-card animate-scaleIn animate-delay-${(index % 4) + 1}`} style={{border: 'none', overflow: 'hidden', background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,252,0.9))', backdropFilter: 'blur(15px)', boxShadow: '0 20px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)'}}>

                <div className="position-relative p-0">
                  <div className="d-flex align-items-center justify-content-center mb-4 position-relative" style={{height: '140px', borderRadius: '25px 25px 0 0', background: residuo.cor === 'bg-primary' ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : residuo.cor === 'bg-danger' ? 'linear-gradient(135deg, #dc2626, #b91c1c)' : residuo.cor === 'bg-warning' ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'linear-gradient(135deg, #6b7280, #4b5563)'}}>
                    <div className="d-flex align-items-center justify-content-center icon-hover" style={{width: '80px', height: '80px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', border: '4px solid rgba(255,255,255,0.3)'}}>
                      <i className={`bi ${residuo.icone}`} style={{fontSize: '2.5rem', color: 'white'}}></i>
                    </div>
                    <div className="position-absolute top-0 end-0 m-3">
                      <div className="badge" style={{background: 'rgba(220,38,38,0.9)', color: 'white', fontSize: '0.75rem', padding: '6px 12px', borderRadius: '20px'}}>⚠️ Especial</div>
                    </div>
                  </div>
                  <div className="px-5 pb-5">
                    <div className="text-center mb-4">
                      <h4 className="fw-bold mb-2" style={{color: '#1f2937', fontSize: '1.5rem'}}>{residuo.nome}</h4>
                    </div>

                    <div className="mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <div className="d-flex align-items-center justify-content-center me-2" style={{width: '24px', height: '24px', background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)', borderRadius: '50%'}}>
                        <i className="bi bi-check-circle" style={{fontSize: '0.8rem', color: '#059669'}}></i>
                      </div>
                      <h6 className="fw-bold mb-0" style={{color: '#059669'}}>Exemplos</h6>
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                      {residuo.exemplos.map((exemplo, index) => (
                        <span key={index} className="badge" style={{background: 'rgba(5, 150, 105, 0.1)', color: '#059669', padding: '6px 12px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: '500'}}>
                          {exemplo}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <div className="d-flex align-items-center justify-content-center me-2" style={{width: '24px', height: '24px', background: 'linear-gradient(135deg, #fecaca, #fca5a5)', borderRadius: '50%'}}>
                        <i className="bi bi-shield-exclamation" style={{fontSize: '0.8rem', color: '#dc2626'}}></i>
                      </div>
                      <h6 className="fw-bold mb-0" style={{color: '#dc2626'}}>Perigos</h6>
                    </div>
                    <p className="mb-0 text-muted" style={{paddingLeft: '32px'}}>{residuo.perigos}</p>
                  </div>

                  <div className="mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <div className="d-flex align-items-center justify-content-center me-2" style={{width: '24px', height: '24px', background: 'linear-gradient(135deg, #e0e7ff, #c7d2fe)', borderRadius: '50%'}}>
                        <i className="bi bi-geo-alt" style={{fontSize: '0.8rem', color: '#6366f1'}}></i>
                      </div>
                      <h6 className="fw-bold mb-0" style={{color: '#6366f1'}}>Onde Descartar</h6>
                    </div>
                    <p className="mb-0 text-muted" style={{paddingLeft: '32px'}}>{residuo.tratamento}</p>
                  </div>

                  <div className="mb-0">
                    <div className="d-flex align-items-center mb-2">
                      <div className="d-flex align-items-center justify-content-center me-2" style={{width: '24px', height: '24px', background: 'linear-gradient(135deg, #fef3c7, #fde68a)', borderRadius: '50%'}}>
                        <i className="bi bi-exclamation-triangle" style={{fontSize: '0.8rem', color: '#f59e0b'}}></i>
                      </div>
                      <h6 className="fw-bold mb-0" style={{color: '#f59e0b'}}>Cuidados</h6>
                    </div>
                    <ul className="mb-0" style={{paddingLeft: '32px', listStyle: 'none'}}>
                      {residuo.cuidados.map((cuidado, index) => (
                        <li key={index} className="text-muted mb-1" style={{position: 'relative', paddingLeft: '16px'}}>
                          <span style={{position: 'absolute', left: '0', top: '8px', width: '4px', height: '4px', background: '#f59e0b', borderRadius: '50%'}}></span>
                          {cuidado}
                        </li>
                      ))}
                    </ul>
                    </div>
                  </div>
                  <div className="position-absolute bottom-0 start-0 w-100" style={{height: '4px', background: residuo.cor === 'bg-primary' ? 'linear-gradient(90deg, #3b82f6, #2563eb)' : residuo.cor === 'bg-danger' ? 'linear-gradient(90deg, #dc2626, #b91c1c)' : residuo.cor === 'bg-warning' ? 'linear-gradient(90deg, #f59e0b, #d97706)' : 'linear-gradient(90deg, #6b7280, #4b5563)', borderRadius: '0 0 25px 25px'}}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dicas Gerais */}
      <div className="row">
        <div className="col-12">
          <div className="modern-card text-center interactive-card animate-scaleIn animate-delay-4" style={{background: 'linear-gradient(135deg, #059669, #10b981)', color: 'white'}}>
            <div className="card-body p-5">
              <div className="icon-circle mx-auto mb-4" style={{background: 'rgba(255,255,255,0.2)', color: 'white'}}>
                <i className="bi bi-lightbulb"></i>
              </div>
              <h3 className="mb-4">Dicas Importantes</h3>
              <div className="row mt-4">
                <div className="col-md-4 mb-4">
                  <div className="icon-circle mx-auto mb-3" style={{background: 'rgba(255,255,255,0.15)', color: 'white'}}>
                    <i className="bi bi-shield-check"></i>
                  </div>
                  <h5>Segurança Primeiro</h5>
                  <p className="mb-0">Sempre use equipamentos de proteção ao manusear resíduos especiais</p>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="icon-circle mx-auto mb-3" style={{background: 'rgba(255,255,255,0.15)', color: 'white'}}>
                    <i className="bi bi-geo-alt"></i>
                  </div>
                  <h5>Pontos Especializados</h5>
                  <p className="mb-0">Procure pontos de coleta específicos para cada tipo de resíduo especial</p>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="icon-circle mx-auto mb-3" style={{background: 'rgba(255,255,255,0.15)', color: 'white'}}>
                    <i className="bi bi-people"></i>
                  </div>
                  <h5>Conscientização</h5>
                  <p className="mb-0">Eduque familiares e amigos sobre o descarte correto de resíduos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Residuos;