class SubjectViewModel {
  #subjectList;
  #taskViewModel;

  constructor(taskViewModel) {
    this.#subjectList = new Map();
    STATE_LIST.forEach((state) => this.#subjectList.set(state, [])); // init all columns
    this.#taskViewModel = taskViewModel;
  }

  addSubject({ title, state = OPEN }) {
    const newSubject = new Subject({ title, state });

    this.#subjectList
      .get(state) // get the column where the subject will be inserted
      .push(newSubject);

    this.render();
    return newSubject;
  }

  deleteSubject(targetId, state) {
    // get the column from which the subject will be removed
    const subjectList = this.#subjectList.get(state);

    // get the index of the target subject by its ID
    const targetIndex = subjectList.findIndex(
      (subject) => subject.getId() === targetId
    );
    // remove the target subject from the column
    subjectList.splice(targetIndex, 1);

    this.render();
  }

  #getSubjectsByState(state) {
    return this.#subjectList.get(state) || [];
  }

  #createAddSubjectForm(state) {
    const addSubjectCardElement = createElement('li', {
      class: 'subject add-subject-card',
    });
    const formElement = createElement('form');
    const inputElement = createElement('input', {
      type: 'text',
      placeholder: NEW_SUBJECT_PLACEHOLDER,
      name: 'subject-title',
    });
    const addSubjectButtonElement = createElement('button', {
      class: 'add-subject-button',
      id: `add-subject-button-${state}`,
    });
    const iconElement = createElement('img', {
      src: 'assets/addIcon.svg',
    });
    addSubjectButtonElement.appendChild(iconElement);
    formElement.append(inputElement, addSubjectButtonElement);

    formElement.addEventListener('submit', (event) =>
      this.#handleAddSubjectSubmit(event, inputElement, state, formElement)
    );

    addSubjectCardElement.appendChild(formElement);
    return addSubjectCardElement;
  }

  #handleAddSubjectSubmit(event, inputElement, state, formElement) {
    event.preventDefault();
    this.addSubject({ title: inputElement.value, state });

    const taskChangeEvent = new CustomEvent('taskChange', {
      bubbles: true,
    });
    formElement.dispatchEvent(taskChangeEvent);
  }

  #createSubjectElement(subject) {
    const subjectId = subject.getId();
    const subjectElement = createElement('li', {
      class: 'subject',
      innerHTML: `
        <header class="subject-header">
          <h3>${subject.getTitle()}</h3>
          <button class="delete-subject-button" id="${subjectId}-delete-button">
            <img src="assets/deleteIcon.svg" class="delete-subject-icon" />
          </button>
        </header>
        <main>
          <ol id=${`${subjectId}-task-list`} class="task-list" />
        </main>
        `,
    });

    return subjectElement;
  }

  #attachEventHandlerToSubject(subjectElement, subjectId, state) {
    subjectElement.addEventListener('taskChange', () =>
      this.#handleTaskChange(subjectId, state)
    );

    const deleteButtonElement = document.getElementById(
      `${subjectId}-delete-button`
    );
    deleteButtonElement.addEventListener('click', () =>
      this.deleteSubject(subjectId, state)
    );

    const taskChangeEvent = new CustomEvent('taskChange', {
      bubbles: true,
    });
    deleteButtonElement.dispatchEvent(taskChangeEvent);
  }

  #handleTaskChange(subjectId, state) {
    const newState = this.#taskViewModel.getSubjectState(subjectId);
    const subjectList = this.#subjectList.get(state);
    const targetSubject = subjectList.find(
      (subject) => subject.getId() === subjectId
    );
    targetSubject.setState(newState);

    if (state === newState) {
      // 1. only render task list of subject
      this.#taskViewModel.render(subjectId);
      return;
    }

    subjectList.splice(subjectList.indexOf(targetSubject), 1);
    this.#subjectList.get(newState).push(targetSubject);

    // 2. render all the column
    this.render();
  }

  render() {
    STATE_LIST.forEach((state) => {
      const subjectListElement = document.getElementById(
        `${state}-subject-list`
      );

      // init column
      subjectListElement.innerHTML = '';

      // render form to add subject
      subjectListElement.appendChild(this.#createAddSubjectForm(state));

      // render subject
      this.#getSubjectsByState(state).forEach((subject) => {
        const subjectElement = this.#createSubjectElement(subject);
        subjectListElement.appendChild(subjectElement);
        this.#attachEventHandlerToSubject(
          subjectElement,
          subject.getId(),
          state
        );
      });
    });
  }
}
