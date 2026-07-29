
import React from "react";

const ZenBackground: React.FC = () => {
  return (
    <div className="hz-fixed hz-inset hz-z-behind hz-clip">
      {/* Subtle dot pattern */}
      <div 
        className="hz-abs hz-inset hz-dim-more"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, rgba(255,255,255,0.1) 0.5px, transparent 0.5px)
          `,
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Ultra-subtle gradient overlays */}
      <div className="hz-abs hz-top-0 hz-left-0 hz-right-0" />
      <div className="hz-abs hz-left-0 hz-bottom-0 hz-right-0" />
      
      {/* Depth radial gradient */}
      <div 
        className="hz-abs hz-inset"
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(15,15,15,0), rgba(0,0,0,1))'
        }}
      />
      
      {/* Subtle grain texture */}
      <div 
        className="hz-abs hz-inset hz-dim-more"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px'
        }}
      />
      
      {/* Vignette effect */}
      <div 
        className="hz-abs hz-inset hz-no-pointer"
        style={{
          boxShadow: 'inset 0 0 180px rgba(0,0,0,0.9)'
        }}
      />
    </div>
  );
};

export default ZenBackground;
