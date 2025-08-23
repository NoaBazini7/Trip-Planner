'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <div className="relative flex h-[650px]">
        <Image
          src={'/hero.jpg'}
          alt={'hero'}
          width={1920}
          height={1080}
          className={
            'object-cover object'
          }
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/5 to-black/0" />
        <div className="flex flex-col absolute w-auto top-1/3 left-1/5 text-zinc-100 font-bold font-roboto">
          <h1 className="text-4xl text-left sm:text-5xl md:text-6xl">
            Plan trips.
          </h1>
          <h1 className="text-4xl text-left sm:text-5xl md:text-6xl">
            Travel the world.
          </h1>
          <Link
            href="/plan"
            className="flex"
          >
            <button className="ml-auto mt-4 px-4 py-2 bg-zinc-200 text-zinc-500 rounded w-1/2 max-w-50 min-w-fit tracking-wide hover:bg-zinc-50 hover:text-zinc-600 hover:shadow hover:cursor-pointer">
              Start Planning {'>'}
            </button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center bg-zinc-600 p-5">
        <h2 className="text-2xl text-zinc-100 font-bold">
          Why choose us?
        </h2>
        <p className="text-zinc-400">
          We offer the best travel
          planning experience.
        </p>
      </div>
    </div>
  );
}
