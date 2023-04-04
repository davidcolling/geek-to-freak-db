import React from 'react';
import {Button} from '../Elements.js';

export const EquipmentAdderView = ({post, handleChange}) => {
    return (
        <div>
            <p>Name</p>
            <input id="name" type="text" onChange={(e) => handleChange(e)} />
            <p>This is a free-weight.</p>
            <input id="isFreeWeight" type="checkbox" onChange={(e) => handleChange(e)} />
            <p>Notes</p>
            <input id="notes" type="text" onChange={(e) => handleChange(e)} />
            <Button onClick={post}>Add</Button>
        </div>
    )
}

export default EquipmentAdderView;

