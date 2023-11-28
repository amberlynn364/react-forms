import * as Yup from 'yup';
import { MAX_SIZE_FILE } from './constants/constants';
import validateImageExtension from './utils/validateImageExtension';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required()
    .matches(/^[A-Z][a-z]*/, 'Name must start with an uppercase letter'),
  age: Yup.number()
    .required()
    .positive('Age must be a positive number')
    .integer('Age must be an integer'),
  email: Yup.string().required().email('Invalid email address'),
  password: Yup.string()
    .required()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])/,
      'Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character'
    ),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password')], 'Password must match'),
  gender: Yup.string().required(),
  acceptTandC: Yup.boolean().required().oneOf([true]),
  picture: Yup.mixed()
    .required()
    .test(
      'fileSize',
      'Image size exceeds the maximum allowed limit of 5MB',
      (value) => value instanceof File && value.size <= MAX_SIZE_FILE
    )
    .test(
      'fileExtension',
      'Invalid image extension. Only PNG and JPEG files are allowed.',
      (value) => {
        if (!value) {
          return true;
        }

        const fileName =
          (value instanceof File && value.name.toLocaleLowerCase()) || '';
        const fileType = 'image';

        return validateImageExtension(fileName, fileType);
      }
    ),
});

export default validationSchema;
