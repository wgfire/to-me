'use client';

import { useState } from 'react';
import { Profile } from '@/components/layout/Profile';
import { GridLayout } from '@/components/features/grid/GridLayout';
import { FloatingBar } from '@/components/ui/FloatingBar';
import { TextComponent } from '@/components/features/grid/TextComponent';
import { GithubComponent } from '@/components/features/grid/GithubComponent';

// Define the interface for component properties
interface ComponentProps {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  component: React.ReactElement;
}

export default function Home() {
  // Update the items state to use the defined interface
  const [items, setItems] = useState<ComponentProps[]>([]);

  const handleAddTextComponent = () => {
    const newItem: ComponentProps = {
      i: `text-${Date.now()}`,
      x: 0,
      y: Infinity, // Puts it at the bottom
      w: 3,
      h: 2,
      component: <TextComponent />,
    };
    setItems([...items, newItem]);
  };

  const handleAddGithubComponent = () => {
    const newItem: ComponentProps = {
      i: `github-${Date.now()}`,
      x: 0,
      y: Infinity,
      w: 6,
      h: 2,
      component: <GithubComponent username="wgfire" onSizeChange={(width, height) => handleItemSizeChange(newItem.i, width, height)} />,
    };
    setItems([...items, newItem]);
  };

  const handleItemSizeChange = (itemId: string, width: number, height: number) => {
    setItems(items.map(item => 
      item.i === itemId 
        ? { ...item, w: width, h: height }
        : item
    ));
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
        <div className="flex-1 p-4">
          <FloatingBar onAddTextComponent={handleAddTextComponent} onAddGithubComponent={handleAddGithubComponent} />
          <GridLayout 
            items={items} 
            onItemSizeChange={handleItemSizeChange}
          />
        </div>
      </div>

      {/* Floating Bar */}
    </div>
  );
}
