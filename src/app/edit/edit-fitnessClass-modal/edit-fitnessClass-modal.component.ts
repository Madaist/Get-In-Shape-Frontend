import { Component, EventEmitter, Output, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { FitnessClass } from '../../shared/fitnessClass.model';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-fitnessClass-modal',
  templateUrl: './edit-fitnessClass-modal.component.html',
  styleUrls: ['./edit-fitnessClass-modal.component.css']
})
export class EditFitnessClassModalComponent {
  @ViewChild('editFitnessClassModal') modal: ModalDirective;
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  editFitnessClassForm: FormGroup;
  currentFitnessClass = new FitnessClass();


  constructor(public fb: FormBuilder, private api: ApiService) { }

  initialize(id: number): void {
    this.modal.show();
    this.api.getFitnessClass(id)
      .subscribe((data:FitnessClass) => {
        this.currentFitnessClass = data;
        this.currentFitnessClass.id = id;
        this.initializeFrom(this.currentFitnessClass);
      },
        (error: Error) => {
          console.log('err', error);

        });
  }

  initializeFrom(currentFitnessClass: FitnessClass) {
    this.editFitnessClassForm = this.fb.group({
      name: [currentFitnessClass.name, Validators.required],
      instructorId: ['', Validators.required],
      songId: ['', Validators.required],
      gymClubId: ['', Validators.required],
      img: [currentFitnessClass.img],
    });
  }

  editFitnessClass() {
    const editedFitnessClass = new FitnessClass({
      id: this.currentFitnessClass.id,
      name: this.editFitnessClassForm.value.name,
      songId: this.transformInNumberArray(this.editFitnessClassForm.value.songId),
      instructorId: this.transformInNumberArray(this.editFitnessClassForm.value.artistId),
      gymClubId: this.transformInNumberArray(this.editFitnessClassForm.value.gymClubId),
      img: this.editFitnessClassForm.value.img
    });

    this.api.editFitnessClass(editedFitnessClass)
      .subscribe(() => {
        this.change.emit('fitnessClass');
        this.modal.hide();
      },
        (error: Error) => {
          console.log('err', error);
        });
  }

  transformInNumberArray(string: string) {
    return JSON.parse('[' + string + ']');
  }

}
