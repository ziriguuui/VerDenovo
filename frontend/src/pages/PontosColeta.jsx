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

const pastel = {
  'Papel':      { bg: '#dbeafe', activeBg: '#2563eb', border: '#93c5fd', activeText: '#fff', text: '#1d4ed8' },
  'Plástico':   { bg: '#fee2e2', activeBg: '#dc2626', border: '#fca5a5', activeText: '#fff', text: '#b91c1c' },
  'Vidro':      { bg: '#d1fae5', activeBg: '#059669', border: '#6ee7b7', activeText: '#fff', text: '#065f46' },
  'Metal':      { bg: '#fef3c7', activeBg: '#d97706', border: '#fcd34d', activeText: '#fff', text: '#92400e' },
  'Eletrônico': { bg: '#ede9fe', activeBg: '#7c3aed', border: '#c4b5fd', activeText: '#fff', text: '#5b21b6' },
  'Orgânico':   { bg: '#ecfccb', activeBg: '#65a30d', border: '#bef264', activeText: '#fff', text: '#3f6212' },
};

function FilterChip({ nome, cfg, ativo, onClick }) {
  const [hovered, setHovered] = useState(false);
  const p = pastel[nome] || { bg: '#f3f4f6', activeBg: '#374151', border: '#d1d5db', activeText: '#fff', text: '#374151' };
  const bg = ativo ? p.activeBg : hovered ? p.border : p.bg;
  const color = ativo ? p.activeText : p.text;
  const shadow = ativo ? `0 4px 14px ${p.activeBg}55` : hovered ? `0 2px 8px ${p.activeBg}30` : 'none';
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        padding: '7px 16px', borderRadius: '999px',
        border: `1.5px solid ${ativo ? p.activeBg : p.border}`,
        background: bg, color,
        fontWeight: ativo ? 700 : 500, fontSize: '0.82rem',
        boxShadow: shadow,
        transform: hovered && !ativo ? 'translateY(-1px)' : 'none',
        transition: 'all 0.18s ease',
        cursor: 'pointer', whiteSpace: 'nowrap',
      }}>
      <span style={{ fontSize: '0.95rem', lineHeight: 1 }}>{cfg.emoji}</span>
      {nome}
      {ativo && <i className="bi bi-check-lg" style={{ fontSize: '0.75rem', marginLeft: '2px' }} />}
    </button>
  );
}

function SearchInput({ busca, setBusca }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex-grow-1 d-flex align-items-center gap-3 px-4"
      style={{
        background: 'white',
        borderRadius: '16px',
        height: '58px',
        border: focused ? '2px solid #059669' : '2px solid #e5e7eb',
        boxShadow: focused ? '0 0 0 4px rgba(5,150,105,0.1), 0 4px 16px rgba(0,0,0,0.06)' : '0 4px 16px rgba(0,0,0,0.06)',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
      }}>
      <i className="bi bi-search flex-shrink-0"
        style={{ fontSize: '1.1rem', color: focused ? '#059669' : '#9ca3af', transition: 'color 0.2s ease' }} />
      <input
        type="text"
        className="border-0 w-100 bg-transparent"
        placeholder="Buscar por nome, CEP ou endereço..."
        value={busca}
        onChange={e => setBusca(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ outline: 'none', fontSize: '0.97rem', color: '#111827', fontWeight: 400 }}
      />
      {busca && (
        <button className="btn p-0 d-flex align-items-center flex-shrink-0"
          onClick={() => setBusca('')}
          style={{ color: '#9ca3af', lineHeight: 1, background: 'none', border: 'none' }}>
          <i className="bi bi-x-circle-fill" style={{ fontSize: '1rem' }} />
        </button>
      )}
    </div>
  );
}

