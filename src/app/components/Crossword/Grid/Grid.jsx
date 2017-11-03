
import React  from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card } from 'mdc';

import Cell from './Cell';
import './Grid.styl';


/* eslint-disable react/no-array-index-key */
const Grid = ({ grid }) => (
    <Card id="board" raised>
        {grid.map((row, i) => (
            <div key={i} className="board-row">
                {row.map((cell, j) => (
                    <div key={j} className="board-cell">
                        <Cell row={i} col={j} />
                    </div>
                ))}
            </div>
        ))}
    </Card>
);
/* eslint-enable react/no-array-index-key */

Grid.propTypes = {
    grid: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    grid: state.getIn(['puzzle', 'grid'])
});

export default connect(mapStateToProps)(Grid);
