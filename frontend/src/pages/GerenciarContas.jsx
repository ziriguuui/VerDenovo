import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import ConfirmModal from '../components/ConfirmModal';

function GerenciarContas() {
  const [usuarios, setUsuarios] = useState([]);
  const [pontos, setPontos] = useState([]);
  const [pendentes, setPendentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [buscaUsuario, setBuscaUsuario] = useState('');
  const [buscaPonto, setBuscaPonto] = useState('');
  const [aba, setAba] = useState('usuarios');

  useEffect(() => { carregarDados(); }, []);

  const carregarDados = async () => {
    try {
      const [pontosData, usuariosData, pendentesData] = await Promise.all([
        apiService.listarTodosPontos(),
        apiService.listarUsuarios(),
        apiService.listarPontosPendentes()
      ]);
      setPontos(pontosData.filter(p => p.statusPonto !== 'PENDENTE').map(p => ({
        id: p.id, nome: p.nome, cep: p.cep, material: p.material,
        horaFuncionamento: p.horaFuncionamento, ativo: p.statusPonto === 'ATIVO'
      })));
      setPendentes(pendentesData.map(p => ({
        id: p.id, nome: p.nome, cep: p.cep, material: p.material,
        horaFuncionamento: p.horaFuncionamento, email: p.email,
        telefone: p.telefone, descricao: p.descricao, logradouro: p.logradouro
      })));
      setUsuarios(usuariosData.map(u => ({
        id: u.id, nome: u.nome, email: u.email,
        ativo: u.statusUsuario === 'ATIVO', nivelAcesso: u.nivelAcesso
      })));
    } catch (e) {
      setErro('Erro ao carregar dados. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  };

  const alterarStatus = async (tipo, id) => {
    try {
      if (tipo === 'usuarios') await apiService.alterarStatusUsuario(id);
      else await apiService.alterarStatusPonto(id);
      carregarDados();
    } catch (e) { setErro(e.message || 'Erro ao alterar status.'); }
  };

  const aprovarPonto = async (id) => {
    try {
      await apiService.aprovarPonto(id);
      carregarDados();
    } catch (e) { setErro(e.message || 'Erro ao aprovar ponto.'); }
  };

  const rejeitarPonto = (id, nome) => {
    setConfirm({
      titulo: 'Rejeitar ponto',
      mensagem: `Tem certeza que deseja rejeitar "${nome}"? Ele não aparecerá no site.`,
      corBotao: 'warning',
      onConfirmar: async () => {
        setConfirm(null);
        try {
          await apiService.rejeitarPonto(id);
          carregarDados();
        } catch (e) { setErro(e.message || 'Erro ao rejeitar ponto.'); }
      },
      onCancelar: () => setConfirm(null)
    });
  };

  const pedirConfirmacaoExclusao = (tipo, id, nome) => {
    setConfirm({
      titulo: 'Excluir conta',
      mensagem: `Tem certeza que deseja excluir "${nome}"? Esta ação não pode ser desfeita.`,
      onConfirmar: async () => {
        setConfirm(null);
        try {
          if (tipo === 'pontos') await apiService.deletarPonto(id);
          else await apiService.deletarUsuario(id);
          carregarDados();
        } catch (e) { setErro(e.message || 'Erro ao excluir.'); }
      },
      onCancelar: () => setConfirm(null)
    });
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{minHeight: '60vh', marginTop: '100px'}}>
        <div className="text-center">
          <div className="spinner-border text-danger mb-3" style={{width: '3rem', height: '3rem'}}></div>
          <p className="text-muted">Carregando dados...</p>
        </div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{minHeight: '60vh', marginTop: '100px'}}>
        <div className="text-center">
          <i className="bi bi-wifi-off" style={{fontSize: '3.5rem', color: '#ef4444'}}></i>
          <h5 className="text-danger fw-bold mt-3">{erro}</h5>
          <p className="text-muted">Verifique se o backend está rodando em <code>http://localhost:8080</code></p>
          <button className="btn btn-danger mt-2 px-4" onClick={() => { setErro(''); setLoading(true); carregarDados(); }}>
            <i className="bi bi-arrow-clockwise me-2"></i>Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  const usuariosFiltrados = usuarios.filter(u =>
    !buscaUsuario ||
    u.nome?.toLowerCase().includes(buscaUsuario.toLowerCase()) ||
    u.email?.toLowerCase().includes(buscaUsuario.toLowerCase())
  );

  const pontosFiltrados = pontos.filter(p =>
    !buscaPonto ||
    p.nome?.toLowerCase().includes(buscaPonto.toLowerCase()) ||
    p.cep?.includes(buscaPonto)
  );

  const btn = { borderRadius: '12px', border: 'none', color: 'white', transition: 'all 0.2s' };

  const abas = [
    { id: 'usuarios', label: 'Usuários', icon: 'bi-people-fill', count: usuarios.length },
    { id: 'pontos', label: 'Pontos Ativos', icon: 'bi-geo-alt-fill', count: pontos.length },
    { id: 'pendentes', label: 'Aguardando Aprovação', icon: 'bi-hourglass-split', count: pendentes.length, badge: true },
  ];

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-5" style={{marginTop: '100px'}}>
        <div className="d-inline-flex align-items-center justify-content-center mb-4" style={{
          width: '120px', height: '120px',
          background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
          borderRadius: '50%', boxShadow: '0 20px 60px rgba(220,38,38,0.4)',
          border: '4px solid rgba(255,255,255,0.2)'
        }}>
          <i className="bi bi-shield-lock text-white" style={{fontSize: '3.5rem'}}></i>
        </div>
        <h1 className="fw-bold mb-3" style={{fontSize: '3.5rem', color: '#1e293b'}}>
          <span style={{color: '#dc2626'}}>Área</span> Administrativa
        </h1>
        <p className="text-muted fs-5 mb-0" style={{maxWidth: '600px', margin: '0 auto'}}>
          Gerencie usuários, pontos de coleta e monitore o sistema
        </p>
      </div>

      <div className="container">

        {/* Cards de estatísticas */}
        <div className="row mb-4 g-3">
          <div className="col-md-4">
            <div className="card border-0 text-center p-4" style={{borderRadius: '20px', background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)'}}>
              <h2 className="fw-bold mb-0" style={{color: '#1d4ed8'}}>{usuarios.length}</h2>
              <small className="text-muted">Usuários · {usuarios.filter(u => u.ativo).length} ativos</small>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 text-center p-4" style={{borderRadius: '20px', background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)'}}>
              <h2 className="fw-bold mb-0" style={{color: '#047857'}}>{pontos.length}</h2>
              <small className="text-muted">Pontos · {pontos.filter(p => p.ativo).length} ativos</small>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 text-center p-4" style={{borderRadius: '20px', background: pendentes.length > 0 ? 'linear-gradient(135deg, #fef3c7, #fde68a)' : 'linear-gradient(135deg, #f1f5f9, #e2e8f0)'}}>
              <h2 className="fw-bold mb-0" style={{color: pendentes.length > 0 ? '#d97706' : '#64748b'}}>{pendentes.length}</h2>
              <small className="text-muted">Aguardando aprovação</small>
            </div>
          </div>
        </div>

        {/* Abas */}
        <div className="d-flex gap-2 mb-4 flex-wrap">
          {abas.map(a => (
            <button key={a.id} onClick={() => setAba(a.id)}
              className="btn fw-bold px-4 py-2 position-relative"
              style={{
                borderRadius: '12px',
                background: aba === a.id ? 'linear-gradient(135deg, #10b981, #059669)' : 'white',
                color: aba === a.id ? 'white' : '#4b5563',
                border: `2px solid ${aba === a.id ? '#10b981' : '#e5e7eb'}`,
              }}>
              <i className={`bi ${a.icon} me-2`}></i>{a.label}
              {a.badge && a.count > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: '0.7rem'}}>
                  {a.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Aba Usuários */}
        {aba === 'usuarios' && (
          <div className="card border-0 shadow-lg mb-5" style={{borderRadius: '25px'}}>
            <div className="card-header border-0" style={{background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', borderRadius: '25px 25px 0 0', padding: '2rem'}}>
              <div className="d-flex align-items-center">
                <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '55px', height: '55px', background: 'rgba(255,255,255,0.2)'}}>
                  <i className="bi bi-people-fill text-white" style={{fontSize: '1.5rem'}}></i>
                </div>
                <div>
                  <h4 className="text-white mb-0 fw-bold">Usuários Cadastrados</h4>
                  <p className="text-white-50 mb-0">Total: {usuarios.length} contas</p>
                </div>
              </div>
            </div>
            <div className="card-body p-4">
              <div className="input-group mb-3">
                <span className="input-group-text bg-white"><i className="bi bi-search text-muted"></i></span>
                <input type="text" className="form-control" placeholder="Buscar por nome ou email..."
                  value={buscaUsuario} onChange={e => setBuscaUsuario(e.target.value)} style={{boxShadow: 'none'}} />
                {buscaUsuario && <button className="btn btn-outline-secondary" onClick={() => setBuscaUsuario('')}><i className="bi bi-x"></i></button>}
              </div>
              {usuariosFiltrados.length === 0 && <p className="text-muted text-center py-3">Nenhum usuário encontrado.</p>}
              {usuariosFiltrados.map((u, i) => (
                <div key={u.id} className="p-4 mb-3 rounded-4"
                  style={{background: i % 2 === 0 ? 'rgba(59,130,246,0.05)' : 'rgba(248,250,252,0.8)', border: '1px solid rgba(59,130,246,0.1)', transition: 'all 0.3s'}}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(8px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(59,130,246,0.15)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                    <div className="d-flex align-items-center">
                      <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{
                        width: '50px', height: '50px',
                        background: u.nivelAcesso === 'ADMIN' ? 'linear-gradient(135deg, #dc2626, #b91c1c)' : 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
                      }}>
                        <i className={`bi ${u.nivelAcesso === 'ADMIN' ? 'bi-shield-lock' : 'bi-person'} text-white`}></i>
                      </div>
                      <div>
                        <h6 className="mb-1 fw-bold text-dark">
                          {u.nome}
                          {u.nivelAcesso === 'ADMIN' && <span className="badge bg-danger ms-2" style={{fontSize: '0.7rem'}}>ADMIN</span>}
                        </h6>
                        <small className="text-muted">{u.email}</small>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                      {u.nivelAcesso !== 'ADMIN' ? (
                        <>
                          <span className="badge px-3 py-2 rounded-pill fw-bold" style={{background: u.ativo ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)', color: 'white', border: 'none'}}>
                            {u.ativo ? '✨ Ativo' : '⚠️ Inativo'}
                          </span>
                          <button className="btn btn-sm px-3 py-2 fw-bold" onClick={() => alterarStatus('usuarios', u.id)}
                            style={{...btn, background: u.ativo ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'linear-gradient(135deg, #10b981, #059669)'}}>
                            <i className={`bi ${u.ativo ? 'bi-pause-circle-fill' : 'bi-play-circle-fill'} me-1`}></i>
                            {u.ativo ? 'Desativar' : 'Ativar'}
                          </button>
                          <button className="btn btn-sm px-3 py-2 fw-bold" onClick={() => pedirConfirmacaoExclusao('usuarios', u.id, u.nome)}
                            style={{...btn, background: 'linear-gradient(135deg, #ef4444, #dc2626)'}}>
                            <i className="bi bi-trash3-fill me-1"></i>Excluir
                          </button>
                        </>
                      ) : (
                        <span className="text-muted fst-italic"><i className="bi bi-shield-lock me-2"></i>Conta Protegida</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Aba Pontos Ativos */}
        {aba === 'pontos' && (
          <div className="card border-0 shadow-lg mb-5" style={{borderRadius: '25px'}}>
            <div className="card-header border-0" style={{background: 'linear-gradient(135deg, #10b981, #047857)', borderRadius: '25px 25px 0 0', padding: '2rem'}}>
              <div className="d-flex align-items-center">
                <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '55px', height: '55px', background: 'rgba(255,255,255,0.2)'}}>
                  <i className="bi bi-geo-alt-fill text-white" style={{fontSize: '1.5rem'}}></i>
                </div>
                <div>
                  <h4 className="text-white mb-0 fw-bold">Pontos de Coleta</h4>
                  <p className="text-white-50 mb-0">Total: {pontos.length} locais</p>
                </div>
              </div>
            </div>
            <div className="card-body p-4">
              {pontos.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-geo-alt" style={{fontSize: '4rem', color: '#9ca3af'}}></i>
                  <h5 className="text-muted mt-3">Nenhum ponto cadastrado</h5>
                </div>
              ) : (
                <>
                  <div className="input-group mb-3">
                    <span className="input-group-text bg-white"><i className="bi bi-search text-muted"></i></span>
                    <input type="text" className="form-control" placeholder="Buscar por nome ou CEP..."
                      value={buscaPonto} onChange={e => setBuscaPonto(e.target.value)} style={{boxShadow: 'none'}} />
                    {buscaPonto && <button className="btn btn-outline-secondary" onClick={() => setBuscaPonto('')}><i className="bi bi-x"></i></button>}
                  </div>
                  {pontosFiltrados.length === 0 && <p className="text-muted text-center py-3">Nenhum ponto encontrado.</p>}
                  {pontosFiltrados.map((p, i) => (
                    <div key={p.id} className="p-4 mb-3 rounded-4"
                      style={{background: i % 2 === 0 ? 'rgba(16,185,129,0.05)' : 'rgba(248,250,252,0.8)', border: '1px solid rgba(16,185,129,0.1)', transition: 'all 0.3s'}}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(8px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(16,185,129,0.15)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                        <div className="d-flex align-items-center">
                          <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px', background: 'linear-gradient(135deg, #10b981, #047857)'}}>
                            <i className="bi bi-geo-alt text-white"></i>
                          </div>
                          <div>
                            <h6 className="mb-1 fw-bold text-dark">{p.nome}</h6>
                            <small className="text-muted">CEP: {p.cep} · {p.material}</small>
                            <div><small className="text-success fw-bold">{p.horaFuncionamento}</small></div>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2 flex-wrap">
                          <span className="badge px-3 py-2 rounded-pill fw-bold" style={{background: p.ativo ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)', color: 'white', border: 'none'}}>
                            {p.ativo ? '✨ Ativo' : '⚠️ Inativo'}
                          </span>
                          <button className="btn btn-sm px-3 py-2 fw-bold" onClick={() => alterarStatus('pontos', p.id)}
                            style={{...btn, background: p.ativo ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'linear-gradient(135deg, #10b981, #059669)'}}>
                            <i className={`bi ${p.ativo ? 'bi-pause-circle-fill' : 'bi-play-circle-fill'} me-1`}></i>
                            {p.ativo ? 'Desativar' : 'Ativar'}
                          </button>
                          <button className="btn btn-sm px-3 py-2 fw-bold" onClick={() => pedirConfirmacaoExclusao('pontos', p.id, p.nome)}
                            style={{...btn, background: 'linear-gradient(135deg, #ef4444, #dc2626)'}}>
                            <i className="bi bi-trash3-fill me-1"></i>Excluir
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        )}

        {/* Aba Pendentes */}
        {aba === 'pendentes' && (
          <div className="card border-0 shadow-lg mb-5" style={{borderRadius: '25px'}}>
            <div className="card-header border-0" style={{background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderRadius: '25px 25px 0 0', padding: '2rem'}}>
              <div className="d-flex align-items-center">
                <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '55px', height: '55px', background: 'rgba(255,255,255,0.2)'}}>
                  <i className="bi bi-hourglass-split text-white" style={{fontSize: '1.5rem'}}></i>
                </div>
                <div>
                  <h4 className="text-white mb-0 fw-bold">Aguardando Aprovação</h4>
                  <p className="text-white-50 mb-0">{pendentes.length} ponto{pendentes.length !== 1 ? 's' : ''} para revisar</p>
                </div>
              </div>
            </div>
            <div className="card-body p-4">
              {pendentes.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-check-circle" style={{fontSize: '4rem', color: '#10b981'}}></i>
                  <h5 className="text-success mt-3">Tudo em dia!</h5>
                  <p className="text-muted">Nenhum ponto aguardando aprovação.</p>
                </div>
              ) : (
                pendentes.map((p, i) => (
                  <div key={p.id} className="p-4 mb-4 rounded-4" style={{background: 'rgba(245,158,11,0.05)', border: '2px solid rgba(245,158,11,0.2)'}}>
                    <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-3">
                      <div className="d-flex align-items-center">
                        <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px', background: 'linear-gradient(135deg, #f59e0b, #d97706)', flexShrink: 0}}>
                          <i className="bi bi-geo-alt text-white"></i>
                        </div>
                        <div>
                          <h6 className="mb-1 fw-bold text-dark">{p.nome}</h6>
                          <small className="text-muted">CEP: {p.cep}{p.logradouro ? ` · ${p.logradouro}` : ''}</small>
                        </div>
                      </div>
                      <span className="badge px-3 py-2 rounded-pill fw-bold" style={{background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: 'white', border: 'none'}}>
                        ⏳ Pendente
                      </span>
                    </div>
                    <div className="row g-2 mb-3">
                      {p.material && (
                        <div className="col-md-4">
                          <small className="text-muted d-block"><i className="bi bi-recycle me-1 text-success"></i>Materiais</small>
                          <small className="fw-medium">{p.material}</small>
                        </div>
                      )}
                      {p.horaFuncionamento && (
                        <div className="col-md-4">
                          <small className="text-muted d-block"><i className="bi bi-clock me-1 text-primary"></i>Horário</small>
                          <small className="fw-medium">{p.horaFuncionamento}</small>
                        </div>
                      )}
                      {p.email && (
                        <div className="col-md-4">
                          <small className="text-muted d-block"><i className="bi bi-envelope me-1 text-info"></i>Email</small>
                          <small className="fw-medium">{p.email}</small>
                        </div>
                      )}
                      {p.telefone && (
                        <div className="col-md-4">
                          <small className="text-muted d-block"><i className="bi bi-telephone me-1 text-purple"></i>Telefone</small>
                          <small className="fw-medium">{p.telefone}</small>
                        </div>
                      )}
                    </div>
                    {p.descricao && (
                      <div className="p-3 rounded-3 mb-3" style={{background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)'}}>
                        <small className="text-muted d-block mb-1"><i className="bi bi-card-text me-1"></i>Descrição</small>
                        <small>{p.descricao}</small>
                      </div>
                    )}
                    <div className="d-flex gap-2 flex-wrap">
                      <button className="btn fw-bold px-4 py-2" onClick={() => aprovarPonto(p.id)}
                        style={{...btn, background: 'linear-gradient(135deg, #10b981, #059669)'}}>
                        <i className="bi bi-check-circle-fill me-2"></i>Aprovar
                      </button>
                      <button className="btn fw-bold px-4 py-2" onClick={() => rejeitarPonto(p.id, p.nome)}
                        style={{...btn, background: 'linear-gradient(135deg, #ef4444, #dc2626)'}}>
                        <i className="bi bi-x-circle-fill me-2"></i>Rejeitar
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </div>
      {confirm && <ConfirmModal {...confirm} />}
    </div>
  );
}

export default GerenciarContas;
