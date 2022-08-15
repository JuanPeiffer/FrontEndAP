import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from 'src/app/models/skill';


@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private apiServerUrl='https://portfolio-peiffer.herokuapp.com'

  constructor(private http:HttpClient) { }

  public getSkill():Observable<Skill[]>{
    return this.http.get<Skill[]>(`${this.apiServerUrl}/api/skill/`);
  }
  public agregarSkill(skill:Skill):Observable<Skill>{
    return this.http.post<Skill>(`${this.apiServerUrl}/api/skill/`,skill);
  }
  public editarSkill(skill:Skill):Observable<Skill>{
    return this.http.put<Skill>(`${this.apiServerUrl}/api/skill`,skill);
  }
  public borrarSkill(skillId:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/api/skill/${skillId}`);
  }




}