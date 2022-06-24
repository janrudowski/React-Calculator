import React from 'react';
import { ACTIONS } from '../App';

export default function OperationButton({ operation, dispatch }) {
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.OPERATION, payload: operation })}
      className='color--blue'
    >
      {operation}
    </button>
  );
}
