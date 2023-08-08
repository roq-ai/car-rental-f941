import * as yup from 'yup';

export const vehicleUsageValidationSchema = yup.object().shape({
  usage_info: yup.string().required(),
  vehicle_id: yup.string().nullable(),
});
