import React from 'react'; 
import {BigTextInput, DropDown, Check, P, WideButton, NumberInput} from '../Elements.js';

export const SetAdder = ({currentSet, handleChange, post, handleLastRepComplete, equipment}) => {
   return (
        <div>
            <DropDown items={equipment} />
            <P>Reps</P>
            <NumberInput id="reps" onChange={(e) => handleChange(e)}  type="number"  value={currentSet.reps} />
            <DropDown items={[1, 2, 3, 4]} />
            <P>Weight</P>
            <NumberInput id="weight" onChange={(e) => handleChange(e)}  type="number" value={currentSet.weight}/>
            <P>Was the last rep complete?</P>
            <Check id="lastRepComplete" checked={currentSet.lastRepComplete} onClick={(e) => handleLastRepComplete({target: {id: "lastRepComplete"}} )} />
            <P>Did you lift both sides of your body simultaneously?</P>
            <Check id="isLR" checked={currentSet.isLR} onClick={(e) => handleLastRepComplete({target: {id: "isLR"}} )} />
            { 
                !currentSet.isLR 
                && 
                <DropDown id="isL" items={["right", "left"]} onChange={(e) => handleChange({target: {id: "isL"}})} />
            }
            <P>Notes</P>
            <BigTextInput id="notes" type="text" onChange={(e) => handleChange(e)} />
            <WideButton onClick={post} >Add</WideButton>
        </div>
    );
}

export default SetAdder;

