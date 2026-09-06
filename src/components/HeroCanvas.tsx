import React, { useEffect, useRef, useState } from 'react';
import { Activity, Sparkles } from 'lucide-react';

export const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mousePosRef = useRef({ x: 0.5, y: 0.5 });
  const [activeExercise, setActiveExercise] = useState<'back' | 'knee' | 'neck' | 'shoulder'>('back');
  const [catCowPhase, setCatCowPhase] = useState<'Cat' | 'Cow'>('Cat');

  // Track mouse coordinates for 3D parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mousePosRef.current = { x, y };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Background floating data particles
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0008,
      vy: (Math.random() - 0.5) * 0.0008,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.6 + 0.2,
    }));

    let time = 0;
    let smoothMouseX = 0.5;
    let smoothMouseY = 0.5;
    let poseTransition = activeExercise === 'back' ? 1 : 0; // 1 for tabletop Cat-Cow, 0 for standing

    const render = () => {
      time += 0.025;
      ctx.clearRect(0, 0, width, height);

      // Interpolate pose transition
      const targetTransition = activeExercise === 'back' ? 1 : 0;
      poseTransition += (targetTransition - poseTransition) * 0.06;

      // Smooth mouse interpolation for parallax
      smoothMouseX += (mousePosRef.current.x - smoothMouseX) * 0.06;
      smoothMouseY += (mousePosRef.current.y - smoothMouseY) * 0.06;
      const mouseTiltX = (smoothMouseX - 0.5) * 35;
      const mouseTiltY = (smoothMouseY - 0.5) * 20;

      // 1. Draw particles with depth
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = 1;
        if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1;
        if (p.y > 1) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x * width, p.y * height, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha * 0.4})`;
        ctx.fill();
      });

      // 2. Compute Cat-Cow Kinematics for Back Pain
      // Cat phase (arching up into flexion) <--> Cow phase (dipping down into extension)
      const catCowSin = Math.sin(time * 1.4); // >0 for Cat (flexion arch), <0 for Cow (extension dip)
      const catCowWave = catCowSin; // -1 to 1

      // Tabletop Cat-Cow Joint Positions
      // Cat: Head drops, Thoracic arches HIGH, Lumbar arches HIGH, Pelvis tucks
      // Cow: Head lifts, Thoracic dips, Lumbar dips, Pelvis tilts up
      const catCowJoints = {
        head: { x: 0.26, y: 0.38 - catCowWave * 0.09 },
        neck: { x: 0.33, y: 0.42 - catCowWave * 0.06 },
        l_shoulder: { x: 0.38, y: 0.46 },
        r_shoulder: { x: 0.42, y: 0.46 },
        l_elbow: { x: 0.38, y: 0.60 },
        r_elbow: { x: 0.42, y: 0.60 },
        l_wrist: { x: 0.38, y: 0.74 },
        r_wrist: { x: 0.42, y: 0.74 },
        spine_high: { x: 0.44, y: 0.38 - catCowWave * 0.12 }, // Upper thoracic arch
        spine_mid: { x: 0.51, y: 0.39 - catCowWave * 0.14 },  // Mid thoracic peak arch
        spine_low: { x: 0.58, y: 0.41 - catCowWave * 0.12 },  // Lumbar lordosis/kyphosis
        l_hip: { x: 0.65, y: 0.45 - catCowWave * 0.04 },
        r_hip: { x: 0.69, y: 0.45 - catCowWave * 0.04 },
        l_knee: { x: 0.65, y: 0.74 },
        r_knee: { x: 0.69, y: 0.74 },
        l_ankle: { x: 0.78, y: 0.74 },
        r_ankle: { x: 0.82, y: 0.74 },
      };

      // Standing Base Joint Positions (for Knee Rehab, Neck, Shoulder)
      let kneeFlexionSin = Math.sin(time * 1.5);
      let squatDepth = (Math.sin(time * 1.5) + 1) * 0.04;
      let shoulderElevation = Math.sin(time * 1.8) * 0.08;
      let neckTilt = Math.sin(time * 2.0) * 0.015;

      const standingJoints = {
        head: { x: 0.5 + (activeExercise === 'neck' ? neckTilt : 0), y: 0.13 + (activeExercise === 'knee' ? squatDepth : 0) },
        neck: { x: 0.5 + (activeExercise === 'neck' ? neckTilt * 0.4 : 0), y: 0.20 + (activeExercise === 'knee' ? squatDepth : 0) },
        l_shoulder: { x: 0.38, y: 0.24 + (activeExercise === 'knee' ? squatDepth : 0) },
        r_shoulder: { x: 0.62, y: 0.24 + (activeExercise === 'knee' ? squatDepth : 0) },
        l_elbow: { x: 0.31 - (activeExercise === 'shoulder' ? shoulderElevation * 0.6 : 0), y: 0.37 - (activeExercise === 'shoulder' ? shoulderElevation : 0) + (activeExercise === 'knee' ? squatDepth : 0) },
        r_elbow: { x: 0.69 + (activeExercise === 'shoulder' ? shoulderElevation * 0.6 : 0), y: 0.37 - (activeExercise === 'shoulder' ? shoulderElevation : 0) + (activeExercise === 'knee' ? squatDepth : 0) },
        l_wrist: { x: 0.27 - (activeExercise === 'shoulder' ? shoulderElevation * 0.6 : 0), y: 0.51 - (activeExercise === 'shoulder' ? shoulderElevation : 0) + (activeExercise === 'knee' ? squatDepth : 0) },
        r_wrist: { x: 0.73 + (activeExercise === 'shoulder' ? shoulderElevation * 0.6 : 0), y: 0.51 - (activeExercise === 'shoulder' ? shoulderElevation : 0) + (activeExercise === 'knee' ? squatDepth : 0) },
        spine_high: { x: 0.5, y: 0.28 + (activeExercise === 'knee' ? squatDepth : 0) },
        spine_mid: { x: 0.5, y: 0.35 + (activeExercise === 'knee' ? squatDepth : 0) },
        spine_low: { x: 0.5, y: 0.48 + (activeExercise === 'knee' ? squatDepth : 0) },
        l_hip: { x: 0.43, y: 0.52 + (activeExercise === 'knee' ? squatDepth : 0) },
        r_hip: { x: 0.57, y: 0.52 + (activeExercise === 'knee' ? squatDepth : 0) },
        l_knee: { x: 0.41 - (activeExercise === 'knee' ? squatDepth * 0.5 : 0), y: 0.70 + (activeExercise === 'knee' ? squatDepth * 0.4 : 0) },
        r_knee: { x: 0.59 + (activeExercise === 'knee' ? squatDepth * 0.5 : 0), y: 0.70 + (activeExercise === 'knee' ? squatDepth * 0.4 : 0) },
        l_ankle: { x: 0.40, y: 0.88 },
        r_ankle: { x: 0.60, y: 0.88 },
      };

      // Blend current joint positions
      const jointMap = new Map();
      const keys = Object.keys(catCowJoints) as (keyof typeof catCowJoints)[];

      keys.forEach((k) => {
        const cj = catCowJoints[k];
        const sj = standingJoints[k];
        const lerpX = sj.x * (1 - poseTransition) + cj.x * poseTransition;
        const lerpY = sj.y * (1 - poseTransition) + cj.y * poseTransition;

        const screenX = lerpX * width + mouseTiltX;
        const screenY = lerpY * height + mouseTiltY;

        jointMap.set(k, { screenX, screenY, normX: lerpX, normY: lerpY });
      });

      // Connections / Bones for Cat-Cow & Skeleton
      const bones: [string, string][] = [
        ['head', 'neck'],
        ['neck', 'spine_high'],
        ['spine_high', 'spine_mid'],
        ['spine_mid', 'spine_low'],
        ['neck', 'l_shoulder'],
        ['neck', 'r_shoulder'],
        ['l_shoulder', 'l_elbow'],
        ['r_shoulder', 'r_elbow'],
        ['l_elbow', 'l_wrist'],
        ['r_elbow', 'r_wrist'],
        ['spine_low', 'l_hip'],
        ['spine_low', 'r_hip'],
        ['l_hip', 'l_knee'],
        ['r_hip', 'r_knee'],
        ['l_knee', 'l_ankle'],
        ['r_knee', 'r_ankle'],
        ['l_shoulder', 'spine_high'],
        ['r_shoulder', 'spine_high'],
      ];

      // 3. Draw Floor Mat guideline when in Cat-Cow tabletop mode
      if (poseTransition > 0.05) {
        const matY = 0.76 * height + mouseTiltY;
        ctx.beginPath();
        ctx.moveTo(width * 0.15, matY);
        ctx.lineTo(width * 0.88, matY);
        ctx.strokeStyle = `rgba(56, 189, 248, ${0.3 * poseTransition})`;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // 4. Draw Hologram Connection Beams (Bones)
      bones.forEach(([fromId, toId]) => {
        const j1 = jointMap.get(fromId);
        const j2 = jointMap.get(toId);
        if (!j1 || !j2) return;

        // Outer glow beam
        ctx.beginPath();
        ctx.moveTo(j1.screenX, j1.screenY);
        ctx.lineTo(j2.screenX, j2.screenY);
        ctx.strokeStyle = activeExercise === 'back' ? 'rgba(168, 85, 247, 0.3)' : 'rgba(99, 102, 241, 0.25)';
        ctx.lineWidth = 5;
        ctx.stroke();

        // Inner laser beam
        ctx.beginPath();
        ctx.moveTo(j1.screenX, j1.screenY);
        ctx.lineTo(j2.screenX, j2.screenY);
        ctx.strokeStyle = activeExercise === 'back' ? 'rgba(56, 189, 248, 0.85)' : 'rgba(56, 189, 248, 0.7)';
        ctx.lineWidth = 1.8;
        ctx.stroke();
      });

      // 5. Draw Spinal Curvature Glow Trail specifically for Cat-Cow
      if (poseTransition > 0.3) {
        const spineNodes = ['head', 'neck', 'spine_high', 'spine_mid', 'spine_low', 'l_hip'];
        ctx.beginPath();
        const start = jointMap.get('head');
        if (start) {
          ctx.moveTo(start.screenX, start.screenY);
          for (let i = 1; i < spineNodes.length; i++) {
            const p = jointMap.get(spineNodes[i]);
            if (p) ctx.lineTo(p.screenX, p.screenY);
          }
          ctx.strokeStyle = 'rgba(192, 132, 252, 0.5)';
          ctx.lineWidth = 3;
          ctx.stroke();
        }
      }

      // 6. Draw Scanning Beam Sweep
      const scanY = ((Math.sin(time * 0.6) + 1) / 2) * height;
      ctx.beginPath();
      ctx.moveTo(width * 0.15, scanY);
      ctx.lineTo(width * 0.85, scanY);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([8, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // 7. Draw Pulsing Joint Nodes
      jointMap.forEach((j, key) => {
        const isSpine = ['spine_high', 'spine_mid', 'spine_low', 'neck', 'head'].includes(key);
        const pulse = Math.sin(time * 4 + j.screenY * 0.05) * (isSpine && activeExercise === 'back' ? 3.5 : 2);

        // Outer ring
        ctx.beginPath();
        ctx.arc(j.screenX, j.screenY, (isSpine ? 9 : 7) + pulse, 0, Math.PI * 2);
        ctx.strokeStyle = isSpine && activeExercise === 'back' ? 'rgba(192, 132, 252, 0.7)' : 'rgba(139, 92, 246, 0.5)';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Glowing core
        ctx.beginPath();
        ctx.arc(j.screenX, j.screenY, isSpine ? 4.2 : 3.5, 0, Math.PI * 2);
        ctx.fillStyle = isSpine && activeExercise === 'back' ? '#c084fc' : '#38bdf8';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 8. Dynamic Clinical HUD Telemetry Callouts
      let activeCallouts: { id: string; text: string; score: string }[] = [];

      if (activeExercise === 'back') {
        const isCat = catCowWave > 0;
        const currentPhaseName = isCat ? 'Cat (Flexion)' : 'Cow (Extension)';
        const spineFlexionAngle = (28 + Math.abs(catCowWave) * 14).toFixed(1);
        const lordosisState = isCat ? 'Lumbar Decompression' : 'Lordosis Mobilisation';

        activeCallouts = [
          {
            id: 'spine_mid',
            text: `Thoracolumbar: ${spineFlexionAngle}°`,
            score: `Phase: ${currentPhaseName}`,
          },
          {
            id: 'head',
            text: isCat ? 'Cervical Flexion (Tucked)' : 'Cervical Extension (Lifted)',
            score: '0° Compression',
          },
          {
            id: 'spine_low',
            text: `L1-L5: ${lordosisState}`,
            score: 'Spinal Articulation: 99.2%',
          },
        ];
      } else if (activeExercise === 'knee') {
        const liveKneeAngle = (138 + kneeFlexionSin * 18).toFixed(1);
        activeCallouts = [
          {
            id: 'l_knee',
            text: `L. Knee Flexion: ${liveKneeAngle}°`,
            score: 'Form: 98.4% (Optimal)',
          },
          {
            id: 'r_knee',
            text: 'Patellar Tracking: Centered',
            score: '0° Valgus Deviation',
          },
          {
            id: 'spine_low',
            text: 'Pelvic Symmetry: 99.1%',
            score: 'Neutral Spine Maintained',
          },
        ];
      } else if (activeExercise === 'neck') {
        const liveCervical = (12.0 + Math.abs(neckTilt) * 100).toFixed(1);
        activeCallouts = [
          {
            id: 'head',
            text: `Cranial Alignment: ${liveCervical}°`,
            score: 'Cervical Retraction: Optimal',
          },
          {
            id: 'neck',
            text: 'C1-C7 Neutral Plane',
            score: 'Postural Score: 99.4%',
          },
          {
            id: 'l_shoulder',
            text: 'Scapular Stability: Balanced',
            score: 'Trapezius Tone: Relaxed',
          },
        ];
      } else {
        const liveShoulderAngle = (170 + Math.sin(time * 1.8) * 15).toFixed(0);
        activeCallouts = [
          {
            id: 'r_shoulder',
            text: `R. Abduction: ${liveShoulderAngle}°`,
            score: 'Target Plane Met',
          },
          {
            id: 'l_shoulder',
            text: 'Scapulohumeral Rhythm: 2:1',
            score: 'Symmetry: 99.0%',
          },
        ];
      }

      activeCallouts.forEach((c) => {
        const j = jointMap.get(c.id);
        if (!j) return;

        const isLeft = j.screenX < width * 0.45;
        const lineEndX = isLeft ? j.screenX - 70 : j.screenX + 70;
        const lineEndY = j.screenY - 28;

        // Leader line
        ctx.beginPath();
        ctx.moveTo(j.screenX, j.screenY);
        ctx.lineTo(lineEndX, lineEndY);
        ctx.lineTo(isLeft ? lineEndX - 40 : lineEndX + 40, lineEndY);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // HUD Text box
        ctx.font = 'bold 11px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#bae6fd';
        ctx.textAlign = isLeft ? 'right' : 'left';
        ctx.fillText(c.text, isLeft ? lineEndX - 8 : lineEndX + 8, lineEndY - 6);

        ctx.font = '10px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#c084fc';
        ctx.fillText(c.score, isLeft ? lineEndX - 8 : lineEndX + 8, lineEndY + 10);
      });

      // 9. Mini Spinal Waveform Bio-Signal
      const waveY = height - 30;
      const waveXStart = width * 0.25;
      const waveWidth = width * 0.5;

      ctx.beginPath();
      ctx.strokeStyle = activeExercise === 'back' ? 'rgba(192, 132, 252, 0.4)' : 'rgba(56, 189, 248, 0.3)';
      ctx.lineWidth = 1.2;
      for (let x = 0; x < waveWidth; x += 4) {
        const yOffset = Math.sin((x + time * 60) * 0.05) * Math.sin(time * 2) * 8;
        if (x === 0) ctx.moveTo(waveXStart + x, waveY + yOffset);
        else ctx.lineTo(waveXStart + x, waveY + yOffset);
      }
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeExercise]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-full min-h-[520px] flex flex-col items-center justify-center select-none"
    >
      {/* Visual background aura */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-600/15 via-purple-600/15 to-transparent blur-3xl -z-10 animate-pulse-slow" />

      {/* Interactive Condition Switcher Controls */}
      <div className="absolute top-4 z-20 flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-full bg-slate-900/85 backdrop-blur-xl border border-slate-700/80 shadow-lg">
        <button
          onClick={() => setActiveExercise('back')}
          className={`px-3 py-1 text-xs font-semibold rounded-full transition-all flex items-center gap-1.5 ${
            activeExercise === 'back'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>Back Pain</span>
        </button>
        <button
          onClick={() => setActiveExercise('knee')}
          className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
            activeExercise === 'knee'
              ? 'bg-brand-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Knee Rehab
        </button>
        <button
          onClick={() => setActiveExercise('neck')}
          className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
            activeExercise === 'neck'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Neck Pain
        </button>
        <button
          onClick={() => setActiveExercise('shoulder')}
          className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
            activeExercise === 'shoulder'
              ? 'bg-sky-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Shoulder ROM
        </button>
      </div>

      {/* Floating Live Form Pill bottom-right */}
      <div className="absolute bottom-12 right-2 sm:right-4 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/85 border border-purple-500/30 backdrop-blur-md shadow-xl">
        <Activity className="w-3.5 h-3.5 text-purple-400" />
        <span className="text-[11px] font-medium text-slate-200">
          Spinal Accuracy: <strong className="text-purple-300">99.2%</strong>
        </span>
      </div>

      {/* Main Skeleton Motion Canvas */}
      <canvas ref={canvasRef} className="relative z-10 w-full h-full cursor-crosshair" />
    </div>
  );
};
