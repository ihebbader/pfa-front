import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CGServiceService } from 'src/app/services/cg-service/cg-service.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-hr-departments',
  templateUrl: './hr-departments.component.html',
  styleUrls: ['./hr-departments.component.scss']
})
export class HrDepartmentsComponent implements OnInit {
  dplistTab: boolean = true;
  dpgridTab: boolean;
  message: String;
  CGTable;
  UpdateCG;
  constructor(private modalService: BsModalService,
    private cgservice: CGServiceService,
    private router: Router,
    private Notification:NotificationsService
) { }
  modalRef: BsModalRef;
  ngOnInit(): void {
    this.getAllCG()  }
  onTab(number) {
    this.dplistTab = false;
    this.dpgridTab = false;
    if (number == '1') {
      this.dplistTab = true;
    }
    else if (number == '2') {
      this.dpgridTab = true;
    }
  }
  AddModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }
  AddModal1(template: TemplateRef<any>, UpdateCG) {
    this.UpdateCG = UpdateCG;
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }
  getAllCG() {
    this.cgservice.getGC().subscribe(resp => {
      this.CGTable = resp;
      console.log(resp);
    }, err => {
      this.router.navigateByUrl("/");
    })
  }
  Update() {
    this.cgservice.setGC(this.UpdateCG).subscribe(resp => {
      this.getAllCG();
      this.modalRef.hide()
      this.onSuccess("Un nouveau motif modifié !");
    }, err => {
      console.error(err);
    })
    }
  
  
  Addmotif(value) {
    console.log(value);
    this.cgservice.setGC(value).subscribe(resp => {
      this.getAllCG();
      this.modalRef.hide()
      this.onSuccess("Un nouveau motif ajouté !");
    }, err => {
      console.error(err.error.code);
      this.message = err.error.code;
    })
  }
    onSuccess(message){
    this.Notification.success('Succés',message,{
      position: ['top','right'],
      timeOut:4000,
      animate: 'fade',
      showProgressBar:true
    });
    }
  sweettalert7(id) {
    Swal.fire({
      title: 'Etes vous sure de supprimer ce motif',
      text: 'Ce motifs sera supprimé diffinitivement !',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Annuler',
      confirmButtonColor: "rgb(220, 53, 69)",
      confirmButtonText: 'Oui, Supprimer !',

    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Supprimer!',
          'Ce motif a été supprimé avec succés !',
          'success'
        )
        this.cgservice.DeleteCG(id).subscribe(rep =>{
          this.getAllCG();
        }, err => {
           this.getAllCG();
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annuler',
          'Suppression non effectuer !',
          'error'
        )
      }
    })
  }

}
