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
