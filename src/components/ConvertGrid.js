import "../App.css"
import "../styles/Convert.css"
import { ACTIONS } from "../Functions";
import DigitButton from '../components/DigitButton';
import OperationButton from '../components/OperationButton';

export default function ConvertGrid(props) {
    const { className, dispatch } = props;
    return (
        <div className={`calculator-grid convert-grid ${className}`}>
        <DigitButton digit="1" dispatch={dispatch} />
        <DigitButton digit="2" dispatch={dispatch} />
        <DigitButton digit="3" dispatch={dispatch} />
        <OperationButton operation="÷" dispatch={dispatch} isDisabled={true}/>
        <DigitButton digit="4" dispatch={dispatch} />
        <DigitButton digit="5" dispatch={dispatch} />
        <DigitButton digit="6" dispatch={dispatch} />
        <OperationButton operation="*" dispatch={dispatch} isDisabled={true} />
        <DigitButton digit="7" dispatch={dispatch} />
        <DigitButton digit="8" dispatch={dispatch} />
        <DigitButton digit="9" dispatch={dispatch} />
        <OperationButton operation="+" dispatch={dispatch} isDisabled={true} />
        <button onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
        <DigitButton digit="0" dispatch={dispatch} />
        <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
        <OperationButton operation="-" dispatch={dispatch} isDisabled={true} />      
    </div>
    )
}