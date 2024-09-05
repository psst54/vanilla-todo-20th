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

    this.render(subjectId);
  }

  getTasksBySubject(subjectId) {
    return this.taskList.get(subjectId) || [];
  }

  render(subjectId) {
    const taskListElementId = `${subjectId}-task-list`;
    const taskListElement = document.getElementById(taskListElementId);
    taskListElement.innerHTML = '';

    this.getTasksBySubject(subjectId).forEach((task) => {
      const taskElement = document.createElement('li');
      taskElement.className = 'task';
      const checkboxElement = document.createElement('input');
      checkboxElement.type = 'checkbox';
      const titleElement = document.createElement('p');
      titleElement.innerText = task.getTitle();

      taskElement.appendChild(checkboxElement);
      taskElement.appendChild(titleElement);
      taskListElement.appendChild(taskElement);
    });
  }
}
