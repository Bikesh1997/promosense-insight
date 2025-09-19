import React from 'react';

const AllerganLogo = () => {
  return (
    <div className="flex items-center space-x-3 h-full">
      <div className="w-10 h-10 bg-gradient-to-br from-allergan-primary to-allergan-secondary rounded-xl flex items-center justify-center shadow-lg border border-white/10">
        <div className="text-white font-black text-xl tracking-tight">A</div>
      </div>
      <div className="text-foreground h-full flex items-center">
        <div className="leading-tight">
          <div className="text-lg font-black text-foreground">
            Allergan
          </div>
          <div className="text-sm font-semibold text-allergan-text-light tracking-wide">
            Aesthetics
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllerganLogo;