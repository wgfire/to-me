'use client';

import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

interface ProfileProps {
  avatarUrl: string;
  name: string;
  description: string;
}

export const Profile = ({ avatarUrl: defaultAvatarUrl, name: defaultName, description: defaultDescription }: ProfileProps) => {
  const [avatarUrl, setAvatarUrl] = useState(defaultAvatarUrl);
  const [name, setName] = useState(defaultName);
  const [description, setDescription] = useState(defaultDescription);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load saved data from localStorage
    const savedData = localStorage.getItem('profileData');
    if (savedData) {
      const { avatarUrl: savedAvatar, name: savedName, description: savedDescription } = JSON.parse(savedData);
      setAvatarUrl(savedAvatar || defaultAvatarUrl);
      setName(savedName || defaultName);
      setDescription(savedDescription || defaultDescription);
    }
  }, [defaultAvatarUrl, defaultName, defaultDescription]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatarUrl(base64String);
        saveToLocalStorage(base64String, name, description);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveToLocalStorage = (avatar: string, n: string, d: string) => {
    localStorage.setItem('profileData', JSON.stringify({ 
      avatarUrl: avatar, 
      name: n, 
      description: d 
    }));
  };

  const handleContentChange = () => {
    const newName = nameRef.current?.textContent || name;
    const newDescription = descriptionRef.current?.textContent || description;
    setName(newName);
    setDescription(newDescription);
    saveToLocalStorage(avatarUrl, newName, newDescription);
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4 animate-in slide-in-from-left duration-500">
      <div 
        className="relative w-24 h-24 rounded-full overflow-hidden cursor-pointer group animate-in zoom-in duration-300"
        onClick={() => fileInputRef.current?.click()}
      >
        <Image
          src={avatarUrl}
          alt="Profile avatar"
          layout="fill"
          objectFit="cover"
          className="rounded-full transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-white text-sm">Upload Photo</span>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>

      <div
        ref={nameRef}
        contentEditable="true"
        onBlur={handleContentChange}
        className="text-2xl font-bold outline-none text-center border-b border-transparent hover:border-gray-300 focus:border-blue-500 transition-colors p-1 animate-in fade-in duration-300"
        suppressContentEditableWarning
      >
        {name}
      </div>

      <div
        ref={descriptionRef}
        contentEditable="true"
        onBlur={handleContentChange}
        className="text-gray-600 outline-none text-center border-transparent border hover:border-gray-300 focus:border-blue-500 transition-colors p-2 rounded max-w-md animate-in fade-in duration-300"
        suppressContentEditableWarning
      >
        {description}
      </div>
    </div>
  );
};
