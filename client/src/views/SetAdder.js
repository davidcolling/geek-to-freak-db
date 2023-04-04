import React from 'react'; 
import {Button} from '../Elements.js';

export const SetAdder = ({handleChange, post}) => {
   return (
        <div>
            <p> Equipment Selector </p>
            <p>Reps</p>
            <input id="reps" type="number" min="0" max="8" onChange={(e) => handleChange(e)} />
            <br/>
            <input id="weight" type="number" min="0" max="5000" onChange={(e) => handleChange(e)} />
            <select id="unit" onChange={(e) => handleChange(e)} value="pounds" >
                <option value="pounds">Pounds</option>
                <option value="kilograms">Kilograms</option>
            </select>
            <p>Was the last rep complete?</p>
            <input id="lastRepComplete" type="checkbox" onChange={(e) => handleChange(e)} checked="on" />
            <p>Did you lift both sides of your body simultaneously?</p>
            <input id="isLR" type="checkbox" onChange={(e) => handleChange(e)} checked="on" />
            <input id="isL" type="checkbox" onChange={(e) => handleChange(e)} checked="on" />
            <p>Notes</p>
            <input id="notes" type="text" onChange={(e) => handleChange(e)} />
            <Button onClick={post} >Add</Button>
        </div>
    );
}

export default SetAdder;

