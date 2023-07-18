import '../styles/Menu.css'
import { useState } from "react";
import { findKeyByValue } from '../Functions';

const MODES = {
    GeneralMode: 'General',
    ProgrammerMode: 'Programmer',
    LengthMode: 'Length',
    WeightMode: 'Weight',
    AreaMode: 'Area'
}

export default function Menu(props) {
    const { setCurrentMode } = props;
    const [ menuVisibility, setMenuVisibility ] = useState(false);
    
    function showMenu() {
        if (!menuVisibility) {
            setMenuVisibility(true);
        }
        else {
            setMenuVisibility(false);
        }
    }

    function setGeneralMode(name) {
        console.log(name);
        setCurrentMode(name);
        setMenuVisibility(!menuVisibility);
    }

    return ( 
        <div className="container">
            <div className={`menu-container ${menuVisibility ? 'menu-container-visible' : 'menu-container-invisible'}`}>
                <div className="menu_list">
                    {Object.values(MODES).map((mode) => {
                        return <button
                            onClick={ () => setGeneralMode(findKeyByValue(MODES, mode)) }
                            className='menu-item'
                        >
                            {mode}
                        </button>
                    })}
                </div>
            </div>
            <div id="menu" className="menu_button-div">
                <button onClick={ showMenu } className="menu_button">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                </svg>
                </button>
            </div>
        </div>
    )
}