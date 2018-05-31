import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Mascota} from "../Mascota";

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  domain:string="http://localhost:3000/api/v1/pet";
  constructor(private http:HttpClient) { }

  getPets(){
    return this.http.get<Mascota[]>(`${this.domain}`)
      .pipe(map(res=>res));
  }
  addPets(newMascota:Mascota){
    return this.http.post<Mascota>(`${this.domain}`,newMascota)
      .pipe(map(res=>res));
  }
  updatePets(newMascota){
    return this.http.put(`${this.domain}/${newMascota._id}`,newMascota)
      .pipe(map(res=>res));
  }
  deletePets(id){
    return this.http.delete<Mascota>(`${this.domain}/${id}`)
      .pipe(map(res=>res));
  }
}
