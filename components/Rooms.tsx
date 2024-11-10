"use client";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RoomImage } from "@/components/RoomImage";
import { DEFAULT_PAGE, ROOMS_PER_PAGE } from "@/config";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { fetchAllRooms } from "@/app/actions/room.action";
import LoadingPage from "@/app/rooms/loading";

export function Rooms({ page = DEFAULT_PAGE, searchQuery = "" }: RoomListsProps) {
    const [rooms, setRooms] = useState<IRoom[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(Number(page));
    const [query, setQuery] = useState(searchQuery);
    const router = useRouter();

    useEffect(() => {
        setLoading(true);
        async function loadRooms() {
            const response = await fetchAllRooms({ page: currentPage, searchQuery: query });
            if (response.rooms) {
                setRooms(response.rooms);
                setLoading(false);
            }
        }
        loadRooms();
    }, [currentPage, query]);

    const handleSearch = () => {
        setCurrentPage(DEFAULT_PAGE);
        router.push(`?searchQuery=${query}&page=${DEFAULT_PAGE}`);
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        router.push(`?searchQuery=${query}&page=${newPage}`);
    };

    if (loading) return <LoadingPage />;

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-center items-center">
                <Input
                    className="focus-visible:ring-blue-600 rounded-l-full w-full md:w-2/5"
                    placeholder="Search rooms by name or address"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button variant="ghost" onClick={handleSearch} className="border border-l-0 rounded-r-full shadow-sm">
                    <Image src="/icons/search.svg" width={24} height={24} alt="search" />
                </Button>
            </div>
            {rooms?.length ? (
                rooms.map((room) => (
                    <Link href={`/rooms/${room.id}`} key={room.id} className="flex flex-col md:flex-row gap-2 md:gap-6 border bg-purple-2/15 rounded-md p-2">
                        <div className="w-full h-[180px] md:w-[250px] md:h-[150px] overflow-hidden shrink-0">
                            <RoomImage src={room.image} />
                        </div>
                        <div className="flex flex-col gap-4 justify-between">
                            <div className="flex flex-col text-gray-700 text-sm lg:text-base md:text-base">
                                <span className="lg:text-xl text-lg font-semibold">{room.name}</span>
                                <span><span className="font-semibold">Price: </span>{`Rs.${room.pricePerHour}/hour, Rs.${room.pricePerDay}/day, Rs.${room.pricePerMonth}/month`}</span>
                                <span><span className="font-medium">Size: </span>{room.lengthInFeet}×{room.widthInFeet} square feet</span>
                                <span><span className="font-medium">Address: </span>{room.address} {room.city}</span>
                            </div>
                            <Button className="md:w-80">View Details</Button>
                        </div>
                    </Link>
                ))
            ) : (
                <div className="flex-center text-xl font-semibold text-gray-700">No rooms found!</div>
            )}
            <Pagination className="bg-purple-2 py-2.5 px-4 rounded-xl shadow-sm">
                <PaginationContent>
                    <PaginationItem>
                        <Button variant="secondary" onClick={() => handlePageChange(Math.max(1, currentPage - 1))}>Previous Page</Button>
                    </PaginationItem>
                    <PaginationItem>
                         <PaginationLink isActive>
                              {currentPage}
                         </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <Button variant="secondary" onClick={() => handlePageChange(currentPage + 1)} disabled={Number(rooms?.length) < ROOMS_PER_PAGE }>Next Page</Button>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}