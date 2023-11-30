import * as yup from 'yup';
import validationSchema from '../validationSchema';

export interface ValidFormData extends yup.InferType<typeof validationSchema> {}
