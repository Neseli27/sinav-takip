import { useState, useEffect } from "react";

const C = {
  bg: "#0a0a12",
  neonCyan: "#00f0ff",
  neonPink: "#ff2d75",
  neonGreen: "#39ff14",
  neonYellow: "#ffe600",
  neonPurple: "#b44dff",
  text: "#e0e0e8",
};

export default function Splash({ onComplete }) {
  const [phase, setPhase] = useState(0);
  // 0: dark
  // 1: letters flying in (LGS TYT AYT scatter)
  // 2: letters settle into position
  // 3: emoji + BAŞARACAKSINIZ
  // 4: fade out

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 1600),
      setTimeout(() => setPhase(3), 2800),
      setTimeout(() => setPhase(4), 4600),
      setTimeout(() => onComplete(), 5400),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: C.bg,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        opacity: phase === 4 ? 0 : 1,
        transition: "opacity 0.8s ease",
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      {/* Grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(0,240,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.04) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating particles */}
      {phase >= 1 &&
        Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`p${i}`}
            style={{
              position: "absolute",
              width: 3,
              height: 3,
              borderRadius: "50%",
              background:
                [C.neonCyan, C.neonPink, C.neonGreen, C.neonYellow, C.neonPurple][i % 5],
              left: `${10 + ((i * 37) % 80)}%`,
              top: `${10 + ((i * 53) % 80)}%`,
              opacity: phase >= 3 ? 0 : 0.6,
              animation: `floatParticle${i % 3} ${2 + (i % 3)}s ease-in-out infinite`,
              transition: "opacity 0.5s ease",
            }}
          />
        ))}

      {/* SINAV TAKIP letters - scattered then assembled */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        {/* LGS TYT AYT flying letters */}
        <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
          {[
            { text: "LGS", color: C.neonGreen },
            { text: "TYT", color: C.neonCyan },
            { text: "AYT", color: C.neonPink },
          ].map((exam, ei) =>
            exam.text.split("").map((letter, li) => {
              const scatterX = ((ei * 3 + li) * 137) % 300 - 150;
              const scatterY = ((ei * 3 + li) * 89) % 400 - 200;
              const scatterR = ((ei * 3 + li) * 47) % 720 - 360;
              const settled = phase >= 2;
              const visible = phase >= 1;
              return (
                <span
                  key={`${ei}-${li}`}
                  style={{
                    display: "inline-block",
                    fontSize: 48,
                    fontWeight: 900,
                    color: exam.color,
                    textShadow: settled
                      ? `0 0 20px ${exam.color}, 0 0 40px ${exam.color}60, 0 0 80px ${exam.color}30`
                      : `0 0 10px ${exam.color}80`,
                    transform: settled
                      ? "translate(0,0) rotate(0deg) scale(1)"
                      : visible
                      ? `translate(${scatterX}px, ${scatterY}px) rotate(${scatterR}deg) scale(0.5)`
                      : `translate(${scatterX * 2}px, ${scatterY * 2}px) rotate(${scatterR}deg) scale(0)`,
                    opacity: visible ? 1 : 0,
                    transition: settled
                      ? `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${li * 0.08 + ei * 0.15}s`
                      : "all 0.5s ease",
                    letterSpacing: li === exam.text.length - 1 ? 20 : 6,
                    filter: settled ? "none" : "blur(2px)",
                  }}
                >
                  {letter}
                </span>
              );
            })
          )}
        </div>

        {/* Decorative line */}
        <div
          style={{
            width: phase >= 2 ? 200 : 0,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${C.neonCyan}, ${C.neonPink}, ${C.neonGreen}, transparent)`,
            transition: "width 0.8s ease 0.3s",
            boxShadow: `0 0 10px ${C.neonCyan}60`,
            marginBottom: 8,
          }}
        />

        {/* Subtitle */}
        <div
          style={{
            fontSize: 11,
            letterSpacing: 6,
            color: C.text,
            opacity: phase >= 2 ? 0.6 : 0,
            transition: "opacity 0.6s ease 0.5s",
          }}
        >
          DERS TAKİP UYGULAMASI
        </div>

        {/* ✌️ Emoji + BAŞARACAKSINIZ */}
        <div
          style={{
            marginTop: 40,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            opacity: phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? "translateY(0) scale(1)" : "translateY(30px) scale(0.5)",
            transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <div
            style={{
              fontSize: 64,
              animation: phase >= 3 ? "emojiPop 0.6s ease" : "none",
              filter:
                phase >= 3
                  ? `drop-shadow(0 0 20px ${C.neonYellow}) drop-shadow(0 0 40px ${C.neonYellow}60)`
                  : "none",
            }}
          >
            👍
          </div>

          <div
            style={{
              position: "relative",
              padding: "12px 30px",
            }}
          >
            {"BAŞARACAKSINIZ!".split("").map((ch, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  fontSize: 26,
                  fontWeight: 900,
                  color: C.neonYellow,
                  textShadow: `0 0 10px ${C.neonYellow}, 0 0 30px ${C.neonYellow}80, 0 0 60px ${C.neonYellow}40`,
                  opacity: phase >= 3 ? 1 : 0,
                  transform: phase >= 3 ? "translateY(0) scale(1)" : "translateY(20px) scale(0)",
                  transition: `all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.3 + i * 0.04}s`,
                  letterSpacing: 4,
                  animation: phase >= 3 ? `neonPulse 2s ease-in-out infinite ${i * 0.1}s` : "none",
                }}
              >
                {ch}
              </span>
            ))}

            {/* Glow burst behind text */}
            <div
              style={{
                position: "absolute",
                inset: -20,
                borderRadius: 20,
                background: `radial-gradient(ellipse, ${C.neonYellow}15, transparent 70%)`,
                opacity: phase >= 3 ? 1 : 0,
                transition: "opacity 0.5s ease",
                animation: phase >= 3 ? "glowBurst 1.5s ease-out" : "none",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800;900&display=swap');

        @keyframes floatParticle0 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-30px) translateX(10px); }
        }
        @keyframes floatParticle1 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(20px) translateX(-15px); }
        }
        @keyframes floatParticle2 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-15px) translateX(-20px); }
        }

        @keyframes emojiPop {
          0% { transform: scale(0) rotate(-30deg); }
          50% { transform: scale(1.3) rotate(10deg); }
          70% { transform: scale(0.9) rotate(-5deg); }
          100% { transform: scale(1) rotate(0deg); }
        }

        @keyframes neonPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes glowBurst {
          0% { transform: scale(0.5); opacity: 0; }
          30% { transform: scale(1.5); opacity: 1; }
          100% { transform: scale(1); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
