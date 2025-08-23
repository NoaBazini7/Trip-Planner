'use client';
import Image from 'next/image';

export default function Plan() {
  return (
    <div>
      <div className="relative flex justify-center h-[650px]">
        <Image
          src={'/hero.jpg'}
          alt={'hero'}
          width={1920}
          height={1080}
          className={'object-cover'}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/5 to-black/0" />
        <div
          className="absolute inset-0 flex top-1/6 items-center justify-evenly
                   bg-zinc-200 h-1/10 w-2/3 md:max-w-1/2 justify-self-center rounded-2xl"
        >
          <div>button1</div>
          <div>button2</div>
          <div>button3</div>
          <div>button4</div>
        </div>
      </div>

      <div className="absolute flex flex-col items-center bg-zinc-600 p-5">
        <h2 className="text-2xl text-zinc-100 font-bold">
          Plan your trip
        </h2>
        <p className="text-zinc-400">
          Here you can plan your next
          adventure!
        </p>
      </div>
    </div>
  );
}
