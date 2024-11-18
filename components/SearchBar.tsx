"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";
import useSetQueryParams from "@/hooks/useSetQueryParams";
import { DEFAULT_PAGE } from "@/config";

export const SearchBar = ({ searchParams }: { searchParams?: SearchParamsType }) => {
  const [search, setSearch] = useState(searchParams?.search ?? "");
  const setQueryParams = useSetQueryParams();

  const handleSearch = () => {
    setQueryParams({ search, page: DEFAULT_PAGE });
  };

  return (
    <section className="flex justify-center items-center">
      <Input
        className="focus-visible:ring-blue-600 rounded-l-full w-full md:w-2/5"
        placeholder="Search rooms by name or address"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button
        variant="ghost"
        onClick={handleSearch}
        className="border border-l-0 rounded-r-full shadow-sm"
      >
        <Image src="/icons/search.svg" width={24} height={24} alt="search" />
      </Button>
    </section>
  );
};
