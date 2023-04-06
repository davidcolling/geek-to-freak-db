import React from 'react'; 
import {P, ContentContainer, WideButton} from '../Elements.js';
import {CheckConnected} from '../redux/elements/CheckConnected.js';

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
                <CheckConnected id="lastRepComplete" type="checkbox" onChange={(e) => handleChange(e)} checked="on" />
                <P>Did you lift both sides of your body simultaneously?</P>
                <CheckConnected id="isLR" type="checkbox" onChange={(e) => handleChange(e)} checked="on" />
                <CheckConnected id="isL" type="checkbox" onChange={(e) => handleChange(e)} checked="on" />
                <P>Notes</P>
                <input id="notes" type="text" onChange={(e) => handleChange(e)} />
            </ContentContainer>
            <WideButton onClick={post} >Add</WideButton>
        </div>
    );
}

export default SetAdder;

