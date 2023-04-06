import React from 'react'; 
import {P, ContentContainer, Spacer, WideButton} from '../Elements.js';

export const SetAdder = ({handleChange, post}) => {
   return (
        <div>
            <ContentContainer>
                <P> Equipment Selector </P>
                <P>Reps</P>
                <input id="reps" type="number" min="0" max="8" onChange={(e) => handleChange(e)} />
                <br/>
                <input id="weight" type="number" min="0" max="5000" onChange={(e) => handleChange(e)} />
                <select id="unit" onChange={(e) => handleChange(e)} value="pounds" >
                    <option value="pounds">Pounds</option>
                    <option value="kilograms">Kilograms</option>
                </select>
                <P>Was the last rep complete?</P>
                <input id="lastRepComplete" type="checkbox" onChange={(e) => handleChange(e)} checked="on" />
                <P>Did you lift both sides of your body simultaneously?</P>
                <input id="isLR" type="checkbox" onChange={(e) => handleChange(e)} checked="on" />
                <input id="isL" type="checkbox" onChange={(e) => handleChange(e)} checked="on" />
                <P>Notes</P>
                <input id="notes" type="text" onChange={(e) => handleChange(e)} />
            </ContentContainer>
            <WideButton onClick={post} >Add</WideButton>
        </div>
    );
}

export default SetAdder;

