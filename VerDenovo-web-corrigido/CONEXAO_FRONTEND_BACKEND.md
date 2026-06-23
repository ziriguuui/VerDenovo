# Conexão Frontend-Backend VerDenovo

## Como executar o sistema completo

### 1. Backend (Spring Boot)
```bash
cd backend
mvn spring-boot:run
```
- API rodará em: `http://localhost:8080`

### 2. Frontend (React)
```bash
cd pontos-coleta-reciclagem
npm install
npm run dev
```
- Frontend rodará em: `http://localhost:5173`

## Alterações realizadas

### Backend
- ✅ API REST criada com Spring Boot
- ✅ Conexão com SQL Server (Somee)
- ✅ Autenticação JWT
- ✅ Senhas criptografadas com BCrypt
- ✅ CORS configurado para frontend

### Frontend
- ✅ Serviço API criado (`src/services/api.js`)
- ✅ AuthContext atualizado para usar API
- ✅ Login/Cadastro conectados à API
- ✅ Listagem de pontos usando API
- ✅ Cadastro de pontos usando API

## Endpoints da API

### Autenticação
- `POST /api/auth/login` - Login
- `POST /api/auth/cadastro` - Cadastro

### Pontos
- `GET /api/pontos` - Listar pontos
- `POST /api/pontos` - Criar ponto
- `DELETE /api/pontos/{id}` - Remover ponto

### Categorias
- `GET /api/categorias` - Listar categorias

## Credenciais de teste

### Admin
- Email: definido pela variável de ambiente `ADMIN_EMAIL` (ver `.env.example`)
- Senha: definida pela variável de ambiente `ADMIN_SENHA`

### Banco de dados
⚠️ **As credenciais de conexão NÃO ficam neste arquivo.** Elas são configuradas
exclusivamente via variáveis de ambiente (`DB_URL`, `DB_USERNAME`, `DB_PASSWORD`
em `.env`, nunca commitado — ver `.env.example`).

> 🚨 **Aviso de segurança:** uma versão anterior deste arquivo continha o
> host, usuário e senha reais do banco SQL Server (Somee) em texto puro,
> em um repositório público. Se você ainda usa essa senha, **troque-a
> imediatamente** no painel do Somee — qualquer pessoa que tenha visto o
> repositório antes desta correção teve acesso a ela.

## Status da integração
✅ Backend funcionando
✅ Frontend conectado
✅ Autenticação integrada
✅ CRUD de pontos integrado (categoria padrão automática + geocodificação de endereço)
✅ Sistema completo operacional