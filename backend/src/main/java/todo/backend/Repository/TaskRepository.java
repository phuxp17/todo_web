package todo.backend.Repository;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import todo.backend.Entity.Task;

import java.time.Instant;
import java.util.List;

@Repository
public interface TaskRepository extends MongoRepository<Task, String> {
    List<Task> findByStatus(Task.Status status);
    List<Task> findByCreatedAtGreaterThanEqual(Instant start);
}