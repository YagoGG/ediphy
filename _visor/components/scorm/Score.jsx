import React from 'react';
import PropTypes from 'prop-types';

export default class Score extends React.Component {
    render() {
        let score = this.props.exercises.score * 100;
        let pass = (this.props.exercises.minForPass || 50) <= score;

        if (this.props.exercises.attempted) {
            return <div className={"pageScore score" + (pass ? "Pass" : "Fail")}>
                Your score is <br/>
                <span>{score + '%'}</span>
            </div>;
        }
        return null;
    }
}

Score.propTypes = {
    /**
   * Object containing all the exercises in the course
   */
    exercises: PropTypes.object.isRequired,

};
