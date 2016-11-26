
import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Board, ClueBar, ClueDirectory } from '.';
import './Crossword.styl';


export class Crossword extends PureComponent {
    static propTypes = {
        board   : PropTypes.object.isRequired,
        position: PropTypes.object.isRequired
    }

    render () {
        return (
            <div id="crossword">
                <div id="clue-bar-board-wrapper">
                    <ClueBar
                        currentClue={this.state.currentClue}
                        board={this.props.board}
                    />

                    <Board
                        board={this.props.board}
                        currentClue={this.props.currentClue}
                        updateClue={this.updateClue}
                    />
                </div>

                <ClueDirectory
                    currentClue={this.state.currentClue}
                    board={this.props.board}
                />
            </div>
        );
    }

    updateClue = clue => this.setState({ currentClue: clue });
}

function mapStateToProps (state) {
    return {
        board   : state.get('puzzle'),
        position: state.get('position')
    };
}

export default connect(mapStateToProps)(Crossword);
