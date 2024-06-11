/* tslint:disable */
/* eslint-disable */
import { User } from '../models/user';
export interface Organization {
  address?: string;
  approved?: boolean;
  bin?: string;
  city?: 'ASTANA' | 'ALMATY' | 'KYZYLORDA' | 'TARAZ' | 'SHYMKENT' | 'AKTAU' | 'SEMEI' | 'OSKEMEN' | 'AKTOBE' | 'PAVLODAR' | 'TALDYKORGAN' | 'KOKSHETAU' | 'KOSTANAY' | 'ATYRAY' | 'TURKISTAN' | 'PETROPAVL' | 'ZHEZKAZGAN' | 'ORAL';
  description?: string;
  email?: string;
  name?: string;
  organizationId?: number;
  owner?: User;
  phone?: string;
  isApproved?: boolean;
  rating?: number;
  numberOfRates?: number;
}
