class Task {
  #title;
  #id;
  #isCompleted;

  constructor({ title = NEW_TASK_NAME, isCompleted = false }) {
    this.#title = title;
    this.#id = getRandomId();
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
