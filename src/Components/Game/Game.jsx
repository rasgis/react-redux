import { useState, useEffect } from 'react';
import { store } from '../store';
import { actions } from '../reducer';
import { Field } from '../Field/Field';
import { Information } from '../Information/Information';
import styles from './Game.module.css';

export function Game() {
  const [, setRenderTrigger] = useState(0);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => setRenderTrigger((r) => r + 1));
    return unsubscribe;
  }, []);

  const state = store.getState();

  const resetGame = () => {
    store.dispatch({ type: actions.RESTART_GAME });
  };

  const handleCellClick = (index) => {
    if (state.field[index] || state.isGameEnded) return;

    const updatedField = [...state.field];
    updatedField[index] = state.currentPlayer;

    if (checkWin(updatedField)) {
      store.dispatch({ type: actions.SET_GAME_ENDED, payload: true });
    } else if (updatedField.every((cell) => cell !== '')) {
      store.dispatch({ type: actions.SET_DRAW, payload: true });
    } else {
      store.dispatch({
        type: actions.SET_CURRENT_PLAYER,
        payload: state.currentPlayer === 'X' ? '0' : 'X',
      });
    }

    store.dispatch({ type: actions.SET_FIELD, payload: updatedField });
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
    return winPatterns.some((pattern) =>
      pattern.every((index) => field[index] === state.currentPlayer)
    );
  };

  return (
    <div className={styles.game}>
      <Information
        currentPlayer={state.currentPlayer}
        isGameEnded={state.isGameEnded}
        isDraw={state.isDraw}
      />
      <Field field={state.field} onCellClick={handleCellClick} />
      <button onClick={resetGame} className={styles.resetButton}>
        Начать заново
      </button>
    </div>
  );
}
