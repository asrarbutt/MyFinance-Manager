package capstone.myfinancemanager.manager.respository;

import capstone.myfinancemanager.manager.model.Picture;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PictureRepo extends MongoRepository<Picture, String> {
}


