export class Instructor {
  id: number;
  lastName: string;
  firstName: string;
  //instructorSpecialization: string;
  specializationId: number[];
  instructorFitnessClass: string;

  constructor(input?: any) {
    Object.assign(this, input);
  }
}
