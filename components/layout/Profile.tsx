import Image from 'next/image';

interface ProfileProps {
  avatarUrl: string;
  name: string;
  description: string;
}

export const Profile = ({ avatarUrl, name, description }: ProfileProps) => {
  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <div className="relative w-24 h-24 rounded-full overflow-hidden">
        <Image
          src={avatarUrl}
          alt="Profile avatar"
          layout="fill"
          objectFit="cover"
          className="rounded-full"
        />
      </div>
      <h1 className="text-2xl font-bold">{name}</h1>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};
