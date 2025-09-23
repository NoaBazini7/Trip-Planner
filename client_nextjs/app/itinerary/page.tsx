'use client';
import { useSearchParams } from 'next/navigation';

export default function ItineraryPage() {
  const searchParams =
    useSearchParams();

  const destination = searchParams.get(
    'destination'
  );
  const days = searchParams.get('days');
  return (
    <div>
      Itinerary Page
      {`Destination: ${destination}, Days: ${days}`}
    </div>
  );
}
