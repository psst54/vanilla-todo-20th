class Subject {
  constructor(title = 'New Subject', state = OPEN) {
    this.title = title;
    this.taskList = [];
    this.state = state;
  }

  addTask(task) {
    this.taskList.push(task);
  }

  getTitle() {
    return this.title;
  }

  getState() {
    return this.state;
  }
}
