import React from "react";
import TaskModel from "./Task.Model";


class Task extends React.Component {

  getClassesName() {
    return `task ${this.props.status}`;
  }

  onChange = e => {
    this.props.onChange(this.props.taskId, e.target.value);
  }

  onDelete = e => {
    this.props.onDelete(this.props.taskId);
  }

  onCheck = e => {
    this.props.onCheck(this.props.taskId);
  }

  onArchive = e => {
    this.props.onArchive(this.props.taskId);
  }

  getButtons() {
    if (this.props.status === TaskModel.NONE) 
      return <button className="btn check" onClick={this.onCheck}></button>;
    if (this.props.status === TaskModel.CHECKED) 
      return <button className="btn archive" onClick={this.onArchive}></button>;
    if (this.props.status === TaskModel.ARCHIVED)    
      return <button className="btn undo" onClick={this.onArchive}></button>;
  }

  render() {
    return (
      <div className={this.getClassesName()}>
        {this.getButtons()}
        <input 
          type="text" 
          value={this.props.text} 
          onChange={this.onChange}
        />
        <button className="btn trash" onClick={this.onDelete}></button>
      </div>
    );
  }
}

export default Task;