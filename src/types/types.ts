import * as yup from 'yup';
import validationSchema from '../validationSchema';

export interface ValidFormData extends yup.InferType<typeof validationSchema> {}

export interface MyData {
  [key: string]: string | FileList | boolean | number;
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

export interface InputErrors {
  acceptTandC?: string;
  age?: string;
  confirmPassword?: string;
  country?: string;
  email?: string;
  gender?: string;
  name?: string;
  password?: string;
  picture?: string;
}
