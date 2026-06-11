import { useState, useRef } from "react";

const COLORS = {
  bg: "#0F0F1A",
  card: "#16162A",
  border: "#2A2A4A",
  accent: "#6C63FF",
  accentLight: "#8B85FF",
  accentGlow: "rgba(108,99,255,0.15)",
  gold: "#F5C842",
  text: "#E8E8F0",
  muted: "#8888AA",
  success: "#4ECDC4",
  error: "#FF6B6B",
};

const styles = {
  app: {
    minHeight: "100vh",
    background: COLORS.bg,
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    color: COLORS.text,
    padding: "0",
  },
  hero: {
    background: `linear-gradient(135deg, #0F0F1A 0%, #1A1A35 50%, #0F0F1A 100%)`,
    borderBottom: `1px solid ${COLORS.border}`,
    padding: "48px 24px 40px",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },
  heroGlow: {
    position: "absolute",
    top: "-60px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "400px",
    height: "200px",
    background: "radial-gradient(ellipse, rgba(108,99,255,0.2) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  badge: {
    display: "inline-block",
    background: COLORS.accentGlow,
    border: `1px solid ${COLORS.accent}`,
    color: COLORS.accentLight,
    borderRadius: "20px",
    padding: "4px 14px",
    fontSize: "11px",
    fontWeight: "600",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    marginBottom: "16px",
  },
  heroTitle: {
    fontSize: "clamp(28px, 5vw, 48px)",
    fontWeight: "800",
    lineHeight: "1.1",
    marginBottom: "12px",
    background: `linear-gradient(135deg, ${COLORS.text} 0%, ${COLORS.accentLight} 100%)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  heroSub: {
    fontSize: "16px",
    color: COLORS.muted,
    maxWidth: "480px",
    margin: "0 auto 28px",
    lineHeight: "1.6",
  },
  priceTag: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(245,200,66,0.1)",
    border: `1px solid rgba(245,200,66,0.3)`,
    borderRadius: "12px",
    padding: "8px 18px",
    color: COLORS.gold,
    fontWeight: "700",
    fontSize: "15px",
  },
  main: {
    maxWidth: "720px",
    margin: "0 auto",
    padding: "32px 20px 60px",
  },
  card: {
    background: COLORS.card,
    border: `1px solid ${COLORS.border}`,
    borderRadius: "16px",
    padding: "28px",
    marginBottom: "20px",
  },
  cardTitle: {
    fontSize: "13px",
    fontWeight: "700",
    letterSpacing: "1px",
    textTransform: "uppercase",
    color: COLORS.muted,
    marginBottom: "16px",
  },
  textarea: {
    width: "100%",
    minHeight: "220px",
    background: "#0A0A14",
    border: `1px solid ${COLORS.border}`,
    borderRadius: "10px",
    padding: "16px",
    color: COLORS.text,
    fontSize: "14px",
    lineHeight: "1.6",
    resize: "vertical",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
  },
  uploadArea: {
    border: `2px dashed ${COLORS.border}`,
    borderRadius: "10px",
    padding: "32px 20px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.2s",
    background: "#0A0A14",
  },
  uploadIcon: {
    fontSize: "36px",
    marginBottom: "10px",
  },
  uploadText: {
    color: COLORS.muted,
    fontSize: "14px",
    lineHeight: "1.5",
  },
  tabRow: {
    display: "flex",
    gap: "8px",
    marginBottom: "16px",
  },
  tab: (active) => ({
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: `1px solid ${active ? COLORS.accent : COLORS.border}`,
    background: active ? COLORS.accentGlow : "transparent",
    color: active ? COLORS.accentLight : COLORS.muted,
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
  }),
  inputField: {
    width: "100%",
    background: "#0A0A14",
    border: `1px solid ${COLORS.border}`,
    borderRadius: "10px",
    padding: "12px 16px",
    color: COLORS.text,
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    marginBottom: "12px",
  },
  btn: {
    width: "100%",
    padding: "16px",
    borderRadius: "12px",
    border: "none",
    background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentLight})`,
    color: "#fff",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s",
    letterSpacing: "0.3px",
  },
  btnDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  divider: {
    height: "1px",
    background: COLORS.border,
    margin: "24px 0",
  },
  scoreRing: (score) => {
    const color = score >= 80 ? COLORS.success : score >= 60 ? COLORS.gold : COLORS.error;
    return {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "110px",
      height: "110px",
      borderRadius: "50%",
      border: `4px solid ${color}`,
      background: `rgba(${color === COLORS.success ? "78,205,196" : color === COLORS.gold ? "245,200,66" : "255,107,107"},0.08)`,
      color: color,
      flexShrink: 0,
    };
  },
  scoreNum: {
    fontSize: "32px",
    fontWeight: "800",
    lineHeight: 1,
  },
  scoreLabel: {
    fontSize: "11px",
    fontWeight: "600",
    opacity: 0.8,
    marginTop: "2px",
  },
  resultHeader: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "24px",
  },
  resultTitle: {
    fontSize: "22px",
    fontWeight: "800",
    marginBottom: "4px",
  },
  resultSub: {
    color: COLORS.muted,
    fontSize: "14px",
  },
  sectionTitle: {
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "1px",
    textTransform: "uppercase",
    color: COLORS.muted,
    marginBottom: "12px",
    marginTop: "20px",
  },
  pillRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "8px",
  },
  pill: (type) => ({
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "500",
    background: type === "good"
      ? "rgba(78,205,196,0.1)"
      : type === "bad"
      ? "rgba(255,107,107,0.1)"
      : "rgba(245,200,66,0.1)",
    color: type === "good" ? COLORS.success : type === "bad" ? COLORS.error : COLORS.gold,
    border: `1px solid ${type === "good" ? "rgba(78,205,196,0.3)" : type === "bad" ? "rgba(255,107,107,0.3)" : "rgba(245,200,66,0.3)"}`,
  }),
  recommendationItem: {
    display: "flex",
    gap: "12px",
    padding: "12px 0",
    borderBottom: `1px solid ${COLORS.border}`,
    alignItems: "flex-start",
  },
  recIcon: {
    fontSize: "18px",
    flexShrink: 0,
    marginTop: "1px",
  },
  recText: {
    fontSize: "14px",
    lineHeight: "1.6",
    color: COLORS.text,
  },
  loader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px 20px",
    gap: "16px",
  },
  spinner: {
    width: "48px",
    height: "48px",
    border: `3px solid ${COLORS.border}`,
    borderTop: `3px solid ${COLORS.accent}`,
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  errorBox: {
    background: "rgba(255,107,107,0.08)",
    border: `1px solid rgba(255,107,107,0.3)`,
    borderRadius: "10px",
    padding: "16px",
    color: COLORS.error,
    fontSize: "14px",
    lineHeight: "1.5",
  },
  resetBtn: {
    background: "transparent",
    border: `1px solid ${COLORS.border}`,
    borderRadius: "10px",
    padding: "12px 24px",
    color: COLORS.muted,
    fontSize: "14px",
    cursor: "pointer",
    marginTop: "16px",
    width: "100%",
  },
  howItWorks: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    marginTop: "8px",
  },
  step: {
    textAlign: "center",
    padding: "16px 12px",
  },
  stepIcon: {
    fontSize: "28px",
    marginBottom: "8px",
  },
  stepText: {
    fontSize: "13px",
    color: COLORS.muted,
    lineHeight: "1.4",
  },
};

