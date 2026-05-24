import { useState, useEffect } from 'react';
import { BookReader } from './components/BookReader';
import { TowerDiagram } from './components/TowerDiagram';
import { AudioProvider, useAudio } from './components/AudioController';
import { ReaderTheme } from './types';
import { uiTranslations } from './translations';

function MainApp() {
  const { playDrone, playSfx } = useAudio();
  const [theme, setTheme] = useState<ReaderTheme>('desolation');
  const [activeLevelId, setActiveLevelId] = useState<number>(0);
  const [language, setLanguage] = useState<'en' | 'de' | 'la' | 'ur'>('en');

  // Trigger audio drone state shift in sync with theme updates
  useEffect(() => {
    playDrone(theme);
  }, [theme, playDrone]);

  // Handle global Level shifts
  const handleSelectLevel = (levelId: number, targetTheme: ReaderTheme) => {
    setActiveLevelId(levelId);
    setTheme(targetTheme);
  };

  // Get current styling classes based on atmospheric theme
  const getThemeStyles = () => {
    switch (theme) {
      case 'desolation':
        return {
          bg: 'bg-[#0c0c0c] text-[#d4d4d4]',
          border: 'border-[#2a2a2a]',
          accent: 'text-red-700',
          mesh: 'after:bg-zinc-900/10',
          tint: 'after:bg-amber-950/[0.01]',
          glow: 'shadow-red-950/10',
          textContrast: 'text-[#eee]'
        };
      case 'crimson':
        return {
          bg: 'bg-[#0f0909] text-stone-200',
          border: 'border-red-900/40',
          accent: 'text-red-500',
          mesh: 'after:bg-[#1a0a0a]',
          tint: 'after:bg-red-950/[0.04]',
          glow: 'shadow-red-600/5',
          textContrast: 'text-red-100'
        };
      case 'phosphor':
        return {
          bg: 'bg-[#0a0f0a] text-emerald-250',
          border: 'border-emerald-900/40',
          accent: 'text-emerald-500',
          mesh: 'after:bg-[#071407]',
          tint: 'after:bg-emerald-950/[0.04]',
          glow: 'shadow-emerald-550/5',
          textContrast: 'text-emerald-100'
        };
      case 'abyss':
        return {
          bg: 'bg-[#030303] text-purple-300',
          border: 'border-purple-950',
          accent: 'text-purple-600',
          mesh: 'after:bg-purple-950/20',
          tint: 'after:bg-purple-950/[0.03]',
          glow: 'shadow-purple-700/5',
          textContrast: 'text-zinc-200'
        };
    }
  };

  const themeStyles = getThemeStyles();
  const t = uiTranslations[language];

  return (
    <div className={`min-h-screen relative font-sans ${themeStyles.bg} transition-colors duration-1000 overflow-x-clip flex flex-col pb-16 border-8 border-[#1a1a1a]`}>
      {/* Atmospheric Mesh backdrop */}
      <div className={`fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/40 via-zinc-950/10 to-transparent`} />

      {/* Outer framing wrapper */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 w-full flex-1 flex flex-col gap-8 relative z-10" id="main-folio-layout">
        
        {/* Editorial Title Banner */}
        <header className="relative flex flex-col md:flex-row gap-6 justify-between items-baseline border-b border-[#2a2a2a] pb-8 pt-4">
          
          <div className="flex flex-col text-left">
            <span className="text-xs uppercase tracking-[0.4em] text-[#666] mb-1 font-bold">{t.subterraneanStructure}</span>
            <h1 className="text-[52px] sm:text-[76px] md:text-[110px] leading-[0.8] font-black text-red-800 tracking-tighter uppercase font-sans hover:text-red-700 transition-colors duration-500">
              {language === 'ur' ? 'سرخ مینار' : 'THE RED TOWER'}
            </h1>
          </div>

          <div className="text-right shrink-0 max-w-xs w-full md:w-auto">
            <p className="text-sm italic text-[#555] leading-tight font-serif" dir={language === 'ur' ? 'rtl' : 'ltr'}>
              &ldquo;{t.noSymmetryQuote}&rdquo;
            </p>
            {/* Phase info decoration below subtitle */}
            <div className="mt-3 flex items-center md:justify-end gap-2 font-mono text-[10px] tracking-widest text-[#444]">
              <span>{t.levelTitle}</span>
              <span className="h-1.5 w-1.5 bg-red-800" />
              <span>PHASE III</span>
            </div>

            {/* Language Selection option below Crafted Series Phase III */}
            <div className="mt-2.5 flex items-center md:justify-end gap-2.5 font-mono text-[9px] tracking-widest text-[#444]">
              <span className="text-[#333] font-extrabold uppercase">LANG:</span>
              {(['en', 'de', 'la', 'ur'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setLanguage(lang);
                    playSfx('rustle');
                  }}
                  className={`transition-colors font-bold uppercase cursor-pointer ${
                    language === lang 
                      ? 'text-red-500 font-extrabold pb-0.5 border-b border-red-800' 
                      : 'text-[#555] hover:text-[#bbb]'
                  }`}
                >
                  {lang === 'en' ? 'EN' : lang === 'de' ? 'DE' : lang === 'la' ? 'LA' : 'UR'}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Double column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch flex-1">
          
          {/* LEFT SIDEBAR: Schematic cross section */}
          <aside className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-6 self-start">
            <TowerDiagram 
              activeLevelId={activeLevelId}
              onSelectLevel={handleSelectLevel}
              language={language}
            />
          </aside>

          {/* RIGHT COLUMN: Interactive reader only */}
          <main className="lg:col-span-8 flex flex-col gap-8 flex-1">
            
            {/* Focal layer indicator */}
            <div className="flex justify-end border-b border-[#2a2a2a] pb-2">
              <div className="flex items-center gap-2">
                <span className="flex h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">{t.activeFocalLayer}</span>
              </div>
            </div>

            {/* Interactive manuscript reader */}
            <div className="flex-1 flex flex-col">
              <BookReader 
                theme={theme}
                activeLevelId={activeLevelId}
                onChapterVisible={(lvlId) => setActiveLevelId(lvlId)}
                language={language}
              />
            </div>

          </main>

        </div>

      </div>

      {/* Decorative footer */}
      <footer className="mt-8 flex justify-between items-center border-t border-[#2a2a2a] pt-4 px-8 max-w-7xl mx-auto w-full">
        <div className="flex gap-4">
          <span className="text-[10px] font-mono text-[#444] uppercase">{t.coordinates}: DESOLATE_EMPTY_LANDSCAPE</span>
          <span className="text-[10px] font-mono text-[#444] uppercase">{t.hue}: #8B0000</span>
        </div>
        <div className="text-[10px] uppercase tracking-[0.5em] text-[#666] animate-pulse hidden sm:block">
          {t.footerQuote}
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AudioProvider>
      <MainApp />
    </AudioProvider>
  );
}
