
import React from 'react';
import { Card } from 'mdc';

import ClueColumn from './ClueColumn';
import './ClueDirectory.styl';


export default () => (
    <Card id="clue-directory">
        <ClueColumn direction="across" />
        <ClueColumn direction="down" />
    </Card>
);
