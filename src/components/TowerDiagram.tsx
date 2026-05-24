import React from 'react';
import { motion } from 'motion/react';
import { useAudio } from './AudioController';
import { towerLevels } from '../data';
import { ReaderTheme, TowerLevel } from '../types';
import { uiTranslations, levelTranslations } from '../translations';
import { ArrowDown, HelpCircle, Layers, ShieldAlert, Skull, Trees } from 'lucide-react';

interface TowerDiagramProps {
  activeLevelId: number;
  onSelectLevel: (levelId: number, theme: ReaderTheme) => void;
  language: 'en' | 'de' | 'la' | 'ur';
}

export const TowerDiagram: React.FC<TowerDiagramProps> = ({ activeLevelId, onSelectLevel, language }) => {
  const { playSfx } = useAudio();
  const t = uiTranslations[language];
  const transLevels = levelTranslations[language];

  const handleLevelClick = (level: TowerLevel) => {
    let targetTheme: ReaderTheme = 'desolation';
    let sfx: 'echo' | 'scream' | 'tick' | 'rattle' | 'rustle' | 'squish' = 'rustle';

    switch (level.id) {
      case 0:
        targetTheme = 'desolation';
        sfx = 'rustle';
        break;
      case 1:
        targetTheme = 'crimson';
        sfx = 'rattle';
        break;
      case 2:
        targetTheme = 'phosphor';
        sfx = 'squish';
        break;
      case 3:
        targetTheme = 'abyss';
        sfx = 'echo';
        break;
    }

    playSfx(sfx);
    onSelectLevel(level.id, targetTheme);

    // Scroll to corresponding chapter
    const mapping: Record<number, string> = {
      0: "I.",
      1: "II.",
      2: "V.",
      3: "VIII.",
    };
    
    const elements = Array.from(document.querySelectorAll('h2, h3')) as HTMLElement[];
    const targetElement = elements.find(el => el.textContent?.includes(mapping[level.id]));
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const levelIcons = (id: number) => {
    switch (id) {
      case 0: return <Trees className="text-zinc-400 group-hover:text-amber-500" size={18} />;
      case 1: return <Layers className="text-zinc-400 group-hover:text-red-500" size={18} />;
      case 2: return <Skull className="text-zinc-400 group-hover:text-emerald-500" size={18} />;
      case 3: return <HelpCircle className="text-zinc-400 group-hover:text-purple-500" size={18} />;
      default: return <Layers size={18} />;
    }
  };

  const descendLabel = language === 'de' ? 'Herabsteigen →' : language === 'la' ? 'Descendere →' : 'Descend →';

  return (
    <div className="flex flex-col gap-6" id="tower-schematic-diagram">
      <div className="flex items-center justify-between border-b border-[#2a2a2a] pb-2">
        <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-[#666] flex items-center gap-2 font-bold">
          <Layers size={13} className="text-red-700 animate-pulse" />
          {t.subterraneanStructure}
        </h4>
        <span className="font-mono text-[10px] text-red-600 uppercase tracking-widest font-bold">
          LIVE STATUS
        </span>
      </div>

      <p className="text-xs text-zinc-400 italic font-serif leading-relaxed">
        {t.shapingTheVessels}
      </p>

      {/* Main vertical stack */}
      <div className="relative flex flex-col gap-4 pl-4 border-l-2 border-red-900 py-2">
        {towerLevels.map((level) => {
          const isActive = activeLevelId === level.id;
          const translatedLevel = transLevels[level.id];
          
          return (
            <motion.div
              key={level.id}
              onClick={() => handleLevelClick(level)}
              className={`group relative flex flex-col gap-2 rounded-lg p-4 border transition-all duration-300 cursor-pointer ${
                isActive 
                  ? 'bg-[#151515] border-[#444] shadow-xl shadow-black/60' 
                  : 'bg-[#111]/80 border-[#2a2a2a] hover:bg-[#151515]/80 hover:border-[#3a3a3a]'
              }`}
              whileHover={{ x: 4 }}
              layoutId={`level-container-${level.id}`}
              id={`blueprint-level-${level.id}`}
            >
              {/* Highlight anchor glow */}
              {isActive && (
                <div className="absolute top-0 left-0 bottom-0 w-1 bg-red-600 rounded-l-md" />
              )}

              {/* Header inside the floor container */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className={`flex h-8 w-8 items-center justify-center rounded border transition-all duration-300 ${
                    isActive 
                      ? 'bg-red-950/20 border-red-800 text-red-500' 
                      : 'bg-[#0a0a0a] border-[#222] text-[#888]'
                  }`}>
                    {levelIcons(level.id)}
                  </div>
                  <div>
                    <h5 className={`font-sans text-xs uppercase tracking-wider font-extrabold transition-colors duration-300 ${
                      isActive ? 'text-red-500' : 'text-[#888] group-hover:text-red-600'
                    }`}>
                      {translatedLevel.name}
                    </h5>
                    <span className="font-mono text-[9px] text-[#555] uppercase tracking-widest">
                      {translatedLevel.depth}
                    </span>
                  </div>
                </div>
                
                {isActive ? (
                  <span className="text-[9px] font-mono font-black text-red-500 uppercase tracking-widest bg-red-950/20 border border-red-900/40 px-2 py-0.5 rounded">
                    {t.activeResonance}
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-[#555] group-hover:text-[#aaa] transition-colors uppercase tracking-tight">
                    {descendLabel}
                  </span>
                )}
              </div>

              {/* Subtitle */}
              <p className="font-serif text-xs text-[#888] italic">
                &ldquo;{translatedLevel.subtitle}&rdquo;
              </p>

              {/* Expandable details when active */}
              {isActive && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="pt-2 mt-2 border-t border-[#222] overflow-hidden text-xs text-zinc-300 flex flex-col gap-3"
                >
                  <p className="leading-relaxed font-serif text-[13px] text-zinc-400">
                    {translatedLevel.description}
                  </p>
                  
                  <div className="flex flex-col gap-1.5 pl-2 border-l border-[#2a2a2a]">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#555] font-bold">{t.features}:</span>
                    {translatedLevel.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-1.5 font-sans font-medium text-[11px] text-zinc-300">
                        <span className="h-1 w-1 bg-red-700 rounded-full" />
                        {f}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