function PontoCard({ ponto, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);
  const cfg_mat = (mat) => materialConfig[mat] || { color: '#6b7280', emoji: '♻️' };
  const materiais = (ponto.material || 'Não informado').split(', ');

  return (
    <div
      className="h-100 d-flex flex-column"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '20px',
        background: 'rgba(255,255,255,0.8)',
        border: hovered ? '2px solid rgba(74,222,128,0.5)' : '2px solid rgba(255,255,255,0.6)',
        boxShadow: hovered
          ? '6px 6px 0px rgba(0,0,0,0.12), 0 16px 40px rgba(5,150,105,0.12)'
          : '4px 4px 0px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.25s ease',
        cursor: 'pointer',
        overflow: 'hidden',
      }}>

      {/* Linha de cor no topo */}
      <div style={{ height: '4px', background: 'linear-gradient(90deg, #059669, #34d399)', borderRadius: '20px 20px 0 0' }} />

      <div className="d-flex flex-column flex-grow-1" style={{ padding: '1.4rem 1.5rem 1.5rem' }}>

        {/* Header do card */}
        <div className="d-flex align-items-start justify-content-between mb-3">
          <div className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
            style={{ width: '42px', height: '42px', background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
            <i className="bi bi-geo-alt-fill" style={{ color: '#059669', fontSize: '1.1rem' }} />
          </div>
          <span style={{
            background: '#f0fdf4', color: '#059669', fontWeight: 700,
            fontSize: '0.68rem', borderRadius: '999px', padding: '4px 10px',
            border: '1px solid #bbf7d0', letterSpacing: '0.02em',
          }}>
            <i className="bi bi-circle-fill me-1" style={{ fontSize: '0.3rem', verticalAlign: 'middle', color: '#22c55e' }} />
            Ativo
          </span>
        </div>

        {/* Nome */}
        <h6 style={{ color: '#0f172a', fontSize: '1.1rem', fontWeight: 800, lineHeight: '1.3', marginBottom: '5px', letterSpacing: '-0.02em' }}>
          {ponto.nome}
        </h6>

        {/* Endereço */}
        <p style={{ fontSize: '0.77rem', color: '#b0bac5', fontWeight: 400, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '4px', lineHeight: '1.5' }}>
          <i className="bi bi-map-fill" style={{ fontSize: '0.7rem', flexShrink: 0 }} />
          {ponto.logradouro ? `${ponto.logradouro}, Nº ${ponto.numero}` : `CEP: ${ponto.cep}`}
        </p>

        {/* Badges de info */}
        <div className="d-flex flex-wrap gap-2 mb-3">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#eff6ff', color: '#1d4ed8', fontSize: '0.73rem', fontWeight: 600, padding: '5px 10px', borderRadius: '8px', letterSpacing: '0.01em' }}>
            <i className="bi bi-clock-fill" style={{ fontSize: '0.68rem' }} />
            {ponto.horaFuncionamento || '—'}
          </span>
          {ponto.telefone && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#faf5ff', color: '#7c3aed', fontSize: '0.73rem', fontWeight: 600, padding: '5px 10px', borderRadius: '8px', letterSpacing: '0.01em' }}>
              <i className="bi bi-telephone-fill" style={{ fontSize: '0.68rem' }} />
              {ponto.telefone}
            </span>
          )}
        </div>

        {/* Chips de materiais */}
        <div className="d-flex flex-wrap gap-1 mb-4">
          {materiais.map((mat, i) => {
            const c = cfg_mat(mat);
            return (
              <span key={i} style={{
                display: 'inline-flex', alignItems: 'center', gap: '4px',
                fontSize: '0.72rem', fontWeight: 600,
                color: c.color, background: `${c.color}18`,
                border: `1px solid ${c.color}35`,
                borderRadius: '999px', padding: '3px 10px',
              }}>
                <span style={{ fontSize: '0.85rem' }}>{c.emoji}</span>{mat}
              </span>
            );
          })}
        </div>

        {/* Botão */}
        <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1rem', marginTop: 'auto' }}>
          <button
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
            style={{
              width: '100%', border: 'none', borderRadius: '12px',
              padding: '11px', fontSize: '0.88rem', fontWeight: 700, letterSpacing: '0.01em',
              color: 'white', cursor: 'pointer',
              background: btnHovered
                ? 'linear-gradient(135deg, #047857, #059669)'
                : 'linear-gradient(135deg, #059669, #10b981)',
              boxShadow: btnHovered ? '0 6px 20px rgba(5,150,105,0.4)' : '0 2px 8px rgba(5,150,105,0.2)',
              transform: btnHovered ? 'translateY(-1px)' : 'none',
              transition: 'all 0.2s ease',
            }}>
            <i className="bi bi-arrow-right-circle me-2" />
            Ver Detalhes
          </button>
        </div>
      </div>
    </div>
  );
}

