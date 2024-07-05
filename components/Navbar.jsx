'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

const Navbar = () => {
  const router = useRouter(); // Router instance
  const { data: session, status } = useSession();
  const { user } = session || {};

  const handleSignIn = async () => {
    // Sign in using Google provider
    await signIn('google');
    // Redirect to the home page
    router.push('/');
  };

  return (
    <nav className="bg-blue-950 p-4 flex justify-between items-center space-x-8">
      {/* Left side */}
      <Link href="/" className="text-white font-bold text-2xl">
        NUMERO
      </Link>

      {/* Middle - Navigation Links */}
      <ul className="flex space-x-8">
        {['Home', 'About', 'Services', 'Records'].map((link) => (
          <li key={link}>
            <Link href={`/${link.toLowerCase()}`} className="text-white hover:text-gray-300 text-lg">
              {link}
            </Link>
          </li>
        ))}
      </ul>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {status === 'authenticated' ? (
          <>
            <Image
              className="rounded-full"
              src={user?.image || '/default-avatar.png'} // Fallback image
              alt={`${user?.name} Avatar`}
              width={40} // Reduced size for optimization
              height={40}
            />
            <div className="text-white">
              <div className="font-bold">{user?.name}</div>
              {/* <div className="font-bold">{user?.email}</div> */}
              <div className="text-sm">UserId: <span className="font-bold">{user?.id}</span></div>
            </div>
            <button
              onClick={() => signOut()}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            onClick={handleSignIn}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
