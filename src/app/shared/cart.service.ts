
import {Injectable} from '@angular/core';
import {FitnessClass} from './fitnessClass.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  fitnessClasses: FitnessClass[] =[];


  constructor() {

  }

  add(fitnessClass: FitnessClass){
    this.fitnessClasses.push(fitnessClass);

  }

  get() {
    return this.fitnessClasses;
  }


}
