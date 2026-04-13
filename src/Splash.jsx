import { useState, useEffect } from "react";

export default function Splash({ onComplete }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 1400),
      setTimeout(() => setPhase(3), 2600),
      setTimeout(() => setPhase(4), 4400),
      setTimeout(() => onComplete(), 5200),
    ];
    return () => t.forEach(clearTimeout);
  }, [onComplete]);

  const exams = [
    { text: "LGS", color: "#39ff14" },
    { text: "TYT", color: "#00f0ff" },
    { text: "AYT", color: "#ff2d75" },
  ];

  return (
    <div style={{
      position: "fixed", inset: 0, background: "#0a0a12", zIndex: 9999,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      overflow: "hidden", opacity: phase === 4 ? 0 : 1, transition: "opacity 0.8s ease",
      fontFamily: "'JetBrains Mono', monospace",
    }}>
      {/* Grid bg */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(0,240,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,240,255,0.04) 1px,transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      {/* Particles */}
      {phase >= 1 && Array.from({ length: 15 }).map((_, i) => (
        <div key={i} className="splash-particle" style={{
          position: "absolute", width: 3, height: 3, borderRadius: "50%",
          background: ["#00f0ff","#ff2d75","#39ff14","#ffe600","#b44dff"][i % 5],
          left: `${10 + (i * 5.5) % 80}%`, top: `${10 + (i * 7.3) % 80}%`,
          opacity: phase >= 4 ? 0 : 0.5,
          animation: `splashFloat ${2 + i % 3}s ease-in-out infinite`,
          transition: "opacity 0.5s",
        }} />
      ))}

      {/* LGS  TYT  AYT - 3 blok halinde */}
      <div style={{
        display: "flex", gap: 24, marginBottom: 20,
        position: "relative", zIndex: 2,
      }}>
        {exams.map((exam, ei) => (
          <div key={ei} style={{ display: "flex", gap: 2 }}>
            {exam.text.split("").map((ch, ci) => (
              <span key={ci} className="splash-letter" style={{
                display: "inline-block",
                fontSize: "clamp(36px, 8vw, 56px)",
                fontWeight: 900,
                color: exam.color,
                opacity: phase >= 1 ? 1 : 0,
                transform: phase >= 2
                  ? "translateY(0) rotate(0deg) scale(1)"
                  : phase >= 1
                    ? `translateY(${-80 - ci * 30}px) translateX(${(ei - 1) * 60 + ci * 15}px) rotate(${(ei * 90 + ci * 45) - 135}deg) scale(0.6)`
                    : "translateY(-200px) scale(0)",
                textShadow: phase >= 2
                  ? `0 0 15px ${exam.color}, 0 0 30px ${exam.color}80, 0 0 60px ${exam.color}40`
                  : `0 0 8px ${exam.color}60`,
                transition: phase >= 2
                  ? `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${ei * 0.12 + ci * 0.06}s`
                  : phase >= 1
                    ? `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${ei * 0.1 + ci * 0.05}s`
                    : "none",
                filter: phase >= 2 ? "blur(0px)" : "blur(1.5px)",
                letterSpacing: 3,
              }}>
                {ch}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Çizgi */}
      <div style={{
        width: phase >= 2 ? "min(260px, 60vw)" : 0, height: 2,
        background: "linear-gradient(90deg, transparent, #00f0ff, #ff2d75, #39ff14, transparent)",
        transition: "width 0.8s ease 0.2s",
        boxShadow: "0 0 10px rgba(0,240,255,0.4)",
        marginBottom: 8, position: "relative", zIndex: 2,
      }} />

      {/* Alt yazı */}
      <div style={{
        fontSize: 11, letterSpacing: 6, color: "#e0e0e8",
        opacity: phase >= 2 ? 0.5 : 0,
        transition: "opacity 0.6s ease 0.4s",
        position: "relative", zIndex: 2,
      }}>
        DERS TAKİP UYGULAMASI
      </div>

      {/* 👍 + BAŞARACAKSINIZ */}
      <div style={{
        marginTop: 40, display: "flex", flexDirection: "column",
        alignItems: "center", gap: 16,
        opacity: phase >= 3 ? 1 : 0,
        transform: phase >= 3 ? "translateY(0)" : "translateY(40px)",
        transition: "all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
        position: "relative", zIndex: 2,
      }}>
        <div style={{
          fontSize: "clamp(48px, 12vw, 72px)",
          animation: phase >= 3 ? "emojiEntry 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)" : "none",
          filter: phase >= 3 ? "drop-shadow(0 0 15px #ffe600) drop-shadow(0 0 30px rgba(255,230,0,0.4))" : "none",
        }}>👍</div>

        <div style={{ position: "relative", padding: "8px 20px" }}>
          {"BAŞARACAKSINIZ!".split("").map((ch, i) => (
            <span key={i} style={{
              display: "inline-block",
              fontSize: "clamp(18px, 5vw, 28px)",
              fontWeight: 900,
              color: "#ffe600",
              textShadow: "0 0 8px #ffe600, 0 0 20px rgba(255,230,0,0.6), 0 0 40px rgba(255,230,0,0.3)",
              opacity: phase >= 3 ? 1 : 0,
              transform: phase >= 3 ? "translateY(0) scale(1)" : "translateY(15px) scale(0.5)",
              transition: `all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.2 + i * 0.035}s`,
              letterSpacing: "clamp(1px, 0.5vw, 4px)",
              animation: phase >= 3 ? `neonBreath 2.5s ease-in-out infinite ${i * 0.08}s` : "none",
            }}>
              {ch}
            </span>
          ))}
          {/* Glow */}
          <div style={{
            position: "absolute", inset: -30, borderRadius: 30, pointerEvents: "none",
            background: "radial-gradient(ellipse, rgba(255,230,0,0.1), transparent 70%)",
            opacity: phase >= 3 ? 1 : 0,
            animation: phase >= 3 ? "glowPulse 2s ease-out" : "none",
          }} />
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800;900&display=swap');
        @keyframes splashFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes emojiEntry {
          0% { transform: scale(0) rotate(-20deg); }
          60% { transform: scale(1.3) rotate(8deg); }
          80% { transform: scale(0.9) rotate(-3deg); }
          100% { transform: scale(1) rotate(0); }
        }
        @keyframes neonBreath {
          0%, 100% { opacity: 1; text-shadow: 0 0 8px #ffe600, 0 0 20px rgba(255,230,0,0.6); }
          50% { opacity: 0.8; text-shadow: 0 0 12px #ffe600, 0 0 30px rgba(255,230,0,0.8), 0 0 50px rgba(255,230,0,0.3); }
        }
        @keyframes glowPulse {
          0% { transform: scale(0.5); opacity: 0; }
          40% { transform: scale(1.3); opacity: 1; }
          100% { transform: scale(1); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
