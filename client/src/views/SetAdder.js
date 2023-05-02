import React from 'react'; 
import {BigTextInput, P, WideButton, NumberInput} from '../elements/elements.js';
import Check from '../elements/Check.js';
import DropDown from '../elements/DropDown.js';

export const SetAdder = ({currentSet, handleChange, post, handleLastRepComplete, equipment}) => {
   return (
        <div>
            <DropDown 
                items={equipment.map( (item) => {
                    var output = item.name;
                    if (item.isFreeWeight) {
                        output += " FW";
                    }
                    return output;
                } ) } 
                textTransform="capitalize" 
                onChange={(e) => handleChange(e)} 
                value={currentSet.equipment} 
            />
            <P>Reps</P>
            <NumberInput id="reps" onChange={(e) => handleChange(e)}  type="number"  value={currentSet.reps} />
            <P>Weight</P>
            <NumberInput id="weight" onChange={(e) => handleChange(e)}  type="number" value={currentSet.weight}/>
            <P>Was the last rep complete?</P>
            <Check id="lastRepComplete" checked={currentSet.lastRepComplete} onClick={(e) => handleLastRepComplete({target: {id: "lastRepComplete"}} )} />
            <P>Did you lift both sides of your body simultaneously?</P>
            <Check id="isLR" checked={currentSet.isLR} onClick={(e) => handleLastRepComplete({target: {id: "isLR"}} )} />
            { 
                !currentSet.isLR 
                && 
                <DropDown id="isL" items={["right", "left"]} onChange={(e) => handleChange({target: {id: "isL"}})} textTransform="uppercase" />
            }
            <P>Notes</P>
            <BigTextInput id="notes" type="text" onChange={(e) => handleChange(e)} />
            <WideButton onClick={post} >Add</WideButton>
        </div>
    );
}

export default SetAdder;

