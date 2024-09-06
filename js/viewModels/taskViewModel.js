class TaskViewModel {
  #taskList;

  constructor() {
    this.#taskList = new Map();
  }

  addTask({ title, subjectId, isCompleted = false }) {
    const task = new Task({ title, isCompleted });
    if (!this.#taskList.has(subjectId)) {
      this.#taskList.set(subjectId, []);
    }
    this.#taskList.get(subjectId).push(task);
  }

  deleteTask(targetId, subjectId) {
    const taskList = this.#taskList.get(subjectId);
    const targetIndex = taskList.findIndex(
      (subject) => subject.getId() === targetId
    );
    taskList.splice(targetIndex, 1);
  }

  #getTasksBySubject(subjectId) {
    return this.#taskList.get(subjectId) || [];
  }

  #createTaskInputElement(subjectId) {
    const formElement = createElement('form', {
      id: `${subjectId}-add-task-form`,
    });
    const inputElement = createElement('input', {
      type: 'text',
      placeholder: '할 일을 입력해주세요',
      name: 'task-title',
    });
    const buttonElement = createElement('button', {
      innerText: '추가',
      class: 'add-task-button',
    });

    formElement.append(inputElement, buttonElement);

    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!inputElement.value) {
        return;
      }

      this.addTask({ title: inputElement.value, subjectId });

      const taskChangeEvent = new CustomEvent('taskChange', {
        bubbles: true,
      });
      formElement.dispatchEvent(taskChangeEvent);
    });

    return formElement;
  }

  getSubjectState(subjectId) {
    const taskList = this.#taskList.get(subjectId);
    if (!taskList) {
      return OPEN;
    }

    const taskCount = taskList.length;
    const doneTaskCount = taskList.filter((task) =>
      task.getIsCompleted()
    ).length;

    if (doneTaskCount === 0) {
      return OPEN;
    }
    if (taskCount === doneTaskCount) {
      return DONE;
    }
    return IN_PROGRESS;
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
        checked: task.getIsCompleted(),
        name: 'checkbox',
      });
      const titleElement = createElement('p', {
        innerText: task.getTitle(),
      });
      const deleteButtonElement = createElement('button', {
        innerText: '삭제',
      });
      if (task.getIsCompleted()) {
        taskElement.classList.toggle('isCompleted');
      }

      taskElement.append(checkboxElement, titleElement, deleteButtonElement);
      taskListElement.appendChild(taskElement);

      deleteButtonElement.addEventListener('click', () => {
        this.deleteTask(task.getId(), subjectId);

        const taskChangeEvent = new CustomEvent('taskChange', {
          bubbles: true,
        });
        deleteButtonElement.dispatchEvent(taskChangeEvent);
      });

      checkboxElement.addEventListener('change', (event) => {
        const isChecked = event.target.checked;
        task.setCompleted(isChecked);
        taskElement.classList.toggle('isCompleted');

        const taskChangeEvent = new CustomEvent('taskChange', {
          bubbles: true,
        });
        checkboxElement.dispatchEvent(taskChangeEvent);
      });
    });
  }
}
