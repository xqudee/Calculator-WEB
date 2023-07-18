import "../App.css"
import "../styles/LengthMode.css"
import { useReducer } from 'react';
import { reducer } from "../Functions";
import ConvertGrid from "../components/ConvertGrid";
import Convert from "../components/Convert";

const MEASURES = [
  {
    key: 1,
    measure: 'milligrams',
    name: 'milligrams',
    abbreviation: 'mg'
  },
  {
    key: 2,
    measure: 'grams',
    name: 'grams',
    abbreviation: 'g'
  },
  {
    key: 3,
    measure: 'kilograms',
    name: 'kilograms',
    abbreviation: 'kg'
  }
];
 
export default function WeightMode(props) {

  const [{ expressionString }, dispatch] = useReducer(reducer, {})

    const { currentMode, modeName } = props;
    if (currentMode !== modeName) return null;

    
    return (
      <div className='calculator-container weight-container'>
          <Convert MEASURES={MEASURES} expressionString={expressionString}></Convert>
          <ConvertGrid className='weight-grid' dispatch={dispatch}></ConvertGrid>
      </div>
    )
  }
  