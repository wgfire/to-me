'use client';

import React from 'react';
import ReactGridLayout from 'react-grid-layout';
import { SizeSelector } from '@/components/ui/SizeSelector';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

interface GridItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  component: React.ReactElement;
}

interface GridLayoutProps {
  items: GridItem[];
  onLayoutChange?: (layout: ReactGridLayout.Layout[]) => void;
  onItemSizeChange?: (itemId: string, width: number, height: number) => void;
  onItemDelete?: (itemId: string) => void;
}

export const GridLayout = ({ items, onLayoutChange, onItemSizeChange, onItemDelete }: GridLayoutProps) => {
  const handleSizeChange = (itemId: string) => (width: number, height: number) => {
    console.log(`Item ${itemId} resized to ${width}x${height}`);
    onItemSizeChange?.(itemId, width, height);
  };

  const layout = items.map(({ i, x, y, w, h }) => ({
    i,
    x,
    y,
    w,
    h,
    isResizable: false,
  }));

  const gridItems = items.map((item) => (
    <div key={item.i} className="group relative bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 ease-in-out hover:outline-none focus:outline-none">
      {onItemDelete && (
        <button
          onClick={() => onItemDelete(item.i)}
          className="absolute top-2 left-2 z-10 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Delete item"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
      <div className="h-full">
        {item.component}
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <SizeSelector onSizeSelect={handleSizeChange(item.i)} />
      </div>
    </div>
  ));

  return (
    <ReactGridLayout
      className="layout"
      layout={layout}
      cols={12}
      rowHeight={60}
      width={1200}
      onLayoutChange={onLayoutChange}
      margin={[16, 16]}
      containerPadding={[16, 16]}
      isDraggable={true}
      style={{ outline: 'none' }}
    >
      {gridItems}
    </ReactGridLayout>
  );
};
