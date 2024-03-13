import { Component, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

interface Task {
  name: string;
  isCompleted: boolean;
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {
  task = new FormControl<string>('', { nonNullable: true });
  tasks = signal<Task[]>([]);

  constructor() {
    effect(() => {
      if (this.unCompletedTask().length > 3) {
        alert(`Tienes ${this.unCompletedTask().length} Tareas pendientes`);
      }
    })
  }

  completedTask = computed(() => {
    return this.tasks().filter(task => task.isCompleted);
  })

  unCompletedTask = computed(() => {
    return this.tasks().filter(task => !task.isCompleted);
  })
  addTask() {

    this.tasks.update((tasks) => [
      ...tasks,
      { name: this.task.value, isCompleted: false },
    ]);
    this.task.setValue('');
  }

  deleteTask(task: Task) {

    this.tasks.update((tasks) => {
      return tasks.filter((t) => t.name !== task.name);
    });
  }

  ToggleCompletedTask(task: Task) {

    this.tasks.mutate((tasks) => {
      const taskToUpdate = tasks.find((t) => t.name === task.name);
      if (taskToUpdate) {
        taskToUpdate.isCompleted = !taskToUpdate.isCompleted;
      }
      return tasks;
    });
  }

  resetTask() {
    this.tasks.set([]);
  }




}
