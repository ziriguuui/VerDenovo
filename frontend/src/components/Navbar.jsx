import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';

function Navbar() {
  const { usuario, logout, isLogado } = useAuth();
  const location = useLocation();
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuAberto ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuAberto]);

  useEffect(() => { setMenuAberto(false); }, [location]);

  const handleLogout = () => { logout(); setMenuAberto(false); };
  const fechar = () => setMenuAberto(false);
  return (
    <>
      <style>{`
        .nav-section { background: rgba(255,255,255,0.7); backdrop-filter: blur(10px); border-radius: 20px; margin-bottom: 1.5rem; padding: 1.5rem; box-shadow: 0 8px 25px rgba(0,0,0,0.08); }
        .nav-section h6 { color: #1f2937; font-weight: 700; margin-bottom: 1rem; }
        .nav-link-custom { display: block; color: #4b5563; padding: 0.75rem 1rem; border-radius: 12px; margin-bottom: 0.5rem; transition: all 0.3s ease; background: rgba(255,255,255,0.5); border: 1px solid rgba(5,150,105,0.1); text-decoration: none; }
        .nav-link-custom:hover { background: linear-gradient(135deg, #dcfce7, #bbf7d0); color: #059669; transform: translateX(8px); box-shadow: 0 4px 15px rgba(5,150,105,0.2); }
        .nav-link-active { background: linear-gradient(135deg, #10b981, #059669) !important; color: white !important; box-shadow: 0 4px 15px rgba(16,185,129,0.4); }
        .nav-link-login-active { background: linear-gradient(135deg, #3b82f6, #2563eb) !important; color: white !important; }
        .nav-link-login:hover { background: linear-gradient(135deg, #dbeafe, #bfdbfe); color: #3b82f6; transform: translateX(8px); }
        .nav-link-admin-active { background: linear-gradient(135deg, #064e3b, #065f46) !important; color: white !important; }
        .nav-link-admin:hover { background: linear-gradient(135deg, #dcfce7, #bbf7d0) !important; color: #064e3b !important; transform: translateX(8px) !important; }
        .menu-lateral::-webkit-scrollbar { display: none; }
      `}</style>

      <nav className="navbar navbar-dark bg-success fixed-top" style={{height: '72px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', zIndex: 1030}}>
        <div className="container-fluid px-3">
          <div className="d-flex align-items-center">
            <button className="btn btn-link p-2 me-3 text-white" onClick={() => setMenuAberto(true)} style={{border: 'none'}}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
              </svg>
            </button>
            <Link className="navbar-brand d-flex align-items-center text-white text-decoration-none" to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img src="/Verdenovologo.png" alt="VerDenovo" height="40" className="me-2" />
              <span style={{fontSize: '22px', fontWeight: '500'}}>VerDenovo</span>
            </Link>
          </div>
        </div>
      </nav>

      {menuAberto && (
        <>
          {/* Backdrop */}
          <div onClick={fechar} style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1040}} />

          {/* Menu */}
          <div className="menu-lateral" style={{
            position: 'fixed', top: 0, left: 0, bottom: 0, width: '320px',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
            zIndex: 1050, overflowY: 'auto', display: 'flex', flexDirection: 'column',
            scrollbarWidth: 'none'
          }}>
            {/* Header */}
            <div style={{background: 'linear-gradient(135deg, #059669, #10b981)', padding: '2rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0}}>
              <h5 style={{color: 'white', margin: 0, fontSize: '1.5rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '12px'}}>
                <img src="/Verdenovologo.png" alt="VerDenovo" height="32" />
                VerDenovo
              </h5>
              <button onClick={fechar} style={{background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '8px', color: 'white', padding: '4px 10px', cursor: 'pointer', fontSize: '1rem'}}>
                ✕
              </button>
            </div>

            {/* Body */}
            <div style={{padding: '1.5rem', flex: 1}}>
              <div className="nav-section">
                <h6><i className="bi bi-compass me-2" style={{color: '#059669'}}></i>Navegação</h6>
                <Link className={`nav-link-custom ${location.pathname === '/' ? 'nav-link-active' : ''}`} to="/" onClick={fechar}>
                  <i className="bi bi-house me-3"></i>Início
                </Link>
                <Link className={`nav-link-custom ${location.pathname === '/pontos' ? 'nav-link-active' : ''}`} to="/pontos" onClick={fechar}>
                  <i className="bi bi-geo-alt me-3"></i>Pontos de Coleta
                </Link>
              </div>

              <div className="nav-section">
                <h6><i className="bi bi-book me-2" style={{color: '#059669'}}></i>Educação Ambiental</h6>
                <Link className={`nav-link-custom ${location.pathname === '/materiais' ? 'nav-link-active' : ''}`} to="/materiais" onClick={fechar}>
                  <i className="bi bi-recycle me-3"></i>Materiais Recicláveis
                </Link>
                <Link className={`nav-link-custom ${location.pathname === '/residuos' ? 'nav-link-active' : ''}`} to="/residuos" onClick={fechar}>
                  <i className="bi bi-trash me-3"></i>Resíduos
                </Link>
                <Link className={`nav-link-custom ${location.pathname === '/faq' ? 'nav-link-active' : ''}`} to="/faq" onClick={fechar}>
                  <i className="bi bi-question-circle me-3"></i>Perguntas Frequentes
                </Link>
              </div>

              <div className="nav-section">
                <h6><i className="bi bi-person-circle me-2" style={{color: '#059669'}}></i>Conta</h6>
                {isLogado() ? (
                  <div style={{background: usuario.dados?.nivelAcesso === 'ADMIN' ? 'linear-gradient(135deg, #d1fae5, #a7f3d0)' : 'linear-gradient(135deg, #dcfce7, #bbf7d0)', borderRadius: '15px', padding: '1rem', border: `2px solid ${usuario.dados?.nivelAcesso === 'ADMIN' ? '#34d399' : '#86efac'}`}}>
                    <div className="text-center mb-3">
                      <div className="badge px-3 py-2 rounded-pill" style={{fontSize: '0.75rem', fontWeight: 600, background: usuario.dados?.nivelAcesso === 'ADMIN' ? 'linear-gradient(135deg,#064e3b,#059669)' : '#22c55e', color:'white'}}>
                        {usuario.tipo === 'ponto' ? 'PONTO LOGADO' : usuario.dados?.nivelAcesso === 'ADMIN' ? 'ADMINISTRADOR' : 'USUÁRIO LOGADO'}
                      </div>
                      <div className="mt-1"><small className="text-muted fw-medium">{usuario.dados?.nome?.split(' ')[0] || usuario.dados?.email}</small></div>
                    </div>
                    {usuario.dados?.nivelAcesso === 'ADMIN' ? (
                      <>
                        <Link className={`nav-link-custom mb-1 nav-link-admin ${location.pathname === '/cadastrar' ? 'nav-link-admin-active' : ''}`} to="/cadastrar" onClick={fechar}>
                          <i className="bi bi-plus-circle me-3"></i>Adicionar Ponto
                        </Link>
                        <Link className={`nav-link-custom nav-link-admin ${location.pathname === '/gerenciar-contas' ? 'nav-link-admin-active' : ''}`} to="/gerenciar-contas" onClick={fechar}>
                          <i className="bi bi-people me-3"></i>Gerenciar Contas
                        </Link>
                      </>
                    ) : usuario.tipo === 'usuario' ? (
                      <>
                        {usuario.pontoVinculado && (
                          <Link className={`nav-link-custom ${location.pathname === '/personalizar-ponto' ? 'nav-link-active' : ''}`} to="/personalizar-ponto" onClick={fechar}>
                            <i className="bi bi-gear me-3"></i>Gerenciar Meu Ponto
                          </Link>
                        )}
                        {!usuario.pontoVinculado && (
                          <Link className={`nav-link-custom ${location.pathname === '/cadastrar' ? 'nav-link-active' : ''}`} to="/cadastrar" onClick={fechar}>
                            <i className="bi bi-plus-circle me-3"></i>Cadastrar Ponto de Coleta
                          </Link>
                        )}
                      </>
                    ) : null}
                    <button className="nav-link-custom w-100 text-start mt-2" onClick={handleLogout}
                      style={{color: '#dc2626', background: 'linear-gradient(135deg, #fee2e2, #fecaca)', border: '2px solid #ef4444', cursor: 'pointer'}}>
                      <i className="bi bi-box-arrow-right me-3"></i>Sair da Conta
                    </button>
                  </div>
                ) : (
                  <>
                    <div style={{background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)', borderRadius: '15px', padding: '1rem', marginBottom: '1rem', border: '2px solid #86efac'}}>
                      <div className="text-center mb-2"><div className="badge bg-success px-3 py-1 rounded-pill" style={{fontSize: '0.75rem'}}>CADASTRAR</div></div>
                      <Link className={`nav-link-custom ${location.pathname === '/cadastro-usuario' ? 'nav-link-active' : ''}`} to="/cadastro-usuario" onClick={fechar}>
                        <i className="bi bi-person-plus me-3"></i>Usuário
                      </Link>
                    </div>
                    <div style={{background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)', borderRadius: '15px', padding: '1rem', border: '2px solid #3b82f6'}}>
                      <div className="text-center mb-2"><div className="badge bg-primary px-3 py-1 rounded-pill" style={{fontSize: '0.75rem'}}>LOGIN</div></div>
                      <Link className={`nav-link-custom nav-link-login ${location.pathname === '/login-usuario' ? 'nav-link-login-active' : ''}`} to="/login-usuario" onClick={fechar}>
                        <i className="bi bi-person-circle me-3"></i>Entrar na conta
                      </Link>
                    </div>
                  </>
                )}
              </div>

              <div className="nav-section">
                <h6><i className="bi bi-info-circle me-2" style={{color: '#059669'}}></i>Informações</h6>
                <Link className={`nav-link-custom ${location.pathname === '/sobre' ? 'nav-link-active' : ''}`} to="/sobre" onClick={fechar}>
                  <i className="bi bi-people me-3"></i>Sobre o VerDenovo
                </Link>
                <Link className={`nav-link-custom ${location.pathname === '/conscientizacao' ? 'nav-link-active' : ''}`} to="/conscientizacao" onClick={fechar}>
                  <i className="bi bi-tree me-3"></i>Conscientização e Educação Ambiental
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Navbar;