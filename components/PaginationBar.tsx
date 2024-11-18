"use client"
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { Button } from "./ui/button";
import { useState } from "react";
import useSetQueryParams from "@/hooks/useSetQueryParams";
import { DEFAULT_PAGE, ROOMS_PER_PAGE } from "@/config";

export const PaginationBar = ({ searchParams, totalRooms }: { searchParams?: SearchParamsType; totalRooms: number }) => {
     const [page, setPage] = useState(Number(searchParams?.page) || 1);
     const setQueryParams = useSetQueryParams();

     const totalPages = Math.ceil(totalRooms / ROOMS_PER_PAGE);

     const handlePageChange = (newPage: number) => {
          setQueryParams({ page: newPage });
          setPage(newPage);
     };

     return (
          <Pagination className="bg-purple-2 py-2.5 px-4 rounded-xl shadow-sm">
               <PaginationContent>
               <PaginationItem>
                    <Button variant="secondary" onClick={() => handlePageChange(Math.max(1, page - 1))} disabled={page === DEFAULT_PAGE}>Previous</Button>
               </PaginationItem>
               <PaginationItem>
                    <PaginationLink isActive>
                         {page}
                    </PaginationLink>
               </PaginationItem>
               <PaginationItem>
                    <Button variant="secondary" onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>Next</Button>
               </PaginationItem>
               </PaginationContent>
          </Pagination>
     )
}
