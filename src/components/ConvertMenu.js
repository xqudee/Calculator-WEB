export default function ConvertMenu(props) {
    const { divClass, measuresArray, firstMeasure, visibleMenu, setVisible, setMeasure } = props;

    function showMenu(visibleMenu, setVisible) {
        setVisible(!visibleMenu);
    }
    
    function changeMeasure(setMeasure, measure, setVisibleMenu, visibleMenu) {
        setMeasure(measure);
        setVisibleMenu(!visibleMenu);
    }

    return (
        <div class={`convert-div ${divClass}`}>
            <button class={`select ${divClass}`} onClick={ () => showMenu(visibleMenu, setVisible) }>{firstMeasure.name}</button>
            <div class={ `select_menu ${divClass} ${visibleMenu ? 'active_menu_len' : ''}`}>
                {measuresArray.map((measure) => {
                    return <button
                        key={measure.key}
                        onClick={ () => changeMeasure(setMeasure, measure, setVisible, visibleMenu) }
                        className="select"
                    >
                        {measure.name}
                    </button>
                })}
            </div>
        </div>
    );
}