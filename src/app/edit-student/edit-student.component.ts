import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../Service/http-provider.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: ('./edit-student.component.html'),
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  editStudentForm: studentForm = new studentForm();

  @ViewChild("studentForm")
  studentForm!: NgForm;

  isSubmitted: boolean = false;
  studentId: any;

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router,
    private httpProvider: HttpProviderService) { }

  ngOnInit(): void {
    this.studentId = this.route.snapshot.params['studentId'];
    this.getStudentDetailById();
  }
  getStudentDetailById() {
    this.httpProvider.getStudentDetailById(this.studentId).subscribe((data: any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.editStudentForm.Id = resultData.id;
          this.editStudentForm.FirstName = resultData.firstName;
          this.editStudentForm.LastName = resultData.lastName;
          this.editStudentForm.Email = resultData.email;
          this.editStudentForm.Address = resultData.address;
          this.editStudentForm.Phone = resultData.phone;
        }
      }
    },
      (error: any) => { });
  }

  EditStudent(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.saveStudent(this.editStudentForm).subscribe(async data => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData != null && resultData.isSuccess) {
            if (resultData != null && resultData.isSuccess) {
              this.toastr.success(resultData.message);
              setTimeout(() => {
                this.router.navigate(['/Home']);
              }, 500);
            }
          }
        }
      },
        async error => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        });
    }
  }
}

export class studentForm {
  Id: number = 0;
  FirstName: string = "";
  LastName: string = "";
  Email: string = "";
  Address: string = "";
  Phone: string = "";
}