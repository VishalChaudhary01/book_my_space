"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { DEFAULT_PAGE } from "@/config";
import useSetQueryParams from "@/hooks/useSetQueryParams";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export const SearchBar = ({ searchParams }: SearchBarProps) => {
  const [search, setSearch] = useState(searchParams?.search ?? "");
  const setQueryParams = useSetQueryParams();

  const handleSearch = () => {
    setQueryParams({ search, page: DEFAULT_PAGE });
  };

  return (
    <section className="flex justify-center items-center md:w-96">
      <Input
        className="border border-purple-2 dark:border-dark-2 rounded-l-full"
        placeholder="Search rooms by name or address"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button
        variant="ghost"
        onClick={handleSearch}
        className="border border-l-0 border-purple-2 dark:border-dark-2 dark:hover:bg-dark-2 rounded-r-full shadow-sm"
      >
        <Search width={24} height={24} className="dark:text-dark-1/50" />
      </Button>
    </section>
  );
};
