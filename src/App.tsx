import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Music, Sparkles } from 'lucide-react';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const ROAD_WIDTH = 180;
const MAX_POWER = 100;
const POWER_DEPLETION_RATE = 3; 
const GOBLIN_DAMAGE = 20;
const INSTRUMENT_HEAL = 15;
const MAX_SPEED = 600; 
const ACCELERATION = 300;
const DECELERATION = 150;
const LATERAL_SPEED = 400;
const GOBLIN_FORWARD_SPEED = 450;

type GameState = 'intro' | 'playing' | 'gameover' | 'victory';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('intro');

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-white font-sans selection:bg-pink-500/30">
      {gameState === 'intro' && <IntroScreen onStart={() => setGameState('playing')} />}
      {gameState === 'playing' && <Game onGameOver={() => setGameState('gameover')} onVictory={() => setGameState('victory')} />}
      {gameState === 'gameover' && <GameOverScreen onRestart={() => setGameState('playing')} onMenu={() => setGameState('intro')} />}
      {gameState === 'victory' && <VictoryScreen onRestart={() => setGameState('playing')} onMenu={() => setGameState('intro')} />}
    </div>
  );
}

const IntroScreen = ({ onStart }: { onStart: () => void }) => (
  <div className="max-w-2xl p-8 bg-neutral-900/80 backdrop-blur-md rounded-3xl border border-purple-500/30 shadow-2xl shadow-purple-900/20 text-center">
    <div className="flex justify-center mb-6">
      <div className="p-4 bg-purple-500/20 rounded-full">
        <Music className="w-12 h-12 text-purple-400" />
      </div>
    </div>
    <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
      El Hechizo de las Notas Perdidas
    </h1>
    <p className="text-lg text-neutral-300 mb-6 leading-relaxed">
      Una niña música busca recuperar unas notas sagradas guardadas dentro de un cofre mágico. 
      Un duende travieso intentará distraerla y robarle su energía musical.
    </p>
    <div className="bg-black/40 rounded-xl p-6 mb-8 text-left space-y-3 text-sm text-neutral-400 border border-white/5">
      <p><strong className="text-pink-400">W / S o Flechas Arriba/Abajo:</strong> Acelerar y frenar.</p>
      <p><strong className="text-pink-400">A / D o Flechas Izquierda/Derecha:</strong> Moverse a los lados.</p>
      <p><strong className="text-yellow-400">Notas (♪):</strong> Recógelas para llenar tu Poder Armónico.</p>
      <p><strong className="text-green-400">Duende:</strong> Evítalo o perderás energía. ¡Acelera para dejarlo atrás!</p>
      <p><strong className="text-purple-400">Objetivo:</strong> Llena la barra al 100% para aturdir al duende y alcanzar el cofre.</p>
    </div>
    <button 
      onClick={onStart}
      className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/25 cursor-pointer"
    >
      <Play className="w-5 h-5 fill-current" />
      Comenzar Aventura
    </button>
  </div>
);

const GameOverScreen = ({ onRestart, onMenu }: { onRestart: () => void, onMenu: () => void }) => (
  <div className="max-w-md p-8 bg-neutral-900/80 backdrop-blur-md rounded-3xl border border-red-500/30 shadow-2xl shadow-red-900/20 text-center">
    <h2 className="text-3xl font-bold mb-4 text-red-400">La melodía se ha perdido...</h2>
    <p className="text-neutral-400 mb-8">El duende ha robado toda tu energía musical.</p>
    <div className="flex flex-col gap-4">
      <button 
        onClick={onRestart}
        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-full transition-all border border-neutral-600 cursor-pointer"
      >
        <RotateCcw className="w-5 h-5" />
        Intentar de nuevo
      </button>
      <button 
        onClick={onMenu}
        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent hover:bg-neutral-800 text-neutral-300 font-bold rounded-full transition-all border border-transparent hover:border-neutral-700 cursor-pointer"
      >
        Volver al Menú
      </button>
    </div>
  </div>
);

