export class Instructor {
  id: number;
  lastName: string;
  firstName: string;
  instructorSpecialization: string;
  instructorFitnessClass: string;

  constructor(input?: any) {
    Object.assign(this, input);
  }
}
