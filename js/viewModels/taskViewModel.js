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
    const formId = `${subjectId}-add-task-form`;
    const formElement = document.createElement('form');
    formElement.id = formId;
    formElement.classList.add('add-task-form');

    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.placeholder = '할 일을 입력해주세요';

    const submitButtonElement = document.createElement('button');
    submitButtonElement.innerText = '추가';

    formElement.appendChild(inputElement);
    formElement.appendChild(submitButtonElement);

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
