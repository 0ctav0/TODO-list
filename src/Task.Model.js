class TaskModel {
  text = "";
  status = TaskModel.NONE;

  constructor(text) {
    this.text = text;
  }
}
TaskModel.NONE = "";
TaskModel.CHECKED = "checked";
TaskModel.ARCHIVED = "archived";

export default TaskModel;