import React from 'react'
import { Skeleton } from './ui/skeleton'

export const Loader = () => {
  return (
    <div className='flex flex-col items-center gap-4 w-full'>
     {[1, 2, 3, 4].map((room) => (
        <div className="flex flex-col md:flex-row items-center gap-4 border-2 border-gray-100 dark:border-dark-2 rounded-md p-2 w-[340px] md:w-full md:max-w-6xl" key={room}>
          <Skeleton className="w-[300px] h-[200px] md:h-40 md:w-40 rounded-md" />
          <div className="flex flex-col gap-4 justify-between">
            <div className="space-y-2">
              <Skeleton className="h-4 w-[300px]" />
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[250px]" />
            </div>
            <Skeleton className="h-8 w-[250px]" />
          </div>
        </div>
      ))}
    </div>
  )
}
