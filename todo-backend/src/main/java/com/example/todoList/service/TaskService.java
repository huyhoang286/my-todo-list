package com.example.todoList.service;

import com.example.todoList.model.Task;
import com.example.todoList.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    // Lấy tất cả công việc
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // Lưu công việc mới hoặc cập nhật công việc cũ
    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }

    // Xóa công việc theo
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    // Lấy một công việc
    public Task getTaskById(Long id) {
        return taskRepository.findById(id).orElse(null);
    }
}