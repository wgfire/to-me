'use client';

import { useState } from 'react';
import { SizeSelector } from '@/components/ui/SizeSelector';

interface TextComponentProps {
  onSizeChange?: (width: number, height: number) => void;
}

export const TextComponent = ({ onSizeChange }: TextComponentProps) => {
  const [text, setText] = useState('Add your text here...');
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <div className="relative h-full group">
        <textarea
          className="w-full h-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => setIsEditing(false)}
          autoFocus
        />
        <SizeSelector onSizeSelect={onSizeChange || (() => {})} />
      </div>
    );
  }

  return (
    <div className="relative h-full group">
      <div
        contentEditable="true"
        className="h-full p-4 bg-white rounded-lg shadow-sm focus:outline-none"
        suppressContentEditableWarning
        onClick={() => setIsEditing(true)}
      >
        {text}
      </div>
      <SizeSelector onSizeSelect={onSizeChange || (() => {})} />
    </div>
  );
};
