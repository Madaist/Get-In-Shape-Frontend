export class GymClub {
    id: number;
    name: string;
    addressId: number;
    gymClubFitnessClass: string;
    
 
   constructor(input?: any) {
     Object.assign(this, input);
   }
 }