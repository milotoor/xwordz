
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

// App resources
import { List, ListItem } from 'mdc';

// Clue column resources
import { currentClue } from '../accessors';
import { changeClue } from './actions';


const mapStateToClueProps = (state, ownProps) => {
    const curClue = currentClue(state);
    return {
        isCurrentClue:
            ownProps.direction === curClue.direction &&
            ownProps.number === curClue.number
    };
};

@connect(mapStateToClueProps, { changeClue })
class Clue extends Component {
    static propTypes = {
        number       : PropTypes.number.isRequired,
        direction    : PropTypes.string.isRequired,
        changeClue   : PropTypes.func.isRequired,
        isCurrentClue: PropTypes.bool.isRequired,
        text         : PropTypes.string.isRequired
    };

    handleClick = () => {
        const { number, direction, changeClue } = this.props;
        changeClue(direction, number);
    };

    render () {
        const { number, text, isCurrentClue } = this.props;
        const clueClasses = classNames('clue', {
            'mdc-theme--secondary-bg': isCurrentClue
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
}


const mapStateToProps = (state, ownProps) => ({
    clues: state.getIn(['puzzle', 'clues', ownProps.direction])
});

@connect(mapStateToProps)
export default class ClueColumn extends Component {
    static propTypes = {
        clues    : PropTypes.object.isRequired,
        direction: PropTypes.string.isRequired
    };

    render () {
        const { clues, direction } = this.props;

        return (
            <div className="clue-column">
                <div className="clue-column-header mdc-theme--primary-bg">
                    {direction.toUpperCase()}
                </div>

                <div className="clue-list-wrapper">
                    <List className="clue-list">
                        {clues.entrySeq().map(([number, text]) => (
                            <Clue
                              key={number}
                              number={number}
                              text={text}
                              direction={direction}
                            />
                        ))}
                    </List>
                </div>
            </div>
        );
    }
}
