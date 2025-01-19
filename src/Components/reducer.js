const initialState = {
    field: Array(9).fill(''),
    currentPlayer: 'X',
    isGameEnded: false,
    isDraw: false,
};

export const actions = {
    SET_FIELD: 'SET_FIELD',
    SET_CURRENT_PLAYER: 'SET_CURRENT_PLAYER',
    RESTART_GAME: 'RESTART_GAME',
    SET_GAME_ENDED: 'SET_GAME_ENDED',
    SET_DRAW: 'SET_DRAW',
};

export function reducer(state = initialState, action) {
    switch (action.type) {
      case actions.SET_FIELD:
        return { ...state, field: action.payload };
      case actions.SET_CURRENT_PLAYER:
        return { ...state, currentPlayer: action.payload };
      case actions.RESTART_GAME:
        return initialState;
      case actions.SET_GAME_ENDED:
        return { ...state, isGameEnded: action.payload };
      case actions.SET_DRAW:
        return { ...state, isDraw: action.payload };
      default:
        return state;
    }
}
