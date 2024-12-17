import {
  computed,
  effect,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { NULL_USER_TOKEN, UserTokenDto } from '../models/user-token.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private readonly authState: WritableSignal<UserTokenDto> =
    signal<UserTokenDto>(NULL_USER_TOKEN);

  public readonly selectToken: Signal<string> = computed(
    () => this.authState().accessToken
  );

  public readonly selectIsAuthenticated: Signal<boolean> = computed(
    () => this.selectToken() !== ''
  );

  private readonly localStoreEffect = effect(() => {
    const userToken = this.authState(); // trigger
    // effect
    if (userToken === NULL_USER_TOKEN) {
      localStorage.removeItem('userToken');
    } else {
      localStorage.setItem('userToken', JSON.stringify(userToken));
    }
  });

  constructor() {
    const localUserToken = localStorage.getItem('userToken');
    if (!localUserToken) return;
    const userToken = JSON.parse(localUserToken);
    this.authState.set(userToken);
  }

  public dispatchLogin(userToken: UserTokenDto) {
    this.authState.set(userToken);
  }
  public dispatchLogout() {
    this.authState.set(NULL_USER_TOKEN);
  }
  public dispatchRefreshToken(accessToken: string) {
    this.authState.update((state) => ({ ...state, accessToken }));
  }
}
