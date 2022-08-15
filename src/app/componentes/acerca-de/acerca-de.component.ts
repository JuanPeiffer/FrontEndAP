import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { response } from 'express';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/servicios/ap/usuario.service';

import { AutenticacionService } from 'src/app/servicios/ap/autenticacion.service';


@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {



  public usuario:Usuario | undefined;
  public editarUsuario:Usuario | undefined;
  name: string | undefined;

  constructor(private usuarioService:UsuarioService, public autenticacionService: AutenticacionService) { }

  isloged = () => this.autenticacionService.loggedIn();
  ngOnInit(): void {
    this.getUsuario();

  }
  public getUsuario():void{
    this.usuarioService.getUsuario().subscribe({
      next:(response:Usuario)=>{
        this.usuario=response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message)
      }
    })
  }
  public onOpenModal(mode:String, usuario?:Usuario):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type = 'button';
    button.style.display='none';
    button.setAttribute('data-toggle', 'modal');
    if(mode==='editar'){
      this.editarUsuario=usuario;
      button.setAttribute('data-target', '#editarUsuarionModal')
    }
    container?.appendChild(button);
    button.click();
  }
  public onEditarUsuario(usuario: Usuario): void {
    this.editarUsuario = usuario;
    this.usuarioService.editarUsuario(usuario).subscribe({
      next: (response: Usuario) => {
        console.log(response);
        this.getUsuario();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  handleClear() {
    this.name = '';
  }
}
