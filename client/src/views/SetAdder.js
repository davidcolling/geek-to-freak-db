import React from 'react'; 
import {DropDown, Check, P, ContentContainer, WideButton, NumberInput} from '../Elements.js';

export const SetAdder = ({handleChange, post, getLastRepComplete, handleLastRepComplete}) => {
   return (
        <div>
            <ContentContainer>
                <P> Equipment Selector </P>
                <P>Reps</P>
                <NumberInput id="reps" onChange={(e) => handleChange(e)}  type="number" />
                <DropDown items={[1, 2, 3, 4]} />
                <P>Weight</P>
                <NumberInput id="weight" onChange={(e) => handleChange(e)}  type="number" />
                <P>Was the last rep complete?</P>
                <Check id="lastRepComplete" checked={getLastRepComplete} onClick={(e) => handleLastRepComplete({target: {id: "lastRepComplete"}} )} />
                <P>Did you lift both sides of your body simultaneously?</P>
                <P>Notes</P>
                <input id="notes" type="text" onChange={(e) => handleChange(e)} />
            </ContentContainer>
            <WideButton onClick={post} >Add</WideButton>
        </div>
    );
}

export default SetAdder;

