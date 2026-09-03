import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

async function buscarCep(cep, setValue) {
  const cepLimpo = cep.replace(/\D/g, '');
  if (cepLimpo.length !== 8 || !/^\d{8}$/.test(cepLimpo)) return;
  try {
    const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
    if (!res.ok) return;
    const data = await res.json();
    if (data && !data.erro && typeof data.logradouro === 'string') {
      setValue('logradouro', `${data.logradouro}, ${data.bairro || ''} - ${data.localidade || ''}/${data.uf || ''}`.trim());
    }
  } catch { }
}

// Máscara de horário: converte input livre em "HH:MM às HH:MM"
function aplicarMascaraHorario(valor) {
  // Remove tudo que não for dígito
  const digits = valor.replace(/\D/g, '').slice(0, 8);
  if (digits.length === 0) return '';
  // Monta progressivamente: HH:MM às HH:MM
  let resultado = '';
  if (digits.length <= 2) {
    resultado = digits;
  } else if (digits.length <= 4) {
    resultado = `${digits.slice(0, 2)}:${digits.slice(2)}`;
  } else if (digits.length <= 6) {
    resultado = `${digits.slice(0, 2)}:${digits.slice(2, 4)} às ${digits.slice(4)}`;
  } else {
    resultado = `${digits.slice(0, 2)}:${digits.slice(2, 4)} às ${digits.slice(4, 6)}:${digits.slice(6)}`;
  }
  return resultado;
}

