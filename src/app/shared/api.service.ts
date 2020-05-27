import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Song } from './song.model';
import { Instructor } from './instructor.model';
import { GymClub } from './gymClub.model';
import { FitnessClass } from './fitnessClass.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  header = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  baseUrl = 'https://localhost:44320/api';
 
  getFitnessClass(id: number) {
    return this.http.get(this.baseUrl + '/fitnessClass/' + id.toString(), { headers: this.header });
  }

  getSong(id: number) {
    return this.http.get(this.baseUrl + '/song/' + id.toString(), { headers: this.header });
  }

  getInstructor(id: number) {
    return this.http.get(this.baseUrl + '/instructor/' + id.toString(), { headers: this.header });
  }

  getGymClub(id: number) {
    return this.http.get(this.baseUrl + '/gymClub/' + id.toString(), { headers: this.header });
  }




  getFitnessClasses() {
    return this.http.get(this.baseUrl + '/fitnessClass', { headers: this.header });
  }

  getSongs() {
    return this.http.get(this.baseUrl + '/song', { headers: this.header });
  }

  getInstructors() {
    return this.http.get(this.baseUrl + '/instructor', { headers: this.header });
  }

  getGymClubs() {
    return this.http.get(this.baseUrl + '/gymClub', { headers: this.header });
  }



 addSong(song: Song) {
  return this.http.post(this.baseUrl + '/song', song, { headers: this.header });
}

addInstructor(instructor: Instructor) {
 return this.http.post(this.baseUrl + '/instructor', {
  'lastName': instructor.lastName,
  'firstName': instructor.firstName , 
  'specializationId': JSON.parse('[' + instructor.specializationId + ']'),
}, { headers: this.header });
}

addGymClub(gymClub: GymClub) {
  return this.http.post(this.baseUrl + '/gymclub', gymClub, { headers: this.header });
}

addFitnessClass(fitnessClass) {
  return this.http.post(this.baseUrl + '/fitnessclass', {
    'name': fitnessClass.name,
    'instructorId': JSON.parse('[' + fitnessClass.instructorId + ']'), 
    'songId': JSON.parse('[' + fitnessClass.songId + ']'),
    'gymClubId': JSON.parse('[' + fitnessClass.gymClubId + ']'),
    'img': fitnessClass.img
  }, { headers: this.header });

}


deleteFitnessClass(id: number) {
  return this.http.delete(this.baseUrl + '/fitnessClass/' + id.toString(), { headers: this.header });
}

deleteSong(id: number) {
  return this.http.delete(this.baseUrl + '/song/' + id.toString(), { headers: this.header });
}

deleteInstructor(id: number) {
  return this.http.delete(this.baseUrl + '/instructor/' + id.toString(), { headers: this.header });
}

deleteGymClub(id: number) {
  return this.http.delete(this.baseUrl + '/gymClub/' + id.toString(), { headers: this.header });
}

editFitnessClass(fitnessClass: FitnessClass) {

  return this.http.put(this.baseUrl + '/fitnessClass/' + fitnessClass.id.toString(), fitnessClass, { headers: this.header });
}

editInstructor(instructor: Instructor) {
  return this.http.put(this.baseUrl + '/instructor/' + instructor.id.toString(), instructor, { headers: this.header });
}

editSong(song: Song) {
  return this.http.put(this.baseUrl + '/song/' + song.id.toString(), song, { headers: this.header });
}

editGymClub(gymClub: GymClub) {
  return this.http.put(this.baseUrl + '/gymClub/' + gymClub.id.toString(), gymClub, { headers: this.header });
}


}

