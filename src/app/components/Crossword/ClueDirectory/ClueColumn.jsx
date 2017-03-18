
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Colors from '../../../../util/colors';
import ClueList from './ClueList.jsx';
import * as actions from '../../../reducers/actions';


export class ClueColumn extends Component {
    static propTypes = {
        clues      : PropTypes.object.isRequired,
        currentClue: PropTypes.object.isRequired,
        direction  : PropTypes.string.isRequired,
        changeClue : PropTypes.func.isRequired
    };

    render () {
        const { clues, currentClue, direction } = this.props;
        return (
            <div className="clue-column">
                <div className={`clue-column-header ${Colors.primary500}`}>
                    {direction.toUpperCase()}
                </div>

                <div className="clue-list-wrapper">
                    <ClueList
                        clues={clues.get(direction)}
                        direction={direction}
                        currentClue={currentClue}
                        onClueClick={this.handleClueClick} />
                </div>
            </div>
        );
    }

    handleClueClick = (number) => {
        const { direction } = this.props;
        this.props.changeClue(direction, number);
    }
}


export default connect(null, actions)(ClueColumn);
