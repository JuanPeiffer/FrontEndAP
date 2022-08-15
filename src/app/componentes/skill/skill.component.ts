import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { response } from 'express';
import { Skill } from 'src/app/models/skill';
import { SkillService } from 'src/app/servicios/ap/skill.service';

import { AutenticacionService } from 'src/app/servicios/ap/autenticacion.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css'],
})
export class SkillComponent implements OnInit {

  private apiServerUrl='https://portfolio-peiffer.web.app'

  
  public skill: Skill[] = [];
  public editarSkill: Skill | undefined;
  public borrarSkill: Skill | undefined;

  constructor(
    private skillsService: SkillService,
    public autenticacionService: AutenticacionService
  ) {}
  isloged = () => this.autenticacionService.loggedIn();
  ngOnInit(): void {
    this.getSkill();
  }

  public getSkill(): void {
    this.skillsService.getSkill().subscribe({
      next: (response: Skill[]) => {
        this.skill = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log('error');
      },
    });
  }
  public onOpenModal(mode: string, skill?: Skill): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'agregar') {
      button.setAttribute('data-target', '#agregarSkillModal');
    } else if (mode === 'borrar') {
      this.borrarSkill = skill;
      button.setAttribute('data-target', '#borrarSkillModal');
    } else if (mode === 'editar') {
      this.editarSkill = skill;
      button.setAttribute('data-target', '#editarSkillModal');
    }

    container?.appendChild(button);
    button.click();
  }

  public onAgregarSkill(agregarForm: NgForm): void {
    document.getElementById('agregar-skill-form')?.click();
    this.skillsService.agregarSkill(agregarForm.value).subscribe({
      next: (response: Skill) => {
        console.log(response);
        this.getSkill();
        agregarForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        agregarForm.reset();
      },
    });
  }

  public onEditarSkill(skill: Skill): void {
    this.editarSkill = skill;
    this.skillsService.editarSkill(skill).subscribe({
      next: (response: Skill) => {
        console.log(response);
        this.getSkill();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onBorrarSkill(idSkill: number): void {
    this.skillsService.borrarSkill(idSkill).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getSkill();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }
  
}
