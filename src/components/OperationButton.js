import { ACTIONS } from "../Functions" 

export default function OperationButton({ dispatch, operation, isDisabled }) {
    return (
        <button 
            onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPEARATION, payload: { operation }})}
            disabled={isDisabled}
        >
            {operation}
        </button>
    )
}