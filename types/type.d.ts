declare interface IRoom {
     id: string;
     name: string;
     image: string;
     price: number;
     lengthInFeet: number;
     widthInFeet: number;
     totalBooking?: number;
     address: string;
     city: string;
     state: string;
     pin: number;
     description: string | null;
     ownerId: string | null;
}

declare interface IBookedRoom {
     id: string;
     userId: string;
     roomId: string | null;
     name: string;
     image: string;
     price: number;
     checkInTime: Date;
     checkOutTime: Date;
     ownerId: string | null;
     status: "Pending" | "Confirm" | "Cancel" | "Success";
     user: {
      name: string,
    }
}

interface UpdateStatusProps {
     bookingId: string;
     status: "Success" | "Confirm" | "Pending";
}