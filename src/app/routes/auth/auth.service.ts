import { computed, inject, Injectable, Signal, signal, WritableSignal } from "@angular/core";
import { rxResource } from "@angular/core/rxjs-interop";
import { AuthRepository } from "@api/auth.repository";
import { LoginDto } from "@models/login.dto";
import { RegisterDto } from "@models/register.dto";
import { NULL_USER_TOKEN, UserTokenDto } from "@models/user-token.dto";
import { Observable, of } from "rxjs";

/**
 * The trigger type for the authentication
 * - It is a type that represents the trigger of the authentication
 * - Could be a login or a register
 */
type Trigger =  {type: 'LOGIN', payload: LoginDto} | {type: 'REGISTER', payload: RegisterDto};

/**
 * The auth service
 * - It is a service to handle the authentication requests
 * @requires AuthRepository to make the requests
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authRepository: AuthRepository = inject(AuthRepository);
  /**
   * An auxiliary signal to trigger the authentication loader of the authResource
   */
  private readonly trigger: WritableSignal<Trigger | undefined> = signal<Trigger | undefined>(undefined);

  /**
   * A resource to handle the authentication
   * - It is triggered by the trigger signal
   * - Its loader is the observable result of the postLogin$ or postRegister$ methods
   */
  private readonly authResource = rxResource({
    request: () => this.trigger(),
    loader: (param) => {
      const trigger = param.request;
      if (!trigger) return of(NULL_USER_TOKEN);
      switch (trigger.type) { 
        case 'LOGIN':
          return this.login$(trigger.payload);
        case 'REGISTER':
          return this.register$(trigger.payload);
      }
    }
  })  

  /**
   * The string with the result of the authentication
   * - It is a signal that emits the result of the authentication
   * - Could be a success or an error message
   */
  public readonly result: Signal<string> = computed(() => {
    const value: UserTokenDto | undefined = this.authResource.value();
    if (value?.accessToken) {
      return "logged in";
    }
    const error: unknown = this.authResource.error() ;
    return (error as { message?: string }).message || "unknown";
  });

  /**
   * Logs in a user
   */
  public login(loginDto: LoginDto): void {
    this.trigger.set({type:'LOGIN', payload:loginDto});
  }

  /**
   * Registers a user
   */
  public register(registerDto: RegisterDto): void {
    this.trigger.set({type:'REGISTER', payload:registerDto});
  }

  private login$ = (loginDto: LoginDto | undefined): Observable<UserTokenDto> => {
    if (!loginDto || !loginDto.email || !loginDto.password) return of(NULL_USER_TOKEN);
    return this.authRepository.postLogin$(loginDto);
  }

  private register$ = (registerDto: RegisterDto| undefined): Observable<UserTokenDto> => {
    if (!registerDto || !registerDto.email || !registerDto.password) return of(NULL_USER_TOKEN);
    return this.authRepository.postRegister$(registerDto);
  }
}
