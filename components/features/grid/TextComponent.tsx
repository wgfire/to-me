import { useState } from 'react';

export const TextComponent = () => {
  const [text, setText] = useState('Add your text here...');
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <textarea
        className="w-full h-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => setIsEditing(false)}
        autoFocus
      />
    );
  }

  return (
    <div
      className="w-full h-full p-2 cursor-pointer"
      onClick={() => setIsEditing(true)}
    >
      {text}
    </div>
  );
};
