package capstone.myfinancemanager.manager.model;

import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class Timestamp {
    public Instant now() {
        return Instant.now();
    }
}
