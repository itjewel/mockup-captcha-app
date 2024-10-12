import React from 'react';

type Shape = '△' | '◯' | '□';

interface ShapeSectorProps {
  idx: number;
  sector: { idx: number; shape: Shape; color: string };
  userSelections: number[];
  handleSectorClick: (idx: number) => void;
}

const ShapeSector: React.FC<ShapeSectorProps> = ({ idx, sector, userSelections, handleSectorClick }) => (
  <div
    key={idx}
    role="button"
    className={`border border-white flex items-center justify-center cursor-pointer ${
      userSelections.includes(idx) ? 'bg-yellow-500' : ''
    }`}
    onClick={() => handleSectorClick(idx)}
  >
    {sector?.shape && (
      <div className="w-6 h-6 flex items-center justify-center">
        {sector.shape === '△' && (
          <div
            className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[20px] border-l-transparent border-r-transparent"
            style={{ borderBottomColor: sector.color }}
          ></div>
        )}
        {sector.shape === '◯' && (
          <div
            className="w-full h-full rounded-full border-2"
            style={{ borderColor: sector.color }}
          ></div>
        )}
        {sector.shape === '□' && (
          <div
            className="w-full h-full border-2"
            style={{ borderColor: sector.color }}
          ></div>
        )}
      </div>
    )}
  </div>
);

export default ShapeSector;
