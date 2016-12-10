
import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Grid, ClueBar, ClueDirectory } from '.';
import Helpers from '../../helpers';
import './Crossword.styl';


export class Crossword extends PureComponent {
    static propTypes = {
        puzzle  : PropTypes.object.isRequired,
        position: PropTypes.object.isRequired
    }

    render () {
        const { puzzle, position } = this.props;
        const currentClue = Helpers.currentClue(puzzle, position);

        return (
            <div id="crossword">
                <div id="clue-bar-board-wrapper">
                    <ClueBar currentClue={currentClue} />

                    <Grid
                        puzzle={puzzle}
                        position={position}
                        updateClue={this.updateClue} />
                </div>

                <ClueDirectory
                    clues={puzzle.get('clues')}
                    currentClue={currentClue} />
            </div>
        );
    }

    updateClue = clue => this.setState({ currentClue: clue });
}

function mapStateToProps (state) {
    return {
        puzzle  : state.get('puzzle'),
        position: state.get('position')
    };
}

export default connect(mapStateToProps)(Crossword);
