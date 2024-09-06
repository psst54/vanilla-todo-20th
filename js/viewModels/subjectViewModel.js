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

  deleteSubject(subjectId, state) {
    const subjects = this.#subjectList.get(state);
    const subjectIndex = subjects.findIndex(
      (subject) => subject.getId() === subjectId
    );
    subjects.splice(subjectIndex, 1);

    this.render();
  }

  getSubjectsByState(state) {
    return this.#subjectList.get(state) || [];
  }

  render() {
    STATE_LIST.forEach((state) => {
      const subjectListElement = document.getElementById(
        `${state}-subject-list`
      );
      subjectListElement.innerHTML = '';

      this.getSubjectsByState(state).forEach((subject) => {
        const subjectId = subject.getId();
        if (subject.getState() !== state) {
          return;
        }

        const subjectElement = document.createElement('li');
        subjectElement.classList.add('subject');
        subjectElement.innerHTML = `
            <header class="subject-header">
              <h3>${subject.getTitle()}</h3>
              <button class="delete-subject-button" id="${subjectId}-delete-button">
                <img src="assets/deleteIcon.svg" class="delete-subject-icon" />
              </button>
            </header>
            <main>
              <ol id=${`${subjectId}-task-list`} />
            </main>
            `;
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
