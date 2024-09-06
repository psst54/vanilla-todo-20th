class SubjectViewModel {
  #subjectList;
  #taskViewModel;

  constructor(taskViewModel) {
    this.#subjectList = new Map();
    STATE_LIST.forEach((state) => this.#subjectList.set(state, [])); // Init all columns
    this.#taskViewModel = taskViewModel;
  }

  /**
   * Adds a new subject to the specified state column and updates the view.
   *
   * @param {string} params.title - The title of the new subject.
   * @param {string} [params.state=OPEN] - The state column where the subject will be added. Default value is `OPEN`.
   *
   * @returns {Subject} The newly created subject.
   */
  addSubject({ title, state = OPEN }) {
    const newSubject = new Subject({ title, state });

    this.#subjectList
      .get(state) // Get the column where the subject will be inserted
      .push(newSubject);

    this.render();
    return newSubject;
  }

  /**
   * Removes a subject from the specified state column and updates the view.
   *
   * @param {string} params.targetId - The ID of the subject to be removed.
   * @param {string} params.state - The state column from which the subject will be removed.
   */
  deleteSubject({ targetId, state }) {
    // Get the column from which the subject will be removed
    const subjectList = this.#subjectList.get(state);

    // Get the index of the target subject by its ID
    const targetIndex = subjectList.findIndex(
      (subject) => subject.getId() === targetId
    );
    // Remove the target subject from the column
    subjectList.splice(targetIndex, 1);

    this.render();
  }

  /**
   * Retrieves the list of subjects for a given state.
   *
   * @param {string} state - The state for which to retrieve subjects.
   * @returns {Subject[]} - An array of subjects associated with the specified state.
   */
  #getSubjectsByState(state) {
    return this.#subjectList.get(state) || [];
  }

  /**
   * Creates and returns a form element for adding a new subject.
   *
   * @param {string} state - The state in which the new subject will be added.
   * @returns {HTMLElement} - The created form element.
   */
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

  /**
   * Creates a card element for a subject.
   *
   * @param {Subject} subject - The subject object used to create the DOM element.
   * @returns {HTMLLIElement} The created element of a subject.
   */
  #createSubjectElement(subject) {
    const subjectId = subject.getId();
    const subjectElement = createElement('li', {
      class: 'subject',
      innerHTML: `
        <header>
          <h3>${subject.getTitle()}</h3>
          <button class="delete-subject-button" id="${subjectId}-delete-button">
            <img src="assets/deleteIcon.svg" />
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
      this.deleteSubject({ targetId: subjectId, state })
    );

    const taskChangeEvent = new CustomEvent('taskChange', {
      bubbles: true,
    });
    deleteButtonElement.dispatchEvent(taskChangeEvent);
  }

  #handleTaskChange(subjectId, state) {
    const newState = this.#taskViewModel.getSubjectState(subjectId);
    const currentColumnSubjectList = this.#subjectList.get(state);
    const subjectToUpdate = currentColumnSubjectList.find(
      (currentSubject) => currentSubject.getId() === subjectId
    );
    subjectToUpdate.setState(newState);

    if (state === newState) {
      // Case #1
      // If the state is not changed, only update the task list for the subject
      this.#taskViewModel.render(subjectId);
      return;
    }

    currentColumnSubjectList.splice(
      currentColumnSubjectList.indexOf(subjectToUpdate),
      1
    );
    this.#subjectList.get(newState).push(subjectToUpdate);

    // Case #2
    // Re-render the entire column
    this.render();
  }

  render() {
    STATE_LIST.forEach((state) => {
      const subjectListElement = document.getElementById(
        `${state}-subject-list`
      );

      // Init column
      subjectListElement.innerHTML = '';

      // Render form to add subject
      subjectListElement.appendChild(this.#createAddSubjectForm(state));

      // Render subject
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
