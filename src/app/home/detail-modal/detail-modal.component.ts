import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FitnessClass } from '../../shared/fitnessClass.model';
import { ApiService } from '../../shared/api.service';
import { CartService } from '../../shared/cart.service';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.css']
})
export class DetailModalComponent implements OnInit {
  @ViewChild('detailModal') modal: ModalDirective;
  fitnessClass = new FitnessClass();
  studio: string;
 

  constructor(private api: ApiService, private cart: CartService) { }

  ngOnInit() {}

  initialize(id: number): void { // initializeaza un modal dupa un id
    this.getFitnessClass(id);
    this.modal.show(); //patratelul pt fiecare album
  }


  getFitnessClass(id: number) {
    this.api.getFitnessClass(id)
      .subscribe((data: FitnessClass) => {
        this.fitnessClass = data; 
        this.fitnessClass.id = id;
        if (!data.img) {
          this.fitnessClass.img = 'https://i.ibb.co/0cBJC3N/3.jpg';
        }
      },
        (err: Error) => {
          console.log('err', err);

        });
  }

  addToCart(fitnessClass: FitnessClass) {
    this.cart.add(fitnessClass);
    this.modal.hide();
  }
}
