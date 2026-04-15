import { Component, computed, inject, input, signal } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Task } from '../../models/task.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  todoService = inject(TodoService);

  filter = input.required<string>();
  newTaskTitle = signal<string>('');
  dueDate = signal<string>('');

  pageTitle = computed(() => {
    const titles: Record<string, string> = {
      'TODAY': 'Kế hoạch Hôm nay',
      'UPCOMING': 'Việc Sắp tới',
      'OVERDUE': 'Việc Quá hạn!',
      'COMPLETED': 'Việc Đã hoàn thành',
      'ALL': 'Toàn bộ công việc'
    };
    return titles[this.filter().toUpperCase()] || 'Danh sách công việc';
  });

  currentFilter = signal<'ALL' | 'TODAY' | 'UPCOMING' | 'OVERDUE' | 'COMPLETED'>('TODAY');

  displayedTasks = computed(() => {
    switch (this.currentFilter()) {
      case 'TODAY': return this.todoService.todayTasks();
      case 'UPCOMING': return this.todoService.upcomingTasks();
      case 'OVERDUE': return this.todoService.overdueTasks();
      case 'COMPLETED': return this.todoService.completedTasks();
      default: return this.todoService.tasks(); // ALL
    }
  });

  ngOnInit() {
    this.todoService.loadTask();
  }

  addTask() {
    const tilte = this.newTaskTitle().trim();
    const due = this.dueDate().trim();
    if(tilte) {
      this.todoService.addTask(tilte, due);
      this.newTaskTitle.set('');
    }
  }

  updateTask(task: Task) {
    const newTask : Task = { ...task, completed: !task.completed};
    this.todoService.updateTask(newTask);
  }

  deleteTask(id?: number) {
    if(id !== undefined) {
      this.todoService.deleteTask(id);
    }
  }
}

