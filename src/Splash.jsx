import { useState, useEffect } from "react";

export default function Splash({ onComplete }) {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setGone(true), 4200);
    const t2 = setTimeout(() => onComplete(), 4900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <div className={`sp-root ${gone ? "sp-gone" : ""}`}>
      <div className="sp-grid" />

      <div className="sp-letters">
        <span className="sp-l sp-l1 sp-green" style={{animationDelay:"0.1s"}}>L</span>
        <span className="sp-l sp-l2 sp-green" style={{animationDelay:"0.2s"}}>G</span>
        <span className="sp-l sp-l3 sp-green" style={{animationDelay:"0.3s"}}>S</span>
        <span className="sp-gap" />
        <span className="sp-l sp-l4 sp-cyan" style={{animationDelay:"0.4s"}}>T</span>
        <span className="sp-l sp-l5 sp-cyan" style={{animationDelay:"0.5s"}}>Y</span>
        <span className="sp-l sp-l6 sp-cyan" style={{animationDelay:"0.6s"}}>T</span>
        <span className="sp-gap" />
        <span className="sp-l sp-l7 sp-pink" style={{animationDelay:"0.7s"}}>A</span>
        <span className="sp-l sp-l8 sp-pink" style={{animationDelay:"0.8s"}}>Y</span>
        <span className="sp-l sp-l9 sp-pink" style={{animationDelay:"0.9s"}}>T</span>
      </div>

      <div className="sp-line" />
      <div className="sp-sub">DERS TAKİP UYGULAMASI</div>

      <div className="sp-emoji">👍</div>

      <div className="sp-msg">
        {"BAŞARACAKSINIZ!".split("").map((c, i) => (
          <span key={i} className="sp-mc" style={{animationDelay:`${2.6 + i * 0.04}s`}}>{c}</span>
        ))}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@700;900&display=swap');

        .sp-root {
          position:fixed;inset:0;background:#0a0a12;z-index:9999;
          display:flex;flex-direction:column;align-items:center;justify-content:center;
          font-family:'JetBrains Mono',monospace;
          transition:opacity 0.7s ease;opacity:1;
        }
        .sp-gone { opacity:0; pointer-events:none; }

        .sp-grid {
          position:absolute;inset:0;
          background-image:linear-gradient(rgba(0,240,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,240,255,0.04) 1px,transparent 1px);
          background-size:40px 40px;
        }

        .sp-letters {
          display:flex;align-items:center;gap:3px;
          position:relative;z-index:2;margin-bottom:16px;
        }
        .sp-gap { width:16px; }

        .sp-l {
          font-size:clamp(32px,9vw,52px);font-weight:900;
          opacity:0;transform:translateY(-60px) rotate(-15deg) scale(0.5);
          animation:spDrop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards;
          will-change:transform,opacity;
        }
        .sp-green { color:#39ff14; text-shadow:0 0 12px #39ff14,0 0 24px rgba(57,255,20,0.5); }
        .sp-cyan  { color:#00f0ff; text-shadow:0 0 12px #00f0ff,0 0 24px rgba(0,240,255,0.5); }
        .sp-pink  { color:#ff2d75; text-shadow:0 0 12px #ff2d75,0 0 24px rgba(255,45,117,0.5); }

        @keyframes spDrop {
          0%   { opacity:0; transform:translateY(-60px) rotate(-15deg) scale(0.5); }
          100% { opacity:1; transform:translateY(0) rotate(0deg) scale(1); }
        }

        .sp-line {
          width:0;height:2px;position:relative;z-index:2;
          background:linear-gradient(90deg,transparent,#00f0ff,#ff2d75,#39ff14,transparent);
          box-shadow:0 0 8px rgba(0,240,255,0.4);
          animation:spLine 0.6s ease 1.2s forwards;
          will-change:width;
        }
        @keyframes spLine {
          0%   { width:0; }
          100% { width:min(240px,55vw); }
        }

        .sp-sub {
          font-size:10px;letter-spacing:5px;color:#e0e0e8;
          opacity:0;position:relative;z-index:2;margin-top:8px;
          animation:spFade 0.4s ease 1.6s forwards;
        }

        .sp-emoji {
          font-size:clamp(44px,12vw,64px);margin-top:32px;
          opacity:0;position:relative;z-index:2;
          animation:spPop 0.6s cubic-bezier(0.34,1.56,0.64,1) 2.0s forwards;
          will-change:transform,opacity;
        }
        @keyframes spPop {
          0%   { opacity:0; transform:scale(0) rotate(-15deg); }
          60%  { opacity:1; transform:scale(1.2) rotate(5deg); }
          100% { opacity:1; transform:scale(1) rotate(0deg); }
        }

        .sp-msg {
          position:relative;z-index:2;margin-top:14px;
          display:flex;gap:1px;
        }
        .sp-mc {
          font-size:clamp(16px,4.5vw,26px);font-weight:900;
          color:#ffe600;letter-spacing:clamp(1px,0.4vw,3px);
          text-shadow:0 0 8px #ffe600,0 0 20px rgba(255,230,0,0.5);
          opacity:0;transform:translateY(10px);
          animation:spChar 0.3s ease forwards;
          will-change:transform,opacity;
        }
        @keyframes spChar {
          0%   { opacity:0; transform:translateY(10px); }
          100% { opacity:1; transform:translateY(0); }
        }

        @keyframes spFade {
          0%   { opacity:0; }
          100% { opacity:0.5; }
        }
      `}</style>
    </div>
  );
}
