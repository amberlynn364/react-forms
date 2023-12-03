/* eslint-disable react/require-default-props */
import { useState, MouseEvent, ChangeEvent } from 'react';
import { UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form';
import TextField from '../TextField/TextField';
import CountryList from '../CountryList/CountryList';
import styles from './Autocomplete.module.css';
import { ValidFormData } from '../../types/types';
import { useAppSelector } from '../../store/hooks';
import selectCountries from '../../store/features/countries/countriesSelector';

interface AutoCompleteProps {
  errorMessage: string | undefined;
  register?: UseFormRegisterReturn<'country'>;
  setValue?: UseFormSetValue<ValidFormData>;
}

export default function AutoComplete({
  errorMessage,
  register,
  setValue,
}: AutoCompleteProps) {
  const countriesList = useAppSelector(selectCountries);
  const [countryMatch, setCountryMatch] = useState<string[]>([]);
  const [country, setCountry] = useState('');
  const countryValue = setValue === undefined ? country : undefined;

  const { onChange } = register || {};

  const searchCountries = (text: string) => {
    if (!text) {
      setCountryMatch([]);
      return;
    }
    const matches = countriesList
      .filter((item: string) => {
        const regex = new RegExp(`^${text}`, 'i');
        return item.match(regex);
      })
      .sort((a, b) => {
        const nameA = a.toUpperCase();
        const nameB = b.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    // .filter((item: Country) => {
    //   const regex = new RegExp(`^${text}`, 'i');
    //   return item.name.common.match(regex);
    // })
    // .sort((a: Country, b: Country) => {
    //   const nameA = a.name.common.toUpperCase();
    //   const nameB = b.name.common.toUpperCase();
    //   if (nameA < nameB) {
    //     return -1;
    //   }
    //   if (nameA > nameB) {
    //     return 1;
    //   }
    //   return 0;
    // });
    setCountryMatch([...matches]);
  };

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    const { textContent } = event.target as HTMLElement;
    setCountryMatch([]);
    setValue?.('country', textContent as string);
    setCountry(textContent as string);
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    searchCountries(value);
    setCountry(value);
    onChange?.(event);
  };

  return (
    <div className={styles.countrySelectWrapper}>
      <TextField
        {...register}
        label="Country"
        name="country"
        value={countryValue}
        placeholder="Enter country"
        onChange={handleOnChange}
        error={errorMessage}
      />
      {countryMatch && countryMatch.length > 0 && (
        <CountryList country={countryMatch} handleClick={handleClick} />
      )}
    </div>
  );
}
