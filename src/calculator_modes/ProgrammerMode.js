import "../App.css"
import "../styles/ProgrammerMode.css"
import { useReducer } from 'react';
import { reducer } from "../Functions";
import ConvertGrid from "../components/ConvertGrid";

function ProgrammerMode(props) {
    const [{ expressionString, resultValue = 0 }, dispatch] = useReducer(reducer, {});
    const { currentMode, modeName } = props;

    let hexValue = parseInt(resultValue).toString(16);
    let decValue = parseInt(resultValue, 16);
    let binValue = parseInt(resultValue).toString(2);
  
    if (currentMode !== modeName) return null;
    
    return (
      <div className='calculator-container programmer-container'>
          <div className='output'>
            <div class="convert-container">
                <div class="hex convert-div">
                    <span>HEX: </span>
                    <span class="hex-convert_result">{hexValue}</span>
                </div>
                <div class="dec convert-div">
                    <span>DEC: </span>
                    <span class="dec-convert_result">{decValue}</span>
                </div>
                <div class="bin convert-div">
                    <span>BIN: </span>
                    <span class="bin-convert_result">{binValue}</span>
                </div>
            </div>
            <div className='active-result'>{expressionString || '0'}</div>
          </div>
          <ConvertGrid className='programmer-grid' dispatch={dispatch}></ConvertGrid>
      </div>
    )
  }
  
  export default ProgrammerMode;