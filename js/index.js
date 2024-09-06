document.addEventListener('DOMContentLoaded', () => {
  const taskViewModel = new TaskViewModel();
  const subjectViewModel = new SubjectViewModel(taskViewModel);

  // [todo] remove below
  // -------------------------------------------------

  const openSubject1 = subjectViewModel.addSubject('Opened Subject 1', OPEN);
  taskViewModel.addTask('task 1', openSubject1.getId());
  taskViewModel.addTask('task 2', openSubject1.getId());

  const openSubject2 = subjectViewModel.addSubject('Opened Subject 2', OPEN);
  taskViewModel.addTask('task 1', openSubject2.getId());

  const doneSubject1 = subjectViewModel.addSubject('Done Subject 1', DONE);
  taskViewModel.addTask('task 1', doneSubject1.getId());
  taskViewModel.addTask('task 2', doneSubject1.getId());

  // --------------------------------------------------
});
