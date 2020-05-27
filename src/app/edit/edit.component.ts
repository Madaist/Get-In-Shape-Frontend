import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { FitnessClass } from '../shared/fitnessClass.model';
import { Instructor } from '../shared/instructor.model';
import { Song } from '../shared/song.model';
import { GymClub } from '../shared/gymClub.model';
import { EditFitnessClassModalComponent } from './edit-fitnessClass-modal/edit-fitnessClass-modal.component';
import { EditInstructorModalComponent } from './edit-instructor-modal/edit-instructor-modal.component';
import { EditSongModalComponent } from './edit-song-modal/edit-song-modal.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  fitnessClasses: FitnessClass[] = [];
  instructors: Instructor[] = [];
  songs: Song[] = [];


  @ViewChild('editFitnessClassModal') editFitnessClassModal: EditFitnessClassModalComponent;
  @ViewChild('editInstructorModal') editInstructorModal: EditInstructorModalComponent;
  @ViewChild('editSongModal') editSongModal: EditSongModalComponent;


  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getFitnessClasses();
    this.getInstructors();
    this.getSongs();
  }

  getFitnessClasses() {
    this.api.getFitnessClasses()
      .subscribe((data: FitnessClass[]) => {
        this.fitnessClasses = [];

        for (let i = 0; i < data.length; i++) {
          this.api.getFitnessClass(data[i].id)
            .subscribe((info: FitnessClass) => {
              info.id = data[i].id;
              this.fitnessClasses.push(info);
            },
              (e: Error) => {
                console.log('err', e);
              });
        }

      },
        (error: Error) => {
          console.log('err', error);

        });
  }

  getInstructors() {

    this.api.getInstructors()
      .subscribe((data: Instructor[]) => {
        this.instructors = data;
      },
        (error: Error) => {
          console.log('err', error);
        });
  }

  getSongs() {
    this.api.getSongs()
      .subscribe((data: Song[]) => {
        this.songs = data;
      },
        (error: Error) => {
          console.log('err', error);

        });
  }

  deleteFitnessClass(id: number) {
    this.api.deleteFitnessClass(id)
      .subscribe(() => {
        this.getFitnessClasses();
      },
        (error: Error) => {
          console.log(error);
        });
  }

  deleteInstructor(id: number) {
    this.api.deleteInstructor(id)
      .subscribe(() => {
        this.getInstructors();
      },
        (error: Error) => {
          console.log(error);
        });
  }

  deleteSong(id: number) {
    this.api.deleteSong(id)
      .subscribe(() => {
        this.getSongs();
      },
        (error: Error) => {
          console.log(error);
        });

  }

  showM1(id: number) {
    this.editFitnessClassModal.initialize(id);
  }

  showM2(id: number) {
    this.editInstructorModal.initialize(id);
  }

  showM3(id: number) {
    this.editSongModal.initialize(id);
  }

  onEditFinished(event: string) {
    if (event === 'album') {
      this.getFitnessClasses();
    }
    if (event === 'artist') {
      this.getInstructors();
    }
    if (event === 'song') {
      this.getSongs();
    }


  }

}
