const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

class ApiService {
  getToken() {
    return localStorage.getItem('token');
  }

  getHeaders() {
    const headers = { 'Content-Type': 'application/json' };
    const token = this.getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
    return headers;
  }

  async request(endpoint, options = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: this.getHeaders(),
      ...options,
    });

    if (response.status === 401) {
      this.logout();
      window.location.href = '/login-usuario';
      return; // para execução antes de tentar ler o body
    }

    if (!response.ok) {
      const errorText = await response.text();
      let mensagem;
      try {
        const errorJson = JSON.parse(errorText);
        mensagem = errorJson.message || `Erro ${response.status}`;
      } catch {
        mensagem = errorText || `Erro ${response.status}`;
      }
      throw new Error(mensagem);
    }

    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      return response.json();
    }
    return { message: await response.text() };
  }

  async login(email, senha) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, senha }),
    });
    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('usuario', JSON.stringify(response.usuario));
    }
    return response;
  }

  async cadastrar(usuario) {
    return this.request('/auth/cadastro', {
      method: 'POST',
      body: JSON.stringify({
        nome: usuario.nome,
        email: usuario.email,
        senha: usuario.senha,
        nivelAcesso: usuario.nivelAcesso || 'USER',
      }),
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('usuario_logado');
    localStorage.removeItem('ponto');
  }

  async listarPontos() { return this.request('/pontos'); }
  async listarTodosPontos() { return this.request('/pontos/todos'); }
  async listarPontosPendentes() { return this.request('/pontos/pendentes'); }
  async listarMeusPontos() { return this.request('/pontos/meus'); }
  async criarPonto(ponto) { return this.request('/pontos', { method: 'POST', body: JSON.stringify(ponto) }); }
  async atualizarPonto(id, ponto) { return this.request(`/pontos/${id}`, { method: 'PUT', body: JSON.stringify(ponto) }); }
  async aprovarPonto(id) { return this.request(`/pontos/${id}/aprovar`, { method: 'PUT' }); }
  async rejeitarPonto(id) { return this.request(`/pontos/${id}/rejeitar`, { method: 'PUT' }); }
  async alterarStatusPonto(id) { return this.request(`/pontos/${id}/status`, { method: 'PUT' }); }
  async deletarPonto(id) { return this.request(`/pontos/${id}`, { method: 'DELETE' }); }
  async listarCategorias() { return this.request('/categorias'); }
  async listarUsuarios() { return this.request('/auth/usuarios'); }
  async alterarStatusUsuario(id) { return this.request(`/auth/usuarios/${id}/status`, { method: 'PUT' }); }
  async deletarUsuario(id) { return this.request(`/auth/usuarios/${id}`, { method: 'DELETE' }); }

  async loginPonto(email, senha) {
    return this.request('/pontos/login', {
      method: 'POST',
      body: JSON.stringify({ email, senha }),
    });
  }

  async recuperarSenha(email) {
    return this.request('/auth/recuperar-senha', { method: 'POST', body: JSON.stringify({ email }) });
  }

  async verificarCodigo(email, codigo) {
    return this.request('/auth/verificar-codigo', { method: 'POST', body: JSON.stringify({ email, codigo }) });
  }

  async redefinirSenhaPorCodigo(email, codigo, novaSenha) {
    return this.request('/auth/redefinir-senha', { method: 'POST', body: JSON.stringify({ email, codigo, novaSenha }) });
  }

  async redefinirSenha(token, novaSenha) {
    return this.request('/auth/redefinir-senha', { method: 'POST', body: JSON.stringify({ token, novaSenha }) });
  }

  isAuthenticated() { return !!this.getToken(); }

  getUsuarioLogado() {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }
}

export const apiService = new ApiService();
