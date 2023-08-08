import { VehicleUsageInterface } from 'interfaces/vehicle-usage';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface VehicleInterface {
  id?: string;
  vehicle_info: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  vehicle_usage?: VehicleUsageInterface[];
  user?: UserInterface;
  _count?: {
    vehicle_usage?: number;
  };
}

export interface VehicleGetQueryInterface extends GetQueryInterface {
  id?: string;
  vehicle_info?: string;
  user_id?: string;
}
