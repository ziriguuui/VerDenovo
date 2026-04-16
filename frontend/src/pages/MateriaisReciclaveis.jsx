import { useEffect } from 'react';

function MateriaisReciclaveis() {
  useEffect(() => {}, []);

  const materiais = [
    {
      id: 1,
      nome: "Papel",
      cor: '#3b82f6',
      sombra: 'rgba(59,130,246,0.25)',
      corBg: 'rgba(59,130,246,0.08)',
      icone: "bi-file-text",
      exemplos: ["Jornais", "Revistas", "Papelão", "Papel de escritório", "Caixas"],
      tempoDecomposicao: "3 a 6 meses",
      beneficios: "Economiza água e energia, reduz desmatamento",
      naoReciclar: ["Papel higiênico", "Guardanapos sujos", "Papel carbono"]
    },
    {
      id: 2,
      nome: "Plástico",
      cor: '#ef4444',
      sombra: 'rgba(239,68,68,0.25)',
      corBg: 'rgba(239,68,68,0.08)',
      icone: "bi-cup-straw",
      exemplos: ["Garrafas PET", "Embalagens", "Sacolas", "Potes", "Tampas"],
      tempoDecomposicao: "100 a 400 anos",
      beneficios: "Reduz poluição dos oceanos, economiza petróleo",
      naoReciclar: ["Plásticos sujos", "Isopor", "Plástico filme"]
    },
    {
      id: 3,
      nome: "Vidro",
      cor: '#059669',
      sombra: 'rgba(5,150,105,0.25)',
      corBg: 'rgba(5,150,105,0.08)',
      icone: "bi-cup",
      exemplos: ["Garrafas", "Potes", "Frascos", "Copos", "Janelas"],
      tempoDecomposicao: "Mais de 1000 anos",
      beneficios: "100% reciclável, economiza energia e matéria-prima",
      naoReciclar: ["Espelhos", "Lâmpadas", "Vidros temperados", "Cristal"]
    },
    {
      id: 4,
      nome: "Metal",
      cor: '#f59e0b',
      sombra: 'rgba(245,158,11,0.25)',
      corBg: 'rgba(245,158,11,0.08)',
      icone: "bi-gear",
      exemplos: ["Latas de alumínio", "Latas de aço", "Tampas", "Arames", "Pregos"],
      tempoDecomposicao: "10 a 100 anos",
      beneficios: "Economiza energia, reduz mineração",
      naoReciclar: ["Latas de tinta", "Aerossóis", "Materiais contaminados"]
    }
  ];

  const CardInfo = ({ label, icon, iconBg, iconColor, children }) => (
    <div className="mb-4 p-3" style={{ background: 'rgba(0,0,0,0.03)', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.06)' }}>
      <div className="d-flex align-items-center mb-2">
        <div className="d-flex align-items-center justify-content-center me-2" style={{ width: '28px', height: '28px', background: iconBg, borderRadius: '50%', flexShrink: 0 }}>
          <i className={`bi ${icon}`} style={{ fontSize: '0.85rem', color: iconColor }}></i>
        </div>
        <h6 className="fw-bold mb-0" style={{ color: iconColor }}>{label}</h6>
      </div>
      <div style={{ paddingLeft: '36px' }}>{children}</div>
    </div>
  );

  return (
    <div>
      {/* Hero */}
      <div className="mb-5 position-relative overflow-hidden" style={{ minHeight: '50vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)', borderRadius: '25px', padding: '4rem 2rem' }}>
        <div className="position-absolute animate-float" style={{ top: '15%', right: '10%', width: '80px', height: '80px', background: 'rgba(5,150,105,0.1)', borderRadius: '50%' }}></div>
        <div className="position-absolute animate-float animate-delay-2" style={{ bottom: '20%', left: '5%', width: '60px', height: '60px', background: 'rgba(16,185,129,0.1)', borderRadius: '50%' }}></div>
        <div className="position-absolute animate-rotate" style={{ top: '30%', left: '15%', width: '40px', height: '40px', background: 'rgba(34,197,94,0.08)', borderRadius: '50%' }}></div>
        <div className="position-absolute animate-pulse" style={{ bottom: '40%', right: '20%', width: '50px', height: '50px', background: 'rgba(5,150,105,0.06)', borderRadius: '50%' }}></div>
        <div className="text-center position-relative" style={{ zIndex: 2 }}>
          <div className="d-inline-flex align-items-center bg-success bg-opacity-10 text-success px-4 py-2 rounded-pill mb-4 animate-fadeInUp" style={{ fontSize: '0.95rem', fontWeight: '600' }}>
            <i className="bi bi-recycle me-2"></i>Materiais Sustentáveis
          </div>
          <h1 className="display-3 fw-bold mb-4 animate-fadeInUp animate-delay-1" style={{ lineHeight: '1.1', color: '#1e293b', letterSpacing: '-0.02em' }}>
            Materiais <span style={{ color: '#059669' }}>Recicláveis</span>
          </h1>
          <p className="fs-4 mb-4 text-muted animate-fadeInUp animate-delay-2" style={{ lineHeight: '1.6', maxWidth: '600px', margin: '0 auto' }}>
            Conheça os principais tipos de materiais recicláveis e como descartá-los corretamente
          </p>
          <div className="d-flex justify-content-center gap-4 flex-wrap animate-fadeInUp animate-delay-3">
            {[
              { icon: 'bi-recycle', label: '4 materiais', color: '#059669', bg: 'rgba(5,150,105,0.1)' },
              { icon: 'bi-clock', label: 'Tempo de decomposição', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
              { icon: 'bi-leaf', label: 'Benefícios ambientais', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
            ].map((stat, i) => (
              <div key={i} className="d-flex align-items-center gap-2 px-4 py-2 rounded-pill" style={{ background: stat.bg }}>
                <i className={`bi ${stat.icon}`} style={{ color: stat.color, fontSize: '1.1rem' }}></i>
                <span style={{ color: stat.color, fontWeight: '600', fontSize: '0.95rem' }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="mb-5">
        <div className="d-flex align-items-center mb-4 animate-slideInLeft">
          <div className="d-flex align-items-center justify-content-center me-3" style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #059669, #10b981)', borderRadius: '14px', boxShadow: '0 8px 20px rgba(5,150,105,0.3)' }}>
            <i className="bi bi-recycle text-white" style={{ fontSize: '1.3rem' }}></i>
          </div>
          <div>
            <h2 className="fw-bold mb-0" style={{ color: '#1e293b' }}>Materiais Recicláveis</h2>
            <small className="text-muted">Como separar e descartar corretamente</small>
          </div>
        </div>
        <div className="row">
          {materiais.map((material, index) => (
            <div key={material.id} className={`col-lg-6 mb-4 animate-scaleIn animate-delay-${(index % 4) + 1}`}>
              <div className="modern-card interactive-card h-100" style={{ border: 'none', overflow: 'hidden' }}>
                {/* Header colorido */}
                <div className="d-flex align-items-center justify-content-center position-relative" style={{ height: '160px', background: material.cor }}>
                  <div className="d-flex align-items-center justify-content-center icon-hover" style={{ width: '90px', height: '90px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', border: '4px solid rgba(255,255,255,0.3)', boxShadow: `0 10px 30px ${material.sombra}` }}>
                    <i className={`bi ${material.icone}`} style={{ fontSize: '2.8rem', color: 'white' }}></i>
                  </div>
                  <div className="position-absolute top-0 end-0 m-3">
                    <span className="badge rounded-pill px-3 py-2" style={{ background: 'rgba(255,255,255,0.25)', color: 'white', fontSize: '0.75rem', backdropFilter: 'blur(4px)' }}>
                      ♻️ Reciclável
                    </span>
                  </div>
                </div>

                <div className="p-4" style={{ background: 'white' }}>
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div className="d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '44px', height: '44px', background: material.corBg, borderRadius: '12px' }}>
                      <i className={`bi ${material.icone}`} style={{ fontSize: '1.3rem', color: material.cor }}></i>
                    </div>
                    <h4 className="fw-bold mb-0" style={{ color: '#1f2937', fontSize: '1.4rem' }}>{material.nome}</h4>
                  </div>

                  <CardInfo label="Exemplos" icon="bi-check-circle" iconBg="linear-gradient(135deg, #dcfce7, #bbf7d0)" iconColor="#059669">
                    <div className="d-flex flex-wrap gap-2">
                      {material.exemplos.map((e, i) => (
                        <span key={i} className="badge" style={{ background: 'rgba(5,150,105,0.1)', color: '#059669', padding: '6px 12px', borderRadius: '12px', fontSize: '0.82rem', fontWeight: '500' }}>{e}</span>
                      ))}
                    </div>
                  </CardInfo>

                  <CardInfo label="Tempo de Decomposição" icon="bi-clock" iconBg="linear-gradient(135deg, #dbeafe, #bfdbfe)" iconColor="#3b82f6">
                    <p className="mb-0 text-muted">{material.tempoDecomposicao}</p>
                  </CardInfo>

                  <CardInfo label="Benefícios" icon="bi-leaf" iconBg="linear-gradient(135deg, #dcfce7, #bbf7d0)" iconColor="#059669">
                    <p className="mb-0 text-muted">{material.beneficios}</p>
                  </CardInfo>

                  <CardInfo label="Não Reciclar" icon="bi-x-circle" iconBg="linear-gradient(135deg, #fef3c7, #fde68a)" iconColor="#f59e0b">
                    <div className="d-flex flex-wrap gap-2">
                      {material.naoReciclar.map((item, i) => (
                        <span key={i} className="badge" style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b', padding: '6px 12px', borderRadius: '12px', fontSize: '0.82rem', fontWeight: '500' }}>{item}</span>
                      ))}
                    </div>
                  </CardInfo>
                </div>

                <div style={{ height: '4px', background: material.gradiente, borderRadius: '0 0 25px 25px' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dicas Importantes */}
      <div className="row mt-2">
        <div className="col-12">
          <div className="modern-card animate-scaleIn animate-delay-4" style={{ background: 'linear-gradient(135deg, #059669, #10b981)', overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
            <div style={{ position: 'absolute', bottom: '-60px', left: '-30px', width: '250px', height: '250px', background: 'rgba(255,255,255,0.04)', borderRadius: '50%' }}></div>
            <div className="p-5 position-relative">
              <div className="text-center mb-5">
                <div className="d-inline-flex align-items-center justify-content-center animate-pulse mb-3"
                  style={{ width: '70px', height: '70px', background: 'rgba(255,255,255,0.2)', borderRadius: '20px', boxShadow: '0 8px 25px rgba(0,0,0,0.15)' }}>
                  <i className="bi bi-lightbulb" style={{ fontSize: '2rem', color: 'white' }}></i>
                </div>
                <h3 className="fw-bold text-white mb-1" style={{ fontSize: '2rem' }}>Dicas Importantes</h3>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem' }}>Boas práticas para a reciclagem correta</p>
              </div>
              <div className="row g-4">
                {[
                  { icon: 'bi-droplet', title: 'Limpe os Materiais', text: 'Lave embalagens antes de descartar para facilitar a reciclagem', delay: 1 },
                  { icon: 'bi-arrow-down-up', title: 'Separe Corretamente', text: 'Use as cores corretas: azul (papel), vermelho (plástico), verde (vidro), amarelo (metal)', delay: 2 },
                  { icon: 'bi-geo-alt', title: 'Encontre Pontos de Coleta', text: 'Use nosso sistema para localizar pontos de coleta próximos a você', delay: 3 },
                ].map((dica, i) => (
                  <div key={i} className={`col-md-4 animate-fadeInUp animate-delay-${dica.delay}`}>
                    <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '20px', padding: '2rem', border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(10px)', height: '100%', transition: 'all 0.3s ease' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; e.currentTarget.style.transform = 'translateY(-6px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                      <div className="d-flex align-items-center gap-3 mb-3">
                        <div className="d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '52px', height: '52px', background: 'rgba(255,255,255,0.2)', borderRadius: '14px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                          <i className={`bi ${dica.icon}`} style={{ fontSize: '1.5rem', color: 'white' }}></i>
                        </div>
                        <h5 className="fw-bold mb-0 text-white">{dica.title}</h5>
                      </div>
                      <p className="mb-0" style={{ color: 'rgba(255,255,255,0.85)', lineHeight: '1.6', fontSize: '0.95rem' }}>{dica.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MateriaisReciclaveis;
