import React from 'react'
import { Skeleton } from './ui/skeleton'

export const Loader = () => {
  return (
    <div>
     {[1, 2, 3, 4].map((room) => (
        <div className="flex gap-8 border-2 border-gray-100 rounded-md p-2" key={room}>
          <Skeleton className="h-40 w-40 rounded-md" />
          <div className="flex flex-col justify-between">
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]  md:w-[300px]" />
              <Skeleton className="h-4 w-[150px] md:w-[250px]" />
              <Skeleton className="h-4 w-[150px] md:w-[250px]" />
            </div>
            <Skeleton className="h-8 w-[150px] md:w-[250px]" />
          </div>
        </div>
      ))}
    </div>
  )
}
