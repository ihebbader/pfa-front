import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CGServiceService {

  private Mapping = "/api/CongesType";
  private host = environment.prod;
  private token;

  constructor(private http: HttpClient,
              private router:Router) { 
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    } else {
      router.navigateByUrl('/');
    }
  }
  
  public getGC() {
        return this.http.get(this.host+this.Mapping+ "/all", {headers: {'Authorization': this.token}});
  }
  public setGC(entity) {
    return this.http.post(this.host+this.Mapping+'/',entity,{headers:{'Authorization':this.token}})
  }
    public DeleteCG(id){
    return this.http.delete(this.host+this.Mapping+'/'+id,{headers:{'Authorization':this.token}})
    }
  
}
