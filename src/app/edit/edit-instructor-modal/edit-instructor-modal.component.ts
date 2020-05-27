import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Instructor } from '../../shared/Instructor.model';
import { ApiService } from '../../shared/api.service';


@Component({
  selector: 'app-edit-instructor-modal',
  templateUrl: './edit-instructor-modal.component.html',
  styleUrls: ['./edit-instructor-modal.component.css']
})
export class EditInstructorModalComponent {
  @ViewChild('editInstructorModal') modal: ModalDirective;
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  editInstructorForm: FormGroup;
  currentInstructor = new Instructor();

  constructor(public fb: FormBuilder, private api: ApiService) { }

  initialize(id: number): void {
    this.modal.show();
    this.api.getInstructor(id)
      .subscribe((data: Instructor) => {
        this.currentInstructor = data;
        this.initializeFrom(this.currentInstructor);
      },
        (error: Error) => {
          console.log('err', error);

        });
  }

  initializeFrom(currentInstructor: Instructor) {
    this.editInstructorForm = this.fb.group({
      lastName: [currentInstructor.lastName, Validators.required],
      firstName: [currentInstructor.firstName, Validators.required],
      specializationId: ['', Validators.required],
  
    });
  }

  editInstructor() {
    const editedInstructor = new Instructor({
      id: this.currentInstructor.id,
      lastName: this.editInstructorForm.value.lastName,
      firstName: this.editInstructorForm.value.firstName,
      specializationId: this.transformInNumberArray(this.editInstructorForm.value.specializationId),
    });

    this.api.editInstructor(editedInstructor)
      .subscribe(() => {
        this.change.emit('instructor');
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



