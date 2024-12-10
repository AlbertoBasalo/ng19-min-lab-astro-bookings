import { computed, effect, Injectable, Signal, signal } from "@angular/core";
import { NULL_USER_TOKEN, UserTokenDto } from "@models/user-token.dto";

/**
 * Stores user information for the whole application
 * @requires signal to store the user token
 * @requires computed to select readonly values
 * @requires effect to perform side effects like saving to local storage
 */
@Injectable({
  providedIn: 'root',
})
export class UserTokenStore {
  private readonly state = signal<UserTokenDto>(NULL_USER_TOKEN);

  /**
   * Selects the access token
   * - Emits only when the user token changes
   */
  public readonly token: Signal<string> = computed(() => this.state().accessToken);

  /**
   * Selects if the user is logged in
   * - Emits only when the logged in state changes
   */
  public readonly isLoggedIn: Signal<boolean> = computed(() => this.token() !== '');

  /**
   * Effect to save the user token to the local storage
   * - It is triggered when the user token changes
   * - It performs a side effect of saving the user token to the local storage
   */
  private readonly localStoreEffect = effect(() => {
    const userToken = this.state(); 
    console.log('📦 store userToken', userToken);
    if (userToken === NULL_USER_TOKEN) {
      localStorage.removeItem('userToken');
    } else {
      localStorage.setItem('userToken', JSON.stringify(userToken));
    }
  });

  constructor() {
    const localUserToken = localStorage.getItem('userToken');
    const userToken = localUserToken ? JSON.parse(localUserToken) : NULL_USER_TOKEN;
    this.state.set(userToken);
  }

  /**
   * Dispatches the user token to the store
   * @param userToken - The user token
   */
  public login(userToken: UserTokenDto) {
    this.state.set(userToken);
  }

  /**
   * Dispatches the NULL_USER_TOKEN to the store
   */
  public logout() {
    this.state.set(NULL_USER_TOKEN);
  }
}
