import * as yup from 'yup';
import validationSchema from '../validationSchema';

export interface ValidFormData extends yup.InferType<typeof validationSchema> {}

export interface MyData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  country: string;
  picture: FileList | string;
  acceptTandC: boolean;
}
