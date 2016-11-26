
import React, { Component, PropTypes } from 'react';
import { Card } from 'react-mdl';

import ClueColumn from './ClueColumn';
import './ClueDirectory.styl';


export default class ClueDirectory extends Component {
    static propTypes = {
        board      : PropTypes.object.isRequired,
        currentClue: PropTypes.object.isRequired
    };

    render () {
        return (
            <Card id="clue-directory" shadow={3}>
                <ClueColumn {...this.props} direction="across"/>
                <ClueColumn {...this.props} direction="down"/>
            </Card>
        );
    }
}
