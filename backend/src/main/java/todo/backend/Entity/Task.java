package todo.backend.Entity;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotBlank;
import java.time.Instant;

@Document(collection = "tasks")
public class Task {

    @Id
    private String id;                // tương đương _id trong MongoDB

    @NotBlank
    @Indexed
    private String title;             // trim sẽ xử lý trong setter

    private Status status = Status.ACTIVE; // mặc định "active"

    private Instant completedAt;      // tương ứng Date trong Mongoose

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

    public enum Status { ACTIVE, COMPLETE }

    public Task() {}

    public Task(String title) {
        setTitle(title);
    }

    // --- getters / setters ---

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) {
        this.title = (title == null) ? null : title.trim(); // tương đương trim: true
    }

    public Status getStatus() { return status; }
    public void setStatus(Status status) {
        if (status == null) status = Status.ACTIVE;
        this.status = status;
        // khi chuyển sang COMPLETE tự set completedAt nếu chưa có
        if (this.status == Status.COMPLETE && this.completedAt == null) {
            this.completedAt = Instant.now();
        } else if (this.status == Status.ACTIVE) {
            this.completedAt = null;
        }
    }

    public Instant getCompletedAt() { return completedAt; }
    public void setCompletedAt(Instant completedAt) { this.completedAt = completedAt; }

    public Instant getCreatedAt() { return createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
}
