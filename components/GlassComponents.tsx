import React, { useId } from 'react';

const GlassFilter = ({ id }: { id: string }) => (
  <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }} aria-hidden="true">
    <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
      <feOffset in="blur" dx="20" dy="20" result="offset" />
      <feComponentTransfer in="offset" result="refracted">
         <feFuncR type="linear" slope="0.8" />
         <feFuncG type="linear" slope="0.8" />
         <feFuncB type="linear" slope="0.8" />
      </feComponentTransfer>
      <feMerge>
        <feMergeNode in="refracted" />
      </feMerge>
    </filter>
  </svg>
);

export function GlassSurface({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const rawId = useId();
  const filterId = "glass-" + rawId.replace(/:/g, '');
  return (
    <>
      <GlassFilter id={filterId} />
      <div 
        className={`bg-white/5 hover:bg-white/10 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(255,255,255,0.05),inset_0_2px_4px_rgba(255,255,255,0.1)] transition-all duration-300 ${className}`}
        style={{ backdropFilter: `url(#${filterId})`, WebkitBackdropFilter: `url(#${filterId})` }}
        {...props}
      >
        {children}
      </div>
    </>
  );
}

export function GlassButton({ children, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const rawId = useId();
  const filterId = "glass-" + rawId.replace(/:/g, '');
  return (
    <>
      <GlassFilter id={filterId} />
      <button 
        className={`bg-white/5 hover:bg-white/10 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(255,255,255,0.05),inset_0_2px_4px_rgba(255,255,255,0.1)] transition-all duration-300 ${className}`}
        style={{ backdropFilter: `url(#${filterId})`, WebkitBackdropFilter: `url(#${filterId})` }}
        {...props}
      >
        {children}
      </button>
    </>
  );
}