function ModalButton({ onClick, disabled, variant, icon, label, style }) {
  const [hovered, setHovered] = useState(false);

  const variants = {
    primary: {
      background: hovered ? 'linear-gradient(135deg, #047857, #059669)' : 'linear-gradient(135deg, #059669, #10b981)',
      color: 'white',
      border: 'none',
      boxShadow: hovered ? '0 8px 24px rgba(5,150,105,0.45)' : '0 3px 12px rgba(5,150,105,0.25)',
      transform: hovered ? 'translateY(-2px)' : 'none',
    },
    outline: {
      background: hovered ? '#f0fdf4' : 'white',
      color: disabled ? '#9ca3af' : '#059669',
      border: `1.5px solid ${disabled ? '#d1d5db' : hovered ? '#059669' : '#10b981'}`,
      boxShadow: hovered && !disabled ? '0 4px 12px rgba(5,150,105,0.15)' : 'none',
      transform: hovered && !disabled ? 'translateY(-1px)' : 'none',
    },
    ghost: {
      background: hovered ? '#e2e8f0' : '#f1f5f9',
      color: hovered ? '#475569' : '#64748b',
      border: 'none',
      boxShadow: 'none',
      transform: 'none',
    },
  };

  const v = variants[variant];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...style,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
        padding: '12px 16px', borderRadius: '13px',
        fontSize: '0.88rem', fontWeight: variant === 'primary' ? 700 : variant === 'outline' ? 600 : 500,
        letterSpacing: '0.01em', cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.2s ease',
        ...v,
      }}>
      {icon && <i className={`bi ${icon}`} style={{ fontSize: '0.9rem' }} />}
      {label}
    </button>
  );
}

function LocationField({ label, icon, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '1rem 1.1rem', borderRadius: '14px', background: '#fafafa', border: '1px solid #f0f0f0' }}>
      <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: '#f0fdf4', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
        <i className={`bi ${icon}`} style={{ color: '#059669', fontSize: '0.85rem' }}></i>
      </div>
      <div>
        <p style={{ color: '#9ca3af', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 3px' }}>{label}</p>
        <p style={{ color: '#0f172a', fontSize: '0.92rem', fontWeight: 600, margin: 0, lineHeight: 1.5 }}>{value}</p>
      </div>
    </div>
  );
}

