
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'react-mdl';
import classNames from 'classnames';

import Colors from '../../../../util/colors';
import { changeClue } from './actions';
import { currentClue } from '../accessors';


const mapStateToClueProps = (state, ownProps) => {
    const curClue = currentClue(state);
    return {
        isCurrentClue:
            ownProps.direction === curClue.direction &&
            ownProps.number    === curClue.number
    };
};

const Clue = connect(mapStateToClueProps, { changeClue })(
    class Clue extends Component {
        static propTypes = {
            number       : PropTypes.number.isRequired,
            direction    : PropTypes.string.isRequired,
            changeClue   : PropTypes.func.isRequired,
            isCurrentClue: PropTypes.bool.isRequired,
            text         : PropTypes.string.isRequired
        };

        render () {
            const { number, text, isCurrentClue } = this.props;
            const clueClasses = classNames('clue', {
                [Colors.accent200]: isCurrentClue
            });

            return (
                <ListItem className={clueClasses} onClick={this.handleClick}>
                    <div className="clue-content">
                        <span className="clue-list-number">{number}.</span>
                        <span className="clue-list-text">{text}</span>
                    </div>
                </ListItem>
            );
        }

        handleClick = () => {
            const { number, direction, changeClue } = this.props;
            changeClue(direction, number);
        }
    }
);


export class ClueColumn extends Component {
    static propTypes = {
        clues    : PropTypes.object.isRequired,
        direction: PropTypes.string.isRequired
    };

    render () {
        const { clues, direction } = this.props;

        return (
            <div className="clue-column">
                <div className={`clue-column-header ${Colors.primary500}`}>
                    {direction.toUpperCase()}
                </div>

                <div className="clue-list-wrapper">
                    <List className="clue-list">
                        {clues.entrySeq().map(([number, text]) =>
                            <Clue
                                key={number}
                                number={number}
                                text={text}
                                direction={direction}
                            />
                        )}
                    </List>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => ({
    clues: state.getIn(['puzzle', 'clues', ownProps.direction])
});

export default connect(mapStateToProps)(ClueColumn);
