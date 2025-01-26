import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../reducer';
import styles from './Field.module.css';

export default function Field() {
	const dispatch = useDispatch();
	const field = useSelector((state) => state.field);
	const currentPlayer = useSelector((state) => state.currentPlayer);
	const isGameEnded = useSelector((state) => state.isGameEnded);
	const winningLine = useSelector((state) => state.winningLine); // Получаем победную линию

	const handleCellClick = (index) => {
	  if (field[index] || isGameEnded) return;

	  const updatedField = [...field];
	  updatedField[index] = currentPlayer;

	  const winPattern = checkWin(updatedField);
	  if (winPattern) {
		dispatch({ type: actions.SET_GAME_ENDED, payload: true });
		dispatch({ type: actions.SET_WINNING_LINE, payload: winPattern });
	  } else if (updatedField.every((cell) => cell !== '')) {
		dispatch({ type: actions.SET_DRAW, payload: true });
	  } else {
		dispatch({
		  type: actions.SET_CURRENT_PLAYER,
		  payload: currentPlayer === 'X' ? '0' : 'X',
		});
	  }

	  dispatch({ type: actions.SET_FIELD, payload: updatedField });
	};

	const checkWin = (field) => {
	  const winPatterns = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	  ];
	  return winPatterns.find((pattern) =>
		pattern.every((index) => field[index] === currentPlayer)
	  );
	};

	return (
	  <div className={styles.field}>
		{field.map((cell, index) => (
		  <button
			key={index}
			className={`${styles.cell} ${
			  winningLine.includes(index) ? styles.winningCell : ''
			}`} // Добавляем класс для победных клеток
			onClick={() => handleCellClick(index)}
		  >
			{cell}
		  </button>
		))}
	  </div>
	);
}

