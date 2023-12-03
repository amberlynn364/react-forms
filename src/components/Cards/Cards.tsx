/* eslint-disable react/no-array-index-key */
import styles from './Cards.module.css';
import { useAppSelector } from '../../store/hooks';
import selectData from '../../store/features/data/dataSelector';
import Card from '../Card/Card';

export default function Cards() {
  const data = useAppSelector(selectData);

  return (
    <div className={styles.cardsWrapper}>
      {data?.map((item, index) => (
        <Card key={index} item={item} index={index} />
      ))}
    </div>
  );
}
