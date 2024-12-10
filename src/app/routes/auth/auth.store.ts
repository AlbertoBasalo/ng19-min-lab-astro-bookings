import { computed, effect, inject, Injectable, Signal, signal } from "@angular/core";
import { rxResource } from "@angular/core/rxjs-interop";
import { AuthRepository } from "@api/auth.repository";
import { LoginDto } from "@models/login.dto";
import { RegisterDto } from "@models/register.dto";
import { NULL_USER_TOKEN, UserTokenDto } from "@models/user-token.dto";
import { UserTokenStore } from "@services/user-token.store";

import { Observable, of } from "rxjs";
/**
 * The action type accepted by the auth store
 * - Its is a union of the actions that the auth store can handle
 * - PostLogin and PostRegister are the actions that the auth store can handle
 */
type Action =  {type: 'POST_LOGIN', payload: LoginDto} | {type: 'POST_REGISTER', payload: RegisterDto};

/**
 * The auth store for the authentication requests
 * - It is a service to handle the authentication requests
 * @requires AuthRepository to make the requests
 * @requires UserTokenStore to store the user token
 */
@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private readonly authRepository = inject(AuthRepository);
  private readonly userTokenStore = inject(UserTokenStore);
  private readonly action = signal<Action | undefined>(undefined);
  private readonly authResource = rxResource({
    request: () => this.action(),
    loader: (param) => {
      const action = param.request as Action;
      if (!action) return of(NULL_USER_TOKEN);
      switch (action.type) { 
        case 'POST_LOGIN':
          return this.postLogin(action.payload);
        case 'POST_REGISTER':
          return this.postRegister(action.payload);
      }
    }
  })
  private readonly authStoreEffect = effect(() => {
    const userToken = this.authResource.value();
    if (userToken) {
      this.userTokenStore.login(userToken);
    } else {
      this.userTokenStore.logout();
    }
  });

  
  /**
   * Selects the result of the authentication
   */
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
    this.action.set({type:'POST_LOGIN', payload:loginDto});
  }

  /**
   * Registers a user
   */
  public dispatchRegister(registerDto: RegisterDto): void {
    this.action.set({type:'POST_REGISTER', payload:registerDto});
  }

  private postLogin = (loginDto: LoginDto | undefined): Observable<UserTokenDto> => {
    if (!loginDto || !loginDto.email || !loginDto.password) return of(NULL_USER_TOKEN);
    return this.authRepository.postLogin$(loginDto);
  }

  private postRegister = (registerDto: RegisterDto| undefined): Observable<UserTokenDto> => {
    if (!registerDto || !registerDto.email || !registerDto.password) return of(NULL_USER_TOKEN);
    return this.authRepository.postRegister$(registerDto);
  }
}
