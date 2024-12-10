'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { SizeSelector } from '@/components/ui/SizeSelector';

interface GithubUserData {
  avatar_url: string;
  name: string;
  login: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

interface GithubComponentProps {
  username: string;
  onSizeChange?: (width: number, height: number) => void;
}

export const GithubComponent = ({ username='wgfire', onSizeChange }: GithubComponentProps) => {
  const [userData, setUserData] = useState<GithubUserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData(data);
        setError(null);
      } catch (err) {
        setError('Error fetching GitHub data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubData();
  }, [username]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        {error || 'Failed to load GitHub data'}
      </div>
    );
  }

  return (
    <div className="relative h-full group">
      <div className="flex h-full bg-white rounded-lg p-4 shadow-sm">
        <div className="flex-shrink-0 mr-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden">
            <Image
              src={userData.avatar_url}
              alt={`${userData.login}'s avatar`}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="flex-grow">
          <h2 className="text-xl font-bold">{userData.name || userData.login}</h2>
          <p className="text-gray-600 text-sm">@{userData.login}</p>
          {userData.bio && (
            <p className="text-gray-700 mt-2 text-sm">{userData.bio}</p>
          )}
          <div className="flex gap-4 mt-3">
            <div className="text-sm">
              <span className="font-semibold">{userData.public_repos}</span>
              <span className="text-gray-600 ml-1">repos</span>
            </div>
            <div className="text-sm">
              <span className="font-semibold">{userData.followers}</span>
              <span className="text-gray-600 ml-1">followers</span>
            </div>
            <div className="text-sm">
              <span className="font-semibold">{userData.following}</span>
              <span className="text-gray-600 ml-1">following</span>
            </div>
          </div>
        </div>
      </div>
      <SizeSelector onSizeSelect={onSizeChange || (() => {})} />
    </div>
  );
};
