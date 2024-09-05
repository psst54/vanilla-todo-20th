document.addEventListener('DOMContentLoaded', () => {
  const subjectViewModel = new SubjectViewModel();

  const openSubject1 = new Subject('Opened Subject 1');
  openSubject1.addTask(new Task('task 1'));
  openSubject1.addTask(new Task('task 2'));
  subjectViewModel.addCard(openSubject1);

  const openSubject2 = new Subject('Opened Subject 2');
  openSubject2.addTask(new Task('task 1'));
  subjectViewModel.addCard(openSubject2);
});
