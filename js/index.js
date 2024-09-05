document.addEventListener('DOMContentLoaded', () => {
  const subjectViewModel = new SubjectViewModel();

  const openSubject1 = new Subject('Opened Subject 1', OPEN);
  openSubject1.addTask(new Task('task 1'));
  openSubject1.addTask(new Task('task 2'));
  subjectViewModel.addSubject(openSubject1);

  const openSubject2 = new Subject('Opened Subject 2', OPEN);
  openSubject2.addTask(new Task('task 1'));
  subjectViewModel.addSubject(openSubject2);

  const doneSubject1 = new Subject('Done Subject 1', DONE);
  doneSubject1.addTask(new Task('task 1'));
  doneSubject1.addTask(new Task('task 2'));
  subjectViewModel.addSubject(doneSubject1);
});
