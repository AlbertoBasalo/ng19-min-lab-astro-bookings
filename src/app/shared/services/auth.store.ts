import { computed, effect, inject, Injectable, Signal, signal, WritableSignal } from "@angular/core";
import { Router } from "@angular/router";
import { NULL_USER_TOKEN, UserTokenDto } from "@models/user-token.dto";

// ToDo: remove this store and use the authStore instead

/**
 * Stores user information for the whole application
 * uses a signal to store the user token
 * uses a computed fn to select readonly values
 * uses an effect to perform side effects like saving to local storage
 * @requires Router to navigate to the home page when the user is authenticated
 */
@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private readonly router = inject(Router);
  private readonly authState: WritableSignal<UserTokenDto> =
    signal<UserTokenDto>(NULL_USER_TOKEN);

  /**
   * Selects the access token
   * - Emits only when the user token changes
   */
  public readonly selectToken: Signal<string> = computed(
    () => this.authState().accessToken
  );

  /**
   * Selects if the user is logged in
   * - Emits only when the logged in state changes
   */
  public readonly selectIsAuthenticated: Signal<boolean> = computed(
    () => this.selectToken() !== ''
  );

  /**
   * Effect to save the user token to the local storage
   * - It is triggered when the user token changes
   * - It performs a side effect of saving the user token to the local storage
   */
  private readonly localStoreEffect = effect(() => {
    const userToken: UserTokenDto = this.authState();
    if (userToken === NULL_USER_TOKEN) {
      localStorage.removeItem('userToken');
    } else {
      localStorage.setItem('userToken', JSON.stringify(userToken));
    }
  });

  /**
   * Effect to navigate to the home page when the user is authenticated
   * - It is triggered when the authentication state changes
   * - It performs a side effect of navigating to the home page when the user is authenticated
   */
  private readonly navigateEffect = effect(() => {
    const isAuthenticated: boolean = this.selectIsAuthenticated();
    if (isAuthenticated) {
      this.router.navigate(['/']);
    }
  });

  constructor() {
    // init the store with the user token from the local storage
    const localUserToken: string | null = localStorage.getItem('userToken');
    if (!localUserToken) return;
    const userToken: UserTokenDto = JSON.parse(localUserToken);
    this.authState.set(userToken);
  }



  /**
   * Dispatches the user token to the store
   * @param userToken - The user token
   */
  public dispatchLogin(userToken: UserTokenDto) {
    this.authState.set(userToken);
  }

  /**
   * Dispatches the NULL_USER_TOKEN to the store
   */
  public dispatchLogout() {
    this.authState.set(NULL_USER_TOKEN);
  }

  /**
   * Dispatches the refresh token to the store
   * @param accessToken - The access token
   */
  public dispatchRefreshToken(accessToken: string) {
    this.authState.update((state) => ({ ...state, accessToken }));
  }
}

