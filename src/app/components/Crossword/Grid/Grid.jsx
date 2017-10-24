
import React  from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Grid as GridMDL, Cell } from 'mdc';

import GridCell from './Cell';
import './Grid.styl';


/* eslint-disable react/no-array-index-key */
const Grid = ({ grid }) => (
    <Card id="board" shadow={3}>
        {grid.map((row, i) => (
            <GridMDL key={i} className="board-row">
                {row.map((cell, j) => (
                    <Cell col={1} key={j} className="board-cell">
                        <GridCell row={i} col={j} />
                    </Cell>
                ))}
            </GridMDL>
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