// Máscara de telefone: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
function aplicarMascaraTelefone(valor) {
  const digits = valor.replace(/\D/g, '').slice(0, 11);
  if (digits.length === 0) return '';
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

const inputStyle = { border: '2px solid #e5e7eb', borderRadius: '12px', background: '#f9fafb' };

function CadastrarPonto() {
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);
  const [jaTemPonto, setJaTemPonto] = useState(false);
  const [pontoPendente, setPontoPendente] = useState(false);
  const [verificando, setVerificando] = useState(true);
  const [horarioDisplay, setHorarioDisplay] = useState('');
  const [telefoneDisplay, setTelefoneDisplay] = useState('');
  const { usuario } = useAuth();

  useEffect(() => {
    if (usuario?.dados?.nivelAcesso === 'ADMIN') {
      setJaTemPonto(false);
      setVerificando(false);
      return;
    }
    if (!usuario) { setVerificando(false); return; }
    apiService.listarMeusPontos()
      .then(pontos => {
        const temAtivo = pontos.some(p => p.statusPonto === 'ATIVO' || p.statusPonto === 'PENDENTE');
        setJaTemPonto(temAtivo);
        setPontoPendente(pontos.some(p => p.statusPonto === 'PENDENTE'));
      })
      .catch(() => setJaTemPonto(false))
      .finally(() => setVerificando(false));
  }, [usuario]);

  const handleHorarioChange = (e) => {
    const mascarado = aplicarMascaraHorario(e.target.value);
    setHorarioDisplay(mascarado);
    setValue('horaFuncionamento', mascarado);
  };

  const handleTelefoneChange = (e) => {
    const mascarado = aplicarMascaraTelefone(e.target.value);
    setTelefoneDisplay(mascarado);
    setValue('telefone', mascarado);
  };

  const onSubmit = async (dados) => {
    setLoading(true);
    setErro('');
    const materiais = [];
    if (dados.materiais?.papel) materiais.push('Papel');
    if (dados.materiais?.plastico) materiais.push('Plástico');
    if (dados.materiais?.vidro) materiais.push('Vidro');
    if (dados.materiais?.metal) materiais.push('Metal');
    if (dados.materiais?.eletronico) materiais.push('Eletrônico');
    if (dados.materiais?.organico) materiais.push('Orgânico');

    if (materiais.length === 0) {
      setErro('Selecione pelo menos um tipo de material.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setLoading(false);
      return;
    }

    try {
      await apiService.criarPonto({
        nome: dados.nome,
        cep: dados.cep.replace(/\D/g, ''),
        numero: dados.numero,
        complemento: dados.complemento || '',
        logradouro: dados.logradouro || '',
        telefone: dados.telefone || '',
        email: usuario?.dados?.nivelAcesso === 'ADMIN'
          ? (dados.emailPonto || '')
          : (usuario?.dados?.email || ''),
        horaFuncionamento: dados.horaFuncionamento,
        material: materiais.join(', '),
        descricao: dados.descricao || '',
        senha: dados.senha || null,
      });
      setSucesso(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      reset();
      setHorarioDisplay('');
      setTelefoneDisplay('');
    } catch (error) {
      setErro(error.message);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  };

  if (verificando) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="text-center">
          <div className="spinner-border text-success mb-3"></div>
          <p className="text-muted">Verificando...</p>
        </div>
      </div>
    );
  }

  if (jaTemPonto) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div className="text-center animate-fadeInUp" style={{ maxWidth: '500px' }}>
          <div className="d-inline-flex align-items-center justify-content-center mb-4"
            style={{ width: '100px', height: '100px', background: 'linear-gradient(135deg, #10b981, #059669)', borderRadius: '50%', boxShadow: '0 15px 40px rgba(16,185,129,0.3)' }}>
            <i className="bi bi-geo-alt-fill text-white" style={{ fontSize: '2.5rem' }}></i>
          </div>
          <h2 className="fw-bold text-success mb-3">
            {pontoPendente ? 'Ponto em análise!' : 'Você já tem um ponto!'}
          </h2>
          <p className="text-muted mb-4">
            {pontoPendente
              ? 'Seu ponto está aguardando aprovação de um administrador.'
              : 'Cada usuário pode cadastrar apenas um ponto de coleta.'}
          </p>
          {!pontoPendente && (
            <Link to="/personalizar-ponto" className="btn btn-success px-5 py-3" style={{ borderRadius: '12px', fontWeight: '600' }}>
              <i className="bi bi-gear me-2"></i>Gerenciar Meu Ponto
            </Link>
          )}
        </div>
      </div>
    );
  }

  if (sucesso) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div className="text-center animate-fadeInUp" style={{ maxWidth: '500px' }}>
          <div className="d-inline-flex align-items-center justify-content-center mb-4"
            style={{ width: '100px', height: '100px', background: 'linear-gradient(135deg, #10b981, #059669)', borderRadius: '50%', boxShadow: '0 15px 40px rgba(16,185,129,0.3)' }}>
            <i className="bi bi-hourglass-split text-white" style={{ fontSize: '2.5rem' }}></i>
          </div>
          <h2 className="fw-bold text-success mb-3">
            {usuario?.dados?.nivelAcesso === 'ADMIN' ? 'Ponto cadastrado!' : 'Ponto enviado para análise!'}
          </h2>
          <p className="text-muted mb-4">
            {usuario?.dados?.nivelAcesso === 'ADMIN'
              ? 'O ponto foi cadastrado e já está ativo no site.'
              : 'Seu ponto está aguardando aprovação de um administrador.'}
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link to="/pontos" className="btn btn-outline-success px-4" style={{ borderRadius: '12px' }}>
              <i className="bi bi-geo-alt me-2"></i>Ver pontos ativos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content" style={{ paddingBottom: '2rem' }}>
      <div style={{ background: 'rgba(255,255,255,0.78)', backdropFilter: 'blur(12px)', borderRadius: '24px', border: '2px solid rgba(255,255,255,0.6)', boxShadow: '6px 6px 0px rgba(0,0,0,0.12), 0 8px 32px rgba(0,0,0,0.08)', overflow: 'hidden', maxWidth: '800px', margin: '0 auto' }}>

        <div style={{ background: 'linear-gradient(135deg, #10b981, #059669)', padding: '2rem', textAlign: 'center' }}>
          <div style={{ width: '80px', height: '80px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '2rem' }}>
            <i className="bi bi-geo-alt text-white"></i>
          </div>
          <h3 className="text-white mb-0 fw-bold">Cadastrar Ponto de Coleta</h3>
          <p className="text-white-50 mb-0 mt-2">Preencha os dados do ponto — ele será analisado antes de aparecer no site</p>
        </div>

        <div className="p-4">
          {usuario?.dados?.nivelAcesso === 'ADMIN' ? (
            <div className="alert alert-success border-0 rounded-3 mb-4">
              <i className="bi bi-shield-check me-2"></i>
              Ponto criado pelo administrador será ativado imediatamente.
            </div>
          ) : (
            <div className="alert alert-info border-0 rounded-3 mb-4">
              <i className="bi bi-info-circle me-2"></i>
              Após o cadastro, um administrador irá revisar e aprovar o ponto.
            </div>
          )}

          {erro && (
            <div className="alert alert-danger border-0 rounded-3 mb-4">
              <i className="bi bi-exclamation-triangle me-2"></i>{erro}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit, () => window.scrollTo({ top: 0, behavior: 'smooth' }))}>

            {/* Nome */}
            <div className="form-floating mb-3">
              <input type="text" className={`form-control ${errors.nome ? 'is-invalid' : ''}`}
                id="nome" placeholder="Nome do ponto" maxLength="50" style={inputStyle}
                {...register('nome', { required: 'Nome é obrigatório' })} />
              <label htmlFor="nome"><i className="bi bi-geo-alt me-2"></i>Nome do Ponto</label>
              {errors.nome && <div className="invalid-feedback">{errors.nome.message}</div>}
            </div>

            {/* CEP + Número + Complemento */}
            <div className="row g-3 mb-3">
              <div className="col-md-4">
                <div className="form-floating">
                  <input type="text" className={`form-control ${errors.cep ? 'is-invalid' : ''}`}
                    id="cep" placeholder="00000-000" maxLength="9" style={inputStyle}
                    {...register('cep', { required: 'CEP é obrigatório' })}
                    onBlur={e => buscarCep(e.target.value, setValue)} />
                  <label htmlFor="cep"><i className="bi bi-mailbox me-2"></i>CEP</label>
                  {errors.cep && <div className="invalid-feedback">{errors.cep.message}</div>}
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating">
                  <input type="text" className={`form-control ${errors.numero ? 'is-invalid' : ''}`}
                    id="numero" placeholder="Número" maxLength="10" style={inputStyle}
                    {...register('numero', { required: 'Número é obrigatório' })} />
                  <label htmlFor="numero"><i className="bi bi-hash me-2"></i>Número</label>
                  {errors.numero && <div className="invalid-feedback">{errors.numero.message}</div>}
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating">
                  <input type="text" className="form-control" id="complemento"
                    placeholder="Complemento" maxLength="50" style={inputStyle}
                    {...register('complemento')} />
                  <label htmlFor="complemento"><i className="bi bi-house me-2"></i>Complemento</label>
                </div>
              </div>
            </div>

            {/* Logradouro (auto) */}
            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="logradouro"
                placeholder="Preenchido pelo CEP" readOnly
                style={{ ...inputStyle, background: '#f3f4f6', color: '#6b7280' }}
                {...register('logradouro')} />
              <label htmlFor="logradouro"><i className="bi bi-signpost me-2"></i>Endereço (preenchido pelo CEP)</label>
            </div>

            {/* Materiais */}
            <div className="mb-3">
              <label className="form-label fw-bold mb-2">
                <i className="bi bi-recycle me-2 text-success"></i>Materiais Aceitos <span className="text-danger">*</span>
              </label>
              <div className="row g-2">
                {[
                  { id: 'papel',     label: '📄 Papel' },
                  { id: 'plastico',  label: '🥤 Plástico' },
                  { id: 'vidro',     label: '🍶 Vidro' },
                  { id: 'metal',     label: '🥫 Metal' },
                  { id: 'eletronico',label: '📱 Eletrônico' },
                  { id: 'organico',  label: '🌱 Orgânico' },
                ].map(m => (
                  <div key={m.id} className="col-md-4 col-6">
                    <div className="form-check p-3 rounded-3" style={{ background: '#f9fafb', border: '2px solid #e5e7eb', transition: 'all 0.2s' }}>
                      <input className="form-check-input" type="checkbox" id={m.id}
                        {...register(`materiais.${m.id}`)} />
                      <label className="form-check-label fw-medium" htmlFor={m.id}>{m.label}</label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Horário + Telefone */}
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <div className="form-floating">
                  {/*
                    Campo de horário com máscara automática.
                    O usuário digita só os números (ex: 0800 às 1800)
                    e o campo formata automaticamente para "08:00 às 18:00".
                  */}
                  <input
                    type="text"
                    className={`form-control ${errors.horaFuncionamento ? 'is-invalid' : ''}`}
                    id="horaFuncionamento"
                    placeholder="08:00 às 18:00"
                    value={horarioDisplay}
                    onChange={handleHorarioChange}
                    maxLength="14"
                    style={inputStyle}
                  />
                  {/* campo oculto para o react-hook-form */}
                  <input type="hidden" {...register('horaFuncionamento', { required: 'Horário é obrigatório' })} />
                  <label htmlFor="horaFuncionamento"><i className="bi bi-clock me-2"></i>Horário (ex: 08:00 às 18:00)</label>
                  {errors.horaFuncionamento && <div className="invalid-feedback d-block">{errors.horaFuncionamento.message}</div>}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  {/*
                    Campo de telefone com máscara automática.
                    Aceita apenas números e formata como (XX) XXXXX-XXXX.
                  */}
                  <input
                    type="text"
                    className="form-control"
                    id="telefone"
                    placeholder="(11) 99999-9999"
                    value={telefoneDisplay}
                    onChange={handleTelefoneChange}
                    maxLength="16"
                    style={inputStyle}
                  />
                  <input type="hidden" {...register('telefone')} />
                  <label htmlFor="telefone"><i className="bi bi-telephone me-2"></i>Telefone (opcional)</label>
                </div>
              </div>
            </div>

            {/* Email — só admin */}
            {usuario?.dados?.nivelAcesso === 'ADMIN' && (
              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="emailPonto"
                  placeholder="email@usuario.com" maxLength="100" style={inputStyle}
                  {...register('emailPonto')} />
                <label htmlFor="emailPonto"><i className="bi bi-envelope me-2"></i>Email do dono do ponto (opcional)</label>
                <small className="text-muted">Se informado, o ponto será vinculado a esse usuário</small>
              </div>
            )}

            {/* Descrição */}
            <div className="mb-3">
              <label className="form-label fw-medium">
                <i className="bi bi-card-text me-2 text-success"></i>Descrição do Ponto (opcional)
              </label>
              <textarea className="form-control" id="descricao" rows={3}
                placeholder="Descreva o ponto de coleta, como chegar, observações importantes..."
                maxLength="500" style={{ ...inputStyle, resize: 'none' }}
                {...register('descricao')} />
              <small className="text-muted">Ajuda os usuários a encontrar e entender o ponto</small>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-success py-3 fw-bold" disabled={loading}
                style={{ borderRadius: '12px', background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none' }}>
                {loading ? (
                  <><span className="spinner-border spinner-border-sm me-2"></span>Enviando...</>
                ) : (
                  <><i className="bi bi-send me-2"></i>Enviar para Aprovação</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CadastrarPonto;
