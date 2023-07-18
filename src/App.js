import { useState } from "react";
import GeneralMode from "./calculator_modes/GeneralMode";
import ProgrammerMode from "./calculator_modes/ProgrammerMode";
import Menu from "./components/Menu";
import LengthMode from "./calculator_modes/LengthMode";
import WeightMode from "./calculator_modes/WeightMode";
import AreaMode from "./calculator_modes/AreaMode";

function App() {
  const [ currentMode, setCurrentMode ] = useState('GeneralMode');
  let content = null;

  switch (currentMode) {
    case 'GeneralMode':
      content = <GeneralMode></GeneralMode>
      break;
  
    case 'ProgrammerMode':
      content = <ProgrammerMode></ProgrammerMode>
      break;

    case 'LengthMode':
      content = <LengthMode></LengthMode>
      break;

    case 'WeightMode':
      content = <WeightMode></WeightMode>
      break;

    case 'AreaMode':
      content = <AreaMode></AreaMode>
      break;
  
    default:
      break;
  }

  return (
    <div className="main-container">
      <Menu setCurrentMode={setCurrentMode}></Menu>
      {content}
    </div>
  )
}

export default App;
