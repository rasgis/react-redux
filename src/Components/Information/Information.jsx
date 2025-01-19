import styles from './Information.module.css';
import { store } from '../store';

export function Information() {
  const state = store.getState();

  return (
    <div className={styles.info}>
      {state.isDraw
        ? 'Ничья'
        : state.isGameEnded
        ? `Победил: ${state.currentPlayer}`
        : `Ходит: ${state.currentPlayer}`}
    </div>
  );
}
