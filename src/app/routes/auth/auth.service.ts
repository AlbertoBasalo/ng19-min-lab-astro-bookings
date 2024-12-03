import { Injectable } from "@angular/core";
import { LoginDto } from "@models/login.dto";
import { RegisterDto } from "@models/register.dto";
import { UserTokenDto } from "@models/user-token.dto";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Logs in a user
   */
  public login = (loginDto: LoginDto): Observable<UserTokenDto> => {
    console.log('Login: ', loginDto);
    return of({ userId: '1', token: 'token' });
  }


  /**
   * Registers a user
   */
  public register = (registerDto: RegisterDto): Observable<UserTokenDto> => {
    console.log('Register: ', registerDto);
    return of({ userId: '1', token: 'token' });
  }
}
