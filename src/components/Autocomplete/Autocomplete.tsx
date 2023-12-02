import { useEffect, useState, MouseEvent, ChangeEvent } from 'react';
import { UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form';
import TextField from '../TextField/TextField';
import CountryList from '../CountryList/CountryList';
import { Country } from '../CountryList/CountryListTypes';
import styles from './Autocomplete.module.css';
import { ValidFormData } from '../../types/types';

interface AutoCompleteProps {
  errorMessage: string | undefined;
  register: UseFormRegisterReturn<'country'>;
  setValue: UseFormSetValue<ValidFormData>;
}

export default function AutoComplete({
  errorMessage,
  register,
  setValue,
}: AutoCompleteProps) {
  const [countries, setCountries] = useState([]);
  const [countryMatch, setCountryMatch] = useState([]);

  const { onChange } = register;

  useEffect(() => {
    const loadCountries = async () => {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      setCountries(data);
    };

    loadCountries();
  }, []);

  const searchCountries = (text: string) => {
    if (!text) {
      setCountryMatch([]);
      return;
    }
    const matches = countries
      .filter((item: Country) => {
        const regex = new RegExp(`^${text}`, 'i');
        return item.name.common.match(regex);
      })
      .sort((a: Country, b: Country) => {
        const nameA = a.name.common.toUpperCase();
        const nameB = b.name.common.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    setCountryMatch(matches);
  };

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    const { textContent } = event.target as HTMLElement;
    setCountryMatch([]);
    setValue('country', textContent as string);
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    searchCountries(value);
    onChange(event);
  };

  return (
    <div className={styles.countrySelectWrapper}>
      <TextField
        {...register}
        label="Country Select"
        name="country"
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
