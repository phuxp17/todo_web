package todo.backend.DTO;

import todo.backend.Entity.Task;
import java.util.List;

public class TaskListResponse {
    private final List<Task> tasks;
    private final long activeTasksCount;
    private final long completedTasksCount;

    public TaskListResponse(List<Task> tasks, long activeTasksCount, long completedTasksCount) {
        this.tasks = tasks;
        this.activeTasksCount = activeTasksCount;
        this.completedTasksCount = completedTasksCount;
    }

    public List<Task> getTasks() { return tasks; }
    public long getActiveTasksCount() { return activeTasksCount; }
    public long getCompletedTasksCount() { return completedTasksCount; }
}
