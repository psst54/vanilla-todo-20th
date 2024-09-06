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

    formElement.append(inputElement, buttonElement);

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
    const taskListElement = document.getElementById(`${subjectId}-task-list`);
    taskListElement.innerHTML = '';

    taskListElement.appendChild(this.#createTaskInputElement(subjectId));

    this.#getTasksBySubject(subjectId).forEach((task) => {
      const taskElement = createElement('li', {
        class: 'task',
      });
      const checkboxElement = createElement('input', {
        type: 'checkbox',
      });
      const titleElement = createElement('p', {
        innerText: task.getTitle(),
      });
      const deleteButtonElement = createElement('button', {
        innerText: '삭제',
      });

      taskElement.append(checkboxElement, titleElement, deleteButtonElement);
      taskListElement.appendChild(taskElement);
    });
  }
}
