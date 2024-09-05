class SubjectViewModel {
  constructor(taskViewModel) {
    this.subjectList = [];
    this.taskViewModel = taskViewModel;
  }

  addSubject(title, state = OPEN) {
    const subject = new Subject(title, state);
    this.subjectList.push(subject);

    this.render();
    return subject;
  }

  render() {
    COLUMN_LIST.forEach((column) => {
      const subjectListElement = document.getElementById(
        `${column}-subject-list`
      );
      subjectListElement.innerHTML = '';

      this.subjectList.forEach((subject) => {
        const subjectId = subject.getId();
        const taskListElementId = `${subjectId}-task-list`;
        if (subject.getState() !== column) return;

        const subjectElement = document.createElement('li');
        subjectElement.classList.add('subject');
        subjectElement.innerHTML = `
            <h3>${subject.getTitle()}</h3>
            <main>
              <ol id=${taskListElementId}>
              </ol>
            </main>
            `;
        subjectListElement.appendChild(subjectElement);

        this.taskViewModel.render(subjectId);
      });
    });
  }
}
