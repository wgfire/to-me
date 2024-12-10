'use client';

import React from 'react';
import ReactGridLayout from 'react-grid-layout';
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
}

export const GridLayout = ({ items, onLayoutChange, onItemSizeChange }: GridLayoutProps) => {
  const handleSizeChange = (itemId: string) => (width: number, height: number) => {
    onItemSizeChange?.(itemId, width, height);
  };

  const layout = items.map(({ i, x, y, w, h }) => ({
    i,
    x,
    y,
    w,
    h,
    isResizable: false, // Disable default resize handle
  }));

  const gridItems = items.map((item) => {
    return (
      <div key={item.i} className="bg-white rounded-lg shadow-sm overflow-hidden">
        {item.component}
      </div>
    );
  });

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
    >
      {gridItems}
    </ReactGridLayout>
  );
};
