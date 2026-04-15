import { HttpClient } from "@angular/common/http";
import { computed, inject, Injectable, signal } from "@angular/core";
import { Task } from "../models/task.model";

@Injectable({providedIn: 'root' })
export class TodoService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8080/api/tasks';

    tasks = signal<Task[]>([]);
    loading = signal<boolean>(false);
    error = signal<string>('');

    todayStr = new Date().toLocaleDateString('en-CA');
    
    todayTasks = computed(() => {
        return this.tasks().filter(t => t.dueDate === this.todayStr && !t.completed);
    });

    upcomingTasks = computed(() => {
        return this.tasks().filter(t => t.dueDate && t.dueDate > this.todayStr && !t.completed);
    });

    overdueTasks = computed(() => {
        return this.tasks().filter(t => t.dueDate && t.dueDate < this.todayStr && !t.completed);
    })

    completedTasks = computed(() => {
        return this.tasks().filter(t => t.completed);
    })

    // Lấy toàn bộ task
    loadTask() {
        this.loading.set(true);
        this.http.get<Task[]>(this.apiUrl).subscribe({
            next: (data) => {
                this.tasks.set(data);
                this.loading.set(false);
            },
            error: () => {
                this.error.set('Kết nối máy chủ thất bại!');
                this.loading.set(false);
            }
        });
    }

    // Thêm task mới
    addTask(title: string, dueDate: string) {
        const newTask: Task = {
            title,
            completed: false,
            dueDate: dueDate
        };
        this.http.post<Task>(this.apiUrl, newTask).subscribe({
            next: (savedTask) => this.tasks.update(tasks => [savedTask, ...tasks]),
            error: () => this.error.set('KHông thể thêm công việc mới')
        });
    }

    // Sửa task 
    updateTask(task: Task) {
        this.http.put<Task>(`${this.apiUrl}/${task.id}`, task).subscribe({
            next: (updatedTask) => this.tasks.update(tasks => tasks.map(t => t.id === updatedTask.id ? updatedTask: t)),
            error: () => this.error.set('Không thể sửa công việc này')
        });
    }

    // Xóa task
    deleteTask(id: number) {
        this.http.delete(`${this.apiUrl}/${id}`).subscribe({
            next: () => this.tasks.update(tasks => tasks.filter(t => t.id != id)),
            error: () => this.error.set('Không thể xóa công việc này')
        });
    }
}