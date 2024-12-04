import { computed, effect, Injectable, Signal, signal } from "@angular/core";
import { NULL_USER_TOKEN, UserTokenDto } from "@models/user-token.dto";


@Injectable({
  providedIn: 'root',
})
export class UserTokenStore {
  private readonly state = signal<UserTokenDto>(NULL_USER_TOKEN);

  public readonly token: Signal<string> = computed(() => this.state().accessToken);

  public readonly isLoggedIn: Signal<boolean> = computed(() => this.token() !== '');

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

  public login(userToken: UserTokenDto) {
    this.state.set(userToken);
  }

  public logout() {
    this.state.set(NULL_USER_TOKEN);
  }
}
