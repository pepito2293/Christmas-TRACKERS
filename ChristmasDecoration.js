import React from 'react';

export default function ChristmasDecoration() {
  return (
    <>
      {/* Guirlande supérieure fixe */}
      <div className="fixed top-0 left-0 right-0 h-12 z-[100] pointer-events-none overflow-hidden bg-gradient-to-b from-[#1a4d2e] to-transparent" style={{ position: 'fixed' }}>
        <div className="absolute inset-0 flex">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="flex-1 relative">
              <svg viewBox="0 0 100 50" className="w-full h-12">
                <path
                  d="M 0 25 Q 25 10, 50 25 T 100 25"
                  fill="none"
                  stroke="#2d5f3f"
                  strokeWidth="3"
                />
                {i % 3 === 0 && (
                  <>
                    <circle cx="50" cy="25" r="6" fill="#c63b3b" />
                    <circle cx="50" cy="25" r="4" fill="#ff5555" />
                  </>
                )}
                {i % 3 === 1 && (
                  <>
                    <circle cx="50" cy="25" r="6" fill="#ffd700" />
                    <circle cx="50" cy="25" r="4" fill="#ffed4e" />
                  </>
                )}
                {i % 3 === 2 && (
                  <>
                    <circle cx="50" cy="25" r="6" fill="#4a90e2" />
                    <circle cx="50" cy="25" r="4" fill="#6bb6ff" />
                  </>
                )}
              </svg>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
