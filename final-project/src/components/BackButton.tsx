'use client';
import {useRouter} from 'next/navigation';

export default function BackButton() {
  const router = useRouter();
  return (
    <button className="absolute top-3 cursor-pointer right-3 text-gray-500 hover:text-black dark:hover:text-white text-xl" onClick={router.back}>&times;</button>
  )
}