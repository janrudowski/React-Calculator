import React from 'react';
import DigitButton from './components/DigitButton';
import OperationButton from './components/OperationButton';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CLEAR: 'clear',
  OPERATION: 'operation',
  EVALUATE: 'evaluate',
  DELETE: 'delete',
};

function evaluate(state) {
  let result;
  let previous = Number.parseFloat(state.prev);
  let current = Number.parseFloat(state.current);
  if (isNaN(previous) || isNaN(current)) return '';
  let operation = state.operant;
  switch (operation) {
    case '+':
      result = previous + current;
      break;
    case '-':
      result = previous - current;
      break;
    case 'x':
      result = previous * current;
      break;
    case '÷':
      result = previous / current;
      break;
    default:
      return '';
  }
  return result.toString();
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          current: action.payload,
          overwrite: false,
        };
      }
      if (action.payload === '.' && state.current.includes('.')) return state;
      if (action.payload === 0 && state.current === '0') return state;
      return {
        ...state,
        current: `${state.current || ''}${action.payload}`,
      };
    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.DELETE:
      if (state.overwrite) {
        return {
          ...state,
          current: '',
          overwrite: false,
        };
      }

      if (state.current == null) return state;
      return {
        ...state,
        current: state.current.slice(0, -1),
      };

    case ACTIONS.OPERATION:
      if (state.prev == null && state.current == null) return state;
      if (state.prev == null) {
        return {
          ...state,
          operant: action.payload,
          prev: state.current,
          current: null,
        };
      }
      if (state.current == null) {
        return {
          ...state,
          operant: action.payload,
        };
      }

      return {
        ...state,
        prev: evaluate(state, action.payload),
        current: null,
        operant: action.payload,
      };
    case ACTIONS.EVALUATE:
      if (
        state.prev == null ||
        state.current == null ||
        state.operant == null
      ) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        operant: null,
        prev: null,
        current: evaluate(state),
      };
    default:
      return state;
  }
}

export default function App() {
  const [{ current, prev, operant }, dispatch] = React.useReducer(reducer, {});
  return (
    <div className='calculator'>
      <div className='output'>
        <div className='current'>{current}</div>
        <div className='prev'>
          {prev} {operant}
        </div>
      </div>
      <button
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
        className='span-2 color--blue'
      >
        C
      </button>
      <button
        onClick={() => dispatch({ type: ACTIONS.DELETE })}
        className='color--blue'
      >
        <img className='icon' src='icons/delete.svg' alt='deletebtn' />
      </button>
      <OperationButton operation={'÷'} dispatch={dispatch} />
      <DigitButton digit={7} dispatch={dispatch} />
      <DigitButton digit={8} dispatch={dispatch} />
      <DigitButton digit={9} dispatch={dispatch} />
      <OperationButton operation={'x'} dispatch={dispatch} />
      <DigitButton digit={4} dispatch={dispatch} />
      <DigitButton digit={5} dispatch={dispatch} />
      <DigitButton digit={6} dispatch={dispatch} />
      <OperationButton operation={'-'} dispatch={dispatch} />
      <DigitButton digit={1} dispatch={dispatch} />
      <DigitButton digit={2} dispatch={dispatch} />
      <DigitButton digit={3} dispatch={dispatch} />
      <OperationButton operation={'+'} dispatch={dispatch} />
      <DigitButton digit={'.'} dispatch={dispatch} />
      <DigitButton digit={0} dispatch={dispatch} />
      <button
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
        className='span-2 equals'
      >
        =
      </button>
    </div>
  );
}
