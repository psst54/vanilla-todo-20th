document.addEventListener('DOMContentLoaded', () => {
  const taskViewModel = new TaskViewModel();
  const subjectViewModel = new SubjectViewModel(taskViewModel);

  const openSubject1 = new Subject('Opened Subject 1', OPEN);
  taskViewModel.addTask('task 1', openSubject1.getId());
  taskViewModel.addTask('task 2', openSubject1.getId());
  subjectViewModel.addSubject(openSubject1);

  const openSubject2 = new Subject('Opened Subject 2', OPEN);
  taskViewModel.addTask('task 1', openSubject2.getId());
  subjectViewModel.addSubject(openSubject2);

  const doneSubject1 = new Subject('Done Subject 1', DONE);
  taskViewModel.addTask('task 1', doneSubject1.getId());
  taskViewModel.addTask('task 2', doneSubject1.getId());
  subjectViewModel.addSubject(doneSubject1);
});
