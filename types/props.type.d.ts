declare interface SearchBarProps {
  searchParams?: SearchParamsType;
}

declare interface RoomsProps {
  searchParams?: SearchParamsType;
}

declare interface RoomImageProps {
  src: string;
  w?: number;
  h?: number;
}

declare interface RoomFormProps {
  room?: IRoom;
  roomId?: string;
}

declare interface PasswordInputProps {
  field: any;
  placeholder: string;
}

declare interface PaginationBarProps {
  searchParams?: SearchParamsType;
  totalRooms: number;
}

declare interface MediaUploaderProps {
  image: any;
  setImage: React.Dispatch<any>;
  publicId?: string;
}

declare interface ConfirmationDialogProps {
  id?: string;
  title: string;
  desc?: string;
  buttonName?: string;
  open: boolean;
  setOpen: (o: boolean) => void;
  handleClick?: (id: string) => void;
}

declare interface RoomsPageProps {
  searchParams?: SearchParamsType;
}

declare interface RoomDetailsProps {
  params: { id: string };
}

declare interface BookingsProps {
  params: { id: string };
}

declare interface UpdateRoomProps {
  params: { id: string };
}

declare interface ResetPasswordPageProps {
  params: { token: string };
}

declare interface EmailVerificationPageProps {
  params: { token: string };
}
