'use client';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

export default function ItineraryPage() {
  const searchParams =
    useSearchParams();

  const destination = searchParams.get(
    'destination'
  );
  const rawDateRange =
    searchParams.get('range');
  const dateRange = JSON.parse(
    rawDateRange || '{}'
  );
  const rawAttractions =
    searchParams.get('attractions');
  const attractions = JSON.parse(
    rawAttractions || '[]'
  );

  return (
    <div className="relative flex justify-center h-screen">
      <Image
        src={'/itinerary.jpg'}
        alt={'itinerary'}
        width={1920}
        height={1080}
        className={'object-cover'}
      />
      <div className="absolute flex flex-col inset-0 bg-gradient-to-b from-black/40 via-black/5 to-black/0">
        <div className="absolute text-white p-4 top-20 justify-center w-full text-center">
          {`${destination} ${dateRange.startDate ? new Date(dateRange.startDate).getFullYear() : ''}`}
        </div>
        <div className="absolute text-white p-4 top-40">
          <h2>Attractions:</h2>
          {attractions.map(attr => (
            <div key={attr.id}>
              <h3>{attr.name}</h3>
              <p>{attr.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
