class SubjectViewModel {
  constructor() {
    this.subjectList = [];
  }

  addSubject(subject) {
    this.subjectList.push(subject);
    this.render();
  }

  render() {
    // render 로직
  }
}
