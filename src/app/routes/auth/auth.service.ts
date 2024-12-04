import { computed, effect, inject, Injectable, Signal, signal } from "@angular/core";
import { rxResource } from "@angular/core/rxjs-interop";
import { AuthRepository } from "@api/auth.repository";
import { LoginDto } from "@models/login.dto";
import { RegisterDto } from "@models/register.dto";
import { NULL_USER_TOKEN, UserTokenDto } from "@models/user-token.dto";
import { AuthStore } from "@services/auth.store";
import { Observable, of } from "rxjs";

type Action =  {type: 'LOGIN', payload: LoginDto} | {type: 'REGISTER', payload: RegisterDto};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authRepository = inject(AuthRepository);
  private readonly authStore = inject(AuthStore);
  private readonly action = signal<Action | undefined>(undefined);
  private readonly authResource = rxResource({
    request: () => this.action(),
    loader: (param) => {
      const action = param.request as Action;
      if (!action) return of(NULL_USER_TOKEN);
      switch (action.type) { 
        case 'LOGIN':
          return this.login(action.payload);
        case 'REGISTER':
          return this.register(action.payload);
      }
    }
  })
  private readonly authStoreEffect = effect(() => {
    const login = this.authResource.value();
    if (login) {
      this.authStore.login(login);
    }
  });

  public readonly selectResult: Signal<string> = computed(() => {
    const value = this.authResource.value();
    if (value?.accessToken) {
      return "logged in";
    }
    const error = this.authResource.error() as { message?: string } | undefined;
    if (error ) {
      return error.message as string;
    }
    return "unknown";
  });

  /**
   * Logs in a user
   */
  public dispatchLogin(loginDto: LoginDto): void {
    this.action.set({type:'LOGIN', payload:loginDto});
  }

  /**
   * Registers a user
   */
  public dispatchRegister(registerDto: RegisterDto): void {
    console.log('📦 dispatchRegister', registerDto);
    this.action.set({type:'REGISTER', payload:registerDto});
  }

  private login = (loginDto: LoginDto | undefined): Observable<UserTokenDto> => {
    if (!loginDto || !loginDto.email || !loginDto.password) return of(NULL_USER_TOKEN);
    return this.authRepository.login(loginDto);
  }

  private register = (registerDto: RegisterDto| undefined): Observable<UserTokenDto> => {
    if (!registerDto || !registerDto.email || !registerDto.password) return of(NULL_USER_TOKEN);
    return this.authRepository.register(registerDto);
  }
}
