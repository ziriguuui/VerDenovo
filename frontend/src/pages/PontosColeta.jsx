import { useState, useEffect, useMemo } from 'react';
import { apiService } from '../services/api';

const materialConfig = {
  'Papel':      { icon: 'bi-file-earmark-text-fill', color: '#3b82f6', emoji: '📄' },
  'Plástico':   { icon: 'bi-cup-fill',               color: '#ef4444', emoji: '🥤' },
  'Vidro':      { icon: 'bi-cup-straw',              color: '#10b981', emoji: '🍶' },
  'Metal':      { icon: 'bi-gear-fill',              color: '#f59e0b', emoji: '🥫' },
  'Eletrônico': { icon: 'bi-phone-fill',             color: '#8b5cf6', emoji: '📱' },
  'Orgânico':   { icon: 'bi-flower1',                color: '#84cc16', emoji: '🌱' },
};

function PontosColeta() {
  const [pontos, setPontos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [pontoSelecionado, setPontoSelecionado] = useState(null);
  const [busca, setBusca] = useState('');
  const [filtroMateriais, setFiltroMateriais] = useState([]);

  useEffect(() => { carregarPontos(); }, []);

  const carregarPontos = async () => {
    setLoading(true);
    setErro('');
    try {
      const data = await apiService.listarPontos();
      setPontos(data);
    } catch {
      setErro('Não foi possível carregar os pontos de coleta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const toggleMaterial = (mat) => {
    setFiltroMateriais(prev =>
      prev.includes(mat) ? prev.filter(m => m !== mat) : [...prev, mat]
    );
  };

  const pontosFiltrados = useMemo(() => {
    return pontos.filter(p => {
      const termoBusca = busca.toLowerCase();
      const matchBusca = !busca ||
        p.nome?.toLowerCase().includes(termoBusca) ||
        p.cep?.includes(termoBusca) ||
        p.logradouro?.toLowerCase().includes(termoBusca);
      const matchMaterial = filtroMateriais.length === 0 ||
        filtroMateriais.every(m => p.material?.includes(m));
      return matchBusca && matchMaterial;
    });
  }, [pontos, busca, filtroMateriais]);

  const formatarMateriais = (material) => material || 'Não informado';

  const abrirMaps = (ponto) => {
    const query = encodeURIComponent(`${ponto.logradouro || ''} ${ponto.numero || ''} ${ponto.cep || ''}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="display-5 fw-bold mb-1" style={{ color: '#1f2937' }}>
            <i className="bi bi-geo-alt-fill text-success me-2"></i>Pontos de Coleta
          </h1>
          <p className="text-muted mb-0">Encontre o ponto mais próximo e descarte seus recicláveis corretamente</p>
        </div>
        <div className="text-center px-4 py-2 rounded-3" style={{ background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)', border: '1px solid #86efac' }}>
          <div className="fw-bold text-success" style={{ fontSize: '1.5rem', lineHeight: 1 }}>{pontos.length}</div>
          <small className="text-success fw-semibold">Pontos Ativos</small>
        </div>
      </div>

      {/* Busca e Filtros */}
      <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: '20px', overflow: 'hidden' }}>
        <div className="p-4">
          <div className="row g-3 align-items-center">
            <div className="col-md-5">
              <div className="input-group" style={{ borderRadius: '14px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(5,150,105,0.1)' }}>
                <span className="input-group-text border-0 ps-3" style={{ background: '#f0fdf4' }}>
                  <i className="bi bi-search text-success fs-5"></i>
                </span>
                <input type="text" className="form-control border-0 py-3"
                  placeholder="Buscar por nome, CEP ou endereço..."
                  value={busca} onChange={e => setBusca(e.target.value)}
                  style={{ background: '#f0fdf4', boxShadow: 'none', fontSize: '0.95rem' }} />
                {busca && (
                  <button className="btn border-0 pe-3" onClick={() => setBusca('')}
                    style={{ background: '#f0fdf4', color: '#9ca3af' }}>
                    <i className="bi bi-x-circle-fill"></i>
                  </button>
                )}
              </div>
            </div>
            <div className="col-md-7">
              <div className="d-flex flex-wrap gap-2 align-items-center justify-content-md-end">
                <small className="text-muted fw-semibold me-1">Filtrar:</small>
                {Object.entries(materialConfig).map(([nome, cfg]) => (
                  <button key={nome} onClick={() => toggleMaterial(nome)}
                    className="btn btn-sm fw-semibold"
                    style={{
                      borderRadius: '20px', border: `2px solid ${cfg.color}`,
                      background: filtroMateriais.includes(nome) ? cfg.color : 'white',
                      color: filtroMateriais.includes(nome) ? 'white' : cfg.color,
                      transition: 'all 0.2s', fontSize: '0.8rem', padding: '4px 12px',
                      boxShadow: filtroMateriais.includes(nome) ? `0 4px 12px ${cfg.color}50` : 'none',
                    }}>
                    {cfg.emoji} {nome}
                  </button>
                ))}
                {(busca || filtroMateriais.length > 0) && (
                  <button className="btn btn-sm fw-semibold"
                    onClick={() => { setBusca(''); setFiltroMateriais([]); }}
                    style={{ borderRadius: '20px', border: '2px solid #ef4444', background: 'white', color: '#ef4444', fontSize: '0.8rem', padding: '4px 12px' }}>
                    <i className="bi bi-x-lg me-1"></i>Limpar
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        {(busca || filtroMateriais.length > 0) && (
          <div className="px-4 pb-3">
            <small className="text-muted">
              <i className="bi bi-funnel me-1 text-success"></i>
              Mostrando <strong>{pontosFiltrados.length}</strong> de <strong>{pontos.length}</strong> pontos
            </small>
          </div>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-success mb-3" style={{ width: '3rem', height: '3rem' }}></div>
          <p className="text-muted">Carregando pontos de coleta...</p>
        </div>
      )}

      {/* Erro */}
      {!loading && erro && (
        <div className="text-center py-5">
          <i className="bi bi-wifi-off" style={{ fontSize: '3.5rem', color: '#ef4444' }}></i>
          <h5 className="text-danger fw-bold mt-3">{erro}</h5>
          <button className="btn btn-success mt-3 px-4" onClick={carregarPontos}>
            <i className="bi bi-arrow-clockwise me-2"></i>Tentar novamente
          </button>
        </div>
      )}

      {/* Sem resultados */}
      {!loading && !erro && pontosFiltrados.length === 0 && (
        <div className="text-center py-5">
          <i className="bi bi-geo-alt" style={{ fontSize: '3.5rem', color: '#9ca3af' }}></i>
          <h5 className="text-muted mt-3">
            {pontos.length === 0 ? 'Nenhum ponto cadastrado ainda.' : 'Nenhum ponto encontrado para os filtros aplicados.'}
          </h5>
          {(busca || filtroMateriais.length > 0) && (
            <button className="btn btn-outline-success mt-2" onClick={() => { setBusca(''); setFiltroMateriais([]); }}>
              Limpar filtros
            </button>
          )}
        </div>
      )}

      {/* Cards */}
      {!loading && !erro && (
        <div className="row g-4 pb-5">
          {pontosFiltrados.map((ponto, index) => (
            <div key={ponto.id} className="col-lg-6 col-xl-4" style={{ animationDelay: `${index * 0.05}s` }}>
              <div className="card border-0 h-100"
                style={{ borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', transition: 'all 0.3s ease', cursor: 'pointer', overflow: 'hidden' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(5,150,105,0.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.07)'; }}
                onClick={() => setPontoSelecionado(ponto)}>

                <div style={{ height: '6px', background: 'linear-gradient(90deg, #10b981, #059669, #34d399)' }} />

                <div className="card-body p-4 d-flex flex-column">
                  <div className="d-flex align-items-start justify-content-between mb-3">
                    <div className="d-flex align-items-center gap-3">
                      <div className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
                        style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)' }}>
                        {ponto.imagemPonto
                          ? <img src={ponto.imagemPonto} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} />
                          : <i className="bi bi-geo-alt-fill text-success" style={{ fontSize: '1.3rem' }}></i>
                        }
                      </div>
                      <div>
                        <h6 className="fw-bold mb-0" style={{ color: '#1f2937', fontSize: '1rem' }}>{ponto.nome}</h6>
                        <small className="text-muted">
                          <i className="bi bi-mailbox me-1"></i>CEP: {ponto.cep}
                        </small>
                      </div>
                    </div>
                    <span className="badge rounded-pill px-2 py-1" style={{ background: '#dcfce7', color: '#059669', fontSize: '0.7rem', fontWeight: 700 }}>
                      <i className="bi bi-circle-fill me-1" style={{ fontSize: '0.4rem' }}></i>Ativo
                    </span>
                  </div>

                  <div className="d-flex gap-2 mb-3">
                    <div className="flex-fill p-2 rounded-3 text-center" style={{ background: '#eff6ff' }}>
                      <i className="bi bi-clock-fill text-primary d-block mb-1" style={{ fontSize: '1rem' }}></i>
                      <small className="text-primary fw-semibold" style={{ fontSize: '0.75rem' }}>{ponto.horaFuncionamento}</small>
                    </div>
                    <div className="flex-fill p-2 rounded-3 text-center" style={{ background: '#faf5ff' }}>
                      <i className="bi bi-telephone-fill d-block mb-1" style={{ fontSize: '1rem', color: '#a855f7' }}></i>
                      <small className="fw-semibold" style={{ fontSize: '0.75rem', color: '#a855f7' }}>{ponto.telefone || 'Não informado'}</small>
                    </div>
                  </div>

                  <div className="mb-4">
                    <small className="text-muted fw-semibold d-block mb-2">
                      <i className="bi bi-recycle text-success me-1"></i>Materiais aceitos
                    </small>
                    <div className="d-flex flex-wrap gap-1">
                      {formatarMateriais(ponto.material).split(', ').map((mat, i) => {
                        const cfg = materialConfig[mat] || { color: '#6b7280', emoji: '♻️' };
                        return (
                          <span key={i} className="badge rounded-pill px-2 py-1"
                            style={{ fontSize: '0.72rem', fontWeight: 600, color: 'white', background: cfg.color }}>
                            {cfg.emoji} {mat}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <button className="btn btn-success w-100 mt-auto fw-semibold"
                    style={{ borderRadius: '12px', background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', padding: '10px' }}>
                    <i className="bi bi-arrow-right-circle me-2"></i>Ver Detalhes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {pontoSelecionado && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1050, backdropFilter: 'blur(8px)' }}
          onClick={e => e.target === e.currentTarget && setPontoSelecionado(null)}>
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '24px', overflow: 'hidden' }}>

              <div style={{ background: 'linear-gradient(135deg, #059669, #10b981)', padding: '1.75rem 2rem' }}>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-3">
                    <div className="rounded-3 overflow-hidden flex-shrink-0 d-flex align-items-center justify-content-center"
                      style={{ width: '56px', height: '56px', background: 'rgba(255,255,255,0.2)' }}>
                      {ponto => ponto.imagemPonto
                        ? <img src={pontoSelecionado.imagemPonto} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        : <i className="bi bi-geo-alt-fill text-white" style={{ fontSize: '1.5rem' }}></i>
                      }
                      <i className="bi bi-geo-alt-fill text-white" style={{ fontSize: '1.5rem' }}></i>
                    </div>
                    <div>
                      <h4 className="text-white fw-bold mb-0">{pontoSelecionado.nome}</h4>
                      <small className="text-white" style={{ opacity: 0.8 }}>
                        <i className="bi bi-geo-alt me-1"></i>
                        {pontoSelecionado.logradouro
                          ? `${pontoSelecionado.logradouro}, Nº ${pontoSelecionado.numero}`
                          : `CEP: ${pontoSelecionado.cep}, Nº ${pontoSelecionado.numero}`}
                      </small>
                    </div>
                  </div>
                  <button className="btn btn-sm rounded-circle" onClick={() => setPontoSelecionado(null)}
                    style={{ background: 'rgba(255,255,255,0.2)', color: 'white', width: '36px', height: '36px', border: 'none' }}>
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
              </div>

              <div className="modal-body p-0">
                <div className="p-4 border-bottom" style={{ background: '#fafafa' }}>
                  <div className="row g-3">
                    {[
                      { label: 'Status', value: 'Ativo', icon: 'bi-check-circle-fill', color: '#10b981', bg: '#dcfce7' },
                      { label: 'Horário', value: pontoSelecionado.horaFuncionamento, icon: 'bi-clock-fill', color: '#3b82f6', bg: '#dbeafe' },
                      { label: 'Contato', value: pontoSelecionado.telefone || 'Não informado', icon: 'bi-telephone-fill', color: '#a855f7', bg: '#f3e8ff' },
                      { label: 'Materiais', value: `${formatarMateriais(pontoSelecionado.material).split(', ').length} tipos`, icon: 'bi-recycle', color: '#f59e0b', bg: '#fef3c7' },
                    ].map((item, i) => (
                      <div key={i} className="col-6 col-md-3">
                        <div className="text-center p-3 rounded-3" style={{ background: item.bg }}>
                          <i className={`bi ${item.icon} d-block mb-1`} style={{ fontSize: '1.4rem', color: item.color }}></i>
                          <div className="fw-bold" style={{ color: item.color, fontSize: '0.8rem' }}>{item.label}</div>
                          <div style={{ color: item.color, fontSize: '0.78rem', fontWeight: 500 }}>{item.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4">
                  <div className="row g-4">
                    <div className="col-md-6">
                      <h6 className="fw-bold text-success mb-3">
                        <i className="bi bi-geo-alt-fill me-2"></i>Localização
                      </h6>
                      <div className="p-3 rounded-3 mb-2" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                        <small className="text-muted d-block mb-1">Endereço</small>
                        <span className="fw-semibold" style={{ color: '#1f2937' }}>
                          {pontoSelecionado.logradouro
                            ? `${pontoSelecionado.logradouro}, Nº ${pontoSelecionado.numero}`
                            : `CEP: ${pontoSelecionado.cep}, Nº ${pontoSelecionado.numero}`}
                        </span>
                      </div>
                      {pontoSelecionado.complemento && (
                        <div className="p-3 rounded-3 mb-2" style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}>
                          <small className="text-muted d-block mb-1">Complemento</small>
                          <span className="fw-semibold" style={{ color: '#1f2937' }}>{pontoSelecionado.complemento}</span>
                        </div>
                      )}
                      <button className="btn btn-outline-success w-100 mt-2 fw-semibold"
                        onClick={() => abrirMaps(pontoSelecionado)}
                        style={{ borderRadius: '12px', border: '2px solid #10b981' }}>
                        <i className="bi bi-map me-2"></i>Abrir no Google Maps
                      </button>
                    </div>

                    <div className="col-md-6">
                      <h6 className="fw-bold text-success mb-3">
                        <i className="bi bi-recycle me-2"></i>Materiais Aceitos
                      </h6>
                      <div className="row g-2">
                        {formatarMateriais(pontoSelecionado.material).split(', ').map((mat, i) => {
                          const cfg = materialConfig[mat] || { color: '#6b7280', emoji: '♻️' };
                          return (
                            <div key={i} className="col-6">
                              <div className="text-center p-2 rounded-3"
                                style={{ background: `${cfg.color}15`, border: `1px solid ${cfg.color}30` }}>
                                <div style={{ fontSize: '1.5rem' }}>{cfg.emoji}</div>
                                <small className="fw-bold" style={{ color: cfg.color, fontSize: '0.78rem' }}>{mat}</small>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {pontoSelecionado.descricao && (
                      <div className="col-12">
                        <div className="p-3 rounded-3" style={{ background: '#fffbeb', border: '1px solid #fde68a' }}>
                          <h6 className="fw-bold mb-2" style={{ color: '#92400e' }}>
                            <i className="bi bi-info-circle me-2"></i>Sobre este ponto
                          </h6>
                          <p className="mb-0 text-muted" style={{ fontSize: '0.9rem' }}>{pontoSelecionado.descricao}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4 border-top d-flex gap-3" style={{ background: '#fafafa' }}>
                <button className="btn btn-outline-success flex-fill fw-semibold"
                  onClick={() => pontoSelecionado.telefone && window.open(`tel:${pontoSelecionado.telefone}`)}
                  disabled={!pontoSelecionado.telefone}
                  style={{ borderRadius: '12px', border: '2px solid #10b981', padding: '12px' }}>
                  <i className="bi bi-telephone-fill me-2"></i>Ligar
                </button>
                <button className="btn btn-success flex-fill fw-semibold"
                  onClick={() => abrirMaps(pontoSelecionado)}
                  style={{ borderRadius: '12px', background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', padding: '12px' }}>
                  <i className="bi bi-map me-2"></i>Como Chegar
                </button>
                <button className="btn btn-light fw-semibold"
                  onClick={() => setPontoSelecionado(null)}
                  style={{ borderRadius: '12px', padding: '12px 20px' }}>
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PontosColeta;
