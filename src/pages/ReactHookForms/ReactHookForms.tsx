/* eslint-disable jsx-a11y/label-has-associated-control */
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import validationSchema from '../../validationSchema';
import { ValidFormData } from '../../types/types';
import TextField from '../../components/TextField/TextField';
import { GENDERS } from '../../constants/constants';

export default function ReactHookForms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidFormData>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidFormData> = (data) => {
    console.log('data', data);
  };

  console.log('errors', errors);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register('name')}
        label="Name"
        name="name"
        error={errors.name?.message}
      />
      <TextField
        {...register('age')}
        label="Age"
        name="age"
        error={errors.age?.message}
      />
      <TextField
        {...register('email')}
        label="Email"
        name="email"
        error={errors.email?.message}
      />
      <TextField
        {...register('password')}
        label="Password"
        name="password"
        error={errors.password?.message}
      />
      <TextField
        {...register('confirmPassword')}
        label="Confirm password"
        name="confirmPassword"
        error={errors.confirmPassword?.message}
      />
      <div style={{ display: 'flex', gap: 20 }}>
        {GENDERS.map((option) => (
          <TextField
            key={option.value}
            {...register('gender')}
            type="radio"
            id={option.value}
            name="gender"
            value={option.value}
            label={option.label}
          />
        ))}
      </div>
      {errors.gender && <span>{errors.gender?.message}</span>}
      <TextField
        {...register('acceptTandC')}
        type="checkbox"
        id="acceptTandC"
        name="acceptTandC"
        label="accept T&C"
      />
      {errors.acceptTandC?.message && (
        <span>{errors.acceptTandC?.message}</span>
      )}
      <input {...register('picture')} type="file" id="picture" name="picture" />
      {errors.picture && <span>{errors.picture.message}</span>}
      <input type="submit" />
    </form>
  );
}
