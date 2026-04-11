import { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() => {
    const saved = localStorage.getItem('usuario_logado');
    return saved ? JSON.parse(saved) : null;
  });
  const [mostrarMensagemLogout, setMostrarMensagemLogout] = useState(false);

  useEffect(() => {
    if (usuario) {
      localStorage.setItem('usuario_logado', JSON.stringify(usuario));
    } else {
      localStorage.removeItem('usuario_logado');
    }
  }, [usuario]);

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('usuario_logado');
      const savedUser = saved ? JSON.parse(saved) : null;
      if (JSON.stringify(savedUser) !== JSON.stringify(usuario)) {
        setUsuario(savedUser);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [usuario]);

  const loginAdmin = async (email, senha) => {
    const response = await apiService.login(email, senha);
    if (response.usuario?.nivelAcesso !== 'ADMIN') {
      apiService.logout(); // limpa o token que foi salvo
      throw new Error('Acesso negado. Conta sem permissão de administrador.');
    }
    setUsuario({ tipo: 'admin', dados: response.usuario });
    return response;
  };

  const loginUsuario = async (email, senha) => {
    const response = await apiService.login(email, senha);
    // Buscar ponto vinculado apenas para usuários comuns
    let pontoAtivo = null;
    if (response.usuario?.nivelAcesso !== 'ADMIN') {
      const [meusPontos, todosPontos] = await Promise.all([
        apiService.listarMeusPontos().catch(() => []),
        apiService.listarPontos().catch(() => [])
      ]);
      pontoAtivo =
        meusPontos.find(p => p.statusPonto === 'ATIVO') ||
        todosPontos.find(p => p.email === response.usuario.email) ||
        null;
    }
    setUsuario({ tipo: 'usuario', dados: response.usuario, pontoVinculado: pontoAtivo });
    return response;
  };

  const cadastrarUsuario = async (dadosUsuario) => {
    await apiService.cadastrar(dadosUsuario);
    return { success: true };
  };

  const logout = () => {
    apiService.logout();
    setUsuario(null);
    setMostrarMensagemLogout(true);
    setTimeout(() => setMostrarMensagemLogout(false), 3000);
    window.location.href = '/';
  };

  const isLogado = () => usuario !== null;

  return (
    <AuthContext.Provider value={{
      usuario,
      loginAdmin,
      loginUsuario,
      cadastrarUsuario,
      logout,
      isLogado,
      mostrarMensagemLogout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