function parseAnalysis(text) {
  try {
    const clean = text.replace(/```json|```/g, "").trim();
    return JSON.parse(clean);
  } catch {
    return null;
  }
}

export default function AnalizadorCV() {
  const [tab, setTab] = useState("texto");
  const [cvText, setCvText] = useState("");
  const [jobTarget, setJobTarget] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [paid, setPaid] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const fileRef = useRef();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setCvText(ev.target.result);
    reader.readAsText(file);
  };

  const handleAnalyze = async () => {
    if (!cvText.trim()) return;
    if (!paid) { setShowPayment(true); return; }
    await doAnalysis();
  };

  const doAnalysis = async () => {
    setLoading(true);
    setError("");
    setShowPayment(false);
    try {
      const prompt = `Eres un experto en recursos humanos y reclutamiento con 15 años de experiencia. Analiza el siguiente CV y devuelve ÚNICAMENTE un objeto JSON válido, sin texto adicional, sin comillas de código, con esta estructura exacta:

{
  "puntaje": <número del 0 al 100>,
  "nivel": "<Excelente|Bueno|Regular|Necesita mejoras>",
  "resumen": "<2-3 oraciones evaluando el CV de forma directa>",
  "fortalezas": ["<fortaleza 1>", "<fortaleza 2>", "<fortaleza 3>"],
  "debilidades": ["<debilidad 1>", "<debilidad 2>", "<debilidad 3>"],
  "recomendaciones": [
    {"icono": "🎯", "texto": "<recomendación concreta y accionable>"},
    {"icono": "📝", "texto": "<recomendación concreta y accionable>"},
    {"icono": "🚀", "texto": "<recomendación concreta y accionable>"},
    {"icono": "💡", "texto": "<recomendación concreta y accionable>"},
    {"icono": "⚡", "texto": "<recomendación concreta y accionable>"}
  ],
  "palabrasClave": ["<keyword 1>", "<keyword 2>", "<keyword 3>", "<keyword 4>", "<keyword 5>"],
  "fraseFinal": "<Una frase motivadora y personalizada para esta persona>"
}

${jobTarget ? `El candidato busca trabajar como: ${jobTarget}` : ""}

CV a analizar:
${cvText.slice(0, 3000)}`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await response.json();
      const raw = data.content?.map(i => i.text || "").join("");
      const parsed = parseAnalysis(raw);
      if (!parsed) throw new Error("No se pudo procesar la respuesta.");
      setResult(parsed);
    } catch (err) {
      setError("Hubo un problema al analizar el CV. Por favor intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const simulatePay = () => {
    setPaid(true);
    doAnalysis();
  };

  const reset = () => {
    setResult(null);
    setCvText("");
    setJobTarget("");
    setError("");
    setShowPayment(false);
    setPaid(false);
  };

  return (
    <div style={styles.app}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        textarea:focus { border-color: #6C63FF !important; }
        input:focus { border-color: #6C63FF !important; }
        button:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 4px 20px rgba(108,99,255,0.3); }
      `}</style>

      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.heroGlow} />
        <div style={styles.badge}>✦ Resultado en el acto</div>
        <h1 style={styles.heroTitle}>Subí tu CV y descubrí<br />por qué no te llaman<br />y cómo mejorarlo</h1>
        <p style={styles.heroSub}>
          Obtené tu análisis al instante: puntaje, fortalezas,
          debilidades y un plan concreto para conseguir el trabajo que querés.
        </p>
        <div style={styles.priceTag}>
          <span>💳</span>
          <span>Análisis completo por $7 USD</span>
        </div>
      </div>

      <div style={styles.main}>

        {/* Cómo funciona */}
        {!result && !loading && (
          <div style={styles.card}>
            <div style={styles.cardTitle}>¿Cómo funciona?</div>
            <div style={styles.howItWorks}>
              <div style={styles.step}>
                <div style={styles.stepIcon}>📄</div>
                <div style={styles.stepText}>Pegá o subí tu CV</div>
              </div>
              <div style={styles.step}>
                <div style={styles.stepIcon}>🤖</div>
                <div style={styles.stepText}>Lo procesamos al instante</div>
              </div>
              <div style={styles.step}>
                <div style={styles.stepIcon}>🎯</div>
                <div style={styles.stepText}>Recibís tu plan de mejora</div>
              </div>
            </div>
          </div>
        )}

        {/* Input */}
        {!result && !loading && !showPayment && (
          <div style={styles.card}>
            <div style={styles.cardTitle}>Tu CV</div>

            <div style={styles.tabRow}>
              <button style={styles.tab(tab === "texto")} onClick={() => setTab("texto")}>
                ✏️ Pegar texto
              </button>
              <button style={styles.tab(tab === "archivo")} onClick={() => setTab("archivo")}>
                📎 Subir archivo (.txt)
              </button>
            </div>

            {tab === "texto" ? (
              <textarea
                style={styles.textarea}
                placeholder="Pegá aquí el contenido de tu CV completo: experiencia, educación, habilidades, logros..."
                value={cvText}
                onChange={e => setCvText(e.target.value)}
              />
            ) : (
              <div
                style={styles.uploadArea}
                onClick={() => fileRef.current.click()}
              >
                <div style={styles.uploadIcon}>📁</div>
                <div style={styles.uploadText}>
                  {cvText ? "✅ Archivo cargado correctamente" : "Hacé clic para subir tu CV en formato .txt"}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".txt"
                  style={{ display: "none" }}
                  onChange={handleFile}
                />
              </div>
            )}

            <div style={{ height: "16px" }} />

            <input
              style={styles.inputField}
              placeholder="¿A qué puesto o área querés aplicar? (opcional)"
              value={jobTarget}
              onChange={e => setJobTarget(e.target.value)}
            />

            {error && <div style={{ ...styles.errorBox, marginBottom: "16px" }}>{error}</div>}

            <button
              style={{ ...styles.btn, ...(cvText.trim() ? {} : styles.btnDisabled) }}
              onClick={handleAnalyze}
              disabled={!cvText.trim()}
            >
              Analizar mi CV — $7 USD
            </button>
          </div>
        )}

        {/* Simulación de pago */}
        {showPayment && !loading && (
          <div style={styles.card}>
            <div style={styles.cardTitle}>💳 Completar pago</div>
            <p style={{ color: COLORS.muted, fontSize: "14px", marginBottom: "20px", lineHeight: "1.6" }}>
              Tu análisis está listo para procesarse. Completá el pago de <strong style={{ color: COLORS.gold }}>$7 USD</strong> para recibirlo al instante.
            </p>
            <input style={styles.inputField} placeholder="Número de tarjeta" />
            <div style={{ display: "flex", gap: "12px" }}>
              <input style={{ ...styles.inputField, flex: 1 }} placeholder="MM/AA" />
              <input style={{ ...styles.inputField, flex: 1 }} placeholder="CVV" />
            </div>
            <button style={styles.btn} onClick={simulatePay}>
              Pagar $7 y ver mi análisis →
            </button>
            <button style={styles.resetBtn} onClick={() => setShowPayment(false)}>
              Volver
            </button>
            <p style={{ textAlign: "center", color: COLORS.muted, fontSize: "11px", marginTop: "12px" }}>
              🔒 Pago seguro · Este es un demo — no se procesa ningún cobro real
            </p>
          </div>
        )}

        {/* Loader */}
        {loading && (
          <div style={styles.card}>
            <div style={styles.loader}>
              <div style={styles.spinner} />
              <p style={{ color: COLORS.muted, fontSize: "15px", textAlign: "center" }}>
                Procesando tu CV...<br />
                <span style={{ fontSize: "13px" }}>Esto tarda unos segundos</span>
              </p>
            </div>
          </div>
        )}

        {/* Resultado */}
        {result && (
          <div style={styles.card}>
            <div style={styles.resultHeader}>
              <div style={styles.scoreRing(result.puntaje)}>
                <span style={styles.scoreNum}>{result.puntaje}</span>
                <span style={styles.scoreLabel}>/ 100</span>
              </div>
              <div>
                <div style={styles.resultTitle}>{result.nivel}</div>
                <div style={styles.resultSub}>{result.resumen}</div>
              </div>
            </div>

            <div style={styles.divider} />

            <div style={styles.sectionTitle}>✅ Fortalezas</div>
            <div style={styles.pillRow}>
              {result.fortalezas?.map((f, i) => (
                <span key={i} style={styles.pill("good")}>{f}</span>
              ))}
            </div>

            <div style={styles.sectionTitle}>⚠️ Áreas a mejorar</div>
            <div style={styles.pillRow}>
              {result.debilidades?.map((d, i) => (
                <span key={i} style={styles.pill("bad")}>{d}</span>
              ))}
            </div>

            <div style={styles.sectionTitle}>🔑 Palabras clave a incluir</div>
            <div style={styles.pillRow}>
              {result.palabrasClave?.map((k, i) => (
                <span key={i} style={styles.pill("neutral")}>{k}</span>
              ))}
            </div>

            <div style={styles.sectionTitle}>🎯 Plan de acción</div>
            {result.recomendaciones?.map((r, i) => (
              <div key={i} style={styles.recommendationItem}>
                <span style={styles.recIcon}>{r.icono}</span>
                <span style={styles.recText}>{r.texto}</span>
              </div>
            ))}

            <div style={{
              marginTop: "24px",
              padding: "16px",
              background: COLORS.accentGlow,
              border: `1px solid ${COLORS.accent}`,
              borderRadius: "10px",
              fontSize: "14px",
              lineHeight: "1.6",
              color: COLORS.accentLight,
              textAlign: "center",
              fontStyle: "italic",
            }}>
              💬 {result.fraseFinal}
            </div>

            <button style={styles.resetBtn} onClick={reset}>
              ↩ Analizar otro CV
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
