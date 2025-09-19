import React from 'react';

const AllerganLogo = () => {
  return (
    <div className="flex items-center space-x-3 h-full">
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-br from-allergan-primary via-allergan-secondary to-allergan-primary rounded-xl flex items-center justify-center shadow-xl border border-white/20 hover-scale">
          <div className="text-white font-black text-xl tracking-tight">A</div>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-50"></div>
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
      </div>
      <div className="text-foreground h-full flex items-center">
        <div className="leading-tight">
          <div className="text-lg font-black bg-gradient-to-r from-allergan-primary via-allergan-secondary to-allergan-primary bg-clip-text text-transparent hover:scale-105 transition-transform duration-200">
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