import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginDto, NULL_LOGIN_DTO } from '@models/login.dto';
import { NULL_REGISTER_DTO, RegisterDto } from '@models/register.dto';
import { NULL_USER_TOKEN, UserTokenDto } from '@models/user-token.dto';
import { Observable, of } from 'rxjs';

/**
 * Auth repository
 * - It provides methods to login and register users at the API
 * @requires HttpClient to make HTTP requests
 * @requires apiUrl to the API base URL
 */
@Injectable({
  providedIn: 'root',
})
export class AuthRepository {
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/api';

  /**
   * Posts a login request
   * @param loginDto - The login data
   * @returns An observable of the user token
   */
  postLogin$(loginDto: LoginDto): Observable<UserTokenDto> {
    if (loginDto === NULL_LOGIN_DTO) return of(NULL_USER_TOKEN);
    const url = `${this.apiUrl}/login`;
    return this.httpClient.post<UserTokenDto>(url, loginDto);
  }

  /**
   * Posts a register request
   * @param registerDto - The register data
   * @returns An observable of the user token
   */
  postRegister$(registerDto: RegisterDto): Observable<UserTokenDto> {
    if (registerDto === NULL_REGISTER_DTO) return of(NULL_USER_TOKEN);
    const url = `${this.apiUrl}/register`;
    return this.httpClient.post<UserTokenDto>(url, registerDto);
  }
}
