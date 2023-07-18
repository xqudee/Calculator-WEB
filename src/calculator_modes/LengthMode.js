import "../App.css"
import "../styles/LengthMode.css"
import { useReducer } from 'react';
import { reducer } from "../Functions";
import ConvertGrid from "../components/ConvertGrid";
import Convert from "../components/Convert";

const MEASURES = [
  {
    key: 1,
    measure: 'milimeters',
    name: 'milimeters',
    abbreviation: 'mm'
  },
  {
    key: 2,
    measure: 'santimeters',
    name: 'santimeters',
    abbreviation: 'sm'
  },
  {
    key: 3,
    measure: 'meters',
    name: 'meters',
    abbreviation: 'm'
  },
  {
    key: 4,
    measure: 'kilometers',
    name: 'kilometers',
    abbreviation: 'km'
  }
];
 
export default function LengthMode(props) {

  const [{ expressionString }, dispatch] = useReducer(reducer, {})

    const { currentMode, modeName } = props;
    if (currentMode !== modeName) return null;

    
    return (
      <div className='calculator-container length-container'>
          <Convert MEASURES={MEASURES} expressionString={expressionString}></Convert>
          <ConvertGrid className='length-grid' dispatch={dispatch}></ConvertGrid>
      </div>
    )
  }
  