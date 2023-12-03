/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { MouseEvent } from 'react';
import styles from './CountryList.module.css';

export default function CountryList({
  country,
  handleClick,
}: {
  country: string[];
  handleClick: (event: MouseEvent<HTMLElement>) => void;
}) {
  return (
    <ul className={styles.countryList}>
      {country
        .map((item: string, index) => {
          return (
            <li
              key={index}
              className={styles.countryItem}
              onClick={handleClick}
            >
              {item}
            </li>
          );
        })
        .slice(0, 10)}
    </ul>
  );
}
