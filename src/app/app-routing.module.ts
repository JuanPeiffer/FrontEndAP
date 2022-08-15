import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';

const routes: Routes = [
  {path:'portfolio', component:PortfolioComponent},
  {path:'login',component:NavbarComponent},
  {path:"",redirectTo:"login",pathMatch:'full'}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }