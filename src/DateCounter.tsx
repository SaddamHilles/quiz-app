import React, { useReducer } from 'react';

type ActionType = 'INCREMENT' | 'DECREMENT' | 'SET_STEP' | 'RESET';

type Action = {
  payload?: number;
  type: ActionType;
};

type State = { count: number; step: number };
const initialValue: State = {
  count: 0,
  step: 1,
};

const reduce = (state: State, { type, payload }: Action) => {
  switch (type) {
    case 'INCREMENT':
      return { ...state, count: state.count + state.step };
    case 'DECREMENT':
      return { ...state, count: state.count - state.step };
    case 'SET_STEP':
      return { ...state, step: payload! };
    case 'RESET':
      return initialValue;
    default:
      return state;
  }
};

function DateCounter() {
  const [state, dispatch] = useReducer(reduce, initialValue);

  // This mutates the date object.
  const date = new Date('june 21 2027');
  date.setDate(date.getDate() + state.count);

  const dec = function () {
    dispatch({ type: 'DECREMENT' });
  };

  const inc = function () {
    dispatch({ type: 'INCREMENT' });
  };

  const defineCount = function (e: React.ChangeEvent<HTMLInputElement>) {
    console.log('first: ', Number(e.target.value));
  };

  const defineStep = function (e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: 'SET_STEP', payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: 'RESET' });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={state.step}
          onChange={defineStep}
        />
        <span>{state.step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={state.count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
