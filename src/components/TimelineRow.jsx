import React from 'react';
import { TimelineBlock } from './TimelineBlock';

export function TimelineRow({ resource, selectedSlot, onSelectSlot, onUnavailableClick }) {
  const { id, name, location, blocks } = resource;

  return (
    <div className="flex items-center gap-3 py-3 border-b border-slate-100 last:border-0">
      {/* Resource Column (Left) */}
      <div className="w-28 sm:w-36 shrink-0">
        <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-tight truncate">
          {name}
        </h4>
        <p className="text-[11px] font-medium text-slate-500 mt-0.5 truncate">
          {location}
        </p>
      </div>

      {/* Timeline Track Area (Right) */}
      <div className="flex-1 h-11 rounded-xl overflow-hidden bg-slate-100 flex relative border border-slate-200/50 shadow-inner">
        {blocks.map((block, idx) => {
          const isSelected =
            selectedSlot &&
            selectedSlot.resourceId === id &&
            selectedSlot.blockId === block.id;

          const handleClick = () => {
            if (block.status === 'AVAILABLE') {
              onSelectSlot({
                resourceId: id,
                resourceName: name,
                location: location,
                blockId: block.id,
                timeRange: block.timeRange || '3:00 PM – 4:30 PM',
                duration: block.duration || '1h 30m',
                zone: block.zone || `Audio ${location}`,
                interface: block.interface || 'USB-C / XLR Dual',
              });
            } else if (block.status === 'MY_BOOKING') {
              onSelectSlot({
                resourceId: id,
                resourceName: name,
                location: location,
                blockId: block.id,
                timeRange: block.timeRange || '3:00 PM – 4:30 PM',
                duration: block.duration || '1h 30m',
                zone: block.zone || `Audio ${location}`,
                interface: block.interface || 'USB-C / XLR Dual',
              });
            } else {
              onUnavailableClick(block);
            }
          };

          return (
            <TimelineBlock
              key={block.id || idx}
              block={block}
              isSelected={isSelected}
              onClick={handleClick}
            />
          );
        })}
      </div>
    </div>
  );
}
