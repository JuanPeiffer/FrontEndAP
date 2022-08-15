import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private apiServerUrl='https://portfolio-peiffer.herokuapp.com'
  
  constructor(private http:HttpClient) { }

  public getUser():Observable<Usuario>{
    return this.http.get<Usuario>(`${this.apiServerUrl}/api/usuario/1`);
  }
  public updateUsuario(usuario : Usuario):Observable<Usuario>{
    return this.http.put<Usuario>(`${this.apiServerUrl}/editar`,usuario);
  }

}
