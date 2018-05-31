import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {TaskService} from './services/task.service';
import { AppComponent } from './app.component';
import { TaskComponent } from './components/task/task.component';
import {HttpClientModule} from '@angular/common/http'
import {FormsModule} from '@angular/forms';
import { MascotaComponent } from './components/mascota/mascota.component'
import {MascotaService} from './services/mascota.service'
import {RouterModule, Routes} from "@angular/router";
const appRoutes:Routes=[
  {path:'mascotas-perdidas',component:MascotaComponent},
  {path:'index',component:TaskComponent},
  {path:'',
  redirectTo:'/index',
  pathMatch:'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    MascotaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing:true}
    )
  ],
  providers: [TaskService,MascotaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
