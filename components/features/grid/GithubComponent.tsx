'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

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
}

export const GithubComponent = ({ username='wgfire' }: GithubComponentProps) => {
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
        {error || 'No data available'}
      </div>
    );
  }

  return (
    <div className="relative h-full">
      <div className="flex flex-col h-full p-4 space-y-4">
        <div className="flex items-center space-x-4">
          <div className="relative w-16 h-16">
            <Image
              src={userData.avatar_url}
              alt={`${userData.name || userData.login}'s avatar`}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-semibold text-lg">{userData.name || userData.login}</h2>
            <p className="text-gray-600">@{userData.login}</p>
          </div>
        </div>
        {userData.bio && (
          <p className="text-sm text-gray-700">{userData.bio}</p>
        )}
        <div className="flex justify-between text-sm text-gray-600">
          <span>Repos: {userData.public_repos}</span>
          <span>Followers: {userData.followers}</span>
          <span>Following: {userData.following}</span>
        </div>
      </div>
    </div>
  );
};
