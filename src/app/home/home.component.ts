import { Component, Input, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../Service/http-provider.service';

@Component({
  selector: 'ng-modal-confirm',
  template: `
  <div class="modal-header">
    <h5 class="modal-title" id="modal-title">CONFIRMACION DE ELIMINACION</h5>
    <button type="button" class="btn close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">×</span>
    </button>
  </div>
  <div class="modal-body">
    <p>Estas Seguro que quieres eliminarlo?</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">CANCELAR</button>
    <button type="button" ngbAutofocus class="btn btn-success" (click)="modal.close('Ok click')">OK</button>
  </div>
  `,
})
export class NgModalConfirm {
  constructor(public modal: NgbActiveModal) { }
}
const MODALS: { [name: string]: Type<any> } = {
  deleteModal: NgModalConfirm,
};
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  closeResult = '';
  studentList: any = [];
student: any;
  constructor(private router: Router, private modalService: NgbModal,
    private toastr: ToastrService, private httpProvider : HttpProviderService) { }

  ngOnInit(): void {
    this.getAllStudent();
  }
  async getAllStudent() {
    this.httpProvider.getAllStudent().subscribe((data : any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.studentList = resultData;
        }
      }
    },
    (error : any)=> {
        if (error) {
          if (error.status == 404) {
            if(error.error && error.error.message){
              this.studentList = [];
            }
          }
        }
      });
  }

  AddStudent() {
    this.router.navigate(['AddStudent']);
  }

  deleteStudentConfirmation(student: any) {
    this.modalService.open(MODALS['deleteModal'],
      {
        ariaLabelledBy: 'modal-basic-title'
      }).result.then((result) => {
        this.deleteStudent(student);
      },
        (reason) => {});
  }

  deleteStudent(student: any) {
    this.httpProvider.deleteStudentById(student.id).subscribe((data : any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData != null && resultData.isSuccess) {
          this.toastr.success(resultData.message);
          this.getAllStudent();
        }
      }
    },
    (error : any) => {});
  }
  getStudent() {
    throw new Error('Method not implemented.');
  }
}