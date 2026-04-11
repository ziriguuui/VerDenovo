import { useState, useEffect, useMemo } from 'react';
import { apiService } from '../services/api';

const materialConfig = {
  'Papel':      { icon: 'bi-file-earmark-text-fill', color: '#3b82f6' },
  'Plástico':   { icon: 'bi-cup-fill',               color: '#ef4444' },
  'Vidro':      { icon: 'bi-cup-straw',              color: '#10b981' },
  'Metal':      { icon: 'bi-gear-fill',              color: '#f59e0b' },
  'Eletrônico': { icon: 'bi-phone-fill',             color: '#8b5cf6' },
  'Orgânico':   { icon: 'bi-flower1',                color: '#84cc16' },
};

function PontosColeta() {
  const [pontos, setPontos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [pontoSelecionado, setPontoSelecionado] = useState(null);
  const [busca, setBusca] = useState('');
  const [filtroMateriais, setFiltroMateriais] = useState([]);

  useEffect(() => {
    carregarPontos();
  }, []);

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
        p.cep?.includes(termoBusca);
      const matchMaterial = filtroMateriais.length === 0 ||
        filtroMateriais.every(m => p.material?.includes(m));
      return matchBusca && matchMaterial;
    });
  }, [pontos, busca, filtroMateriais]);

  const formatarMateriais = (material) => material || 'Não informado';

  const entrarEmContato = (ponto) => {
    if (ponto.telefone) {
      window.open(`tel:${ponto.telefone}`);
    }
  };

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', padding: '2rem 0', marginTop: '72px' }}>
      <div className="container">

        {/* Cabeçalho */}
        <div className="d-flex justify-content-between align-items-center mb-4 animate-fadeInUp">
          <div>
            <h1 className="display-5 fw-bold text-success mb-1 animate-slideInLeft">Pontos de Coleta</h1>
            <p className="text-muted mb-0">Gerencie e visualize todos os pontos de coleta cadastrados</p>
          </div>
          <div className="d-flex align-items-center gap-2">
            <div className="bg-light rounded-pill px-3 py-2">
              <small className="text-muted fw-medium">
                <i className="bi bi-geo-alt text-success me-1"></i>
                {pontosFiltrados.length} {(pontosFiltrados.length !== pontos.length) ? `de ${pontos.length}` : ''} pontos
              </small>
            </div>
            <div className="bg-success bg-opacity-10 rounded-pill px-3 py-2">
              <small className="text-success fw-bold">
                <i className="bi bi-check-circle me-1"></i>Sistema Online
              </small>
            </div>
          </div>
        </div>

        {/* Busca e Filtros */}
        <div className="card border-0 shadow-sm mb-4 animate-fadeInUp animate-delay-1" style={{ borderRadius: '20px', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)' }}>
          <div className="card-body p-4">
            <div className="row g-3 align-items-center">
              <div className="col-md-5">
                <div className="input-group" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                  <span className="input-group-text border-0" style={{ background: '#f0fdf4' }}>
                    <i className="bi bi-search text-success"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control border-0"
                    placeholder="Buscar por nome ou CEP..."
                    value={busca}
                    onChange={e => setBusca(e.target.value)}
                    style={{ background: '#f0fdf4', boxShadow: 'none', fontSize: '0.95rem' }}
                  />
                  {busca && (
                    <button className="btn border-0" onClick={() => setBusca('')}
                      style={{ background: '#f0fdf4', color: '#6b7280' }}>
                      <i className="bi bi-x-lg"></i>
                    </button>
                  )}
                </div>
              </div>
              <div className="col-md-7">
                <div className="d-flex flex-wrap gap-2 align-items-center justify-content-end">
                  {Object.entries(materialConfig).map(([nome, cfg]) => (
                    <button
                      key={nome}
                      onClick={() => toggleMaterial(nome)}
                      className="btn btn-sm fw-medium"
                      style={{
                        borderRadius: '20px',
                        border: `2px solid ${cfg.color}`,
                        background: filtroMateriais.includes(nome) ? cfg.color : 'white',
                        color: filtroMateriais.includes(nome) ? 'white' : cfg.color,
                        transition: 'all 0.2s',
                        fontSize: '0.8rem',
                        boxShadow: filtroMateriais.includes(nome) ? `0 4px 12px ${cfg.color}40` : 'none',
                      }}
                    >
                      {nome}
                    </button>
                  ))}
                  {(busca || filtroMateriais.length > 0) && (
                    <button className="btn btn-sm fw-medium" title="Limpar filtros"
                      onClick={() => { setBusca(''); setFiltroMateriais([]); }}
                      style={{ borderRadius: '20px', border: '2px solid #ef4444', background: 'white', color: '#ef4444', transition: 'all 0.2s', fontSize: '0.8rem' }}>
                      <i className="bi bi-x-lg me-1"></i>Limpar
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Estado de loading */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-success mb-3" style={{ width: '3rem', height: '3rem' }}></div>
            <p className="text-muted">Carregando pontos de coleta...</p>
          </div>
        )}

        {/* Estado de erro */}
        {!loading && erro && (
          <div className="text-center py-5">
            <div className="mb-3">
              <i className="bi bi-wifi-off" style={{ fontSize: '3.5rem', color: '#ef4444' }}></i>
            </div>
            <h5 className="text-danger fw-bold">{erro}</h5>
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

        {/* Lista de pontos */}
        {!loading && !erro && (
          <div className="row g-4">
            {pontosFiltrados.map((ponto, index) => (
              <div key={ponto.id} className="col-lg-6 col-xl-4">
                <div className="card border-0 shadow-lg position-relative overflow-hidden hover-lift h-100 animate-scaleIn"
                  style={{ borderRadius: '20px', background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)', minHeight: '420px', animationDelay: `${index * 0.06}s` }}>

                  <div className="position-absolute top-0 end-0 m-3">
                    <div className="d-flex align-items-center bg-success bg-opacity-10 rounded-pill px-3 py-1">
                      <div className="bg-success rounded-circle me-2" style={{ width: '8px', height: '8px', animation: 'pulse 2s infinite' }}></div>
                      <small className="text-success fw-bold">Ativo</small>
                    </div>
                  </div>

                  <div className="card-body p-4 d-flex flex-column h-100">
                    <div className="mb-3">
                      <h5 className="card-title mb-1 fw-bold d-flex align-items-center" style={{ color: '#1f2937', fontSize: '1.15rem' }}>
                        <i className="bi bi-geo-alt text-success me-2"></i>{ponto.nome}
                      </h5>
                      <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>
                        <i className="bi bi-mailbox me-1"></i>CEP: {ponto.cep}
                      </p>
                    </div>

                    <div className="mb-3">
                      <div className="row g-2">
                        <div className="col-6">
                          <div className="d-flex align-items-center p-2 rounded" style={{ background: 'rgba(59,130,246,0.05)' }}>
                            <i className="bi bi-clock text-primary me-2"></i>
                            <small className="text-dark">{ponto.horaFuncionamento}</small>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="d-flex align-items-center p-2 rounded" style={{ background: 'rgba(168,85,247,0.05)' }}>
                            <i className="bi bi-telephone text-purple me-2"></i>
                            <small className="text-dark">{ponto.telefone || 'Não informado'}</small>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h6 className="text-success fw-bold mb-2" style={{ fontSize: '0.9rem' }}>
                        <i className="bi bi-recycle me-2"></i>Materiais Aceitos
                      </h6>
                      <div className="d-flex flex-wrap gap-1">
                        {formatarMateriais(ponto.material).split(', ').map((mat, i) => {
                          const cfg = materialConfig[mat] || { icon: 'bi-check-circle', color: '#6b7280' };
                          return (
                            <span key={i} className="badge rounded-pill px-2 py-1"
                              style={{ fontSize: '0.75rem', fontWeight: '600', color: 'white', backgroundColor: cfg.color }}>
                              <i className={`bi ${cfg.icon} me-1`}></i>{mat}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-auto">
                      <button className="btn btn-success w-100"
                        onClick={() => setPontoSelecionado(ponto)}
                        style={{ borderRadius: '12px', padding: '10px', fontWeight: '600', background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none' }}>
                        <i className="bi bi-arrow-right-circle me-2"></i>Ver Detalhes
                      </button>
                    </div>
                  </div>

                  <div className="position-absolute bottom-0 start-0 w-100" style={{ height: '4px', background: 'linear-gradient(90deg, #10b981, #059669, #34d399)' }}></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal de detalhes */}
        {pontoSelecionado && (
          <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1050, backdropFilter: 'blur(8px)', animation: 'modalFadeIn 0.3s ease-out' }}>
            <div className="modal-dialog modal-xl modal-dialog-centered">
              <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '25px', animation: 'modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>

                <div className="modal-header position-relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #059669, #10b981)', borderRadius: '25px 25px 0 0', padding: '2rem' }}>
                  <div className="d-flex align-items-center position-relative">
                    <div className="rounded-circle bg-white bg-opacity-20 d-flex align-items-center justify-content-center me-3" style={{ width: '60px', height: '60px', minWidth: '60px' }}>
                      {pontoSelecionado.imagemPonto
                        ? <img src={pontoSelecionado.imagemPonto} alt="Foto" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                        : <img src="/Verdenovologo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                      }
                    </div>
                    <div>
                      <h4 className="modal-title text-white mb-1 fw-bold">{pontoSelecionado.nome}</h4>
                      <p className="text-white-50 mb-0">📍 CEP: {pontoSelecionado.cep}</p>
                    </div>
                  </div>
                  <button type="button" className="btn-close btn-close-white position-relative" onClick={() => setPontoSelecionado(null)}></button>
                </div>

                <div className="modal-body p-0">
                  <div className="p-4 border-bottom" style={{ background: 'rgba(16,185,129,0.03)' }}>
                    <div className="row g-3">
                      {[
                        { label: 'Status', value: 'Ponto Ativo', icon: 'bi-check-circle-fill', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
                        { label: 'Horário', value: pontoSelecionado.horaFuncionamento, icon: 'bi-clock-fill', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
                        { label: 'Contato', value: pontoSelecionado.telefone || 'Não informado', icon: 'bi-telephone-fill', color: '#a855f7', bg: 'rgba(168,85,247,0.1)' },
                        { label: 'Materiais', value: `${formatarMateriais(pontoSelecionado.material).split(', ').length} tipos`, icon: 'bi-arrow-repeat', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
                      ].map((item, i) => (
                        <div key={i} className="col-md-3">
                          <div className="text-center p-3 rounded-4 hover-card" style={{ background: item.bg }}>
                            <div className="mx-auto mb-2 d-flex align-items-center justify-content-center icon-bounce"
                              style={{ width: '55px', height: '55px', borderRadius: '50%', background: item.color }}>
                              <i className={`bi ${item.icon} text-white`} style={{ fontSize: '1.5rem' }}></i>
                            </div>
                            <h6 className="fw-bold mb-1" style={{ color: item.color }}>{item.label}</h6>
                            <small style={{ color: item.color }}>{item.value}</small>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="row g-4">
                      <div className="col-lg-6">
                        <div className="h-100 p-4 rounded-4 hover-section" style={{ border: '1px solid rgba(16,185,129,0.1)' }}>
                          <h5 className="text-success fw-bold mb-4 d-flex align-items-center">
                            <div className="rounded-circle bg-success d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', minWidth: '40px' }}>
                              <i className="bi bi-geo-alt text-white"></i>
                            </div>
                            Localização
                          </h5>
                          <div className="d-flex align-items-start p-3 rounded-3 mb-2 hover-info" style={{ background: 'rgba(16,185,129,0.05)' }}>
                            <i className="bi bi-house-door text-success me-3 mt-1"></i>
                            <div>
                              <h6 className="fw-bold mb-1">Endereço</h6>
                              <p className="text-muted mb-0">CEP: {pontoSelecionado.cep}, Nº {pontoSelecionado.numero}</p>
                            </div>
                          </div>
                          <div className="d-flex align-items-start p-3 rounded-3 hover-info" style={{ background: 'rgba(59,130,246,0.05)' }}>
                            <i className="bi bi-geo-alt text-primary me-3 mt-1"></i>
                            <div>
                              <h6 className="fw-bold mb-1">Complemento</h6>
                              <p className="text-muted mb-0">{pontoSelecionado.complemento || 'Não informado'}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="h-100 p-4 rounded-4 hover-section" style={{ border: '1px solid rgba(16,185,129,0.1)' }}>
                          <h5 className="text-success fw-bold mb-4 d-flex align-items-center">
                            <div className="rounded-circle bg-success d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', minWidth: '40px' }}>
                              <i className="bi bi-recycle text-white"></i>
                            </div>
                            Materiais Aceitos
                          </h5>
                          <div className="row g-2">
                            {formatarMateriais(pontoSelecionado.material).split(', ').map((mat, i) => {
                              const cfg = materialConfig[mat] || { icon: 'bi-check-circle-fill', color: '#6b7280', bg: 'rgba(107,114,128,0.1)' };
                              return (
                                <div key={i} className="col-6">
                                  <div className="text-center p-3 rounded-3 hover-material"
                                    style={{ background: `${cfg.color}18`, border: `1px solid ${cfg.color}30` }}>
                                    <div className="mx-auto mb-2 d-flex align-items-center justify-content-center icon-pulse"
                                      style={{ width: '45px', height: '45px', borderRadius: '50%', background: cfg.color }}>
                                      <i className={`bi ${cfg.icon} text-white`} style={{ fontSize: '1.2rem' }}></i>
                                    </div>
                                    <h6 className="fw-bold mb-0" style={{ color: cfg.color, fontSize: '0.85rem' }}>{mat}</h6>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          <div className="mt-3 p-3 rounded-3 hover-tip" style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.15)' }}>
                            <div className="d-flex align-items-center">
                              <i className="bi bi-exclamation-triangle text-warning me-2"></i>
                              <small className="text-muted">Certifique-se de limpar os materiais antes de depositar</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer border-0 p-4" style={{ background: 'rgba(248,250,252,0.8)', borderRadius: '0 0 25px 25px' }}>
                  <div className="d-flex gap-3 w-100">
                    <button className="btn btn-outline-success flex-fill"
                      onClick={() => entrarEmContato(pontoSelecionado)}
                      disabled={!pontoSelecionado.telefone}
                      style={{ borderRadius: '12px', padding: '12px', fontWeight: '600', border: '2px solid #10b981' }}>
                      <i className="bi bi-telephone-fill me-2"></i>Entrar em Contato
                    </button>
                    <button className="btn btn-success flex-fill"
                      onClick={() => setPontoSelecionado(null)}
                      style={{ borderRadius: '12px', padding: '12px', fontWeight: '600', background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none' }}>
                      <i className="bi bi-check-circle-fill me-2"></i>Fechar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PontosColeta;
