'use client';
export default function TimeGrid({ numOfHours }: { numOfHours?: number }) {
  const numOfDividers = numOfHours ? numOfHours - 1 : 10; //default height of each time slot
  return (
    <div className="flex flex-col h-full w-full justify-baseline">
      <hr className=" border-t border-gray-600 opacity-60 w-11/12 self-center" />
      <div className="flex flex-col justify-evenly h-full w-full">
        {Array.from(new Array(numOfDividers)).map((_, index) => (
          <hr
            className=" border-t border-gray-600 opacity-60 w-11/12 self-center"
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
