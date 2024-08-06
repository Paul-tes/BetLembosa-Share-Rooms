import React from 'react';

export default function NavLoad() {
  return (
    <div className='flex gap-10'>
     <span className="loading loading-bars loading-xs"></span>
     <span className="loading loading-bars loading-sm"></span>
     <span className="loading loading-bars loading-md"></span>
    </div>
  );
}