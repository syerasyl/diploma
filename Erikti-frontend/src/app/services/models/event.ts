/* tslint:disable */
/* eslint-disable */
import { Organization } from '../models/organization';
export interface Event {
  approved?: boolean;
  city?: 'ASTANA' | 'ALMATY' | 'KYZYLORDA' | 'TARAZ' | 'SHYMKENT' | 'AKTAU' | 'SEMEI' | 'OSKEMEN' | 'AKTOBE' | 'PAVLODAR' | 'TALDYKORGAN' | 'KOKSHETAU' | 'KOSTANAY' | 'ATYRAY' | 'TURKISTAN' | 'PETROPAVL' | 'ZHEZKAZGAN' | 'ORAL';
  eventDescription?: string;
  eventEndDate: number;
  eventId: number;
  eventLocation?: string;
  eventName: string;
  eventStartDate: number;
  eventStatus: 'OPEN' | 'CLOSED';
  eventType: 'SOCIAL' | 'ECO';
  organization?: Organization;
  active?: boolean;
  link? : string;
}
