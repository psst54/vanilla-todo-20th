class TaskViewModel {
  constructor() {
    this.taskList = new Map();
  }

  addTask(title, subjectId) {
    const task = new Task(title, subjectId);
    if (!this.taskList.has(subjectId)) {
      this.taskList.set(subjectId, []);
    }
    this.taskList.get(subjectId).push(task);
  }

  getTasksBySubject(subjectId) {
    return this.taskList.get(subjectId) || [];
  }
}
