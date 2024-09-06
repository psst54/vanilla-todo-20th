class Task {
  #title;
  #subjectId;
  #id;
  #isCompleted;

  constructor({ title = 'New Task', subjectId, isCompleted = false }) {
    this.#title = title;
    this.#subjectId = subjectId;
    this.#id = Math.random().toString(36).substring(2);
    this.#isCompleted = isCompleted;
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

  getIsCompleted() {
    return this.#isCompleted;
  }
}
