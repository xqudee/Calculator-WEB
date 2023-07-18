import { useState } from "react";
import { ALL_MEASURES } from "../Functions";
import ConvertMenu from "./ConvertMenu";

export default function Convert(props) {
    const { MEASURES, expressionString } = props;
    
    const measuresArray = MEASURES;
    const [ firstMeasure, setFirstMeasure ] = useState(measuresArray[1]);
    const [ secondMeasure, setSecondMeasure ] = useState(measuresArray[1]);
    const [ visibleFirstMenu, setVisibleFirst ] = useState(false);
    const [ visibleSecondMenu, setVisibleSecond ] = useState(false);

    let result = 0;

    function calculateLength() {
        const conversionRates = {
            //LENGTH
            [ALL_MEASURES.milimeters]: {
                [ALL_MEASURES.milimeters]: 1,
                [ALL_MEASURES.santimeters]: 0.1,
                [ALL_MEASURES.meters]: 0.001,
                [ALL_MEASURES.kilometers]: 0.000001
            },
            [ALL_MEASURES.santimeters]: {
                [ALL_MEASURES.milimeters]: 10,
                [ALL_MEASURES.santimeters]: 1,
                [ALL_MEASURES.meters]: 0.01,
                [ALL_MEASURES.kilometers]: 0.00001
            },
            [ALL_MEASURES.meters]: {
                [ALL_MEASURES.milimeters]: 1000,
                [ALL_MEASURES.santimeters]: 100,
                [ALL_MEASURES.meters]: 1,
                [ALL_MEASURES.kilometers]: 0.001
            },
            [ALL_MEASURES.kilometers]: {
                [ALL_MEASURES.milimeters]: 1000000,
                [ALL_MEASURES.santimeters]: 100000,
                [ALL_MEASURES.meters]: 1000,
                [ALL_MEASURES.kilometers]: 1
            },
            //WEIGHT
            [ALL_MEASURES.milligrams]: {
                [ALL_MEASURES.milligrams]: 1,
                [ALL_MEASURES.grams]: 0.001,
                [ALL_MEASURES.kilograms]: 0.000001
            },
            [ALL_MEASURES.grams]: {
                [ALL_MEASURES.milligrams]: 1000,
                [ALL_MEASURES.grams]: 1,
                [ALL_MEASURES.kilograms]: 0.001
            },
            [ALL_MEASURES.kilograms]: {
                [ALL_MEASURES.milligrams]: 1000000,
                [ALL_MEASURES.grams]: 1000,
                [ALL_MEASURES.kilograms]: 1
            },
            //AREA
            [ALL_MEASURES.squareMilimeters]: {
                [ALL_MEASURES.squareMilimeters]: 1,
                [ALL_MEASURES.squareSantimeters]: 0.01,
                [ALL_MEASURES.squareMeters]: 0.000001,
                [ALL_MEASURES.squareKilometers]: 0.000000000001
            },
            [ALL_MEASURES.squareSantimeters]: {
                [ALL_MEASURES.squareMilimeters]: 100,
                [ALL_MEASURES.squareSantimeters]: 1,
                [ALL_MEASURES.squareMeters]: 0.0001,
                [ALL_MEASURES.squareKilometers]: 0.0000000001
            },
            [ALL_MEASURES.squareMeters]: {
                [ALL_MEASURES.squareMilimeters]: 1000000,
                [ALL_MEASURES.squareSantimeters]: 10000,
                [ALL_MEASURES.squareMeters]: 1,
                [ALL_MEASURES.squareKilometers]: 0.000001
            },
            [ALL_MEASURES.squareKilometers]: {
                [ALL_MEASURES.squareMilimeters]: 1000000000000,
                [ALL_MEASURES.squareSantimeters]: 10000000000,
                [ALL_MEASURES.squareMeters]: 1000000,
                [ALL_MEASURES.squareKilometers]: 1
            }
        };
        console.log(firstMeasure.measure)
        let conversionRate = conversionRates[firstMeasure.measure][secondMeasure.measure];
        result = parseInt(expressionString) * conversionRate;
    }

    calculateLength();

    return (
        <div className='output'>
            <div className='active-result'>{expressionString || '0'} {firstMeasure.abbreviation}</div>
            <div className={ `result` }>= {result || '0'} {secondMeasure.abbreviation}</div>
            <div class="convert_menu-container">
                <div className="main_convert-div">
                    <ConvertMenu 
                        divClass='first' 
                        measuresArray={measuresArray}
                        firstMeasure={firstMeasure}
                        visibleMenu={visibleFirstMenu} 
                        setVisible={setVisibleFirst}
                        setMeasure={setFirstMeasure}></ConvertMenu>
                    
                    <ConvertMenu 
                        divClass='second' 
                        measuresArray={measuresArray}
                        firstMeasure={secondMeasure}
                        visibleMenu={visibleSecondMenu} 
                        setVisible={setVisibleSecond}
                        setMeasure={setSecondMeasure}></ConvertMenu>
                    
                </div>
            </div>
        </div>
    )
}