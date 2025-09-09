package todo.backend.Service;

import org.springframework.stereotype.Service;
import todo.backend.DTO.TaskListResponse;
import todo.backend.DTO.TaskRequest;
import todo.backend.Entity.Task;
import todo.backend.Repository.TaskRepository;

import java.time.*;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class TaskService {

    private final TaskRepository repo;

    public TaskService(TaskRepository repo) {
        this.repo = repo;
    }

    public Task create(TaskRequest req) {
        Task t = new Task();
        t.setTitle(req.getTitle());
        t.setStatus(req.getStatus() == null ? Task.Status.ACTIVE : req.getStatus());
        if (req.getCompletedAt() != null) t.setCompletedAt(req.getCompletedAt());
        return repo.save(t);
    }

    public TaskListResponse listWithFilter(String filter) {
        Instant start = computeStart(filter);
        List<Task> tasks = (start == null)
                ? repo.findAll()
                : repo.findByCreatedAtGreaterThanEqual(start);

        // sort descending by createdAt (nulls last)
        tasks.sort((a, b) -> {
            if (a.getCreatedAt() == null) return 1;
            if (b.getCreatedAt() == null) return -1;
            return b.getCreatedAt().compareTo(a.getCreatedAt());
        });

        long activeCount = tasks.stream().filter(t -> t.getStatus() == Task.Status.ACTIVE).count();
        long completedCount = tasks.stream().filter(t -> t.getStatus() == Task.Status.COMPLETE).count();

        return new TaskListResponse(tasks, activeCount, completedCount);
    }

    private Instant computeStart(String filterRaw) {
        if (filterRaw == null) return null;
        String filter = filterRaw.toLowerCase();
        ZoneId zone = ZoneId.systemDefault();
        LocalDate today = LocalDate.now(zone);

        switch (filter) {
            case "today":
                return today.atStartOfDay(zone).toInstant();
            case "week": {
                // Monday as start; if Sunday, go back 6 days
                DayOfWeek dow = today.getDayOfWeek(); // MON=1 ... SUN=7
                int offset = (dow == DayOfWeek.SUNDAY) ? 6 : dow.getValue() - 1;
                LocalDate monday = today.minusDays(offset);
                return monday.atStartOfDay(zone).toInstant();
            }
            case "month":
                LocalDate first = today.withDayOfMonth(1);
                return first.atStartOfDay(zone).toInstant();
            case "all":
            default:
                return null;
        }
    }

    public Task getById(String id) {
        return repo.findById(id).orElseThrow(() -> new NoSuchElementException("Không tìm thấy nhiệm vụ với id: " + id));
    }

    public Task update(String id, TaskRequest req) {
        Task t = getById(id);
        if (req.getTitle() != null) t.setTitle(req.getTitle());
        if (req.getStatus() != null) t.setStatus(req.getStatus());
        if (req.getCompletedAt() != null) t.setCompletedAt(req.getCompletedAt());
        return repo.save(t);
    }

    public void delete(String id) {
        repo.deleteById(id);
    }
}
