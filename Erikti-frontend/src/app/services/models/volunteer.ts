import {User} from "./user";

export interface Volunteer {
  volunteerId?: number;
  user?: User;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: City;
  aboutMe?: string;
  birthday?: string;
  gender?: string;
  experienceMonth?: number;
  rating?: number;
}


export enum City {
  ASTANA = 'ASTANA',
  ALMATY = 'ALMATY',
  KYZYLORDA = 'KYZYLORDA',
  TARAZ = 'TARAZ',
  SHYMKENT = 'SHYMKENT',
  AKTAU = 'AKTAU',
  SEMEI = 'SEMEI',
  OSKEMEN = 'OSKEMEN',
  AKTOBE = 'AKTOBE',
  PAVLODAR = 'PAVLODAR',
  TALDYKORGAN = 'TALDYKORGAN',
  KOKSHETAU = 'KOKSHETAU',
  KOSTANAY = 'KOSTANAY',
  ATYRAY = 'ATYRAY',
  TURKISTAN = 'TURKISTAN',
  PETROPAVL = 'PETROPAVL',
  ZHEZKAZGAN = 'ZHEZKAZGAN',
  ORAL = 'ORAL'
}
