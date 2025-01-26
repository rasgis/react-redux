import styles from './Information.module.css';
import { useSelector } from 'react-redux';

export default function Information() {
  const currentPlayer = useSelector((state) => state.currentPlayer);
  const isGameEnded = useSelector((state) => state.isGameEnded);
  const isDraw = useSelector((state) => state.isDraw);

  return (
    <div className={styles.info}>
      {isDraw
        ? 'Ничья'
        : isGameEnded
        ? `Победил: ${currentPlayer}`
        : `Ходит: ${currentPlayer}`}
    </div>
  );
}
