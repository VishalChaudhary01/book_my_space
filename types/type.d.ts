declare interface IRoom {
     id: string;
     name: string;
     image: string;
     price: number;
     lengthInFeet: number;
     widthInFeet: number;
     address: string;
     city: string;
     state: string;
     pin: number;
     description: string | null;
     ownerId: string | null;
}