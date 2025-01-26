import { useDispatch } from 'react-redux';
import { actions } from '../../reducer';
import Field from '../Field/Field';
import Information from '../Information/Information';
import styles from './Game.module.css';

export function Game() {
	const dispatch = useDispatch();

	const resetGame = () => {
	  dispatch({ type: actions.RESTART_GAME });
	};

	return (
	  <div className={styles.game}>
		<Information />
		<Field />
		<button onClick={resetGame} className={styles.resetButton}>
		  Начать заново
		</button>
	  </div>
	);
  }
