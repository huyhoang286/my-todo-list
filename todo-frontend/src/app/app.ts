import { Component, inject } from '@angular/core';
import { TodoService } from './services/todo.service';
import {RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  todoService = inject(TodoService);
}

