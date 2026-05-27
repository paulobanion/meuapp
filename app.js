// app.jsx — main application

const MONTHS = [
  'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
  'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'
];

const CURRENT_YEAR = new Date().getFullYear();

// ─── Storage helpers ──────────────────────────────────────────
function storageKey(year, month, type) {
  return `ti_${year}_${month}_${type}`;
}

function loadInvestments(year, month) {
  try {
    const raw = localStorage.getItem(storageKey(year, month, 'inv'));
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveInvestments(year, month, data) {
  try { localStorage.setItem(storageKey(year, month, 'inv'), JSON.stringify(data)); } catch {}
}

function loadOverrides(year, month) {
  try {
    const raw = localStorage.getItem(storageKey(year, month, 'ov'));
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function saveOverrides(year, month, data) {
  try { localStorage.setItem(storageKey(year, month, 'ov'), JSON.stringify(data)); } catch {}
}

function loadRendimentos(year, month) {
  try {
    const raw = localStorage.getItem(storageKey(year, month, 'rend'));
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveRendimentos(year, month, data) {
  try { localStorage.setItem(storageKey(year, month, 'rend'), JSON.stringify(data)); } catch {}
}

// ─── Full backup / restore ────────────────────────────────────
function exportBackup() {
  const backup = {};
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith('ti_')) {
      try { backup[k] = JSON.parse(localStorage.getItem(k)); } catch { backup[k] = localStorage.getItem(k); }
    }
  }
  return backup;
}

function importBackup(data) {
  // Clear existing ti_ keys
  const toDelete = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith('ti_')) toDelete.push(k);
  }
  toDelete.forEach(k => localStorage.removeItem(k));
  // Write new
  Object.entries(data).forEach(([k, v]) => {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch {}
  });
}

// ─── BackupModal ──────────────────────────────────────────────
function BackupModal({ onClose }) {
  const [status, setStatus] = React.useState('');
  const fileRef = React.useRef(null);

  function handleExport() {
    const data = exportBackup();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const ts = new Date().toISOString().slice(0, 10);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup_total_investido_${ts}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setStatus('✅ Backup exportado com sucesso!');
    setTimeout(() => setStatus(''), 3000);
  }

  function handleImport(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        const keys = Object.keys(data);
        const valid = keys.every(k => k.startsWith('ti_'));
        if (!valid) { setStatus('❌ Arquivo inválido. Use um backup exportado pelo app.'); return; }
        importBackup(data);
        setStatus(`✅ Backup restaurado! ${keys.length} registros importados. Recarregue a página.`);
      } catch {
        setStatus('❌ Erro ao ler o arquivo. Verifique se é um JSON válido.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 60,
      display: 'flex', flexDirection: 'column',
    }}>
      <div
        onClick={onClose}
        style={{ position: 'absolute', inset: 0, background: 'rgba(20,30,25,0.5)' }}
      />
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        background: '#fff',
        borderTopLeftRadius: 22, borderTopRightRadius: 22,
        padding: '12px 20px 36px',
        boxShadow: '0 -12px 30px rgba(0,0,0,0.12)',
      }}>
        <div style={{
          width: 40, height: 4, borderRadius: 4, background: '#D9E1DC',
          margin: '4px auto 16px',
        }}/>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h2 style={{ margin: 0, fontSize: 19, fontWeight: 700, color: SI.tealDark }}>
            Backup & Restauração
          </h2>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', padding: 4, cursor: 'pointer' }}>
            <Icon.Close s={22}/>
          </button>
        </div>

        <p style={{ fontSize: 14, color: SI.textMid, margin: '0 0 20px', lineHeight: 1.6 }}>
          Salve todos os seus dados (todos os meses e anos) em um arquivo JSON.
          Restaure quando trocar de dispositivo ou reinstalar o app.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button
            onClick={handleExport}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              padding: '14px 16px', borderRadius: 14,
              background: SI.teal, border: 'none',
              color: '#fff', fontSize: 15, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'inherit',
              boxShadow: '0 6px 16px rgba(0, 126, 122, 0.3)',
            }}
          >
            <Icon.Download s={20} c="#fff"/>
            Exportar backup
          </button>

          <button
            onClick={() => fileRef.current && fileRef.current.click()}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              padding: '14px 16px', borderRadius: 14,
              background: '#fff', border: `2px solid ${SI.greenPrimary}`,
              color: SI.greenDark, fontSize: 15, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            <Icon.Upload s={20} c={SI.greenDark}/>
            Restaurar backup
          </button>
          <input
            ref={fileRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            style={{ display: 'none' }}
          />
        </div>

        {status && (
          <div style={{
            marginTop: 16, padding: '12px 14px', borderRadius: 10,
            background: status.startsWith('✅') ? '#EAF7E0' : '#FDECEA',
            color: status.startsWith('✅') ? SI.greenDark : SI.danger,
            fontSize: 14, fontWeight: 500, lineHeight: 1.5,
          }}>
            {status}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────
function Header({ title, onBack, onGear }) {
  return (
    <div style={{
      background: '#fff',
      borderBottom: `1px solid ${SI.border}`,
      padding: '14px 16px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      position: 'sticky', top: 0, zIndex: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {onBack && (
          <button
            onClick={onBack}
            style={{ background: 'none', border: 'none', padding: 4, cursor: 'pointer', display: 'flex' }}
            aria-label="Voltar"
          >
            <Icon.Back s={22} c={SI.tealDark}/>
          </button>
        )}
        <span style={{ fontSize: 17, fontWeight: 700, color: SI.tealDark }}>{title}</span>
      </div>
      {onGear && (
        <button
          onClick={onGear}
          style={{ background: 'none', border: 'none', padding: 6, cursor: 'pointer', display: 'flex' }}
          aria-label="Configurações"
        >
          <Icon.Gear s={22} c={SI.textMid}/>
        </button>
      )}
    </div>
  );
}

// ─── MonthCard (on home screen) ───────────────────────────────
function MonthCard({ year, monthIndex, onClick }) {
  const invs = loadInvestments(year, monthIndex);
  const rends = loadRendimentos(year, monthIndex);
  const total = invs.reduce((s, i) => s + (i.amount || 0), 0);
  const rendTotal = rends.reduce((s, r) => s + (r.amount || 0), 0);
  const hasData = invs.length > 0 || rends.length > 0;
  const monthName = MONTHS[monthIndex];

  return (
    <button
      onClick={onClick}
      style={{
        width: '100%', textAlign: 'left', cursor: 'pointer',
        background: hasData ? '#fff' : SI.bgSoft,
        border: `1.5px solid ${hasData ? SI.border : '#EEF2EE'}`,
        borderRadius: 16, padding: '14px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontFamily: 'inherit',
        boxShadow: hasData ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
        transition: 'box-shadow 0.15s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 42, height: 42, borderRadius: 12,
          background: hasData ? `${SI.greenPrimary}15` : '#E8EDE8',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon.Calendar s={20} c={hasData ? SI.greenPrimary : SI.textMute}/>
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: hasData ? SI.tealDark : SI.textMute }}>
            {monthName}
          </div>
          {hasData ? (
            <div style={{ fontSize: 12, color: SI.textMute, marginTop: 2 }}>
              {invs.length} investimento{invs.length !== 1 ? 's' : ''}
              {rendTotal > 0 ? ` · R$ ${formatBRL(rendTotal)} rendimentos` : ''}
            </div>
          ) : (
            <div style={{ fontSize: 12, color: '#B0BDB5', marginTop: 2 }}>Nenhum dado</div>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {hasData && (
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: SI.greenDark }}>
              R$ {formatBRL(total)}
            </div>
            <div style={{ fontSize: 11, color: SI.textMute }}>investido</div>
          </div>
        )}
        <Icon.Chevron s={16} c={SI.textMute}/>
      </div>
    </button>
  );
}

// ─── YearHome (list of months) ────────────────────────────────
function YearHome({ year, onSelectMonth, onGear }) {
  const [yearInput, setYearInput] = React.useState(String(year));
  const [currentYear, setCurrentYear] = React.useState(year);

  function applyYear(y) {
    const n = parseInt(y, 10);
    if (!isNaN(n) && n > 1900 && n < 2100) setCurrentYear(n);
  }

  const totalAll = MONTHS.reduce((sum, _, i) => {
    const invs = loadInvestments(currentYear, i);
    return sum + invs.reduce((s, inv) => s + (inv.amount || 0), 0);
  }, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: SI.bgSoft }}>
      <Header title="Total Investido" onGear={onGear}/>

      {/* Year selector */}
      <div style={{
        background: `linear-gradient(145deg, ${SI.tealDark}, ${SI.greenDark})`,
        padding: '20px 20px 28px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <button
            onClick={() => { const y = currentYear - 1; setCurrentYear(y); setYearInput(String(y)); }}
            style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 10, padding: '8px 14px', cursor: 'pointer', color: '#fff', fontSize: 18, fontWeight: 700, fontFamily: 'inherit' }}
          >‹</button>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#fff', letterSpacing: -0.5 }}>
              {currentYear}
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>
              Selecione um mês para gerenciar
            </div>
          </div>
          <button
            onClick={() => { const y = currentYear + 1; setCurrentYear(y); setYearInput(String(y)); }}
            style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 10, padding: '8px 14px', cursor: 'pointer', color: '#fff', fontSize: 18, fontWeight: 700, fontFamily: 'inherit' }}
          >›</button>
        </div>
        {totalAll > 0 && (
          <div style={{
            background: 'rgba(255,255,255,0.12)', borderRadius: 12, padding: '10px 14px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>Total acumulado {currentYear}</span>
            <span style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>R$ {formatBRL(totalAll)}</span>
          </div>
        )}
      </div>

      {/* Months list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {MONTHS.map((_, i) => (
            <MonthCard
              key={i}
              year={currentYear}
              monthIndex={i}
              onClick={() => onSelectMonth(currentYear, i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MonthScreen — tabs: Investimentos / Extrato ───────────────
function MonthScreen({ year, monthIndex, onBack, onGear }) {
  const [tab, setTab] = React.useState('inv');
  const [investments, setInvestments] = React.useState(() => loadInvestments(year, monthIndex));
  const [overrides, setOverrides] = React.useState(() => loadOverrides(year, monthIndex));
  const [rendimentos, setRendimentos] = React.useState(() => loadRendimentos(year, monthIndex));
  const [masked, setMasked] = React.useState(false);
  const [sheet, setSheet] = React.useState(null); // null | { mode: 'add'|'edit', item?, index? }
  const [rendSheet, setRendSheet] = React.useState(null);

  const monthName = MONTHS[monthIndex];

  // ── Investment helpers ──
  function persistInv(data) { saveInvestments(year, monthIndex, data); setInvestments(data); }
  function persistOv(data) { saveOverrides(year, monthIndex, data); setOverrides(data); }
  function persistRend(data) { saveRendimentos(year, monthIndex, data); setRendimentos(data); }

  function addInvestment(inv) {
    const next = [...investments, { ...inv, id: Date.now() }];
    persistInv(next);
    setSheet(null);
  }
  function editInvestment(idx, inv) {
    const next = investments.map((it, i) => i === idx ? { ...it, ...inv } : it);
    persistInv(next);
    setSheet(null);
  }
  function deleteInvestment(idx) {
    const next = investments.filter((_, i) => i !== idx);
    persistInv(next);
    setSheet(null);
  }

  function addRendimento(r) {
    const next = [...rendimentos, { ...r, id: Date.now() }];
    persistRend(next);
    setRendSheet(null);
  }
  function editRendimento(idx, r) {
    const next = rendimentos.map((it, i) => i === idx ? { ...it, ...r } : it);
    persistRend(next);
    setRendSheet(null);
  }
  function deleteRendimento(idx) {
    const next = rendimentos.filter((_, i) => i !== idx);
    persistRend(next);
    setRendSheet(null);
  }

  // ── Calculations ──
  const totalInvested = investments.reduce((s, i) => s + (i.amount || 0), 0);
  const autoMonthlyYield = investments.reduce((s, i) => s + (i.monthlyYield || 0), 0);
  const autoYearPct = totalInvested > 0
    ? ((autoMonthlyYield / totalInvested) * 100 * 12).toFixed(2) + '%'
    : '0,00%';

  const displayMonthlyYield = overrides.monthlyYield !== undefined
    ? overrides.monthlyYield
    : `R$ ${formatBRL(autoMonthlyYield)}`;
  const displayYearPct = overrides.yearPct !== undefined
    ? overrides.yearPct
    : autoYearPct;

  // Category breakdown for donut
  const catMap = {};
  investments.forEach(inv => {
    catMap[inv.category] = (catMap[inv.category] || 0) + (inv.amount || 0);
  });
  const donutData = CATEGORIES
    .filter(c => catMap[c.key] > 0)
    .map(c => ({ label: c.label, value: catMap[c.key], color: c.color }));

  // Total rendimentos
  const totalRend = rendimentos.reduce((s, r) => s + (r.amount || 0), 0);

  // Group rendimentos by year desc, then by date desc within
  const rendByYear = rendimentos.reduce((acc, r) => {
    const y = (r.date || '').slice(0, 4) || '—';
    if (!acc[y]) acc[y] = [];
    acc[y].push(r);
    return acc;
  }, {});
  const rendYears = Object.keys(rendByYear).sort((a, b) => b - a);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: SI.bgSoft, position: 'relative' }}>
      <Header
        title={`${monthName} ${year}`}
        onBack={onBack}
        onGear={onGear}
      />

      {/* Tabs */}
      <div style={{
        display: 'flex', background: '#fff',
        borderBottom: `1px solid ${SI.border}`,
      }}>
        {[['inv','Investimentos'],['ext','Extrato']].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)}
            style={{
              flex: 1, padding: '12px 0', border: 'none', background: 'transparent',
              fontSize: 14, fontWeight: tab === key ? 700 : 500,
              color: tab === key ? SI.tealDark : SI.textMute,
              borderBottom: `2.5px solid ${tab === key ? SI.tealDark : 'transparent'}`,
              cursor: 'pointer', fontFamily: 'inherit',
              transition: 'color 0.15s',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── TAB: INVESTIMENTOS ── */}
      {tab === 'inv' && (
        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90 }}>
          {/* Summary card */}
          <div style={{
            background: `linear-gradient(145deg, ${SI.tealDark}, ${SI.greenDark})`,
            padding: '20px 20px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', letterSpacing: 0.5, textTransform: 'uppercase' }}>
                  Total Investido
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#fff', marginTop: 4, letterSpacing: -0.5 }}>
                  {masked ? '••••••' : `R$ ${formatBRL(totalInvested)}`}
                </div>
              </div>
              <button
                onClick={() => setMasked(m => !m)}
                style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 10, padding: 10, cursor: 'pointer', display: 'flex' }}
              >
                {masked ? <Icon.EyeOff s={20} c="#fff"/> : <Icon.Eye s={20} c="#fff"/>}
              </button>
            </div>
            <div style={{ height: 1, background: 'rgba(255,255,255,0.15)', margin: '14px 0' }}/>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <EditableRow
                label="Rentabilidade do mês"
                value={displayMonthlyYield}
                hasOverride={overrides.monthlyYield !== undefined}
                masked={masked}
                onSave={(v) => {
                  if (!v) { const n = {...overrides}; delete n.monthlyYield; persistOv(n); }
                  else persistOv({...overrides, monthlyYield: v});
                }}
              />
              <EditableRow
                label="Desempenho no ano"
                value={displayYearPct}
                hasOverride={overrides.yearPct !== undefined}
                masked={masked}
                onSave={(v) => {
                  if (!v) { const n = {...overrides}; delete n.yearPct; persistOv(n); }
                  else persistOv({...overrides, yearPct: v});
                }}
              />
            </div>
          </div>

          {/* Donut */}
          {donutData.length > 0 && (
            <div style={{ background: '#fff', margin: '12px 16px', borderRadius: 16, padding: '16px 12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: SI.textMid, marginBottom: 12, letterSpacing: 0.3, textTransform: 'uppercase' }}>
                Alocação
              </div>
              <DonutChart data={donutData} size={190} thickness={32} visible={!masked}/>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16, justifyContent: 'center' }}>
                {donutData.map((d) => {
                  const pct = totalInvested > 0 ? ((d.value / totalInvested) * 100).toFixed(1) : 0;
                  return (
                    <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 9, height: 9, borderRadius: '50%', background: d.color, display: 'inline-block' }}/>
                      <span style={{ fontSize: 12, color: SI.textMid }}>{d.label}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: SI.textDark }}>{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Investments list */}
          <div style={{ padding: '0 16px', marginTop: investments.length === 0 ? 20 : 0 }}>
            {investments.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: SI.textMute }}>
                <Icon.Wallet s={40} c={SI.border}/>
                <div style={{ marginTop: 10, fontSize: 15, fontWeight: 500 }}>Nenhum investimento ainda</div>
                <div style={{ marginTop: 4, fontSize: 13 }}>Toque no + para adicionar</div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {investments.map((inv, i) => {
                  const cat = CATEGORIES.find(c => c.key === inv.category) || CATEGORIES[0];
                  return (
                    <div key={inv.id || i}
                      style={{
                        background: '#fff', borderRadius: 14, padding: '14px 16px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                        border: `1px solid ${SI.border}`,
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                            <span style={{ width: 10, height: 10, borderRadius: '50%', background: cat.color, display: 'inline-block', flexShrink: 0 }}/>
                            <span style={{ fontSize: 15, fontWeight: 700, color: SI.tealDark }}>{inv.name}</span>
                          </div>
                          <div style={{ fontSize: 12, color: SI.textMute, marginLeft: 18 }}>{cat.label}</div>
                        </div>
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <div style={{ fontSize: 16, fontWeight: 800, color: masked ? SI.textMute : SI.greenDark }}>
                            {masked ? '••••' : `R$ ${formatBRL(inv.amount)}`}
                          </div>
                          {inv.monthlyYield > 0 && (
                            <div style={{ fontSize: 12, color: SI.greenPrimary, marginTop: 2 }}>
                              +{masked ? '••' : `R$ ${formatBRL(inv.monthlyYield)}`}/mês
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => setSheet({ mode: 'edit', item: inv, index: i })}
                        style={{
                          marginTop: 10, width: '100%', padding: '8px', borderRadius: 8,
                          border: `1px solid ${SI.border}`, background: SI.bgSoft,
                          color: SI.teal, fontSize: 13, fontWeight: 600,
                          cursor: 'pointer', fontFamily: 'inherit',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                        }}
                      >
                        <Icon.Pencil s={13} c={SI.teal}/> Editar
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* FAB */}
          <button
            onClick={() => setSheet({ mode: 'add' })}
            aria-label="Adicionar investimento"
            style={{
              position: 'absolute', bottom: 28, right: 24,
              width: 56, height: 56, borderRadius: '50%',
              background: SI.greenPrimary, border: 'none',
              boxShadow: '0 6px 20px rgba(122,182,72,0.45)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Icon.Plus s={28} c="#fff"/>
          </button>
        </div>
      )}

      {/* ── TAB: EXTRATO ── */}
      {tab === 'ext' && (
        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90 }}>
          {/* Summary */}
          <div style={{
            background: `linear-gradient(145deg, ${SI.olive}, #8D7B2B)`,
            padding: '20px 20px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', letterSpacing: 0.5, textTransform: 'uppercase' }}>
                  Total em Rendimentos
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#fff', marginTop: 4, letterSpacing: -0.5 }}>
                  {masked ? '••••••' : `R$ ${formatBRL(totalRend)}`}
                </div>
              </div>
              <button
                onClick={() => setMasked(m => !m)}
                style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 10, padding: 10, cursor: 'pointer', display: 'flex' }}
              >
                {masked ? <Icon.EyeOff s={20} c="#fff"/> : <Icon.Eye s={20} c="#fff"/>}
              </button>
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 6 }}>
              {rendimentos.length} lançamento{rendimentos.length !== 1 ? 's' : ''} em {monthName}
            </div>
          </div>

          {/* Rendimentos list */}
          <div style={{ padding: '12px 16px' }}>
            {rendimentos.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: SI.textMute }}>
                <Icon.Doc s={40} c={SI.border}/>
                <div style={{ marginTop: 10, fontSize: 15, fontWeight: 500 }}>Nenhum rendimento ainda</div>
                <div style={{ marginTop: 4, fontSize: 13 }}>Toque no + para adicionar</div>
              </div>
            ) : (
              rendYears.map(y => (
                <div key={y} style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: SI.textMute, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>{y}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {rendByYear[y]
                      .slice().sort((a, b) => (b.date || '') < (a.date || '') ? -1 : 1)
                      .map((r, origIdx) => {
                        const globalIdx = rendimentos.findIndex(x => x === r || x.id === r.id);
                        return (
                          <div key={r.id || origIdx}
                            style={{
                              background: '#fff', borderRadius: 12, padding: '12px 14px',
                              border: `1px solid ${SI.border}`,
                              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                            }}
                          >
                            <div>
                              <div style={{ fontSize: 14, fontWeight: 600, color: SI.tealDark }}>{r.label || 'Rendimento'}</div>
                              <div style={{ fontSize: 12, color: SI.textMute, marginTop: 2 }}>{formatDateBR(r.date)}</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              <span style={{ fontSize: 15, fontWeight: 700, color: masked ? SI.textMute : SI.greenDark }}>
                                {masked ? '••••' : `+R$ ${formatBRL(r.amount)}`}
                              </span>
                              <button
                                onClick={() => setRendSheet({ mode: 'edit', item: r, index: globalIdx })}
                                style={{ background: SI.bgSoft, border: `1px solid ${SI.border}`, borderRadius: 8, padding: '6px 8px', cursor: 'pointer', display: 'flex' }}
                              >
                                <Icon.Pencil s={14} c={SI.teal}/>
                              </button>
                            </div>
                          </div>
                        );
                      })
                    }
                  </div>
                </div>
              ))
            )}
          </div>

          {/* FAB */}
          <button
            onClick={() => setRendSheet({ mode: 'add' })}
            aria-label="Adicionar rendimento"
            style={{
              position: 'absolute', bottom: 28, right: 24,
              width: 56, height: 56, borderRadius: '50%',
              background: SI.olive, border: 'none',
              boxShadow: '0 6px 20px rgba(181,160,59,0.45)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Icon.Plus s={28} c="#fff"/>
          </button>
        </div>
      )}

      {/* ── Bottom sheet: Investment ── */}
      <BottomSheet
        open={!!sheet}
        onClose={() => setSheet(null)}
        title={sheet?.mode === 'edit' ? 'Editar investimento' : 'Novo investimento'}
      >
        {sheet && (
          <InvestmentForm
            initial={sheet.mode === 'edit' ? sheet.item : null}
            onSave={(inv) => sheet.mode === 'edit' ? editInvestment(sheet.index, inv) : addInvestment(inv)}
            onCancel={() => setSheet(null)}
            onDelete={sheet.mode === 'edit' ? () => deleteInvestment(sheet.index) : undefined}
          />
        )}
      </BottomSheet>

      {/* ── Bottom sheet: Rendimento ── */}
      <BottomSheet
        open={!!rendSheet}
        onClose={() => setRendSheet(null)}
        title={rendSheet?.mode === 'edit' ? 'Editar rendimento' : 'Novo rendimento'}
      >
        {rendSheet && (
          <RendimentoForm
            initial={rendSheet.mode === 'edit' ? rendSheet.item : null}
            onSave={(r) => rendSheet.mode === 'edit' ? editRendimento(rendSheet.index, r) : addRendimento(r)}
            onCancel={() => setRendSheet(null)}
            onDelete={rendSheet.mode === 'edit' ? () => deleteRendimento(rendSheet.index) : undefined}
          />
        )}
      </BottomSheet>
    </div>
  );
}

// ─── Root App ─────────────────────────────────────────────────
function App() {
  const [screen, setScreen] = React.useState('home'); // 'home' | 'month'
  const [selectedYear, setSelectedYear] = React.useState(CURRENT_YEAR);
  const [selectedMonth, setSelectedMonth] = React.useState(0);
  const [showBackup, setShowBackup] = React.useState(false);

  function openMonth(year, monthIdx) {
    setSelectedYear(year);
    setSelectedMonth(monthIdx);
    setScreen('month');
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif" }}>
      {screen === 'home' && (
        <YearHome
          year={CURRENT_YEAR}
          onSelectMonth={openMonth}
          onGear={() => setShowBackup(true)}
        />
      )}
      {screen === 'month' && (
        <MonthScreen
          year={selectedYear}
          monthIndex={selectedMonth}
          onBack={() => setScreen('home')}
          onGear={() => setShowBackup(true)}
        />
      )}
      {showBackup && <BackupModal onClose={() => setShowBackup(false)}/>}
    </div>
  );
}

// ─── Mount ────────────────────────────────────────────────────
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
