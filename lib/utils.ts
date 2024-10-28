import { EMAIL_VERIFICATION_LINK_EXPIRATION_TIME } from "@/config/auth.config";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ERROR HANDLER
export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    console.error(error.message);
    throw new Error(`Error: ${error.message}`);
  } else if (typeof error === "string") {
    console.error(error);
    throw new Error(`Error: ${error}`);
  } else {
    console.error(error);
    throw new Error(`Unknown error: ${JSON.stringify(error)}`);
  }
}

// format Date to 'yyyy-MM-ddTHH:mm'
export function formatToDateTimeLocalString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function getFormatedTime(checkInTime: Date, checkOutTime: Date) {
  const timeDiff = checkOutTime.getTime() - checkInTime.getTime();
  const forMonths = Math.floor(timeDiff / (1000*60*60*24*30));
  let remaningTime = timeDiff % (1000*60*60*24*30);
  const forDays = Math.floor(remaningTime / (1000*60*60*24));
  remaningTime = remaningTime % (1000*60*60*24);
  const forHours = Math.floor(remaningTime / (1000*60*60));
  return{ forHours, forDays, forMonths};
}

export function isTimeMultipleOfHour(checkInTime: Date, checkoutTime: Date): boolean {
  const timeDiff = (checkoutTime.getTime() - checkInTime.getTime()) / (1000 * 60 * 60);
  return timeDiff % 1 === 0;
}

// Get Name based on status
export function getStatusName(status: string) {
  switch (status) {
    case "BOOKED":
      return "Booked";
    case "CANCEL":
      return "Cancel";
    case "SUCCESS":
      return "Success";
    default:
      return "Pending";
  }
}

export const isTokenExpiredUtil = (createdAt: Date) => {
  const now = new Date().getTime();
  const tokenCreationTime = new Date(createdAt).getTime();
  return (
    now - tokenCreationTime > EMAIL_VERIFICATION_LINK_EXPIRATION_TIME * 1000
  );
};
