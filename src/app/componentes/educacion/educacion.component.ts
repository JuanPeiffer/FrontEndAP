import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { response } from 'express';
import { Educacion } from 'src/app/models/educacion';
import { EducacionService } from 'src/app/servicios/ap/educacion.service';

import { AutenticacionService } from 'src/app/servicios/ap/autenticacion.service';



@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  private apiServerUrl='https://portfolio-peiffer.web.app'

  public educaciones:Educacion[]=[];
  public editarEducacion:Educacion | undefined;
  public borrarEducacion:Educacion | undefined;


  public educations2 = this.educacionService.getEducacion();

  constructor(private educacionService:EducacionService,
              public autenticacionService: AutenticacionService
    ) { }

  isloged = () => this.autenticacionService.loggedIn();
  ngOnInit(): void {
    this.getEducaciones();

  }
  public getEducaciones():void{
    this.educacionService.getEducacion().subscribe({
      next:(response:Educacion[])=>{
        this.educaciones=response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message)
      }
    })
  }
  public onOpenModal(mode:String, educacion?:Educacion):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type = 'button';
    button.style.display='none';
    button.setAttribute('data-toggle', 'modal');
    if(mode==='agregar'){
      button.setAttribute('data-target', '#agregarEducacionModal')
    } else if(mode==='borrar'){
      this.borrarEducacion=educacion;
      button.setAttribute('data-target', '#borrarEducacionModal')
    } else if(mode==='editar'){
      this.editarEducacion=educacion;
      button.setAttribute('data-target', '#editarEducacionModal')
    }
    container?.appendChild(button);
    button.click();
  }
  public onAgregarEducacion(agregarForm:NgForm):void{
    document.getElementById('agregar-educacion-form')?.click();
    this.educacionService.agregarEducacion(agregarForm.value).subscribe({
      next: (response:Educacion)=>{
        console.log(response);
        this.getEducaciones();
        agregarForm.reset();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
        agregarForm.reset();
      }
    });
  }
  // public onEditarEducacion(educacion:Educacion):void{
  //   this.editarEducacion=educacion;
  //   this.educacionService.editarEducacion(educacion).subscribe({
  //     next: (response:Educacion)=>{
  //       console.log(response);
  //       this.getEducaciones();
  //     },
  //     error:(error:HttpErrorResponse)=>{
  //       alert(error.message);
  //     }
  //   });
  // }

  public onEditarEducacion(educacion: Educacion): void {
    this.editarEducacion = educacion;
    this.educacionService.editarEducacion(educacion).subscribe({
      next: (response: Educacion) => {
        console.log(response);
        this.getEducaciones();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onBorrarEducacion(idEdu:number):void{
    
    this.educacionService.borrarEducacion(idEdu).subscribe({
      next: (response:void)=>{
        console.log(response);
        this.getEducaciones();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    });
  }

}
