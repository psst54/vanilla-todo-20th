class SubjectViewModel {
  constructor(taskViewModel) {
    this.subjectList = new Map();
    this.taskViewModel = taskViewModel;
  }

  addSubject(title, state = OPEN) {
    const subject = new Subject(title, state);
    if (!this.subjectList.has(state)) {
      this.subjectList.set(state, []);
    }
    this.subjectList.get(state).push(subject);

    this.render();
    return subject;
  }

  getSubjectsByColumn(columnId) {
    return this.subjectList.get(columnId) || [];
  }

  render() {
    COLUMN_LIST.forEach((column) => {
      const subjectListElement = document.getElementById(
        `${column}-subject-list`
      );
      subjectListElement.innerHTML = '';

      this.getSubjectsByColumn(column).forEach((subject) => {
        const subjectId = subject.getId();
        if (subject.getState() !== column) {
          return;
        }

        const subjectElement = document.createElement('li');
        subjectElement.classList.add('subject');
        subjectElement.innerHTML = `
            <header class="subject-header">
              <h3>${subject.getTitle()}</h3>
              <button class="delete-subject-button">
                <img src="assets/deleteIcon.svg" class="delete-subject-icon" />
              </button>
            </header>
            <main>
              <ol id=${`${subjectId}-task-list`} />
            </main>
            `;
        subjectListElement.appendChild(subjectElement);

        this.taskViewModel.render(subjectId);
      });
    });
  }
}
