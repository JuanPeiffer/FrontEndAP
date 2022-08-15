import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experiencia } from 'src/app/models/experiencia';


@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {
  private apiServerUrl='https://portfolio-peiffer.herokuapp.com'

  constructor(private http:HttpClient) { }

  public getExperiencias():Observable<Experiencia[]>{
    return this.http.get<Experiencia[]>(`${this.apiServerUrl}/api/experiencia`);
  }
  public agregarExperiencia(experiencia:Experiencia):Observable<Experiencia>{
    return this.http.post<Experiencia>(`${this.apiServerUrl}/api/experiencia`,experiencia);
  }
  public editarExperiencia(experiencia:Experiencia):Observable<Experiencia>{
    return this.http.put<Experiencia>(`${this.apiServerUrl}/api/experiencia`,experiencia);
  }
  public borrarExperiencia(experienciaId:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/api/experiencia/${experienciaId}`);
  }




}
