class TaskViewModel {
  #taskList;

  constructor() {
    this.#taskList = new Map();
  }

  addTask(title, subjectId) {
    const task = new Task(title, subjectId);
    if (!this.#taskList.has(subjectId)) {
      this.#taskList.set(subjectId, []);
    }
    this.#taskList.get(subjectId).push(task);

    this.render(subjectId);
  }

  #getTasksBySubject(subjectId) {
    return this.#taskList.get(subjectId) || [];
  }

  #createTaskInputElement(subjectId) {
    const formElement = createElement('form', {
      id: `${subjectId}-add-task-form`,
      class: 'add-task-form',
    });
    const inputElement = createElement('input', {
      type: 'text',
      placeholder: '할 일을 입력해주세요',
    });
    const buttonElement = createElement('button', {
      innerText: '추가',
    });

    formElement.appendChild(inputElement, buttonElement);

    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!inputElement.value) {
        return;
      }
      this.addTask(inputElement.value, subjectId);
    });

    return formElement;
  }

  render(subjectId) {
    const taskListElementId = `${subjectId}-task-list`;
    const taskListElement = document.getElementById(taskListElementId);
    taskListElement.innerHTML = '';

    taskListElement.appendChild(this.#createTaskInputElement(subjectId));

    this.#getTasksBySubject(subjectId).forEach((task) => {
      const taskElement = document.createElement('li');
      taskElement.classList.add('task');
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