function MapsButton({ onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        padding: '12px', borderRadius: '14px', fontSize: '0.88rem', fontWeight: 700,
        border: 'none', cursor: 'pointer', letterSpacing: '0.01em',
        background: hovered ? 'linear-gradient(135deg, #047857, #059669)' : 'linear-gradient(135deg, #059669, #10b981)',
        color: 'white',
        boxShadow: hovered ? '0 8px 24px rgba(5,150,105,0.4)' : '0 3px 10px rgba(5,150,105,0.2)',
        transform: hovered ? 'translateY(-2px)' : 'none',
        transition: 'all 0.2s ease',
      }}>
      <i className="bi bi-map-fill" style={{ fontSize: '1rem' }}></i>
      Abrir no Google Maps
    </button>
  );
}

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
      {/* Page background */}
      <div style={{ position: 'fixed', inset: 0, background: 'linear-gradient(135deg, #d4edda 0%, #c8e6c9 40%, #dcedc8 100%)', zIndex: -1, pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 0 3rem' }}>

      {/* Hero */}
      <div className="mb-5 position-relative overflow-hidden animate-fadeInUp" style={{ background: 'linear-gradient(135deg, #14532d 0%, #166534 40%, #15803d 100%)', borderRadius: '28px', padding: '4rem 2rem 3.5rem', border: '2px solid rgba(74,222,128,0.2)', boxShadow: '6px 6px 0px rgba(0,0,0,0.14), 0 16px 48px rgba(0,0,0,0.10)' }}>
        {/* Orbs decorativos */}
        <div className="position-absolute" style={{ top: '-40px', right: '-40px', width: '220px', height: '220px', background: 'rgba(255,255,255,0.04)', borderRadius: '50%' }} />
        <div className="position-absolute" style={{ bottom: '-60px', left: '-30px', width: '180px', height: '180px', background: 'rgba(255,255,255,0.04)', borderRadius: '50%' }} />
        <div className="position-absolute" style={{ top: '30%', right: '18%', width: '60px', height: '60px', background: 'rgba(255,255,255,0.06)', borderRadius: '50%' }} />

        <div className="text-center position-relative" style={{ zIndex: 2 }}>
          {/* Badge */}
          <div className="d-inline-flex align-items-center px-4 py-2 rounded-pill mb-4 animate-fadeInUp" style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', border: '2px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', boxShadow: '3px 3px 0px rgba(0,0,0,0.10)' }}>
            <i className="bi bi-recycle me-2"></i>Reciclagem
          </div>

          {/* Título */}
          <h1 className="animate-fadeInUp animate-delay-1" style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)', lineHeight: '1.05', color: '#ffffff', letterSpacing: '-0.04em', fontWeight: 800, marginBottom: '1rem' }}>
            Pontos de{' '}
            <span style={{ color: '#6ee7b7' }}>Coleta</span>
          </h1>

          {/* Subtítulo */}
          <p className="animate-fadeInUp animate-delay-2" style={{ fontSize: '1.05rem', lineHeight: '1.8', maxWidth: '460px', margin: '0 auto 2.75rem', color: 'rgba(255,255,255,0.6)', fontWeight: 300, letterSpacing: '0.01em' }}>
            Encontre o ponto mais próximo e descarte seus recicláveis corretamente
          </p>

          {/* Indicadores */}
          <div className="d-flex justify-content-center gap-3 flex-wrap animate-fadeInUp animate-delay-3">
            {[
              { icon: 'bi-geo-alt-fill',  label: 'Pontos Ativos', value: pontos.length, iconColor: '#059669', iconBg: '#dcfce7' },
              { icon: 'bi-recycle',       label: 'Materiais',     value: '6 tipos',     iconColor: '#2563eb', iconBg: '#dbeafe' },
              { icon: 'bi-leaf-fill',     label: 'Sustentável',   value: '100%',        iconColor: '#65a30d', iconBg: '#ecfccb' },
            ].map((s, i) => (
              <div key={i} className="d-flex align-items-center gap-3 px-4 py-3 rounded-4"
                style={{ background: 'rgba(255,255,255,0.9)', boxShadow: '4px 4px 0px rgba(0,0,0,0.12)', minWidth: '160px', border: '2px solid rgba(255,255,255,0.7)', borderRadius: '18px' }}>
                <div className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
                  style={{ width: '42px', height: '42px', background: s.iconBg }}>
                  <i className={`bi ${s.icon}`} style={{ color: s.iconColor, fontSize: '1.15rem' }}></i>
                </div>
                <div className="text-start">
                  <div style={{ color: '#111827', fontSize: '1.2rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em' }}>{s.value}</div>
                  <div style={{ color: '#6b7280', fontSize: '0.73rem', fontWeight: 500, marginTop: '3px', letterSpacing: '0.02em' }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Busca e Filtros */}
      <div className="mb-5 animate-fadeInUp animate-delay-3">
        <div className="d-flex gap-3 mb-3">
          <SearchInput busca={busca} setBusca={setBusca} />
          {(busca || filtroMateriais.length > 0) && (
            <button className="btn fw-semibold px-4"
              onClick={() => { setBusca(''); setFiltroMateriais([]); }}
              style={{ borderRadius: '14px', border: '2px solid rgba(252,165,165,0.6)', background: 'rgba(254,226,226,0.7)', color: '#ef4444', height: '58px', whiteSpace: 'nowrap', fontSize: '0.85rem', flexShrink: 0, boxShadow: '3px 3px 0px rgba(0,0,0,0.08)' }}>
              <i className="bi bi-x-lg me-1"></i>Limpar
            </button>
          )}
        </div>

        <div className="d-flex flex-wrap gap-2 align-items-center">
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Filtrar:</span>
          {Object.entries(materialConfig).map(([nome, cfg]) => {
            const ativo = filtroMateriais.includes(nome);
            return (
              <FilterChip key={nome} nome={nome} cfg={cfg} ativo={ativo} onClick={() => toggleMaterial(nome)} />
            );
          })}
          {(busca || filtroMateriais.length > 0) && (
            <span className="ms-auto" style={{ fontSize: '0.82rem', color: '#6b7280' }}>
              <i className="bi bi-funnel-fill me-1" style={{ color: '#059669' }}></i>
              <strong style={{ color: '#111827' }}>{pontosFiltrados.length}</strong>
              <span className="text-muted"> de {pontos.length}</span>
            </span>
          )}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-5 my-4">
          <div className="d-inline-flex align-items-center justify-content-center mb-4" style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)' }}>
            <div className="spinner-border text-success" style={{ width: '2rem', height: '2rem' }}></div>
          </div>
          <p className="fw-semibold text-muted mb-0">Carregando pontos de coleta...</p>
        </div>
      )}

      {/* Erro */}
      {!loading && erro && (
        <div className="text-center py-5 my-4">
          <div className="d-inline-flex align-items-center justify-content-center mb-4 rounded-4" style={{ width: '80px', height: '80px', background: '#fff1f2', border: '2px solid #fecdd3' }}>
            <i className="bi bi-wifi-off" style={{ fontSize: '2rem', color: '#ef4444' }}></i>
          </div>
          <h5 className="fw-bold mb-2" style={{ color: '#1f2937' }}>Ops, algo deu errado</h5>
          <p className="text-muted mb-4" style={{ fontSize: '0.9rem' }}>{erro}</p>
          <button className="btn btn-success fw-semibold px-4" onClick={carregarPontos} style={{ borderRadius: '12px' }}>
            <i className="bi bi-arrow-clockwise me-2"></i>Tentar novamente
          </button>
        </div>
      )}

      {/* Sem resultados */}
      {!loading && !erro && pontosFiltrados.length === 0 && (
        <div className="text-center py-5 my-4">
          <div className="d-inline-flex align-items-center justify-content-center mb-4 rounded-4" style={{ width: '80px', height: '80px', background: '#f8fafc', border: '2px solid #e2e8f0' }}>
            <i className="bi bi-search" style={{ fontSize: '2rem', color: '#94a3b8' }}></i>
          </div>
          <h5 className="fw-bold mb-2" style={{ color: '#1f2937' }}>
            {pontos.length === 0 ? 'Nenhum ponto cadastrado ainda.' : 'Nenhum resultado encontrado'}
          </h5>
          <p className="text-muted mb-4" style={{ fontSize: '0.9rem' }}>Tente ajustar os filtros ou a busca.</p>
          {(busca || filtroMateriais.length > 0) && (
            <button className="btn btn-outline-success fw-semibold px-4" onClick={() => { setBusca(''); setFiltroMateriais([]); }} style={{ borderRadius: '12px' }}>
              <i className="bi bi-x-circle me-2"></i>Limpar filtros
            </button>
          )}
        </div>
      )}

      {/* Cards */}
      {!loading && !erro && (
        <div className="row g-4 pb-4">
          {pontosFiltrados.map((ponto, index) => (
            <div key={ponto.id} className="col-lg-6 col-xl-4 animate-scaleIn" style={{ animationDelay: `${index * 0.06}s` }}>
              <PontoCard ponto={ponto} onClick={() => setPontoSelecionado(ponto)} />
            </div>
          ))}
        </div>
      )}

      </div>{/* end maxWidth wrapper */}

      {/* Modal */}
      {pontoSelecionado && (
        <>
          <style>{`
            @keyframes modalBackdropIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes modalContentIn  { from { opacity: 0; transform: scale(0.96) translateY(12px); } to { opacity: 1; transform: scale(1) translateY(0); } }
            .modal-pontos-backdrop { animation: modalBackdropIn 0.22s ease both; }
            .modal-pontos-content  { animation: modalContentIn 0.28s cubic-bezier(0.34,1.1,0.64,1) both; }
          `}</style>
          <div
            className="modal d-block modal-pontos-backdrop"
            style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1050, backdropFilter: 'blur(8px)' }}
            onClick={e => e.target === e.currentTarget && setPontoSelecionado(null)}>
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" style={{ margin: '1.5rem auto' }}>
              <div className="modal-content modal-pontos-content border-0" style={{ borderRadius: '28px', overflow: 'hidden', boxShadow: '8px 8px 0px rgba(0,0,0,0.15), 0 32px 80px rgba(0,0,0,0.20)', border: '2px solid rgba(255,255,255,0.6)' }}>

              {/* Header */}
              <div style={{ background: 'linear-gradient(135deg, #052e16 0%, #064e3b 50%, #065f46 100%)', padding: '2.25rem 2rem 2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
                <div className="d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{ width: '64px', height: '64px', borderRadius: '20px', background: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}>
                    {pontoSelecionado.imagemPonto
                      ? <img src={pontoSelecionado.imagemPonto} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '18px' }} />
                      : <i className="bi bi-geo-alt-fill" style={{ color: '#6ee7b7', fontSize: '1.7rem' }}></i>
                    }
                  </div>
                  <div className="flex-grow-1" style={{ minWidth: 0 }}>
                    <h4 style={{ color: '#ffffff', fontWeight: 800, fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', letterSpacing: '-0.03em', marginBottom: '5px', lineHeight: 1.15 }}>
                      {pontoSelecionado.nome}
                    </h4>
                    <p style={{ color: 'rgba(255,255,255,0.45)', fontWeight: 400, fontSize: '0.8rem', margin: 0, display: 'flex', alignItems: 'center', gap: '5px', letterSpacing: '0.01em' }}>
                      <i className="bi bi-geo-alt" style={{ fontSize: '0.75rem' }}></i>
                      {pontoSelecionado.logradouro
                        ? `${pontoSelecionado.logradouro}, Nº ${pontoSelecionado.numero}`
                        : `CEP: ${pontoSelecionado.cep}`}
                    </p>
                  </div>
                  <button
                    onClick={() => setPontoSelecionado(null)}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.22)'; e.currentTarget.style.transform = 'scale(1.08)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'scale(1)'; }}
                    style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)', width: '40px', height: '40px', borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, transition: 'all 0.2s ease' }}>
                    <i className="bi bi-x-lg" style={{ fontSize: '0.95rem' }}></i>
                  </button>
                </div>
              </div>

              {/* Stats bar */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0', borderBottom: '1px solid #f0f0f0', background: '#f8fafc', padding: '1.25rem 1.5rem', gap: '0.75rem' }}>
                {[
                  { label: 'Status',    value: 'Ativo',                                                                   icon: 'bi-check-circle-fill', color: '#059669', bg: '#f0fdf4', border: '#bbf7d0' },
                  { label: 'Horário',   value: pontoSelecionado.horaFuncionamento || '—',                               icon: 'bi-clock-fill',        color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
                  { label: 'Contato',   value: pontoSelecionado.telefone || 'Não informado',                              icon: 'bi-telephone-fill',    color: '#7c3aed', bg: '#faf5ff', border: '#ddd6fe' },
                  { label: 'Materiais', value: `${formatarMateriais(pontoSelecionado.material).split(', ').length} tipos`, icon: 'bi-recycle',           color: '#d97706', bg: '#fffbeb', border: '#fde68a' },
                ].map((item, i) => (
                  <div key={i} style={{
                    background: 'white',
                    borderRadius: '14px',
                    padding: '1rem 0.75rem',
                    textAlign: 'center',
                    border: `1.5px solid ${item.border}`,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                  }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <i className={`bi ${item.icon}`} style={{ fontSize: '1rem', color: item.color }}></i>
                    </div>
                    <div style={{ color: '#9ca3af', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{item.label}</div>
                    <div style={{ color: '#0f172a', fontSize: '0.8rem', fontWeight: 700, lineHeight: 1.3, wordBreak: 'break-word' }}>{item.value}</div>
                  </div>
                ))}
              </div>

              {/* Body */}
              <div style={{ padding: '2rem' }}>
                <div className="row g-4">

                  {/* Localização */}
                  <div className="col-12 col-md-6">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem', paddingBottom: '0.6rem', borderBottom: '2px solid #f0fdf4' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <i className="bi bi-geo-alt-fill" style={{ color: '#059669', fontSize: '0.85rem' }}></i>
                      </div>
                      <h6 style={{ color: '#0f172a', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '-0.01em', margin: 0 }}>Localização</h6>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
                      <LocationField
                        label="Endereço"
                        icon="bi-signpost-2-fill"
                        value={pontoSelecionado.logradouro
                          ? `${pontoSelecionado.logradouro}, Nº ${pontoSelecionado.numero}`
                          : `CEP: ${pontoSelecionado.cep}, Nº ${pontoSelecionado.numero}`}
                      />
                      {pontoSelecionado.complemento && (
                        <LocationField
                          label="Complemento"
                          icon="bi-building"
                          value={pontoSelecionado.complemento}
                        />
                      )}
                    </div>

                    <MapsButton onClick={() => abrirMaps(pontoSelecionado)} />
                  </div>

                  {/* Materiais */}
                  <div className="col-12 col-md-6">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem', paddingBottom: '0.6rem', borderBottom: '2px solid #f0fdf4' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <i className="bi bi-recycle" style={{ color: '#059669', fontSize: '0.85rem' }}></i>
                      </div>
                      <h6 style={{ color: '#0f172a', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '-0.01em', margin: 0 }}>Materiais Aceitos</h6>
                    </div>

                    {(() => {
                      const lista = formatarMateriais(pontoSelecionado.material).split(', ');
                      const naoInformado = lista.length === 1 && (lista[0] === 'Não informado' || !materialConfig[lista[0]]);
                      if (naoInformado) {
                        return (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.9rem 1rem', borderRadius: '12px', background: '#f9fafb', border: '1px dashed #d1d5db' }}>
                            <i className="bi bi-question-circle" style={{ color: '#9ca3af', fontSize: '1rem' }}></i>
                            <span style={{ color: '#9ca3af', fontSize: '0.83rem', fontWeight: 500 }}>Materiais não especificados</span>
                          </div>
                        );
                      }
                      return (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {lista.map((mat, i) => {
                            const cfg = materialConfig[mat] || { color: '#6b7280', emoji: '♻️' };
                            const p = pastel[mat] || { bg: '#f3f4f6', border: '#d1d5db', text: '#374151' };
                            return (
                              <span key={i} style={{
                                display: 'inline-flex', alignItems: 'center', gap: '6px',
                                padding: '6px 13px', borderRadius: '999px',
                                background: p.bg, border: `1.5px solid ${p.border}`,
                                color: p.text, fontSize: '0.78rem', fontWeight: 600,
                              }}>
                                <span style={{ fontSize: '0.95rem', lineHeight: 1 }}>{cfg.emoji}</span>
                                {mat}
                              </span>
                            );
                          })}
                        </div>
                      );
                    })()}
                  </div>

                  {/* Descrição */}
                  {pontoSelecionado.descricao && (
                    <div className="col-12">
                      <div style={{ background: '#fffbeb', borderRadius: '14px', padding: '1.25rem 1.5rem', border: '1px solid #fde68a' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.6rem' }}>
                          <i className="bi bi-info-circle-fill" style={{ color: '#d97706', fontSize: '0.9rem' }}></i>
                          <h6 style={{ color: '#92400e', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.05em', textTransform: 'uppercase', margin: 0 }}>Sobre este ponto</h6>
                        </div>
                        <p style={{ margin: 0, color: '#78716c', fontSize: '0.88rem', lineHeight: '1.75', fontWeight: 400 }}>{pontoSelecionado.descricao}</p>
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Footer */}
              <div style={{ padding: '0 2rem 2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <ModalButton
                  onClick={() => pontoSelecionado.telefone && window.open(`tel:${pontoSelecionado.telefone}`)}
                  disabled={!pontoSelecionado.telefone}
                  variant="outline"
                  icon="bi-telephone-fill"
                  label="Ligar"
                  style={{ flex: 1, minWidth: '100px' }}
                />
                <ModalButton
                  onClick={() => abrirMaps(pontoSelecionado)}
                  variant="primary"
                  icon="bi-map-fill"
                  label="Como Chegar"
                  style={{ flex: 2, minWidth: '150px' }}
                />
                <ModalButton
                  onClick={() => setPontoSelecionado(null)}
                  variant="ghost"
                  label="Fechar"
                  style={{ flex: 1, minWidth: '90px' }}
                />
              </div>

            </div>
          </div>
        </div>
      </>
      )}
    </>
  );
}

export default PontosColeta;
