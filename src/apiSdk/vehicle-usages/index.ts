import axios from 'axios';
import queryString from 'query-string';
import { VehicleUsageInterface, VehicleUsageGetQueryInterface } from 'interfaces/vehicle-usage';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getVehicleUsages = async (
  query?: VehicleUsageGetQueryInterface,
): Promise<PaginatedInterface<VehicleUsageInterface>> => {
  const response = await axios.get('/api/vehicle-usages', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createVehicleUsage = async (vehicleUsage: VehicleUsageInterface) => {
  const response = await axios.post('/api/vehicle-usages', vehicleUsage);
  return response.data;
};

export const updateVehicleUsageById = async (id: string, vehicleUsage: VehicleUsageInterface) => {
  const response = await axios.put(`/api/vehicle-usages/${id}`, vehicleUsage);
  return response.data;
};

export const getVehicleUsageById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/vehicle-usages/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteVehicleUsageById = async (id: string) => {
  const response = await axios.delete(`/api/vehicle-usages/${id}`);
  return response.data;
};
