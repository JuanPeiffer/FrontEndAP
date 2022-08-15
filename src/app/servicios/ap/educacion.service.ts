import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educacion } from 'src/app/models/educacion';


@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  private apiServerUrl='https://portfolio-peiffer.herokuapp.com'

  constructor(private http:HttpClient) { }

  public getEducacion():Observable<Educacion[]>{
    return this.http.get<Educacion[]>(`${this.apiServerUrl}/api/educacion`);
  }
  public agregarEducacion(educacion:Educacion):Observable<Educacion>{
    return this.http.post<Educacion>(`${this.apiServerUrl}/api/educacion`,educacion);
  }
  public editarEducacion(educacion:Educacion):Observable<Educacion>{
    return this.http.put<Educacion>(`${this.apiServerUrl}/api/educacion`,educacion);
  }
  public borrarEducacion(educacionId:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/api/educacion/${educacionId}`);
  }




}
