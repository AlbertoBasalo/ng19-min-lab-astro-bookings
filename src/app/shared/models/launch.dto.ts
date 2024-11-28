
/**
 * The launch data transfer object
 */
export type LaunchDto = {
  id: string;
  agencyId: string;
  rocketId: string;
  date: Date;
  mission: string;
  destination: string;
  pricePerSeat: number;
  status: string;
};

/**
 * The null launch object
 * - Used to avoid undefined errors
 */
export const NULL_LAUNCH: LaunchDto = {
  id: '',
  agencyId: '',
  rocketId: '',
  date: new Date(),
  mission: '',
  destination: '',
  pricePerSeat: 0,
  status: '',
};
