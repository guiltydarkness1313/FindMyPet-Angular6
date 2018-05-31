import { Component, OnInit } from '@angular/core';
import {MascotaService} from '../../services/mascota.service'
import {Mascota} from '../../Mascota'
@Component({
  selector: 'app-mascota',
  templateUrl: './mascota.component.html',
  styleUrls: ['./mascota.component.css']
})
export class MascotaComponent implements OnInit {

  pet:Mascota[];
  title:String;
  constructor(private petService:MascotaService) {
    this.petService.getPets().subscribe(pets=>{
      this.pet=pets;
      console.log(this.pet);
    });
  }

  ngOnInit() {
    console.log(this.pet);
  }
  addPet(event){
    event.preventDefault();
    console.log(this.title);
    const newPet:Mascota={
      title:this.title,
      isLost:false,
      name:"",
      breed_id:"",
      owner:"",
      location:"",
      image:""
    };
    this.petService.addPets(newPet).subscribe(pet=>{
      this.pet.push(pet);
      console.log(this.pet);
      this.title="";
    });
  }
  deletePet(id){
    const res = confirm('are you sure to delete it?');
    if(res){
      console.log(id);
      const pet = this.pet;
      this.petService.deletePets(id)
        .subscribe(data=>{
          console.log(data);
          if(data.n==1){
            for(let i=0; i<pet.length;i++){
              if(pet[i]._id==id){
                pet.splice(i,1);
              }
            }
          }
        });
    }
    return;
  }
  updatePet(pet:Mascota){
    console.log(pet);
    const newPet={
      _id:pet._id,
      title:pet.title,
      isLost:!pet.isLost
    };
    this.petService.updatePets(newPet)
      .subscribe(res=>{
        pet.isLost=!pet.isLost
      })
  }
}
