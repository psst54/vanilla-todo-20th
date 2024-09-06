class SubjectViewModel {
  #subjectList;
  #taskViewModel;

  constructor(taskViewModel) {
    this.#subjectList = new Map();
    this.#taskViewModel = taskViewModel;
  }

  addSubject(title, state = OPEN) {
    const subject = new Subject(title, state);
    if (!this.#subjectList.has(state)) {
      this.#subjectList.set(state, []);
    }
    this.#subjectList.get(state).push(subject);

    this.render();
    return subject;
  }

  deleteSubject(targetId, state) {
    const subjectList = this.#subjectList.get(state);
    const targetIndex = subjectList.findIndex(
      (subject) => subject.getId() === targetId
    );
    subjectList.splice(targetIndex, 1);

    this.render();
  }

  #getSubjectsByState(state) {
    return this.#subjectList.get(state) || [];
  }

  render() {
    STATE_LIST.forEach((state) => {
      const subjectListElement = document.getElementById(
        `${state}-subject-list`
      );
      subjectListElement.innerHTML = '';

      // [todo] refactor
      /* ----- add subject button ----- */
      const addSubjectCardElement = createElement('li', {
        class: 'subject add-subject-card',
      });
      const formElement = createElement('form');
      const inputElement = createElement('input', {
        type: 'text',
        placeholder: '새로운 목표를 입력해주세요',
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
      formElement.addEventListener('submit', (event) => {
        event.preventDefault();
        this.addSubject(inputElement.value, state);
      });

      addSubjectCardElement.appendChild(formElement);
      subjectListElement.appendChild(addSubjectCardElement);

      /* ----- subject list ----- */
      this.#getSubjectsByState(state).forEach((subject) => {
        const subjectId = subject.getId();
        if (subject.getState() !== state) {
          return;
        }

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
        subjectListElement.appendChild(subjectElement);

        const deleteButtonElement = document.getElementById(
          `${subjectId}-delete-button`
        );
        deleteButtonElement.addEventListener('click', () =>
          this.deleteSubject(subjectId, state)
        );

        this.#taskViewModel.render(subjectId);
      });
    });
  }
}
