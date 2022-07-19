import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private Mapping = "/api/users";
  private host = environment.prod;
  helper=new JwtHelperService();
  private DecodeToken;
  private roleUser;


  constructor(private http: HttpClient
              ,private router:Router) { }
  
  login(user) {
    return this.http.post(this.host+this.Mapping+"/Login",user,{observe:'response'});
  }
 saveToken(jwt){
    localStorage.setItem('token',jwt);
   this.DecodeToken = this.helper.decodeToken(jwt);
   console.log(this.DecodeToken);
   localStorage.setItem('isAdmin', this.DecodeToken.isAdmin);
   localStorage.setItem('fullName', this.DecodeToken.fullname);
    this.roleUser=this.DecodeToken.roles;
  }
  logout(){
    localStorage.removeItem('token');
  }
   canActivate(): boolean {
     if (!localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
