class Task {
  #title;
  #subjectId;
  #id;
  #isCompleted;

  constructor(title, subjectId) {
    this.#title = title;
    this.#subjectId = subjectId;
    this.#id = Math.random().toString(36).substring(2);
    this.#isCompleted = false;
  }

  setCompleted(isCompleted) {
    this.#isCompleted = isCompleted;
  }

  getTitle() {
    return this.#title;
  }

  getId() {
    return this.#id;
  }
}
