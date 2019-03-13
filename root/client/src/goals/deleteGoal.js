import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import history from "../history";
import { Link } from "react-router-dom";
import * as actions from "../actions";
import AddGoal from "../forms/addGoalForm.js";
import Card from "@material-ui/core/Card";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  card: {
    minWidth: 420,
    margin: "25px",
    padding: "15px",
    width: "50px"
  },
  page: {
    minWidth: 420
  }
};

class DeleteGoal extends React.Component {
  componentDidMount() {
    // this.props.fetchGoal(this.props.goalId);
  }

  onSubmit = formValues => {
    this.props.editGoal(this.props.goalId, formValues);
  };

  render() {
    console.log(this.props);
    const { classes } = this.props;

    if (!this.props.goal) {
      return (
        <div className="edit-content">
          <h1>loading...</h1>
        </div>
      );
    }
    return (
      <div className={classes.page}>
        <Card align="center" className={classes.card}>
          <button onClick={() => this.props.deleteGoal(this.props.goalId)}>
            Delete
          </button>
          <button>Cancle</button>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { goal: state.goal[ownProps.goalId] };
};

DeleteGoal.propTypes = {
  classes: PropTypes.object.isRequired
};
const wrapper = withStyles(styles)(DeleteGoal);

export default connect(
  mapStateToProps,
  actions
)(wrapper);