/**
 * User token returned by the login API
 */
export type UserTokenDto = {
  user: {
    id: string;
    email: string;
  };
  accessToken: string;
}

/**
 * The null user token
 */
export const NULL_USER_TOKEN: UserTokenDto = { 
  user: { id: '', email: '' }, accessToken: '' };


