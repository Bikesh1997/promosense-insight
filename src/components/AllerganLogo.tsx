import React from 'react';

const AllerganLogo = () => {
  return (
    <div className="flex items-center space-x-3 h-full">
      <div className="w-8 h-8 bg-gradient-to-br from-allergan-primary to-allergan-secondary rounded-lg flex items-center justify-center shadow-lg">
        <div className="text-white font-bold text-lg">A</div>
      </div>
      <div className="text-foreground h-full flex items-center">
        <div className="leading-tight">
          <div className="text-base font-bold bg-gradient-to-r from-allergan-primary to-allergan-secondary bg-clip-text text-transparent">
            Allergan
          </div>
          <div className="text-sm font-medium text-allergan-text-light">
            Aesthetics
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllerganLogo;