/* eslint-disable jsx-a11y/label-has-associated-control */
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import validationSchema from '../../validationSchema';
import { ValidFormData } from '../../types/types';
import TextField from '../../components/TextField/TextField';
import { GENDERS } from '../../constants/constants';
import styles from './ReactHookForms.module.css';
import AutoComplete from '../../components/Autocomplete/Autocomplete';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setData } from '../../store/features/data/dataSlice';
import RouterPath from '../../router/routerTypes';
import convertImageToBase64 from '../../utils/convertImageToBase64';
import selectData from '../../store/features/data/dataSelector';

export default function ReactHookForms() {
  const dispatch = useAppDispatch();
  const mainData = useAppSelector(selectData);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm<ValidFormData>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidFormData> = async (data) => {
    const picture = await convertImageToBase64(data.picture[0]);
    if (!mainData) {
      dispatch(setData([{ ...data, picture }]));
    } else {
      dispatch(setData([{ ...data, picture }, ...mainData]));
    }
    navigate(RouterPath.Main);
  };

  return (
    <section className={styles.reactHookForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('name')}
          label="Name"
          name="name"
          placeholder="Name"
          error={errors.name?.message}
        />
        <TextField
          {...register('age')}
          label="Age"
          name="age"
          placeholder="Age"
          error={errors.age?.message}
        />
        <TextField
          {...register('email')}
          label="Email"
          name="email"
          placeholder="Email"
          error={errors.email?.message}
        />
        <TextField
          {...register('password')}
          label="Password"
          name="password"
          placeholder="Password"
          error={errors.password?.message}
        />
        <TextField
          {...register('confirmPassword')}
          label="Confirm password"
          name="confirmPassword"
          placeholder="Confirm password"
          error={errors.confirmPassword?.message}
        />
        <AutoComplete
          register={register('country')}
          setValue={setValue}
          errorMessage={errors.country?.message}
        />
        <div className={styles.genderWrapper}>
          <div className={styles.radioWrapper}>
            {GENDERS.map((option) => (
              <div key={option.id} className={styles.genderInputWrapper}>
                <label htmlFor="gender">{option.label}</label>
                <input
                  {...register('gender')}
                  type="radio"
                  id={option.value}
                  name="gender"
                  value={option.value}
                />
              </div>
            ))}
          </div>
          {errors.gender && (
            <span className={styles.errorMessage}>
              {errors.gender?.message}
            </span>
          )}
        </div>
        <div className={styles.fileWrapper}>
          <input
            {...register('picture')}
            type="file"
            id="picture"
            name="picture"
          />
          {errors.picture && (
            <span className={styles.errorMessage}>
              {errors.picture.message}
            </span>
          )}
        </div>

        <div className={styles.tAndCWrapper}>
          <div style={{ display: 'flex', gap: 25 }}>
            <label htmlFor="acceptTandC">accept T&C</label>
            <input
              {...register('acceptTandC')}
              type="checkbox"
              id="acceptTandC"
              name="acceptTandC"
            />
          </div>
          {errors.acceptTandC && (
            <span className={styles.errorMessage}>
              {errors.acceptTandC?.message}
            </span>
          )}
        </div>
        <button type="submit" disabled={!isDirty || !isValid}>
          Submit
        </button>
      </form>
    </section>
  );
}
