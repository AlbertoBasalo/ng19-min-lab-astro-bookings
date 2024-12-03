/**
 * The register data transfer object
 */
export interface RegisterDto {
  username: string;
  email: string;
  password: string;
}

/**
 * The null register dto
 */
export const NULL_REGISTER_DTO: RegisterDto = { username: '', email: '', password: '' };
  