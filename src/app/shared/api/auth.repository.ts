import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { LoginDto } from "@models/login.dto";
import { RegisterDto } from "@models/register.dto";
import { UserTokenDto } from "@models/user-token.dto";
import { Observable } from "rxjs";

/**
 * The auth api repository
 * - It is a service to handle the authentication requests
 * @requires HttpClient to make the requests
 * @requires environment to get the api url
 */
@Injectable({
  providedIn: 'root',
})
export class AuthRepository {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  /**
   * Login the user
   * @param login the login dto
   * @returns the observable user token dto
   */
  public postLogin$(login: LoginDto): Observable<UserTokenDto> {
    return this.http.post<UserTokenDto>(`${this.apiUrl}/login`, login);
  }

  /**
   * Register the user
   * @param register the register dto
   * @returns the observable user token dto
   */
  public postRegister$(register: RegisterDto): Observable<UserTokenDto> {
    return this.http.post<UserTokenDto>(`${this.apiUrl}/register`, register);
  }
}