const VictoryScreen = ({ onRestart, onMenu }: { onRestart: () => void, onMenu: () => void }) => (
  <div className="max-w-md p-8 bg-neutral-900/80 backdrop-blur-md rounded-3xl border border-yellow-500/30 shadow-2xl shadow-yellow-900/20 text-center">
    <div className="flex justify-center mb-6">
      <Sparkles className="w-16 h-16 text-yellow-400 animate-pulse" />
    </div>
    <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600">
      ¡Melodía Recuperada!
    </h2>
    <p className="text-neutral-300 mb-8">Has alcanzado el cofre mágico y restaurado las notas sagradas.</p>
    <div className="flex flex-col gap-4">
      <button 
        onClick={onRestart}
        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-lg shadow-yellow-500/25 cursor-pointer"
      >
        <Play className="w-5 h-5 fill-current" />
        Jugar de nuevo
      </button>
      <button 
        onClick={onMenu}
        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent hover:bg-neutral-800 text-neutral-300 font-bold rounded-full transition-all border border-transparent hover:border-neutral-700 cursor-pointer"
      >
        Volver al Menú
      </button>
    </div>
  </div>
);

const Game = ({ onGameOver, onVictory }: { onGameOver: () => void, onVictory: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const state = {
      distance: 0,
      speed: 300,
      harmonicPower: 50,
      player: {
        x: CANVAS_WIDTH / 2,
        y: CANVAS_HEIGHT - 100,
        radius: 16
      },
      goblin: {
        x: CANVAS_WIDTH / 2,
        y: -100,
        radius: 20,
        stunned: false,
        stunTimer: 0
      },
      instruments: [] as { distanceOnTrack: number, offsetX: number, id: number, type: string }[],
      chest: null as { distanceOnTrack: number } | null,
      keys: {} as Record<string, boolean>,
      instrumentIdCounter: 0,
      spawnTimer: 0
    };

    const handleKeyDown = (e: KeyboardEvent) => { 
      state.keys[e.key.toLowerCase()] = true; 
      state.keys[e.key] = true; 
    };
    const handleKeyUp = (e: KeyboardEvent) => { 
      state.keys[e.key.toLowerCase()] = false; 
      state.keys[e.key] = false; 
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const update = (dt: number) => {
      // Controls
      const isAcc = state.keys.w || state.keys.ArrowUp;
      const isBrk = state.keys.s || state.keys.ArrowDown;
      const isLft = state.keys.a || state.keys.ArrowLeft;
      const isRgt = state.keys.d || state.keys.ArrowRight;

      if (isAcc) state.speed = Math.min(MAX_SPEED, state.speed + ACCELERATION * dt);
      else if (isBrk) state.speed = Math.max(100, state.speed - DECELERATION * 2 * dt);
      else {
        if (state.speed > 300) state.speed -= DECELERATION * dt;
        if (state.speed < 300) state.speed += ACCELERATION * dt;
      }

      state.distance += state.speed * dt;

      if (isLft) state.player.x -= LATERAL_SPEED * dt;
      if (isRgt) state.player.x += LATERAL_SPEED * dt;

      // Road boundaries
      const getRoadX = (d: number) => {
        // A more complex winding path to match the map image
        return CANVAS_WIDTH / 2 + 
               Math.sin(d / 500) * 180 + 
               Math.cos(d / 1000) * 120 + 
               Math.sin(d / 250) * 40;
      };

      const roadCenterX = getRoadX(state.distance);
      const leftBound = roadCenterX - ROAD_WIDTH / 2 + state.player.radius + 5;
      const rightBound = roadCenterX + ROAD_WIDTH / 2 - state.player.radius - 5;

      if (state.player.x <= leftBound || state.player.x >= rightBound) {
        state.speed = Math.max(100, state.speed - DECELERATION * 4 * dt);
      }
      state.player.x = Math.max(leftBound, Math.min(rightBound, state.player.x));

      // Power depletion
      state.harmonicPower -= POWER_DEPLETION_RATE * dt;

      // Goblin
      if (state.goblin.stunned) {
        state.goblin.stunTimer -= dt;
        state.goblin.y -= 200 * dt;
        if (state.goblin.stunTimer <= 0) {
          state.goblin.stunned = false;
          state.harmonicPower = 50;
          state.chest = null;
        }
      } else {
        // Goblin follows the road center but tries to reach the player
        const goblinRoadCenterX = getRoadX(state.distance + (state.player.y - state.goblin.y));
        const targetX = Math.max(goblinRoadCenterX - ROAD_WIDTH / 2 + state.goblin.radius, 
                                Math.min(goblinRoadCenterX + ROAD_WIDTH / 2 - state.goblin.radius, 
                                state.player.x));
        
        state.goblin.x += (targetX - state.goblin.x) * 4 * dt;
        const relativeSpeed = GOBLIN_FORWARD_SPEED - state.speed;
        state.goblin.y += relativeSpeed * dt;

        if (state.goblin.y < -100) state.goblin.y = -100;

        if (state.goblin.y > CANVAS_HEIGHT + 50) {
          state.goblin.y = -100;
        }

        if (Math.hypot(state.player.x - state.goblin.x, state.player.y - state.goblin.y) < state.player.radius + state.goblin.radius) {
          state.harmonicPower -= GOBLIN_DAMAGE;
          state.goblin.y = -100;
          state.speed = Math.max(100, state.speed - 200); // slow down on hit
        }
      }

      // Spawning
      state.spawnTimer -= dt;
      if (state.spawnTimer <= 0 && !state.goblin.stunned) {
        state.spawnTimer = 0.8 + Math.random() * 1.2;
        const INSTRUMENT_TYPES = ['bombo', 'guitarra', 'kena', 'zampona'];
        state.instruments.push({
          distanceOnTrack: state.distance + state.player.y + 800,
          offsetX: (Math.random() - 0.5) * (ROAD_WIDTH - 40),
          id: state.instrumentIdCounter++,
          type: INSTRUMENT_TYPES[Math.floor(Math.random() * INSTRUMENT_TYPES.length)]
        });
      }

      // Instruments update
      for (let i = state.instruments.length - 1; i >= 0; i--) {
        const inst = state.instruments[i];
        const instY = state.distance + state.player.y - inst.distanceOnTrack;
        const instRoadX = getRoadX(inst.distanceOnTrack);
        const instX = instRoadX + inst.offsetX;

        if (Math.hypot(state.player.x - instX, state.player.y - instY) < state.player.radius + 15) {
          state.harmonicPower = Math.min(MAX_POWER, state.harmonicPower + INSTRUMENT_HEAL);
          state.instruments.splice(i, 1);
          
          if (state.harmonicPower >= MAX_POWER && !state.goblin.stunned) {
            state.goblin.stunned = true;
            state.goblin.stunTimer = 10.0;
            state.chest = {
              distanceOnTrack: state.distance + state.player.y + 1200
            };
          }
        } else if (instY > CANVAS_HEIGHT + 50) {
          state.instruments.splice(i, 1);
        }
      }

      // Chest update
      if (state.chest) {
        const chestY = state.distance + state.player.y - state.chest.distanceOnTrack;
        const chestX = getRoadX(state.chest.distanceOnTrack);
        
        if (Math.hypot(state.player.x - chestX, state.player.y - chestY) < state.player.radius + 30) {
          return 'victory';
        }
        if (chestY > CANVAS_HEIGHT + 100) {
          state.chest = null;
        }
      }

      if (state.harmonicPower <= 0) return 'gameover';
      return 'playing';
    };

    const playerImage = new Image();
    playerImage.src = 'https://picsum.photos/seed/isari/200/200';

    const assets = {
      player: playerImage,
      tree1: new Image(),
      tree2: new Image(),
      tree3: new Image(),
      tree4: new Image(),
      goblin: new Image(),
      chest: new Image(),
      house: new Image(),
      lake: new Image(),
      bombo: new Image(),
      guitarra: new Image(),
      kena: new Image(),
      zampona: new Image()
    };

    assets.tree1.src = '/Assets/arbol.svg';
    assets.tree2.src = '/Assets/arbol2.svg';
    assets.tree3.src = '/Assets/arbol3.svg';
    assets.tree4.src = '/Assets/arbol4.svg';
    assets.goblin.src = '/duende.svg';
    assets.chest.src = '/tesoro.svg';
    assets.house.src = '/casa.svg';
    assets.lake.src = '/lago.svg';
    assets.bombo.src = '/Assets/bombo.svg';
    assets.guitarra.src = '/Assets/guitarra.svg';
    assets.kena.src = '/Assets/kena.svg';
    assets.zampona.src = '/Assets/zampona.svg';

    const draw = (ctx: CanvasRenderingContext2D) => {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      
      const getRoadX = (d: number) => {
        // A more complex winding path to match the map image
        return CANVAS_WIDTH / 2 + 
               Math.sin(d / 500) * 180 + 
               Math.cos(d / 1000) * 120 + 
               Math.sin(d / 250) * 40;
      };

      // Background - Forest green from image
      ctx.fillStyle = '#a3c37d'; 
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Draw grass texture/patterns
      ctx.fillStyle = '#94b46d';
      for (let i = 0; i < 15; i++) {
        const sy = (state.distance * 0.2 + i * 200) % (CANVAS_HEIGHT + 400) - 200;
        ctx.beginPath();
        ctx.ellipse(CANVAS_WIDTH / 2 + Math.sin(i * 1.5) * 350, sy, 150, 80, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Road - Brown from image
      ctx.fillStyle = '#7b4c2d'; 
      ctx.beginPath();
      for (let y = 0; y <= CANVAS_HEIGHT; y += 10) {
        const d = state.distance + state.player.y - y;
        const cx = getRoadX(d);
        if (y === 0) ctx.moveTo(cx - ROAD_WIDTH / 2, y);
        else ctx.lineTo(cx - ROAD_WIDTH / 2, y);
      }
      for (let y = CANVAS_HEIGHT; y >= 0; y -= 10) {
        const d = state.distance + state.player.y - y;
        const cx = getRoadX(d);
        ctx.lineTo(cx + ROAD_WIDTH / 2, y);
      }
      ctx.fill();

      // Road borders
      ctx.strokeStyle = '#503014';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Elements (Trees, Lakes, etc.)
      const seededRandom = (seed: number) => {
        const x = Math.sin(seed + 1.123) * 10000;
        return x - Math.floor(x);
      };

      const drawAsset = (img: HTMLImageElement, x: number, y: number, w: number, h: number) => {
        if (img.complete && img.naturalWidth !== 0) {
          ctx.drawImage(img, x - w / 2, y - h / 2, w, h);
        }
      };

      // Starting House
      const houseY = state.distance + state.player.y - 400;
      if (houseY > -200 && houseY < CANVAS_HEIGHT + 200) {
        drawAsset(assets.house, getRoadX(400) + 120, houseY, 180, 180);
      }

      const elementDistStart = Math.floor((state.distance - CANVAS_HEIGHT) / 250) * 250;
      for (let d = elementDistStart + CANVAS_HEIGHT + 1000; d >= elementDistStart; d -= 250) {
        const y = state.distance + state.player.y - d;
        if (y >= -200 && y <= CANVAS_HEIGHT + 200) {
          const cx = getRoadX(d);
          
          // Trees along the road
          const leftTreeX = cx - 180 - seededRandom(d) * 120;
          const rightTreeX = cx + 180 + seededRandom(d + 1) * 120;
          
          const treeType = Math.floor(seededRandom(d + 2) * 4) + 1;
          const treeImg = (assets as any)[`tree${treeType}`];
          
          drawAsset(treeImg, leftTreeX, y, 120, 160);
          drawAsset(treeImg, rightTreeX, y + 60, 120, 160);

          // Lakes/Ponds
          if (seededRandom(d + 3) > 0.85) {
            const lakeX = cx + (seededRandom(d + 4) > 0.5 ? 300 : -300);
            drawAsset(assets.lake, lakeX, y, 200, 120);
          }
        }
      }

      // Instruments
      state.instruments.forEach(inst => {
        const y = state.distance + state.player.y - inst.distanceOnTrack;
        const cx = getRoadX(inst.distanceOnTrack);
        const x = cx + inst.offsetX;

        if (y > -50 && y < CANVAS_HEIGHT + 50) {
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, 30);
          gradient.addColorStop(0, 'rgba(250, 204, 21, 0.4)');
          gradient.addColorStop(1, 'rgba(250, 204, 21, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, 30, 0, Math.PI * 2);
          ctx.fill();

          const instImg = (assets as any)[inst.type];
          drawAsset(instImg, x, y, 50, 50);
        }
      });

      // Chest
      if (state.chest) {
        const y = state.distance + state.player.y - state.chest.distanceOnTrack;
        const cx = getRoadX(state.chest.distanceOnTrack);
        
        if (y > -150 && y < CANVAS_HEIGHT + 150) {
          ctx.shadowColor = '#fbbf24';
          ctx.shadowBlur = 30;
          drawAsset(assets.chest, cx, y, 140, 110);
          ctx.shadowBlur = 0;

          // Musical notes floating
          ctx.fillStyle = '#fff';
          ctx.font = '24px Arial';
          const timeOffset = performance.now() / 200;
          ctx.fillText('🎵', cx - 35, y - 75 + Math.sin(timeOffset) * 5);
          ctx.fillText('🎶', cx + 35, y - 85 + Math.cos(timeOffset) * 5);
          ctx.fillText('✨', cx, y - 95 + Math.sin(timeOffset * 0.8) * 5);
        }
      }

      // Goblin
      if (state.goblin.y > -50) {
        ctx.shadowColor = state.goblin.stunned ? '#a855f7' : '#22c55e';
        ctx.shadowBlur = 15;
        
        if (assets.goblin.complete && assets.goblin.naturalWidth !== 0) {
          ctx.save();
          if (state.goblin.stunned) ctx.filter = 'hue-rotate(270deg) brightness(1.5)';
          drawAsset(assets.goblin, state.goblin.x, state.goblin.y, 70, 70);
          ctx.restore();
        } else {
          ctx.fillStyle = state.goblin.stunned ? '#9333ea' : '#16a34a';
          ctx.beginPath();
          ctx.arc(state.goblin.x, state.goblin.y, state.goblin.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#000';
          ctx.font = '18px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(state.goblin.stunned ? '😵' : '👺', state.goblin.x, state.goblin.y + 2);
        }
        ctx.shadowBlur = 0;
      }

      // Player
      if (assets.player.complete && assets.player.naturalWidth !== 0) {
        ctx.save();
        ctx.shadowColor = '#ec4899';
        ctx.shadowBlur = 15;
        const size = state.player.radius * 4;
        ctx.drawImage(
          assets.player,
          state.player.x - size / 2,
          state.player.y - size / 2,
          size,
          size
        );
        ctx.restore();
      } else {
        ctx.shadowColor = '#ec4899';
        ctx.shadowBlur = 15;
        ctx.fillStyle = '#ec4899';
        ctx.beginPath();
        ctx.arc(state.player.x, state.player.y, state.player.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        
        ctx.fillStyle = '#fff';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('👧', state.player.x, state.player.y + 2);
      }

      // UI Background
      ctx.fillStyle = 'rgba(15, 10, 28, 0.85)';
      ctx.beginPath();
      ctx.roundRect(15, 15, 260, 95, 12);
      ctx.fill();
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#fff';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('✨ Poder Armónico', 30, 40);

      // Power bar background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.beginPath();
      ctx.roundRect(30, 55, 230, 20, 10);
      ctx.fill();

      // Power bar fill
      const powerRatio = Math.max(0, state.harmonicPower) / MAX_POWER;
      if (powerRatio > 0) {
        const barGradient = ctx.createLinearGradient(30, 0, 30 + 230 * powerRatio, 0);
        if (state.harmonicPower >= MAX_POWER) {
          barGradient.addColorStop(0, '#c084fc');
          barGradient.addColorStop(1, '#e879f9');
          ctx.shadowColor = '#e879f9';
          ctx.shadowBlur = 10;
        } else {
          barGradient.addColorStop(0, '#ec4899');
          barGradient.addColorStop(1, '#f43f5e');
          ctx.shadowColor = '#ec4899';
          ctx.shadowBlur = 5;
        }
        ctx.fillStyle = barGradient;
        ctx.beginPath();
        ctx.roundRect(30, 55, 230 * powerRatio, 20, 10);
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '14px Arial';
      ctx.fillText(`Velocidad: ${Math.floor(state.speed)} km/h`, 30, 95);

      if (state.goblin.stunned) {
        ctx.fillStyle = '#e879f9';
        ctx.font = 'bold 28px Arial';
        ctx.textAlign = 'center';
        ctx.shadowColor = '#c084fc';
        ctx.shadowBlur = 10;
        ctx.fillText('¡HECHIZO ACTIVADO!', CANVAS_WIDTH / 2, 60);
        ctx.fillStyle = '#fff';
        ctx.font = '18px Arial';
        ctx.shadowBlur = 0;
        ctx.fillText('¡Alcanza el cofre mágico!', CANVAS_WIDTH / 2, 90);
      }
    };

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1); // cap dt to prevent huge jumps
      lastTime = time;

      const result = update(dt);
      draw(ctx);

      if (result === 'gameover') {
        onGameOver();
        return;
      } else if (result === 'victory') {
        onVictory();
        return;
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [onGameOver, onVictory]);

  return (
    <div className="relative">
      <canvas 
        ref={canvasRef} 
        width={CANVAS_WIDTH} 
        height={CANVAS_HEIGHT} 
        className="bg-black rounded-xl shadow-2xl border border-white/10" 
      />
    </div>
  );
};
