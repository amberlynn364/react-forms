/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { MouseEvent } from 'react';
import styles from './CountryList.module.css';
import { Country } from './CountryListTypes';

export default function CountryList({
  country,
  handleClick,
}: {
  country: Country[];
  handleClick: (event: MouseEvent<HTMLElement>) => void;
}) {
  return (
    <ul className={styles.countryList}>
      {country
        .map((item: Country) => {
          const { official, common } = item.name;
          return (
            <li
              key={official}
              className={styles.countryItem}
              onClick={handleClick}
            >
              {common}
            </li>
          );
        })
        .slice(0, 10)}
    </ul>
  );
}
