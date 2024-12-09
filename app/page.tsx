'use client';

import { useState } from 'react';
import { Profile } from '@/components/layout/Profile';
import { GridLayout } from '@/components/features/grid/GridLayout';
import { FloatingBar } from '@/components/ui/FloatingBar';
import { TextComponent } from '@/components/features/grid/TextComponent';

export default function Home() {
  const [items, setItems] = useState([]);

  const handleAddTextComponent = () => {
    const newItem = {
      i: `text-${Date.now()}`,
      x: 0,
      y: Infinity, // Puts it at the bottom
      w: 3,
      h: 2,
      component: <TextComponent />,
    };
    setItems([...items, newItem]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row">
        {/* Profile Section - Full width on mobile, 1/4 width on desktop */}
        <div className="w-full md:w-1/4 bg-white border-b md:border-r md:min-h-screen">
          <Profile
            avatarUrl="/window.svg"
            name="wdebugger"
            description="自我介绍"
          />
        </div>
        {/* Grid Section - Full width on mobile, 3/4 width on desktop */}
        <div className="flex-1 md:w-3/4">
          <GridLayout items={items} />
        </div>
      </div>

      {/* Floating Bar */}
      <FloatingBar onAddTextComponent={handleAddTextComponent} />
    </div>
  );
}
