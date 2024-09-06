class Task {
  #title;
  #subjectId;

  constructor(title, subjectId) {
    this.#title = title;
    this.#subjectId = subjectId;
  }

  getTitle() {
    return this.#title;
  }
}
