import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { LoginDto } from "@models/login.dto";
import { RegisterDto } from "@models/register.dto";
import { UserTokenDto } from "@models/user-token.dto";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthRepository {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;
  private readonly authEndpoint = `${this.apiUrl}`;

  public login(login: LoginDto): Observable<UserTokenDto> {
    return this.http.post<UserTokenDto>(`${this.authEndpoint}/login`, login);
  }

  public register(register: RegisterDto): Observable<UserTokenDto> {
    return this.http.post<UserTokenDto>(`${this.authEndpoint}/register`, register);
  }
}
