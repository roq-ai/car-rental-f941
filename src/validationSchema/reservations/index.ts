import * as yup from 'yup';

export const reservationValidationSchema = yup.object().shape({
  reservation_info: yup.string().required(),
  user_id: yup.string().nullable(),
});
