import React, { useEffect, useRef, useState } from 'react';
import { Activity } from 'lucide-react';

export const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mousePosRef = useRef({ x: 0.5, y: 0.5 });
  const [activeExercise, setActiveExercise] = useState<'knee' | 'back' | 'neck' | 'shoulder'>('knee');

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
    let seatedTransition = activeExercise === 'knee' ? 1 : 0; // 1 for Seated Knee Extension, 0 for Standing Squat/ROM

    const render = () => {
      time += 0.022;
      ctx.clearRect(0, 0, width, height);

      // Smooth transition into seated pose
      const targetSeated = activeExercise === 'knee' ? 1 : 0;
      seatedTransition += (targetSeated - seatedTransition) * 0.08;

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

      // 2. Kinematic Cycles
      // Knee Extension Rehab Cycle: Leg extends horizontally straight up and slowly lowers down
      const kneeCycleRaw = Math.sin(time * 1.5);
      // Holds briefly at peak extension
      const legExtensionProgress = Math.max(0, Math.min(1, (kneeCycleRaw + 0.8) / 1.6));

      // Standing Deep Squat Cycle (for Back Pain)
      const squatCycle = (Math.sin(time * 1.4) + 1) / 2;
      const squatDepthY = squatCycle * 0.165;
      const squatKneeOutX = squatCycle * 0.075;
      const squatKneeY = squatCycle * 0.065;

      // Shoulder ROM Cycle
      const shoulderElev = Math.sin(time * 1.8) * 0.08;

      // Neck Retraction Cycle
      const neckTilt = Math.sin(time * 2.0) * 0.015;

      // Seated Knee Extension Base Positions (Side Profile on Bench)
      const seatedKneeX = 0.54;
      const seatedKneeY = 0.56;
      const legLength = 0.22;
      // Angle: PI/2 = 90° down (bent), 0 = 0° horizontal (fully extended straight leg)
      const currentLegAngleRad = (Math.PI / 2) * (1 - legExtensionProgress);
      const activeAnkleX = seatedKneeX + legLength * Math.cos(currentLegAngleRad);
      const activeAnkleY = seatedKneeY + legLength * Math.sin(currentLegAngleRad);

      const seatedJoints = {
        head: { x: 0.36, y: 0.22 },
        neck: { x: 0.38, y: 0.28 },
        spine_high: { x: 0.39, y: 0.36 },
        spine_mid: { x: 0.40, y: 0.45 },
        spine_low: { x: 0.41, y: 0.53 },
        l_shoulder: { x: 0.38, y: 0.30 },
        r_shoulder: { x: 0.40, y: 0.30 },
        l_elbow: { x: 0.36, y: 0.43 },
        r_elbow: { x: 0.38, y: 0.43 },
        l_wrist: { x: 0.35, y: 0.55 },
        r_wrist: { x: 0.37, y: 0.55 },
        l_hip: { x: 0.42, y: 0.56 },
        r_hip: { x: 0.44, y: 0.56 },
        // Supporting Leg (stays bent 90° with foot on ground)
        l_knee: { x: 0.50, y: 0.56 },
        l_ankle: { x: 0.50, y: 0.78 },
        // Active Rehab Leg (extends up and down)
        r_knee: { x: seatedKneeX, y: seatedKneeY },
        r_ankle: { x: activeAnkleX, y: activeAnkleY },
      };

      // Standing Base Positions (for Back Pain Squats, Neck, Shoulder) - positioned at y: 0.22 to clear top controls
      const standingJoints = {
        head: { x: 0.5 + (activeExercise === 'neck' ? neckTilt : 0), y: 0.22 + (activeExercise === 'back' ? squatDepthY * 0.8 : 0) },
        neck: { x: 0.5 + (activeExercise === 'neck' ? neckTilt * 0.4 : 0), y: 0.28 + (activeExercise === 'back' ? squatDepthY * 0.8 : 0) },
        l_shoulder: { x: 0.38, y: 0.32 + (activeExercise === 'back' ? squatDepthY * 0.8 : 0) },
        r_shoulder: { x: 0.62, y: 0.32 + (activeExercise === 'back' ? squatDepthY * 0.8 : 0) },
        l_elbow: { x: 0.31 - (activeExercise === 'shoulder' ? shoulderElev * 0.6 : 0), y: 0.43 - (activeExercise === 'shoulder' ? shoulderElev : 0) + (activeExercise === 'back' ? squatDepthY * 0.8 - squatCycle * 0.08 : 0) },
        r_elbow: { x: 0.69 + (activeExercise === 'shoulder' ? shoulderElev * 0.6 : 0), y: 0.43 - (activeExercise === 'shoulder' ? shoulderElev : 0) + (activeExercise === 'back' ? squatDepthY * 0.8 - squatCycle * 0.08 : 0) },
        l_wrist: { x: 0.27 - (activeExercise === 'shoulder' ? shoulderElev * 0.6 : 0), y: 0.55 - (activeExercise === 'shoulder' ? shoulderElev : 0) + (activeExercise === 'back' ? squatDepthY * 0.8 - squatCycle * 0.13 : 0) },
        r_wrist: { x: 0.73 + (activeExercise === 'shoulder' ? shoulderElev * 0.6 : 0), y: 0.55 - (activeExercise === 'shoulder' ? shoulderElev : 0) + (activeExercise === 'back' ? squatDepthY * 0.8 - squatCycle * 0.13 : 0) },
        spine_high: { x: 0.5, y: 0.35 + (activeExercise === 'back' ? squatDepthY * 0.8 : 0) },
        spine_mid: { x: 0.5, y: 0.42 + (activeExercise === 'back' ? squatDepthY * 0.8 : 0) },
        spine_low: { x: 0.5, y: 0.52 + (activeExercise === 'back' ? squatDepthY * 0.8 : 0) },
        l_hip: { x: 0.43, y: 0.56 + (activeExercise === 'back' ? squatDepthY * 0.8 : 0) },
        r_hip: { x: 0.57, y: 0.56 + (activeExercise === 'back' ? squatDepthY * 0.8 : 0) },
        l_knee: { x: 0.41 - (activeExercise === 'back' ? squatKneeOutX : 0), y: 0.72 + (activeExercise === 'back' ? squatKneeY : 0) },
        r_knee: { x: 0.59 + (activeExercise === 'back' ? squatKneeOutX : 0), y: 0.72 + (activeExercise === 'back' ? squatKneeY : 0) },
        l_ankle: { x: 0.40, y: 0.88 },
        r_ankle: { x: 0.60, y: 0.88 },
      };

      // Blend current joint positions
      const jointMap = new Map();
      const keys = Object.keys(seatedJoints) as (keyof typeof seatedJoints)[];

      keys.forEach((k) => {
        const sj = seatedJoints[k];
        const stdj = standingJoints[k];
        const lerpX = stdj.x * (1 - seatedTransition) + sj.x * seatedTransition;
        const lerpY = stdj.y * (1 - seatedTransition) + sj.y * seatedTransition;

        const screenX = lerpX * width + mouseTiltX;
        const screenY = lerpY * height + mouseTiltY;

        jointMap.set(k, { screenX, screenY, normX: lerpX, normY: lerpY });
      });

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

      // 3. Draw Seated Box / Bench Hologram Grid when in Knee Rehab Mode
      if (seatedTransition > 0.05) {
        const boxLeft = (0.28 * width) + mouseTiltX;
        const boxRight = (0.52 * width) + mouseTiltX;
        const boxTop = (0.56 * height) + mouseTiltY;
        const boxBottom = (0.78 * height) + mouseTiltY;

        ctx.strokeStyle = `rgba(56, 189, 248, ${0.25 * seatedTransition})`;
        ctx.lineWidth = 1.2;
        ctx.setLineDash([4, 4]);

        // Box front / top face
        ctx.strokeRect(boxLeft, boxTop, boxRight - boxLeft, boxBottom - boxTop);

        // Floor line
        ctx.beginPath();
        ctx.moveTo(0.18 * width + mouseTiltX, boxBottom);
        ctx.lineTo(0.85 * width + mouseTiltX, boxBottom);
        ctx.strokeStyle = `rgba(56, 189, 248, ${0.35 * seatedTransition})`;
        ctx.stroke();

        ctx.setLineDash([]);
      }

      // 4. Draw Hologram Connection Beams (Bones)
      bones.forEach(([fromId, toId]) => {
        const j1 = jointMap.get(fromId);
        const j2 = jointMap.get(toId);
        if (!j1 || !j2) return;

        const isRehabLeg = (fromId === 'r_knee' && toId === 'r_ankle') || (fromId === 'r_hip' && toId === 'r_knee');

        // Outer glow beam
        ctx.beginPath();
        ctx.moveTo(j1.screenX, j1.screenY);
        ctx.lineTo(j2.screenX, j2.screenY);
        ctx.strokeStyle = isRehabLeg && activeExercise === 'knee'
          ? 'rgba(56, 189, 248, 0.45)'
          : activeExercise === 'back'
          ? 'rgba(168, 85, 247, 0.28)'
          : 'rgba(99, 102, 241, 0.25)';
        ctx.lineWidth = isRehabLeg && activeExercise === 'knee' ? 6 : 5;
        ctx.stroke();

        // Inner laser beam
        ctx.beginPath();
        ctx.moveTo(j1.screenX, j1.screenY);
        ctx.lineTo(j2.screenX, j2.screenY);
        ctx.strokeStyle = isRehabLeg && activeExercise === 'knee'
          ? '#38bdf8'
          : activeExercise === 'back'
          ? 'rgba(192, 132, 252, 0.9)'
          : 'rgba(56, 189, 248, 0.7)';
        ctx.lineWidth = isRehabLeg && activeExercise === 'knee' ? 2.5 : 1.8;
        ctx.stroke();
      });

      // 5. Draw Motion Arc for Knee Extension
      if (activeExercise === 'knee' && seatedTransition > 0.4) {
        const kneeNode = jointMap.get('r_knee');
        if (kneeNode) {
          ctx.beginPath();
          ctx.arc(
            kneeNode.screenX,
            kneeNode.screenY,
            legLength * height,
            0,
            Math.PI / 2,
            false
          );
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
          ctx.lineWidth = 1.2;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      // 6. Draw Scanning Sweeps
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
        const isKneeTarget = (key === 'r_knee' || key === 'r_ankle') && activeExercise === 'knee';
        const isSpineTarget = ['spine_high', 'spine_mid', 'spine_low'].includes(key) && activeExercise === 'back';
        const isTarget = isKneeTarget || isSpineTarget;
        const pulse = Math.sin(time * 4 + j.screenY * 0.05) * (isTarget ? 3.5 : 2);

        // Outer pulsing ring
        ctx.beginPath();
        ctx.arc(j.screenX, j.screenY, (isTarget ? 9 : 7) + pulse, 0, Math.PI * 2);
        ctx.strokeStyle = isKneeTarget
          ? 'rgba(56, 189, 248, 0.8)'
          : isSpineTarget
          ? 'rgba(192, 132, 252, 0.8)'
          : 'rgba(139, 92, 246, 0.5)';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Inner glowing core
        ctx.beginPath();
        ctx.arc(j.screenX, j.screenY, isTarget ? 4.2 : 3.5, 0, Math.PI * 2);
        ctx.fillStyle = isSpineTarget ? '#c084fc' : '#38bdf8';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = isTarget ? 15 : 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 8. Dynamic Clinical HUD Telemetry Callouts
      let activeCallouts: { id: string; text: string; score: string }[] = [];

      if (activeExercise === 'knee') {
        const liveExtensionDeg = Math.round(90 * (1 - legExtensionProgress)); // 0° (full extension) to 90° (bent)
        const vmoActivation = Math.round(75 + legExtensionProgress * 24.8); // up to 99.8% at top lock

        activeCallouts = [
          {
            id: 'r_knee',
            text: `R. Knee Angle: ${liveExtensionDeg}° (${liveExtensionDeg < 10 ? 'Full Extension' : 'Flexion Track'})`,
            score: `VMO Activation: ${vmoActivation}%`,
          },
          {
            id: 'r_ankle',
            text: 'Terminal Knee Extension (TKE)',
            score: 'Patellar Tracking: 0° Valgus Deviation',
          },
          {
            id: 'spine_mid',
            text: 'Upright Seated Posture',
            score: 'Spinal Neutral Maintained',
          },
        ];
      } else if (activeExercise === 'back') {
        const liveSquatDepthDeg = (70 + squatCycle * 56).toFixed(0);
        const lumbarFlexion = (2.0 + squatCycle * 1.5).toFixed(1);

        activeCallouts = [
          {
            id: 'spine_low',
            text: `Lumbar L4-L5: ${lumbarFlexion}° Neutral`,
            score: 'No Butt-Wink / Safe Hinge',
          },
          {
            id: 'spine_mid',
            text: 'Thoracic Stability: 99.6%',
            score: 'Spinal Load: -48% (Optimal)',
          },
          {
            id: 'l_knee',
            text: `Deep Squat Flexion: ${liveSquatDepthDeg}°`,
            score: 'Full ROM Target Met',
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

      // 9. Mini Spinal / Bio-Signal Waveform at bottom
      const waveY = height - 30;
      const waveXStart = width * 0.25;
      const waveWidth = width * 0.5;

      ctx.beginPath();
      ctx.strokeStyle = activeExercise === 'knee' ? 'rgba(56, 189, 248, 0.5)' : activeExercise === 'back' ? 'rgba(192, 132, 252, 0.4)' : 'rgba(56, 189, 248, 0.3)';
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
      <div className="absolute inset-0 bg-gradient-to-b from-brand-600/20 via-purple-600/20 to-transparent blur-3xl -z-10 animate-pulse-slow" />

      {/* Interactive Condition Switcher Controls */}
      <div className="absolute top-4 z-20 flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-full bg-slate-900/85 backdrop-blur-xl border border-slate-700/80 shadow-lg">
        <button
          onClick={() => setActiveExercise('knee')}
          className={`px-3 py-1 text-xs font-semibold rounded-full transition-all flex items-center gap-1.5 ${
            activeExercise === 'knee'
              ? 'bg-brand-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>Knee Rehab</span>
        </button>
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
      <div className="absolute bottom-12 right-2 sm:right-4 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/85 border border-brand-500/40 backdrop-blur-md shadow-xl">
        <Activity className="w-3.5 h-3.5 text-brand-400" />
        <span className="text-[11px] font-medium text-slate-200">
          {activeExercise === 'knee' ? 'Knee Extension Accuracy: ' : 'Form Accuracy: '}
          <strong className="text-brand-300">99.8%</strong>
        </span>
      </div>

      {/* Main Skeleton Motion Canvas */}
      <canvas ref={canvasRef} className="relative z-10 w-full h-full cursor-crosshair" />
    </div>
  );
};
