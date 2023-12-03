import styles from './Card.module.css';
import { CardProps } from './CardTypes';

export default function Card({ item, index }: CardProps) {
  return (
    <div className={styles.cardWrapper}>
      <div
        className={
          index === 0 ? styles.cardGradienNewItem : styles.cardGradient
        }
      />
      <div className={styles.cardInfo}>
        <img
          className={styles.cardImg}
          src={item.picture as string}
          alt="Card img"
        />
        <h3 className={styles.cardName}>{item.name}</h3>
        <div className={styles.cardDescriptionWrapper}>
          <p className={styles.cardDescription}>
            Age<span> {item.age}</span>
          </p>
          <p className={styles.cardDescription}>
            Country<span> {item.country}</span>
          </p>
          <p className={styles.cardDescription}>
            Email<span> {item.email}</span>
          </p>
          <p className={styles.cardDescription}>
            Password<span> {item.password}</span>
          </p>
          <p className={styles.cardDescription}>
            Gender<span> {item.gender}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
