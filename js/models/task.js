class Task {
  #title;
  #subjectId;
  #id;

  constructor(title, subjectId) {
    this.#title = title;
    this.#subjectId = subjectId;
    this.#id = Math.random().toString(36).substring(2);
  }

  getTitle() {
    return this.#title;
  }

  getId() {
    return this.#id;
  }
}
