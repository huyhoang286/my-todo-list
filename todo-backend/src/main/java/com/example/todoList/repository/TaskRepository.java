package com.example.todoList.repository;

import com.example.todoList.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    // save(), findAll(), findById(), deleteById()...
}