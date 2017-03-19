
import React from 'react';
import { Card } from 'react-mdl';

import ClueColumn from './ClueColumn.jsx';
import './ClueDirectory.styl';


export default () => (
    <Card id="clue-directory" shadow={3}>
        <ClueColumn direction="across" />
        <ClueColumn direction="down" />
    </Card>
);
