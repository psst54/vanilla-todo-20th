document.addEventListener('DOMContentLoaded', () => {
  const taskViewModel = new TaskViewModel();
  const subjectViewModel = new SubjectViewModel(taskViewModel);

  subjectViewModel.render();
});
