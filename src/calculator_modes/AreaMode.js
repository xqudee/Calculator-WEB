import "../App.css"
import "../styles/LengthMode.css"
import { useReducer } from 'react';
import { reducer } from "../Functions";
import ConvertGrid from "../components/ConvertGrid";
import Convert from "../components/Convert";

const MEASURES = [
    {
        key: 1,
        measure: 'squareMilimeters',
        name: 'milimeters²',
        abbreviation: 'mm²'
    },
    {
        key: 2,
        measure: 'squareSantimeters',
        name: 'santimeters²',
        abbreviation: 'sm²'
    },
    {
        key: 3,
        measure: 'squareMeters',
        name: 'meters²',
        abbreviation: 'm²'
    },
    {
        key: 4,
        measure: 'squareKilometers',
        name: 'kilometers²',
        abbreviation: 'km²'
    }
];
 
export default function AreaMode(props) {

  const [{ expressionString }, dispatch] = useReducer(reducer, {})

    const { currentMode, modeName } = props;
    if (currentMode !== modeName) return null;
    
    return (
      <div className='calculator-container area-container'>
          <Convert MEASURES={MEASURES} expressionString={expressionString}></Convert>
          <ConvertGrid className='area-grid' dispatch={dispatch}></ConvertGrid>
      </div>
    )
  }
  