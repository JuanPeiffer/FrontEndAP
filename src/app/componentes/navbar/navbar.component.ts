import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/ap/autenticacion.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private apiServerUrl='https://portfolio-peiffer.web.app' 
  
  form: FormGroup;
  name: string | undefined;
  constructor(
    public autenticacionService: AutenticacionService,
    private formBuilder: FormBuilder,
    private ruta: Router
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
  isloged = () => this.autenticacionService.loggedIn();
  ngOnInit(): void {}

  get Email() {
    return this.form.get('email');
  }
  get Password() {
    return this.form.get('password');
  }

  onEnviar(event: Event) {
    if (this.form.invalid) {
      alert('Mal logueado');
      return;
    }
    event.preventDefault;
    this.autenticacionService
      .IniciarSesion(this.form.value)
      .subscribe((data) => {
        this.ruta.navigate(['/portfolio']);
      });
  }
  handleClear() {
    this.name = '';
  }
}
