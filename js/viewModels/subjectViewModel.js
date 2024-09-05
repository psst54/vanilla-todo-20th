class SubjectViewModel {
  constructor() {
    this.subjectList = [];
  }

  addSubject(subject) {
    this.subjectList.push(subject);
    this.render();
  }

  render() {
    const columnList = [OPEN, DONE];

    columnList.forEach((column) => {
      const subjectListElement = document.getElementById(
        `${column}-subject-list`
      );
      subjectListElement.innerHTML = '';

      this.subjectList.forEach((subject) => {
        if (subject.getState() !== column) return;

        const subjectElement = document.createElement('li');
        subjectElement.classList.add('card');
        subjectElement.innerHTML = `
            <header>
              <h3>${subject.getTitle()}</h3>
            <header>
            <main>
              <ol>
              </ol>
            </main>
            `;
        subjectListElement.appendChild(subjectElement);
      });
    });
  }
}
