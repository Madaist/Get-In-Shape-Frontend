import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Song } from '../../shared/Song.model';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-edit-song-modal',
  templateUrl: './edit-song-modal.component.html',
  styleUrls: ['./edit-song-modal.component.css']
})
export class EditSongModalComponent {
  @ViewChild('editSongModal') modal: ModalDirective;
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  editSongForm: FormGroup;
  currentSong = new Song();

  constructor(public fb: FormBuilder, private api: ApiService) {}

  initialize(id: number): void {

    this.modal.show();
    this.api.getSong(id)
      .subscribe((data: Song) => {
        this.currentSong = data;
        this.initializeFrom(this.currentSong);
      },
        (error: Error) => {
          console.log('err', error);
        });
  }

  initializeFrom(currentSong: Song) {
    this.editSongForm = this.fb.group({
      name: [currentSong.name, Validators.required],
      singer: [currentSong.singer, Validators.required],
      bpm: [currentSong.bpm, Validators.required],
      fitnessClassId: [currentSong.fitnessClassId, Validators.required],
    });
  }

  editSong() {
    const editedSong = new Song({
      id: this.currentSong.id,
      name: this.editSongForm.value.name,
      singer: this.editSongForm.value.singer,
      bpm: this.editSongForm.value.bpm,
      fitnessClassId: this.editSongForm.value.fitnessClassId
    });

    this.api.editSong(editedSong)
      .subscribe(() => {
        this.change.emit('song');
        this.modal.hide();
      },
        (error: Error) => {
          console.log('err', error);
        });

  }

}
