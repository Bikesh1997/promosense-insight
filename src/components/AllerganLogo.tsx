import React from 'react';
import allerganLogo from '@/assets/allergan-logo-new.png';

const AllerganLogo = () => {
  return (
    <div className="flex items-center h-full">
      <img src={allerganLogo} alt="Allergan Aesthetics" className="h-8 sm:h-10 object-contain" />
    </div>
  );
};

export default AllerganLogo;