'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { CityDTO } from '../../DTOs/CityDTO';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange, DateRangePicker } from 'react-date-range';
import { RangeKeyDict } from 'react-date-range';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { useRouter } from 'next/navigation';

export default function Plan() {
  const router = useRouter();

  const [cities, setCities] = useState<CityDTO[]>([]);

  //destination

  const [selectedCity, setSelectedCity] = useState<CityDTO | null>(null);

  const [destinationAnchorEl, setDestinationAnchorEl] =
    useState<null | HTMLElement>(null);
  const destinationMenuOpen = Boolean(destinationAnchorEl);
  const handleOpenDestinationMenu = (event: React.MouseEvent<HTMLElement>) => {
    setDestinationAnchorEl(event.currentTarget);
  };

  const handleCloseDestinationMenu = () => {
    setDestinationAnchorEl(null);
  };

  //date

  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const [dateAnchorEl, setDateAnchorEl] = useState<null | HTMLElement>(null);
  const dateMenuOpen = Boolean(dateAnchorEl);
  const handleOpenDateMenu = (event: React.MouseEvent<HTMLElement>) => {
    setDateAnchorEl(event.currentTarget);
  };

  const handleCloseDateMenu = () => {
    setDateAnchorEl(null);
  };

  const handleChooseDate = (ranges: RangeKeyDict) => {
    const { startDate, endDate } = ranges.selection;
    if (startDate && endDate) {
      setDateRange({
        startDate: startDate,
        endDate: endDate,
        key: 'selection',
      });
    }
  };

  //arrival
  const [arrivalTime, setArrivalTime] = useState<Dayjs | null>(null);
  const [arrivalAnchorEl, setArrivalAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const arrivalMenuOpen = Boolean(arrivalAnchorEl);
  const handleOpenArrivalMenu = (event: React.MouseEvent<HTMLElement>) => {
    setArrivalAnchorEl(event.currentTarget);
  };

  const handleCloseArrivalMenu = () => {
    setArrivalAnchorEl(null);
  };

  //leave

  const [leaveTime, setLeaveTime] = useState<Dayjs | null>(null);
  const [leaveAnchorEl, setLeaveAnchorEl] = useState<null | HTMLElement>(null);
  const leaveMenuOpen = Boolean(leaveAnchorEl);
  const handleOpenLeaveMenu = (event: React.MouseEvent<HTMLElement>) => {
    setLeaveAnchorEl(event.currentTarget);
  };

  const handleCloseLeaveMenu = () => {
    setLeaveAnchorEl(null);
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    const response = await fetch('https://localhost:5001/api/city');
    const data = await response.json();
    console.log(data);
    setCities(data);
  };

  const fetchAttractions = async (cityId: number) => {
    const response = await fetch(
      `https://localhost:5001/api/aiattraction/generate`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cityId: cityId,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  };

  //search

  const [isSearching, setIsSearching] = useState(false);

  const onSearch = async () => {
    console.log('Search clicked');
    if (!selectedCity) {
      alert('Please select a destination');
      return;
    }
    setIsSearching(true);
    const attractions = await fetchAttractions(selectedCity.id);
    router.push(
      `/itinerary?destination=${encodeURIComponent(selectedCity ? selectedCity?.name : ' ')}&range=${encodeURIComponent(JSON.stringify(dateRange))}&attractions=${encodeURIComponent(JSON.stringify(attractions))}`
    );
  };
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
                   bg-zinc-200 h-1/10 w-2/3 justify-self-center
                    rounded-4xl border-1 border-zinc-500 inset-shadow-xs inset-shadow-zinc-400"
        >
          <div
            aria-controls={destinationMenuOpen ? 'destination-menu' : undefined}
            onClick={handleOpenDestinationMenu}
            aria-haspopup="true"
            aria-expanded={destinationMenuOpen ? 'true' : undefined}
            className="flex flex-col rounded-l-full h-full w-1/4 hover:cursor-pointer md:gap-1"
          >
            <p className="mt-2.5 ml-4.5 text-xs">Where?</p>
            <p className="ml-4.5 text-[10px] lg:text-xs text-zinc-500 hover:cursor-pointer">
              {selectedCity
                ? selectedCity.name + ', ' + selectedCity.countryName
                : 'Select a destination'}
            </p>
          </div>
          <Menu
            className="z-50 h-1/2 w-1/4"
            id="destination-menu"
            open={destinationMenuOpen}
            anchorEl={destinationAnchorEl}
            onClose={handleCloseDestinationMenu}
          >
            {cities.map(city => (
              <MenuItem
                key={city.id}
                onClick={() => {
                  setSelectedCity(city);
                  handleCloseDestinationMenu();
                }}
              >
                {city.name}, {city.countryName}
              </MenuItem>
            ))}
          </Menu>
          <div className="border-r-[1px] h-3/4 border-zinc-400 rounded-full ml-1.5" />
          <div
            className="flex flex-col h-full w-1/4"
            aria-controls="date-menu"
            aria-haspopup="true"
            aria-expanded={dateMenuOpen ? 'true' : undefined}
            onClick={handleOpenDateMenu}
          >
            <p className="mt-2.5 ml-3 text-xs">When?</p>
            <p className="ml-3 text-[10px] lg:text-xs text-zinc-500 hover:cursor-pointer ">
              {dateRange
                ? `${dateRange.startDate.toLocaleDateString()} - ${dateRange.endDate.toLocaleDateString()}`
                : 'Select a date'}
            </p>
          </div>
          <Menu
            className="z-50"
            id="date-menu"
            open={dateMenuOpen}
            anchorEl={dateAnchorEl}
            onClose={handleCloseDateMenu}
          >
            <DateRangePicker ranges={[dateRange]} onChange={handleChooseDate} />
          </Menu>

          <div className="border-r-[1px] h-3/4 border-zinc-400 rounded-full ml-1.5" />
          <div
            className="flex flex-col h-full w-1/4"
            aria-controls="arrival-menu"
            aria-haspopup="true"
            aria-expanded={arrivalMenuOpen ? 'true' : undefined}
            onClick={handleOpenArrivalMenu}
          >
            <p className="mt-2.5 ml-3 text-xs">Est. arrival?</p>
            <p className="ml-3 text-[10px] lg:text-xs text-zinc-500 hover:cursor-pointer ">
              {arrivalTime
                ? arrivalTime.hour().toString().padStart(2, '0') +
                  ':' +
                  arrivalTime.minute().toString().padStart(2, '0')
                : 'Select time'}
            </p>
          </div>
          <Menu
            className="z-50 w-1/4"
            id="arrival-menu"
            open={arrivalMenuOpen}
            anchorEl={arrivalAnchorEl}
            onClose={handleCloseArrivalMenu}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker value={arrivalTime} onChange={setArrivalTime} />
            </LocalizationProvider>
          </Menu>
          <div className="border-r-[1px] h-3/4 border-zinc-400 rounded-full ml-1.5" />
          <div
            className="flex flex-col rounded-r-full h-full w-1/4"
            aria-controls="leave-menu"
            aria-haspopup="true"
            aria-expanded={leaveMenuOpen ? 'true' : undefined}
            onClick={handleOpenLeaveMenu}
          >
            <p className="mt-2.5 ml-3 text-xs">Est. leave?</p>
            <p className="ml-3 text-[10px] lg:text-xs text-zinc-500 hover:cursor-pointer ">
              {leaveTime
                ? leaveTime.hour().toString().padStart(2, '0') +
                  ':' +
                  leaveTime.minute().toString().padStart(2, '0')
                : 'Select time'}
            </p>
          </div>
          <Menu
            className="z-50 w-1/4"
            id="leave-menu"
            open={leaveMenuOpen}
            anchorEl={leaveAnchorEl}
            onClose={handleCloseLeaveMenu}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker value={leaveTime} onChange={setLeaveTime} />
            </LocalizationProvider>
          </Menu>
          <button
            className={`flex justify-center items-center h-10 w-11 mr-2 rounded-full 
             ${
               isSearching
                 ? 'bg-zinc-500 cursor-not-allowed'
                 : 'bg-zinc-300 hover:bg-zinc-400 hover:cursor-pointer'
             }`}
            onClick={onSearch}
            disabled={isSearching}
          >
            {'>'}
          </button>
        </div>
      </div>

      <div className="absolute flex flex-col items-center bg-zinc-600 p-5 w-full">
        <h2 className="text-2xl text-zinc-100 font-bold">Plan your trip</h2>
        <p className="text-zinc-400">Here you can plan your next adventure!</p>
      </div>
    </div>
  );
}
