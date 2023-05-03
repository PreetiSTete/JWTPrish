import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AppJwtService {
  private url = "http://localhost:5272/api/Employee";

  constructor(private http: HttpClient) { }

  GetAll() {
    //--pass token header for individual way
    // let token = 'xcsfssvsdvsv.example';
    // let head_obj = new HttpHeaders().set("Authorization", "bearer "+token);
    // return this.http.get(this.url + '/GetAll', {headers: head_obj});
    return this.http.get(this.url + '/GetAll');
  }

  Login(user: any) {
    return this.http.post<any>(this.url+'/Login', user);

  }

  RegisterUser(dataObj: any) {
    return this.http.post(this.url + '/Register', dataObj);
  }

  RemoveData(id: number) {
    return this.http.delete(this.url + '/RemoveData/' + id);
  }

    UpdateDetails(emp: any) {
    return this.http.put(this.url + '/Update', emp);
  }



}
