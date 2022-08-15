import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiServerUrl='https://portfolio-peiffer.herokuapp.com'

  constructor(private http:HttpClient) { }

  public getUsuario():Observable<Usuario>{
    return this.http.get<Usuario>(`${this.apiServerUrl}/api/usuario/1`);
  }
  public agregarUsuario(usuario:Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(`${this.apiServerUrl}/api/usuario`,usuario);
  }
  public editarUsuario(usuario:Usuario):Observable<Usuario>{
    return this.http.put<Usuario>(`${this.apiServerUrl}/api/usuario`,usuario);
  }

}
