declare interface IResponse {
     success: boolean;
     message?: string;
     error?: string;
}

declare interface IFetchAllBookingByRoomResponse {
     success: boolean;
     bookingList?: IBookedRoom[];
     error?: string;
}

declare interface IFetchAllBookedRoomsResponse {
     success: boolean;
     bookedRooms?: IBookedRoom[];
     error?: string;
}

declare interface IFetchRoomsResponse {
     success: boolean;
     rooms?: IRoom[];
     error?: string;
}

declare interface IFetchRoomByIdResponse {
     success: boolean;
     room?: IRoom | null;
     error?: string;
}

declare interface IUploadImageResponse {
     success: boolean;
     publicId?: string;
     error?: string;
}

declare interface ICheckoutResponse {
     success: boolean;
     url?: string;
     error?: string;
}

declare interface RoomListsProps {
     page?: number;
     searchQuery?: string;
}

declare interface IRoom {
     id: string;
     name: string;
     image: string;
     pricePerHour: number;
     pricePerDay: number;
     pricePerMonth: number;
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
     status: "BOOKED" | "CANCEL" | "SUCCESS";
     user: {
      name: string,
    }
}

interface UpdateStatusProps {
     bookingId: string;
     status: "BOOKED" | "CANCEL" | "SUCCESS";
}