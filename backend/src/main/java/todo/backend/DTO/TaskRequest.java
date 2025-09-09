package todo.backend.DTO;

import jakarta.validation.constraints.NotBlank;
import todo.backend.Entity.Task;

import java.time.Instant;

public class TaskRequest {
    @NotBlank
    private String title;
    private Task.Status status;
    private Instant completedAt;

    public @NotBlank String getTitle() {
        return title;
    }

    public void setTitle(@NotBlank String title) {
        this.title = title;
    }

    public Task.Status getStatus() {
        return status;
    }

    public void setStatus(Task.Status status) {
        this.status = status;
    }

    public Instant getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(Instant completedAt) {
        this.completedAt = completedAt;
    }
}
