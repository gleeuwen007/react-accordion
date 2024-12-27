import React, { useState } from 'react';
import data from './data';
import './styles.css';

export default function Accordian() {

    const [selected, setSelected] = useState(null);
    const [enableMultiSelection, setEnableMultiSelection] = useState(false);
    const [multiple, setMultiple] = useState([]);

    function handleSingleSelection(getCurrentId) {
        //Check if selected is equal to getCurrentId, if yes, set selected to null, if not set selected to getCurrentId
        setSelected(getCurrentId === selected ? null : getCurrentId);
    }

    function handleMultipleSelection(getCurrentId) {
        let copyMultiple = [...multiple];
        const findIndexOfCurrentId = copyMultiple.indexOf(getCurrentId);
        if (findIndexOfCurrentId === -1) copyMultiple.push(getCurrentId);
        else copyMultiple.splice(findIndexOfCurrentId, 1);
        setMultiple(copyMultiple);
    }

    return <div className="wrapper">
        <button onClick={() => setEnableMultiSelection(!enableMultiSelection)} className={enableMultiSelection ? 'multiselectOn' : 'multiselectOff'}>{enableMultiSelection ? "Disable Multi Selection" : "Enable Multi Selection"}</button>
        <div className="accordian">
            {
                //Check if data is available and has more than 0 elements
                data && data.length > 0 ?
                    //Loop through the data and show the items. 
                    data.map(dataItem =>
                        <div className="item" key={dataItem.id}>
                            <div onClick={
                                enableMultiSelection
                                    ? () => handleMultipleSelection(dataItem.id)
                                    : () => handleSingleSelection(dataItem.id)
                            }
                                className="title">
                                <h3>{dataItem.question}</h3>
                                <span>+</span>
                            </div>
                            {
                                // If enableMultiSelection is true, check if the current item is in the multiple array, 
                                // if yes, show the content, if not, hide it. 
                                enableMultiSelection
                                    ? multiple.indexOf(dataItem.id) !== -1 && (
                                        <div className="content">
                                            <p>{dataItem.answer}</p>
                                        </div>
                                    )
                                    // If enableMultiSelection is false, check if the current item is equal to selected, 
                                    // if yes, show the content, if not, hide it.
                                    : selected === dataItem.id && (
                                        <div className="content">
                                            <p>{dataItem.answer}</p>
                                        </div>
                                    )
                            }
                        </div>)
                    //If no data is available, show a message
                    : <div>No data found!</div>
            }
        </div>
    </div>
}