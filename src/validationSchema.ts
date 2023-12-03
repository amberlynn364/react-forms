import * as Yup from 'yup';
import { MAX_SIZE_FILE } from './constants/constants';
import validateImageExtension from './utils/validateImageExtension';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required field')
    .matches(/^[A-Z][a-z]*/, 'Name must start with an uppercase letter'),
  age: Yup.number()
    .required('Age is required field')
    .typeError('Age must be a number'),
  email: Yup.string()
    .required('Email is required field')
    .email('Invalid email address'),
  password: Yup.string()
    .required('Password is required field')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=])/,
      'Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character(!@#$%^&+=)'
    ),
  confirmPassword: Yup.string()
    .required('Confirm Password is required field')
    .oneOf([Yup.ref('password')], 'Password must match'),
  gender: Yup.string().required('Select gender').oneOf(['male', 'female']),
  acceptTandC: Yup.boolean()
    .required('requierd field')
    .oneOf([true], 'You must accept the T&C '),
  picture: Yup.mixed<FileList>()
    .required('Picture is required')
    .test('fileExists', 'File is required', (value) => {
      return value && value.length > 0;
    })
    .test(
      'fileSize',
      'Image size exceeds the maximum allowed limit of 5MB',
      (value) => (!value.length ? false : value[0].size <= MAX_SIZE_FILE)
    )
    .test(
      'fileExtension',
      'Invalid image extension. Only PNG and JPEG files are allowed.',
      (value) => {
        if (!value.length) {
          return false;
        }

        const fileName = value[0].name.toLocaleLowerCase() || '';
        const fileType = 'image';

        return validateImageExtension(fileName, fileType);
      }
    ),
  country: Yup.string().required('Country is required'),
});

export default validationSchema;
