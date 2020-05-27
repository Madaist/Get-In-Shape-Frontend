import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  options = ['Song', 'Instructor', 'FitnessClass'];
  selectedOption = 'FitnessClass';
  currentFormRef: any;
  addFitnessClassForm: FormGroup;
  addInstructorForm: FormGroup;
  addSongForm: FormGroup;
  success: boolean;

  constructor(public fb: FormBuilder, private api: ApiService) { }


  ngOnInit() {

    this.addFitnessClassForm = this.fb.group({
      name: [null, Validators.required],
      instructorId: [null, Validators.required],
      songId: [null, Validators.required],
      gymClubId: [null, Validators.required],
      img: [null]
    });
    this.addInstructorForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      specializationId: [null, Validators.required]
    });
    this.addSongForm = this.fb.group({
      name: [null, Validators.required],
      singer:[null, Validators.required],
      bpm: [null, Validators.required],
      fitnessClassId:  [null, Validators.required]
    });

    this.currentFormRef = this.addFitnessClassForm;

  }

  radioChange(event: any) {
    this.selectedOption = event.target.value;
    this.currentFormRef = this['add' + this.selectedOption + 'Form'];
  }

  add() {
  
    this.api['add' + this.selectedOption](this.currentFormRef.value).subscribe(() => {

      this.currentFormRef.reset();
      this.success = true;
      setTimeout(() => {
        this.success = null;
      }, 3000);
    },
      (error: Error) => {
        console.log(error);
        this.currentFormRef.reset();
        this.success = false;
        setTimeout(() => {
          this.success = null;
        }, 3000);
      });

  }
}
