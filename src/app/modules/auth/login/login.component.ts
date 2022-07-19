import { Component, OnInit } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { LoginService } from 'src/app/services/auth/login.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 3000, noPause: true, showIndicators: false } }
  ]
})
export class LoginComponent implements OnInit {
Error= false;
message;
user;
  disabled = false;
  resp;

  constructor(
    private authService:LoginService,
    private router: Router,
    private Notification:NotificationsService
  ) {

  }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
  }

 onConnect(value: any) {
    console.log(value);
    if(value.username.length < 3 ){
      document.getElementById('username').style.border="1px solid #ff0000";
      this.Error=true;
      this.message="le nom d'utilisateur introduit est invalide";
      return;
    }else{
      document.getElementById('username').style.border="";
      this.Error=false;
      this.authService.login(value).subscribe(resp => {
        this.resp = resp;
      let jwt =  this.resp.body.token;
      this.authService.saveToken(jwt);
        this.onSuccess("Bienvenu " + localStorage.getItem('fullName'));
        this.router.navigateByUrl("/hr-dashboard");
    },error => {
      this.onError("Nom d'utilisateur ou mot de passe invalide !")
    })
    }

  }


  onSuccess(message){
    this.Notification.success('Succés',message,{
      position: ['top','right'],
      timeOut:4000,
      animate: 'fade',
      showProgressBar:true
    });
  }
  onError(message){
    this.Notification.error('Erreur',message,{
      position: ['top','right'],
      timeOut:4000,
      animate: 'fade',
      showProgressBar:true
    });
  }

}
