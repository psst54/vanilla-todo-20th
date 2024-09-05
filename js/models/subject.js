class Subject {
  constructor(title = 'New Subject') {
    this.title = title;
    this.taskList = [];
  }

  addTask(task) {
    this.taskList.push(task);
  }
}
