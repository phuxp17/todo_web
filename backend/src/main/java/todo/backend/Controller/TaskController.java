package todo.backend.Controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import todo.backend.DTO.TaskListResponse;
import todo.backend.DTO.TaskRequest;
import todo.backend.Entity.Task;
import todo.backend.Service.TaskService;

import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService service;
    public TaskController(TaskService service) {
        this.service = service;
    }

    // GET /api/tasks?filter=today|week|month|all
    @GetMapping
    public ResponseEntity<TaskListResponse> getAll(@RequestParam(defaultValue = "all") String filter) {
        return ResponseEntity.ok(service.listWithFilter(filter));
    }

    @PostMapping
    public ResponseEntity<Task> create(@Valid @RequestBody TaskRequest req) {
        return ResponseEntity.status(201).body(service.create(req));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> update(@PathVariable String id, @RequestBody TaskRequest req) {
        return ResponseEntity.ok(service.update(id, req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getOne(@PathVariable String id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<?> handleNotFound(NoSuchElementException ex) {
        return ResponseEntity.status(404).body(ex.getMessage());
    }
}
