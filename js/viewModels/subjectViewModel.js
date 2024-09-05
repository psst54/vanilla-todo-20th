class SubjectViewModel {
  constructor(taskViewModel) {
    this.subjectList = [];
    this.taskViewModel = taskViewModel;
  }

  addSubject(subject) {
    this.subjectList.push(subject);
    this.render();
  }

  render() {
    const columnList = [OPEN, DONE];

    columnList.forEach((column) => {
      const subjectListElement = document.getElementById(
        `${column}-subject-list`
      );
      subjectListElement.innerHTML = '';

      this.subjectList.forEach((subject) => {
        const subjectId = subject.getId();
        const taskListElementId = `${subjectId}-task-list`;
        if (subject.getState() !== column) return;

        const subjectElement = document.createElement('li');
        subjectElement.classList.add('card');
        subjectElement.innerHTML = `
            <header>
              <h3>${subject.getTitle()}</h3>
            <header>
            <main>
              <ol id=${taskListElementId}>
              </ol>
            </main>
            `;
        subjectListElement.appendChild(subjectElement);

        const taskListElement = document.getElementById(taskListElementId);
        this.renderTasks(subjectId, taskListElement);
      });
    });
  }

  renderTasks(subjectId, taskListElement) {
    this.taskViewModel.getTasksBySubject(subjectId).forEach((task) => {
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
