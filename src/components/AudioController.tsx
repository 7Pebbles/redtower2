import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Radio } from 'lucide-react';

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playDrone: (type: 'desolation' | 'crimson' | 'phosphor' | 'abyss') => void;
  playSfx: (type: 'echo' | 'scream' | 'tick' | 'rattle' | 'rustle' | 'squish') => void;
  activeDrone: string;
}

const AudioControllerContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioControllerContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [activeDrone, setActiveDrone] = useState<'desolation' | 'crimson' | 'phosphor' | 'abyss'>('desolation');
  
  const ctxRef = useRef<AudioContext | null>(null);
  const droneOsc1Ref = useRef<OscillatorNode | null>(null);
  const droneOsc2Ref = useRef<OscillatorNode | null>(null);
  const droneGainRef = useRef<GainNode | null>(null);
  const lfoNodeRef = useRef<OscillatorNode | null>(null);

  // Initialize Audio Context on demand
  const initAudio = () => {
    if (ctxRef.current) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      ctxRef.current = new AudioContextClass();
    } catch (e) {
      console.warn('Web Audio API not supported', e);
    }
  };

  const startDrone = () => {
    if (!ctxRef.current) return;
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume();
    }

    try {
      // Clean previous instances
      stopDrone();

      const ctx = ctxRef.current;
      const mainGain = ctx.createGain();
      mainGain.gain.setValueAtTime(isMuted ? 0 : 0.12, ctx.currentTime);
      mainGain.connect(ctx.destination);
      droneGainRef.current = mainGain;

      // Base industrial low frequency hum
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      
      // Filter to make it sound dark and heavy
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.Q.value = 1.0;
      filter.connect(mainGain);

      // Low frequency setting based on the theme
      let freq1 = 55; // A1
      let freq2 = 82.4; // E2 (perfect fifth)
      let type1: OscillatorType = 'sine';
      let type2: OscillatorType = 'triangle';

      if (activeDrone === 'desolation') {
        freq1 = 55; // Desolate wind hum
        freq2 = 55.4; // Bleak beating pulse
        type1 = 'sine';
        type2 = 'sine';
        filter.frequency.value = 180;
      } else if (activeDrone === 'crimson') {
        freq1 = 65.4; // C2
        freq2 = 98.0; // G2 - slightly metallic, menacing
        type1 = 'triangle';
        type2 = 'sawtooth';
        filter.frequency.value = 150;
      } else if (activeDrone === 'phosphor') {
        freq1 = 73.4; // D2
        freq2 = 110; // A2 - glowing, eerie
        type1 = 'sine';
        type2 = 'triangle';
        filter.frequency.value = 240;
      } else if (activeDrone === 'abyss') {
        freq1 = 41.2; // E1 - extremely deep sub hum
        freq2 = 41.5; // slow detuned throb
        type1 = 'triangle';
        type2 = 'sine';
        filter.frequency.value = 85;
      }

      osc1.type = type1;
      osc1.frequency.setValueAtTime(freq1, ctx.currentTime);
      osc1.connect(filter);

      osc2.type = type2;
      osc2.frequency.setValueAtTime(freq2, ctx.currentTime);
      // Detune slightly for an eerie swirling chorus effect
      osc2.detune.setValueAtTime(10, ctx.currentTime);
      
      // Create a slower volume LFO to emulate breathing/fading wind
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.08, ctx.currentTime); // very slow 12-second cycle
      lfoGain.gain.setValueAtTime(0.04, ctx.currentTime);
      lfo.connect(lfoGain);

      // Connect LFO to control filter cutoff or osc2 volume
      const osc2Gain = ctx.createGain();
      osc2Gain.gain.setValueAtTime(0.04, ctx.currentTime);
      lfoGain.connect(osc2Gain.gain);

      osc2.connect(osc2Gain);
      osc2Gain.connect(filter);

      lfo.start();
      osc1.start();
      osc2.start();

      droneOsc1Ref.current = osc1;
      droneOsc2Ref.current = osc2;
      lfoNodeRef.current = lfo;
    } catch (e) {
      console.error(e);
    }
  };

  const stopDrone = () => {
    try {
      if (droneOsc1Ref.current) {
        droneOsc1Ref.current.stop();
        droneOsc1Ref.current.disconnect();
        droneOsc1Ref.current = null;
      }
      if (droneOsc2Ref.current) {
        droneOsc2Ref.current.stop();
        droneOsc2Ref.current.disconnect();
        droneOsc2Ref.current = null;
      }
      if (lfoNodeRef.current) {
        lfoNodeRef.current.stop();
        lfoNodeRef.current.disconnect();
        lfoNodeRef.current = null;
      }
      if (droneGainRef.current) {
        droneGainRef.current.disconnect();
        droneGainRef.current = null;
      }
    } catch (e) {
      // Safe eat
    }
  };

  useEffect(() => {
    if (!isMuted) {
      startDrone();
    } else {
      stopDrone();
    }
    return () => stopDrone();
  }, [isMuted, activeDrone]);

  const toggleMute = () => {
    initAudio();
    setIsMuted((prev) => {
      const nextMuted = !prev;
      if (ctxRef.current && ctxRef.current.state === 'suspended') {
        ctxRef.current.resume();
      }
      return nextMuted;
    });
  };

  const playDrone = (type: 'desolation' | 'crimson' | 'phosphor' | 'abyss') => {
    initAudio();
    setActiveDrone(type);
  };

  const playSfx = (type: 'echo' | 'scream' | 'tick' | 'rattle' | 'rustle' | 'squish') => {
    initAudio();
    if (isMuted || !ctxRef.current) return;

    try {
      const ctx = ctxRef.current;
      const now = ctx.currentTime;
      const sfxGain = ctx.createGain();
      sfxGain.connect(ctx.destination);

      if (type === 'echo') {
        // Echo: deep hollow swell in a locket
        sfxGain.gain.setValueAtTime(0.001, now);
        sfxGain.gain.exponentialRampToValueAtTime(0.2, now + 0.1);
        sfxGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.linearRampToValueAtTime(30, now + 2.0);

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(300, now);
        filter.frequency.linearRampToValueAtTime(90, now + 1.8);
        filter.Q.value = 5.0;

        osc.connect(filter);
        filter.connect(sfxGain);
        osc.start(now);
        osc.stop(now + 2.5);

      } else if (type === 'scream') {
        // Gourd scream: sudden high complex FM synthesised mechanical cry!
        sfxGain.gain.setValueAtTime(0.001, now);
        sfxGain.gain.linearRampToValueAtTime(0.25, now + 0.05);
        sfxGain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

        const carrier = ctx.createOscillator();
        const modulator = ctx.createOscillator();
        const modGain = ctx.createGain();

        carrier.type = 'sawtooth';
        carrier.frequency.setValueAtTime(420, now); // Painful pitch
        carrier.frequency.exponentialRampToValueAtTime(180, now + 1.2);

        modulator.type = 'triangle';
        modulator.frequency.setValueAtTime(140, now);
        modGain.gain.setValueAtTime(1000, now); // FM depth

        modulator.connect(modGain);
        modGain.connect(carrier.frequency);

        const bpFilter = ctx.createBiquadFilter();
        bpFilter.type = 'bandpass';
        bpFilter.frequency.setValueAtTime(1200, now);
        bpFilter.frequency.exponentialRampToValueAtTime(300, now + 1.0);
        bpFilter.Q.value = 2.0;

        carrier.connect(bpFilter);
        bpFilter.connect(sfxGain);

        modulator.start(now);
        carrier.start(now);
        modulator.stop(now + 1.5);
        carrier.stop(now + 1.5);

      } else if (type === 'tick') {
        // Pocket watch tick with random pitch representation
        sfxGain.gain.setValueAtTime(0.08, now);
        sfxGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        const osc = ctx.createOscillator();
        osc.type = 'triangle';
        const randomHz = 1600 + Math.random() * 800;
        osc.frequency.setValueAtTime(randomHz, now);

        const filter = ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(2000, now);

        osc.connect(filter);
        filter.connect(sfxGain);
        osc.start(now);
        osc.stop(now + 0.05);

      } else if (type === 'rattle') {
        // Death rattle or creepy wire-mesh rattle: irregular clicks
        for (let i = 0; i < 8; i++) {
          const clickTime = now + i * 0.08 + Math.random() * 0.02;
          const clickGain = ctx.createGain();
          clickGain.connect(ctx.destination);
          clickGain.gain.setValueAtTime(0.08 - i * 0.008, clickTime);
          clickGain.gain.exponentialRampToValueAtTime(0.001, clickTime + 0.04);

          const clickOsc = ctx.createOscillator();
          clickOsc.type = 'square';
          clickOsc.frequency.setValueAtTime(80 + Math.random() * 120, clickTime);

          const flt = ctx.createBiquadFilter();
          flt.type = 'bandpass';
          flt.frequency.setValueAtTime(400, clickTime);

          clickOsc.connect(flt);
          flt.connect(clickGain);
          clickOsc.start(clickTime);
          clickOsc.stop(clickTime + 0.05);
        }

      } else if (type === 'rustle') {
        // Cameo movement / concrete slide: grainy dust
        sfxGain.gain.setValueAtTime(0.001, now);
        sfxGain.gain.linearRampToValueAtTime(0.1, now + 0.1);
        sfxGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

        // Generate rough noise using short oscillator sweeps or filters
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, now);
        osc.frequency.linearRampToValueAtTime(20, now + 0.6);

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(120, now);
        filter.Q.value = 10;

        osc.connect(filter);
        filter.connect(sfxGain);
        osc.start(now);
        osc.stop(now + 0.8);

      } else if (type === 'squish') {
        // Soft organs touch / larva squelch
        sfxGain.gain.setValueAtTime(0.001, now);
        sfxGain.gain.linearRampToValueAtTime(0.12, now + 0.05);
        sfxGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

        const osc = ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(80, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.4);

        const modulator = ctx.createOscillator();
        const modGain = ctx.createGain();
        modulator.frequency.setValueAtTime(45, now);
        modGain.gain.setValueAtTime(40, now);

        modulator.connect(modGain);
        modGain.connect(osc.frequency);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(150, now);

        modulator.start(now);
        osc.connect(filter);
        filter.connect(sfxGain);
        osc.start(now);

        modulator.stop(now + 0.5);
        osc.stop(now + 0.5);
      }
    } catch (e) {
      console.warn('SFX synthesis failed', e);
    }
  };

  return (
    <AudioControllerContext.Provider value={{ isMuted, toggleMute, playDrone, playSfx, activeDrone }}>
      {/* Floating global ambient controls */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/90 py-2 px-3 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-zinc-700">
        <button
          onClick={toggleMute}
          className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
            isMuted 
              ? 'bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-zinc-300' 
              : 'bg-red-950/40 text-red-500 border border-red-900/50 hover:bg-red-900/30'
          }`}
          title={isMuted ? "Unmute Dark Drone Synth" : "Mute Soundscape"}
          id="btn-soundscape-toggle"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="animate-pulse" />}
        </button>
        <div className="flex flex-col text-left pr-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
            Ambient Synth
          </span>
          <span className="text-xs font-serif font-semibold text-zinc-300">
            {isMuted ? 'Muted' : `Drone Active (${activeDrone})`}
          </span>
        </div>
        {!isMuted && (
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
        )}
      </div>
      {children}
    </AudioControllerContext.Provider>
  );
};
