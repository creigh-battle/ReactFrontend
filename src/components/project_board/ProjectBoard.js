import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Backlog from "./Backlog";
import { connect } from "react-redux";
import { getBacklog } from "../../actions/backlogActions";

function ProjectBoard(props) {
  const { id } = props.match.params;
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors(props.errors);
  }, [props.errors]);

  useEffect(() => {
    props.getBacklog(id);
    console.log(props);
  }, []);

  let BoardContent;

  const boardAlgo = (errors, project_tasks) => {
    if (project_tasks.length < 1) {
      if (errors.projectNotFound) {
        return (
          <div className="alert alert-danger text-center" role="alert">
            {errors.projectNotFound}
          </div>
        );
      } else if (errors.projectIdentifier) {
        return (
          <div className="alert alert-danger text-center" role="alert">
            {errors.projectIdentifier}
          </div>
        );
      } else {
        return (
          <div className="alert alert-info text-center" role="alert">
            No Project Tasks on this board.
          </div>
        );
      }
    } else {
      return <Backlog project_tasks={props.backlog.project_tasks} />;
    }
  };

  BoardContent = boardAlgo(errors, props.backlog.project_tasks);

  return (
    <div className="container">
      <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
        <i className="fas fa-plus-circle"> Create Project Task</i>
      </Link>

      <br />
      <hr />
      {BoardContent}
    </div>
  );
}

const mapStateToProps = (state) => ({
  backlog: state.backlog,
  errors: state.errors,
});

export default connect(mapStateToProps, { getBacklog })(ProjectBoard);
