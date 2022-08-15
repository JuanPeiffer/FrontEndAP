import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { response } from 'express';
import { Experiencia } from 'src/app/models/experiencia';
import { ExperienciaService } from 'src/app/servicios/ap/experiencia.service';

import { AutenticacionService } from 'src/app/servicios/ap/autenticacion.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  private apiServerUrl='https://portfolio-peiffer.web.app'

  public experiencias:Experiencia[]=[];
  public editarExperiencia:Experiencia | undefined;
  public borrarExperiencia:Experiencia | undefined;


  public experencias2 = this.experienciaService.getExperiencias();

  constructor(private experienciaService:ExperienciaService, public autenticacionService: AutenticacionService) { }

  isloged = () => this.autenticacionService.loggedIn();
  ngOnInit(): void {
    this.getExperiencias();

  }
  public getExperiencias():void{
    this.experienciaService.getExperiencias().subscribe({
      next:(response:Experiencia[])=>{
        this.experiencias=response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message)
      }
    })
  }
  public onOpenModal(mode:String, experiencia?:Experiencia):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type = 'button';
    button.style.display='none';
    button.setAttribute('data-toggle', 'modal');
    if(mode==='agregar'){
      button.setAttribute('data-target', '#agregarExperienciaModal')
    } else if(mode==='borrar'){
      this.borrarExperiencia=experiencia;
      button.setAttribute('data-target', '#borrarExperienciaModal')
    } else if(mode==='editar'){
      this.editarExperiencia=experiencia;
      button.setAttribute('data-target', '#editarExperienciaModal')
    }
    container?.appendChild(button);
    button.click();
  }
  public onAgregarExperiencia(agregarForm:NgForm):void{
    document.getElementById('agregar-experiencia-form')?.click();
    this.experienciaService.agregarExperiencia(agregarForm.value).subscribe({
      next: (response:Experiencia)=>{
        console.log(response);
        this.getExperiencias();
        agregarForm.reset();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
        agregarForm.reset();
      }
    });
  }
  // public onEditarExperiencia(experiencia:Experiencia):void{
  //   this.editarExperiencia=Experiencia;
  //   this.experienciaService.editarExperiencia(experiencia).subscribe({
  //     next: (response:Experiencia)=>{
  //       console.log(response);
  //       this.getExperiencias();
  //     },
  //     error:(error:HttpErrorResponse)=>{
  //       alert(error.message);
  //     }
  //   });
  // }

  public onEditarExperiencia(experencia: Experiencia): void {
    this.editarExperiencia = experencia;
    this.experienciaService.editarExperiencia(experencia).subscribe({
      next: (response: Experiencia) => {
        console.log(response);
        this.getExperiencias();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onBorrarExperiencia(idExp:number):void{
    
    this.experienciaService.borrarExperiencia(idExp).subscribe({
      next: (response:void)=>{
        console.log(response);
        this.getExperiencias();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    });
  }

}
