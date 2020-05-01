import { Component, OnInit, ViewChild } from '@angular/core';
import { FitnessClass } from '../shared/fitnessClass.model';
import { ApiService } from '../shared/api.service';
import { DetailModalComponent } from './detail-modal/detail-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  fitnessClasses: FitnessClass[] = [];
  searchText: string;
  title: string;

  @ViewChild('detailModal') detailModal: DetailModalComponent;


  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getFitnessClasses().subscribe((data: FitnessClass[]) => {

      for (let i = 0; i < data.length; i++) {
        this.api.getFitnessClass(data[i].id).subscribe((info: FitnessClass) => {
          info.id = data[i].id;
          if (!info.img) {
           info.img = 'https://i.ibb.co/T2yxkkk/doodle.jpg';
          }
        
          this.fitnessClasses.push(info);
        },
          (e: Error) => {
            console.log('err', e);
          });
      }
    },
      (er: Error) => {
        console.log('err', er);
      });
  }

  showDM(id: number): void {
    this.detailModal.initialize(id);
  }

}
