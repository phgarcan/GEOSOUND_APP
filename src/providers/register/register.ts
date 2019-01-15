import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {RegistrationRequest} from "../../models/registration-Request";
import {User} from "../../models/user";
import {config} from '../../app/config';


const REGISTER_URL = `${config.apiUrl}/register`

/**
 * Registration service
 */
@Injectable()
export class RegistrationProvider {


  constructor(private http: HttpClient) {
  }

  register(registerRequest: RegistrationRequest): Observable<User> {
    return this.http.post<User>(REGISTER_URL, registerRequest);
  }
}
