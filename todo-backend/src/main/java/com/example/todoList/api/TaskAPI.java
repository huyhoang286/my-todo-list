package com.example.todoList.api;

import com.example.todoList.model.Task;
import com.example.todoList.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:4200")// Cho phép Angular truy cập vào API này qua port 4200
public class TaskAPI {
    @Autowired
    private TaskService taskService;

    // Lấy danh sách tất cả Task:
    @GetMapping
    public List<Task> getAllTask() {
        return taskService.getAllTasks();
    }
    // Thêm mới một Task:
    @PostMapping
    public Task saveTask(@RequestBody Task task) {
        return taskService.saveTask(task);
    }
    // Cập nhật một Task
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id,@RequestBody Task taskDetail) {
        Task task = taskService.getTaskById(id);
        if(task != null) {
            task.setTitle(taskDetail.getTitle());
            task.setCompleted(taskDetail.isCompleted());
            return taskService.saveTask(task);
        }
        return null;
    }
    // Xóa một Task:
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }
}
