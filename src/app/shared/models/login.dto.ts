/**
 * The login data transfer object
 */
export type LoginDto = {
  email: string;
  password: string;
};

export const NULL_LOGIN_DTO: LoginDto = { email: '', password: '' };
