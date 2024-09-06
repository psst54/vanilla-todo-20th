class Subject {
  #title;
  #taskList;
  #state;
  #id;

  constructor(title = NEW_SUBJECT_NAME, state = OPEN) {
    this.#title = title;
    this.#taskList = []; // [question] is this necessary?
    this.#state = state;
    this.#id = Math.random().toString(36).substring(2); // [todo] make random id function
  }

  addTask(task) {
    this.#taskList.push(task);
  }

  getTitle() {
    return this.#title;
  }

  getState() {
    return this.#state;
  }

  getTaskList() {
    return this.#taskList;
  }

  getId() {
    return this.#id;
  }
}
