import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import data from './data';
import './styles.css';

export default function Accordian() {

    const [selected, setSelected] = useState(null);
    const [enableMultiSelection, setEnableMultiSelection] = useState(false);
    const [multiple, setMultiple] = useState([]);
    const contentRefs = useRef({});

    useEffect(() => {
        data.forEach(dataItem => {
            //Check if contentRefs.current[dataItem.id] is available, if not return
            const content = contentRefs.current[dataItem.id];
            if (!content) return;

            //Check if enableMultiSelection is true, if yes, check if multiple includes dataItem.id, 
            // if yes, set maxHeight to content.scrollHeight and opacity to 1, 
            // if not set maxHeight to 0 and opacity to 0
            if (enableMultiSelection) {
                if (multiple.includes(dataItem.id)) {
                  gsap.to(content, { maxHeight: content.scrollHeight, opacity: 1, duration: 0.3 });
                } else {
                  gsap.to(content, { maxHeight: 0, opacity: 0, duration: 0.3 });
                }
              } 
              //If enableMultiSelection is false, check if dataItem.id is equal to selected,
              // if yes, set maxHeight to content.scrollHeight and opacity to 1,
              // if not set maxHeight to 0 and opacity to 0
              else {
                if (dataItem.id === selected) {
                  gsap.to(content, { maxHeight: content.scrollHeight, opacity: 1, duration: 0.3 });
                } else {
                  gsap.to(content, { maxHeight: 0, opacity: 0, duration: 0.3 });
                }
              }
        });
    }, [selected, multiple, enableMultiSelection]);

    function handleSingleSelection(getCurrentId) {
        //Check if selected is equal to getCurrentId, 
        // if yes, set selected to null, 
        // if not set selected to getCurrentId
        setSelected(getCurrentId === selected ? null : getCurrentId);
    }

    function handleMultipleSelection(getCurrentId) {
        //Check if multiple includes getCurrentId,
        let copyMultiple = [...multiple];
        const findIndexOfCurrentId = copyMultiple.indexOf(getCurrentId);
        // if yes, remove getCurrentId from multiple,
        if (findIndexOfCurrentId === -1) copyMultiple.push(getCurrentId);
        // if not, add getCurrentId to multiple
        else copyMultiple.splice(findIndexOfCurrentId, 1);
        setMultiple(copyMultiple);
    }

    return <div className="wrapper">
        <button onClick={() =>
            setEnableMultiSelection(!enableMultiSelection)}
            className={enableMultiSelection ? 'multiselectOn' : 'multiselectOff'}
        >
            {enableMultiSelection ? "Disable Multi Selection" : "Disable Multi Selection"}
        </button>
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
                            <div
                                className="content"
                                ref={el => contentRefs.current[dataItem.id] = el}
                            >
                                <p>{dataItem.answer}</p>
                            </div>
                        </div>)
                    //If no data is available, show a message
                    : <div>No data found!</div>
            }
        </div>
    </div>
}