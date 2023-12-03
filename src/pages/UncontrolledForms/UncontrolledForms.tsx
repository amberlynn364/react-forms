import { FormEvent, useRef, useState } from 'react';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import validationSchema from '../../validationSchema';
import TextField from '../../components/TextField/TextField';
import styles from './UncontrolledForms.module.css';
import { InputErrors, MyData } from '../../types/types';
import { GENDERS } from '../../constants/constants';
import AutoComplete from '../../components/Autocomplete/Autocomplete';
import RouterPath from '../../router/routerTypes';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setData } from '../../store/features/data/dataSlice';
import convertImageToBase64 from '../../utils/convertImageToBase64';
import selectData from '../../store/features/data/dataSelector';

export default function UncontrolledForms() {
  const dispatch = useAppDispatch();
  const mainData = useAppSelector(selectData);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const [inputErrors, setInputErrors] = useState<InputErrors>({});

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = formRef.current;
    const formData: MyData = (form &&
      Object.fromEntries(new FormData(form))) as MyData;

    const isCheckedTAndC = form?.acceptTandC.checked;
    const pictureInput = form?.picture.files;

    const submittedData: MyData = {
      ...formData,
      acceptTandC: isCheckedTAndC,
      picture: pictureInput,
    };

    try {
      await validationSchema.validate(submittedData, { abortEarly: false });
      const picture = await convertImageToBase64(
        submittedData.picture[0] as File
      );
      if (!mainData) {
        dispatch(setData([{ ...submittedData, picture }]));
      } else {
        dispatch(setData([{ ...submittedData, picture }, ...mainData]));
      }
      navigate(RouterPath.Main);
    } catch (validationErrors) {
      if (validationErrors instanceof yup.ValidationError) {
        const fieldErrors: Record<string, string> = {};
        validationErrors.inner.forEach((error) => {
          if (error.path) {
            fieldErrors[error.path] = error.message;
          }
        });
        setInputErrors(fieldErrors);
      }
    }
  };
  return (
    <section className={styles.uncontrolledSection}>
      <form ref={formRef} onSubmit={handleSubmit}>
        <TextField label="Name" name="name" error={inputErrors.name} />
        <TextField label="Age" name="age" error={inputErrors.age} />
        <TextField label="Email" name="email" error={inputErrors.email} />
        <TextField
          label="Password"
          name="password"
          error={inputErrors.password}
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          error={inputErrors.confirmPassword}
        />
        <AutoComplete errorMessage={inputErrors.country} />
        <div className={styles.genderWrapper}>
          <div className={styles.radioWrapper}>
            {GENDERS.map((option) => (
              <div key={option.id} className={styles.genderInputWrapper}>
                <label htmlFor="gender">{option.label}</label>
                <input
                  type="radio"
                  id={option.value}
                  name="gender"
                  value={option.value}
                />
              </div>
            ))}
          </div>
          {inputErrors.gender && (
            <span className={styles.errorMessage}>{inputErrors.gender}</span>
          )}
        </div>
        <div className={styles.fileWrapper}>
          <input type="file" id="picture" name="picture" />
          {inputErrors.picture && (
            <span className={styles.errorMessage}>{inputErrors.picture}</span>
          )}
        </div>

        <div className={styles.tAndCWrapper}>
          <div style={{ display: 'flex', gap: 25 }}>
            <label htmlFor="acceptTandC">
              accept T&C
              <input type="checkbox" id="acceptTandC" name="acceptTandC" />
            </label>
          </div>
          {inputErrors.acceptTandC && (
            <span className={styles.errorMessage}>
              {inputErrors.acceptTandC}
            </span>
          )}
        </div>

        <button type="submit">Submit</button>
      </form>
    </section>
  );
}
