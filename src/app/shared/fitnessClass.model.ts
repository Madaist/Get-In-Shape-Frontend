export class FitnessClass {
  id: number;
  name: string;
  timeSchedule: Date;
  instructorName: string[];
  instructorId: number[];
  songName: string[];
  songId: number[];
  gymClubName: string[];
  gymClubId: number[];
  img: string;

  constructor(input?: any) {
    Object.assign(this, input);
  }
}
