package capstone.myfinancemanager.manager.respository;

import capstone.myfinancemanager.manager.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepo extends MongoRepository<User, String> {

}
