// components.jsx — shared UI primitives

const SI = {
  greenPrimary: '#7AB648',
  greenDark:    '#5F8F35',
  greenSoft:    '#A6CB7F',
  teal:         '#007E7A',
  tealDark:     '#00615E',
  olive:        '#B5A03B',
  textDark:     '#1F2A24',
  textMid:      '#5B6B62',
  textMute:     '#8E9C95',
  border:       '#E6ECE8',
  bg:           '#FFFFFF',
  bgSoft:       '#F5F8F6',
  danger:       '#C0392B',
};

// ─── Icons ────────────────────────────────────────────────────
const Icon = {
  Back: ({ s = 24, c = SI.textDark }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M15 6l-6 6 6 6" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Home: ({ s = 24, c = SI.textDark }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M4 11.5L12 5l8 6.5V20a1 1 0 01-1 1h-4v-6h-6v6H5a1 1 0 01-1-1v-8.5z"
        stroke={c} strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  ),
  Gear: ({ s = 22, c = SI.textDark }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke={c} strokeWidth="1.6"/>
      <path d="M19.4 15a1.7 1.7 0 00.34 1.87l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.7 1.7 0 00-1.87-.34 1.7 1.7 0 00-1.03 1.55V21a2 2 0 01-4 0v-.09a1.7 1.7 0 00-1.11-1.55 1.7 1.7 0 00-1.87.34l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.7 1.7 0 00.34-1.87 1.7 1.7 0 00-1.55-1.03H3a2 2 0 010-4h.09A1.7 1.7 0 004.64 9a1.7 1.7 0 00-.34-1.87l-.06-.06a2 2 0 112.83-2.83l.06.06a1.7 1.7 0 001.87.34H9a1.7 1.7 0 001.03-1.55V3a2 2 0 014 0v.09A1.7 1.7 0 0015 4.64a1.7 1.7 0 001.87-.34l.06-.06a2 2 0 112.83 2.83l-.06.06a1.7 1.7 0 00-.34 1.87V9c.18.43.55.77 1.03.95H21a2 2 0 010 4h-.09a1.7 1.7 0 00-1.51 1.05z"
        stroke={c} strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  ),
  EyeOff: ({ s = 22, c = SI.textDark }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M3 3l18 18M10.6 6.2A10.5 10.5 0 0112 6c5 0 9 4 10 6-.5 1-1.8 2.7-3.7 4.1M6.7 6.7C4.4 8.2 2.6 10.5 2 12c1 2 5 6 10 6 1.8 0 3.4-.5 4.8-1.3M9.9 9.9a3 3 0 004.2 4.2"
        stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Eye: ({ s = 22, c = SI.textDark }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" stroke={c} strokeWidth="1.8"/>
      <circle cx="12" cy="12" r="3" stroke={c} strokeWidth="1.8"/>
    </svg>
  ),
  Chart: ({ s = 22, c = SI.olive }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M3 17l5-5 4 3 7-8" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 7h5v5" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Doc: ({ s = 22, c = SI.greenPrimary }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M14 3v5h5M8 13h8M8 17h6" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  Calc: ({ s = 22, c = SI.greenPrimary }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="5" y="3" width="14" height="18" rx="2" stroke={c} strokeWidth="1.8"/>
      <rect x="8" y="6" width="8" height="3" rx="0.5" stroke={c} strokeWidth="1.6"/>
      <circle cx="9" cy="13" r="0.9" fill={c}/>
      <circle cx="12" cy="13" r="0.9" fill={c}/>
      <circle cx="15" cy="13" r="0.9" fill={c}/>
      <circle cx="9" cy="16.5" r="0.9" fill={c}/>
      <circle cx="12" cy="16.5" r="0.9" fill={c}/>
      <circle cx="15" cy="16.5" r="0.9" fill={c}/>
    </svg>
  ),
  Wallet: ({ s = 22, c = SI.olive }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M3 7a2 2 0 012-2h13v4M3 7v11a2 2 0 002 2h14a1 1 0 001-1v-3M3 7h17a1 1 0 011 1v4" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/>
      <circle cx="17" cy="13.5" r="1.2" fill={c}/>
    </svg>
  ),
  Plus: ({ s = 22, c = '#fff' }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14" stroke={c} strokeWidth="2.4" strokeLinecap="round"/>
    </svg>
  ),
  Pencil: ({ s = 18, c = SI.teal }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M4 20h4l10-10-4-4L4 16v4z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M14 6l4 4" stroke={c} strokeWidth="1.8"/>
    </svg>
  ),
  Trash: ({ s = 18, c = SI.danger }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M4 7h16M9 7V4h6v3M6 7l1 13a2 2 0 002 2h6a2 2 0 002-2l1-13M10 11v7M14 11v7" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Chevron: ({ s = 16, c = SI.teal }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M9 6l6 6-6 6" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  ChevronLeft: ({ s = 16, c = SI.teal }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M15 6l-6 6 6 6" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Close: ({ s = 24, c = SI.textDark }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M6 6l12 12M18 6L6 18" stroke={c} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  Download: ({ s = 20, c = SI.teal }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 3v12M8 11l4 4 4-4" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke={c} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  Upload: ({ s = 20, c = SI.greenDark }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 15V3M8 7l4-4 4 4" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke={c} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  Calendar: ({ s = 20, c = SI.teal }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke={c} strokeWidth="1.8"/>
      <path d="M3 9h18M8 2v4M16 2v4" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
};

// ─── Format helpers ────────────────────────────────────────────
function formatBRL(value) {
  const n = Number(value) || 0;
  return n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatDateBR(iso) {
  if (!iso || typeof iso !== 'string' || iso.indexOf('-') === -1) return iso || '';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

// ─── Donut chart ───────────────────────────────────────────────
function DonutChart({ data, size = 220, thickness = 38, visible = true }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const cx = size / 2, cy = size / 2;
  const r = (size - thickness) / 2;
  const C = 2 * Math.PI * r;

  let offset = 0;
  const segs = data.map((d, i) => {
    const frac = total > 0 ? d.value / total : 0;
    const len = frac * C;
    const node = (
      <circle
        key={i} cx={cx} cy={cy} r={r}
        fill="none" stroke={d.color} strokeWidth={thickness}
        strokeDasharray={`${len} ${C - len}`}
        strokeDashoffset={-offset}
        style={{ transition: 'stroke-dasharray 0.6s ease' }}
      />
    );
    offset += len;
    return node;
  });

  return (
    <div style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={SI.bgSoft} strokeWidth={thickness}/>
        {segs}
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', pointerEvents: 'none',
      }}>
        <div style={{ fontSize: 11, color: SI.textMute, letterSpacing: 0.4, textTransform: 'uppercase', fontWeight: 500 }}>
          Total
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: SI.greenDark, marginTop: 2 }}>
          {visible ? `R$ ${formatBRL(total)}` : '••••••'}
        </div>
      </div>
    </div>
  );
}

// ─── EditableRow ───────────────────────────────────────────────
function EditableRow({ label, value, hasOverride, masked, onSave }) {
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(value);
  const inputRef = React.useRef(null);

  function start() {
    setDraft(value);
    setEditing(true);
    setTimeout(() => inputRef.current && inputRef.current.select(), 0);
  }
  function commit() { onSave(draft.trim()); setEditing(false); }
  function cancel() { setEditing(false); }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
      <span style={{ fontSize: 14, color: SI.teal }}>{label}</span>
      {editing ? (
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') cancel(); }}
            onBlur={commit}
            style={{
              fontSize: 14, fontWeight: 700, color: SI.greenDark,
              textAlign: 'right', width: 130,
              padding: '4px 8px', borderRadius: 6,
              border: `1.5px solid ${SI.greenPrimary}`,
              background: '#fff', outline: 'none',
              fontFamily: 'inherit',
            }}
          />
          {hasOverride && (
            <button type="button"
              onMouseDown={(e) => { e.preventDefault(); onSave(''); setEditing(false); }}
              title="Voltar ao cálculo automático"
              style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: SI.textMute, fontSize: 11, padding: 2 }}
            >↻</button>
          )}
        </span>
      ) : (
        <button type="button" onClick={start}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'transparent', border: 'none', padding: '2px 4px',
            cursor: 'pointer', fontFamily: 'inherit', borderRadius: 4,
          }}
        >
          <span style={{ fontSize: 14, color: SI.greenDark, fontWeight: 700 }}>
            {masked ? '••••••' : value}
          </span>
          <Icon.Pencil s={12} c={SI.teal}/>
        </button>
      )}
    </div>
  );
}

Object.assign(window, { SI, Icon, formatBRL, formatDateBR, DonutChart, EditableRow });
