import React from "react";
import "./TODO.sass";
import Task from "./Task.Component";
import TaskModel from "./Task.Model";


class TODO extends React.Component {

  constructor(props) {
    super(props);

    this.inputTaskCreatorRef = React.createRef();

    const savedData = localStorage.getItem("TODO");
    if (savedData && savedData != "undefined") {
      this.state = JSON.parse(savedData);
    }
    else {
      this.state = {
        newTaskText: "",
        tasks: [],
        isArchiveCurrentTab: false,
      }
    }
  }

  componentDidMount() {
    this.inputTaskCreatorRef.current && this.inputTaskCreatorRef.current.focus();
  }

  componentDidUpdate(prevState) {
    this.saveStateToLocalStorage();
  }

  saveStateToLocalStorage() {
    localStorage.setItem("TODO", JSON.stringify(this.state));
  }

  createTask = () => {
    if (this.state.newTaskText !== "") {
      const tasks = [new TaskModel(this.state.newTaskText), ...this.state.tasks];
      this.setState({newTaskText: "", tasks});
      this.inputTaskCreatorRef.current.focus();
    }
  }

  onPressEnter = e => {
    if (e.key === "Enter") {
      this.createTask();
    }
  }

  onChange = e => {
    this.setState({newTaskText: e.target.value});
  }

  editTask = (taskId, newText) => {
    const tasks = this.state.tasks.slice();
    tasks[taskId].text = newText;
    this.setState({tasks});
  }

  deleteTask = taskId => {
    const tasks = this.state.tasks.filter((task, i) => i !== taskId);
    this.setState({tasks});
  }

  checkTask = taskId => {
    const tasks = this.state.tasks.slice();
    tasks[taskId].status = TaskModel.CHECKED;
    this.setState({tasks});
  }

  archiveTask = taskId => {
    const tasks = this.state.tasks.slice();
    tasks[taskId].status = tasks[taskId].status === TaskModel.ARCHIVED ? TaskModel.NONE : TaskModel.ARCHIVED;
    this.setState({tasks});
  }

  shouldTaskRender(task) {
    return (
      (!this.state.isArchiveCurrentTab && (task.status === TaskModel.NONE || task.status === TaskModel.CHECKED) ) 
      || (this.state.isArchiveCurrentTab && task.status === TaskModel.ARCHIVED)
    );
  }

  render() {
    return (
      <div id="todo">
        <h1 className="title">TODO Мой Список Дел</h1>
        <div className="header">
          <button className={!this.state.isArchiveCurrentTab ? "selected" : undefined} onClick={e => this.setState({isArchiveCurrentTab: false})}>Текущие задачи</button>
          <button className={this.state.isArchiveCurrentTab ? "selected" : undefined} onClick={e => this.setState({isArchiveCurrentTab: true})}>Архив</button>
        </div>
        <div className="actions">
          {!this.state.isArchiveCurrentTab &&
            <React.Fragment>
              <input 
                type="text"
                placeholder="Сделать то-то"
                ref={this.inputTaskCreatorRef} 
                value={this.state.newTaskText} 
                onChange={this.onChange}
                onKeyPress={this.onPressEnter}
              />
              <button className="btn add" onClick={this.createTask}></button>
            </React.Fragment>
          }
        </div>
        <div className="content">
          {this.state.tasks.map((task, i) => {
            if (this.shouldTaskRender(task))
              return <Task 
                key={i} 
                taskId={i}
                status={task.status}
                text={task.text} 
                onChange={this.editTask} 
                onDelete={this.deleteTask}
                onCheck={this.checkTask}
                onArchive={this.archiveTask}
              />
          })}
        </div>
      </div>
    );
  }
}

export default TODO;