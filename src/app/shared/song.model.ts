export class Song {
   id: number;
   name: string;
   singer: string;
   bpm: number;
   fitnessClassId: number;
   

  constructor(input?: any) {
    Object.assign(this, input);
  }
}
