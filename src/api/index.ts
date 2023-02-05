import axios from 'axios';

export type HolidayType = {
  date: string;
  name: string;
  type: string;
};

export const getHolidays = async (date: string) => {
  const year = date.split('/')[2];
  const response = await axios.get(
    `https://brasilapi.com.br/api/feriados/v1/${year}`
  );

  return response.data as HolidayType[];
};
