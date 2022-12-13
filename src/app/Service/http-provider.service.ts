import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';

var apiUrl = "http://localhost:8100/";

var httpLink = {
  getAllStudent: apiUrl + "/api/student/getAllStudent",
  deleteStudentById: apiUrl + "/api/student/deleteStudent",
  getStudentDetailById: apiUrl + "/api/student/getStudentDetailById",
  saveStudent: apiUrl + "/api/student/saveStudent"
}
@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {
  constructor(private webApiService: WebApiService) { }

  public getAllStudent(): Observable<any> {
    return this.webApiService.get(httpLink.getAllStudent);
  }
  public deleteStudentById(model: any): Observable<any> {
    return this.webApiService.post(httpLink.deleteStudentById + '?studentId=' + model, "");
  }
  public getStudentDetailById(model: any): Observable<any> {
    return this.webApiService.get(httpLink.getStudentDetailById + '?studentId=' + model);
  }
  public saveStudent(model: any): Observable<any> {
    return this.webApiService.post(httpLink.saveStudent, model);
  }  
}                          