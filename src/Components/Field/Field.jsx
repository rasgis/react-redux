import PropTypes from 'prop-types';
import styles from './Field.module.css';
import { store } from '../store';

export function Field({ onCellClick }) {
  const state = store.getState();

  return (
    <div className={styles.field}>
      {state.field.map((cell, index) => (
        <button
          key={index}
          className={styles.cell}
          onClick={() => onCellClick(index)}
        >
          {cell}
        </button>
      ))}
    </div>
  );
}

Field.propTypes = {
	onCellClick: PropTypes.func.isRequired,
};
