import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { chapters } from '../data';
import { Chapter, ReaderTheme } from '../types';
import { uiTranslations, chapterTranslations } from '../translations';
import { translatedNovelUrdu } from '../translated_novel';
import { BookOpen, ZoomIn, ZoomOut, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useAudio } from './AudioController';

interface BookReaderProps {
  theme: ReaderTheme;
  activeLevelId: number;
  onChapterVisible: (levelId: number) => void;
  language: 'en' | 'de' | 'la' | 'ur';
}

export const BookReader: React.FC<BookReaderProps> = ({ theme, activeLevelId, onChapterVisible, language }) => {
  const [textSize, setTextSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('lg');
  const [fontStyle, setFontStyle] = useState<'serif' | 'sans' | 'mono'>('serif');
  const [readingMode, setReadingMode] = useState<boolean>(false); // Distraction-free aura
  const [scrollPercent, setScrollPercent] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const readerWindowRef = useRef<HTMLDivElement>(null);
  const t = uiTranslations[language];
  const transChapters = chapterTranslations[language];

  // Monitor scroll for progress bar & mapping which chapter is active 
  useEffect(() => {
    const handleScroll = () => {
      if (!readerWindowRef.current) return;
      
      const el = readerWindowRef.current;
      const totalHeight = el.scrollHeight - el.clientHeight;
      if (totalHeight > 0) {
        const pct = (el.scrollTop / totalHeight) * 100;
        setScrollPercent(pct);
      }

      // Detect which chapter is in center of the view port
      const chapterElements = el.querySelectorAll('[data-chapter-id]');
      let currentCapId = 1;
      let minDiff = Infinity;

      chapterElements.forEach((cap) => {
        const rect = cap.getBoundingClientRect();
        const diff = Math.abs(rect.top - el.getBoundingClientRect().top);
        if (diff < minDiff) {
          minDiff = diff;
          currentCapId = parseInt(cap.getAttribute('data-chapter-id') || '1', 10);
        }
      });

      // Map Chapter ID to levels:
      // Cap 1: Level 0 (id 0)
      // Cap 2-4: Level 1 (id 1)
      // Cap 5-7: Level 2 (id 2)
      // Cap 8: Level 3 (id 3)
      let targetLevel = 0;
      if (currentCapId >= 2 && currentCapId <= 4) {
        targetLevel = 1;
      } else if (currentCapId >= 5 && currentCapId <= 7) {
        targetLevel = 2;
      } else if (currentCapId === 8) {
        targetLevel = 3;
      }

      if (targetLevel !== activeLevelId) {
        onChapterVisible(targetLevel);
      }
    };

    const scrollEl = readerWindowRef.current;
    if (scrollEl) {
      scrollEl.addEventListener('scroll', handleScroll);
    }
    return () => scrollEl?.removeEventListener('scroll', handleScroll);
  }, [activeLevelId, onChapterVisible]);

  // Text size style classes
  const sizeClasses = {
    sm: 'text-xs md:text-sm leading-relaxed',
    md: 'text-sm md:text-[15px] leading-relaxed',
    lg: 'text-base md:text-[18px] leading-loose',
    xl: 'text-lg md:text-[21px] leading-loose'
  };

  // Font style classes
  const fontClasses = {
    serif: 'font-serif tracking-normal text-zinc-350',
    sans: 'font-sans tracking-wide text-zinc-300',
    mono: 'font-mono text-xs md:text-sm tracking-tight text-zinc-400'
  };

  // Jump smoothly to a specific chapter
  const handleJumpToChapter = (chapterId: number) => {
    if (!readerWindowRef.current) return;
    const element = readerWindowRef.current.querySelector(`[data-chapter-id="${chapterId}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const endLabel = language === 'de' ? 'Das Ende' : language === 'la' ? 'Finis' : 'The End';
  const auraLabel = language === 'de' ? 'Aura' : language === 'la' ? 'Aura' : 'Aura';
  const activeLabel = language === 'de' ? 'Aktiv' : language === 'la' ? 'Activa' : 'Active';
  const dimLabel = language === 'de' ? 'Gedimmt' : language === 'la' ? 'Obscura' : 'Dim';

  return (
    <div className="flex-1 flex flex-col h-full min-h-[650px] border border-[#2a2a2a] rounded-lg bg-[#0c0c0c] shadow-2xl relative overflow-hidden" id="book-reader-container">
      {/* Scroll indicator bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#1a1a1a] z-30">
        <div 
          className="h-full bg-red-700 transition-all duration-150" 
          style={{ width: `${scrollPercent}%` }} 
        />
      </div>

      {/* Reader Header controls */}
      <div className={`p-4 border-b border-[#2a2a2a] bg-[#111] flex flex-wrap gap-4 items-center justify-between transition-opacity duration-300 z-20 ${
        readingMode ? 'opacity-20 hover:opacity-100' : 'opacity-100'
      }`}>
        <div className="flex items-center gap-2">
          <BookOpen className="text-red-700" size={18} />
          <h4 className="font-sans text-xs uppercase tracking-widest font-black text-zinc-200">
            {t.manuscriptFocus}
          </h4>
          <span className="font-mono text-[9px] bg-red-950/40 text-red-500 px-1.5 py-0.5 rounded border border-red-900/30">
            {t.sourceRecord}
          </span>
        </div>

        {/* Reader Settings row */}
        <div className="flex items-center gap-4">
          {/* Font Controls */}
          <div className="flex bg-[#0c0c0c] rounded p-0.5 border border-[#222]">
            {(['serif', 'sans', 'mono'] as const).map((style) => (
              <button
                key={style}
                onClick={() => setFontStyle(style)}
                className={`px-2.5 py-1 text-[9px] font-mono rounded uppercase font-bold transition-all duration-200 ${
                  fontStyle === style 
                    ? 'bg-red-950/20 text-red-500 border border-red-900/40' 
                    : 'text-[#666] hover:text-[#bbb]'
                }`}
                title={`Switch to ${style} typography`}
              >
                {style}
              </button>
            ))}
          </div>

          {/* Text Size Controls */}
          <div className="flex items-center gap-1.5 bg-[#0c0c0c] px-2 py-1 rounded border border-[#222] text-zinc-400 scale-95">
            <ZoomOut 
              size={13} 
              className="cursor-pointer hover:text-zinc-200" 
              onClick={() => {
                if (textSize === 'xl') setTextSize('lg');
                else if (textSize === 'lg') setTextSize('md');
                else if (textSize === 'md') setTextSize('sm');
              }}
            />
            <span className="text-[9px] font-mono font-bold uppercase">{textSize}</span>
            <ZoomIn 
              size={13} 
              className="cursor-pointer hover:text-zinc-200"
              onClick={() => {
                if (textSize === 'sm') setTextSize('md');
                else if (textSize === 'md') setTextSize('lg');
                else if (textSize === 'lg') setTextSize('xl');
              }}
            />
          </div>

          {/* Aura/Dim mode button */}
          <button 
            onClick={() => setReadingMode(!readingMode)}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-mono uppercase rounded border transition-all duration-300 scale-95 ${
              readingMode 
                ? 'bg-red-950/20 border-red-900/40 text-red-400' 
                : 'bg-[#0c0c0c] border-[#222] text-[#666] hover:text-[#bbb]'
            }`}
            title="Toggle Distraction-free reading environment"
            id="btn-reading-mode-toggle"
          >
            {readingMode ? <EyeOff size={11} /> : <Eye size={11} />}
            {auraLabel}: {readingMode ? activeLabel : dimLabel}
          </button>
        </div>
      </div>

      {/* Chapters Shortcut Index Bar (Horizontal scrollable) */}
      <div className={`px-4 py-2 border-b border-[#222] bg-[#0c0c0c] flex gap-2 overflow-x-auto select-none scrollbar-none transition-opacity duration-300 z-10 ${
        readingMode ? 'opacity-10 hover:opacity-100' : 'opacity-100'
      }`}>
        {chapters.map((cap) => (
          <button
            key={cap.id}
            onClick={() => handleJumpToChapter(cap.id)}
            className="flex-shrink-0 text-[10px] font-mono px-2.5 py-0.5 rounded border border-[#222] bg-[#111] text-[#666] hover:text-red-500 hover:border-red-900/40 transition-all duration-200 uppercase font-bold"
          >
            Cap {cap.id}
          </button>
        ))}
      </div>

      {/* The Text Window (Scrollable area) */}
      <div 
        ref={readerWindowRef}
        className="flex-1 overflow-y-auto px-6 md:px-12 py-10 scrollbar-thin scrollbar-thumb-zinc-900/90 bg-[#0c0c0c]"
        id="manuscript-scroll-viewport"
      >
        <div className="max-w-2xl mx-auto flex flex-col gap-10">
          
          {/* Opening quote card block */}
          <div className="text-center border-b border-[#2a2a2a] pb-10 flex flex-col items-center select-none">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#555] mb-2 font-bold">{t.foundManuscript}</span>
            <h1 className="font-sans text-[36px] md:text-[54px] font-black tracking-tighter text-red-800 uppercase mb-4 leading-none">
              {language === 'ur' ? 'سرخ مینار' : 'THE RED TOWER'}
            </h1>
            <p className="font-serif text-xs italic text-[#555] max-w-sm leading-relaxed" dir={language === 'ur' ? 'rtl' : 'ltr'}>
              {language === 'ur' 
                ? '"...ایک قدیم ڈھانچہ... اپنے فراموش کردہ دنوں میں اسی پیلے رنگ اور مدہم نظر آنے والا جیسا وہ جہان جس نے اسے اپنے حصار میں لے رکھا تھا..."'
                : '“...an ancient structure... in long-forgotten days the same pale hue as the world which encompassed it.”'}
            </p>
          </div>

          {/* Chapters loop */}
          {chapters.map((chapter) => {
            const isUrdu = language === 'ur';
            const renderParagraphs = isUrdu 
              ? translatedNovelUrdu[chapter.id]?.paragraphs || chapter.paragraphs
              : chapter.paragraphs;

            return (
              <div 
                key={chapter.id} 
                data-chapter-id={chapter.id}
                className="flex flex-col gap-6 pt-6"
                dir={isUrdu ? 'rtl' : 'ltr'}
              >
                <h3 className={`font-sans text-sm font-extrabold text-red-600 border-b border-[#2a2a2a] pb-1.5 select-none uppercase tracking-widest ${
                  isUrdu ? 'text-right' : 'text-left'
                }`}>
                  {transChapters[chapter.id]?.title || chapter.title}
                </h3>
                
                <div className={`flex flex-col gap-5 ${sizeClasses[textSize]} ${fontClasses[fontStyle]}`}>
                  {renderParagraphs.map((para, pIdx) => (
                    <p 
                      key={pIdx} 
                      className={`leading-relaxed text-[#bbb] md:text-[#ccc] select-text font-medium font-serif ${
                        isUrdu ? 'text-right text-justify' : 'text-justify'
                      }`}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Epilogue divider */}
          <div className="py-12 border-t border-[#2a2a2a] text-center flex flex-col items-center">
            <p className="font-serif text-xs text-[#555] max-w-sm italic" dir={language === 'ur' ? 'rtl' : 'ltr'}>
              {language === 'ur'
                ? '"تب آوازیں مدہم ہو جاتی ہیں یہاں تک کہ مجھے بمشکل سنائی دیتی ہیں جیسے وہ کسی ڈراؤنے خواب کے صدمے سے کانپتے ہوئے چھیڑے ہوئے الفاظ میں مجھ سے رابطے کی کوشش کر رہی ہوں۔"'
                : '“Then the voices grow quiet until I can barely hear them as they attempt to communicate with me in choking scraps of post-nightmare trauma.”'}
            </p>
            <div className="h-6 w-[1.5px] bg-red-800 my-4 animate-pulse" />
            <span className="font-mono text-[9px] text-[#444] tracking-[0.3em] uppercase font-bold">{endLabel}</span>
          </div>

        </div>
      </div>

      {/* Floater overlay that shows which chapter was detected */}
      <div className="absolute bottom-4 left-4 z-20 pointer-events-none rounded border border-[#2a2a2a] bg-[#111] px-3 py-1.5 flex items-center gap-2 shadow-lg">
        <CheckCircle size={10} className="text-red-700 animate-pulse" />
        <span className="font-mono text-[9px] uppercase text-[#666] font-bold">
          {t.vitalsCoupled}:
        </span>
        <span className="font-mono text-[9px] font-black text-red-500 uppercase tracking-widest">
          Cap {chapters.find(c => {
            if (activeLevelId === 0) return c.id === 1;
            if (activeLevelId === 1) return c.id === 2;
            if (activeLevelId === 2) return c.id === 5;
            if (activeLevelId === 3) return c.id === 8;
            return false;
          })?.id || 1}
        </span>
      </div>
    </div>
  );
};
