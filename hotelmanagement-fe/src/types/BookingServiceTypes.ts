export interface AddBokingRequest {
  filter: {
    numOfChildren: number;
    numOfAdults: number;
    checkInDate: Date;
    checkOutDate: Date;
  };
  token: string;
  userId: number;
  roomId: number;
}

export type Booking = {
  id: number;
  checkInDate: string;
  checkOutDate: string;
  numOfAdults: number;
  numOfChildren: number;
  totalNumOfGuests: number;
  bookingConfirmationCode: string;
  room: {
    id: number;
    roomType: string;
    roomPrice: number;
    roomPhotoUrl: string;
    roomDescription: string;
  };
};
