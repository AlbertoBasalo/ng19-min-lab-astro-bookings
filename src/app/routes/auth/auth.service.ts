import { inject, Injectable } from "@angular/core";
import { AuthRepository } from "@api/auth.repository";
import { LoginDto } from "@models/login.dto";
import { RegisterDto } from "@models/register.dto";
import { NULL_USER_TOKEN, UserTokenDto } from "@models/user-token.dto";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authRepository = inject(AuthRepository);
  /**
   * Logs in a user
   */
  public login = (loginDto: LoginDto| undefined): Observable<UserTokenDto> => {
    if (!loginDto) return of(NULL_USER_TOKEN);
    return this.authRepository.login(loginDto);
  }


  /**
   * Registers a user
   */
  public register = (registerDto: RegisterDto| undefined): Observable<UserTokenDto> => {
    if (!registerDto) return of(NULL_USER_TOKEN);
    return this.authRepository.register(registerDto);
  }
}
