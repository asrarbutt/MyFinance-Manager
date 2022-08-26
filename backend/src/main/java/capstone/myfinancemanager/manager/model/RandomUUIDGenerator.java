package capstone.myfinancemanager.manager.model;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class RandomUUIDGenerator {

    public String getRandomId() {
        return UUID.randomUUID().toString();
    }
}
