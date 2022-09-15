package capstone.myfinancemanager.manager.service;

import capstone.myfinancemanager.manager.model.Picture;
import capstone.myfinancemanager.manager.model.RandomUUIDGenerator;
import capstone.myfinancemanager.manager.respository.PictureRepo;
import com.cloudinary.Cloudinary;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Map;
import java.util.Optional;

@Service
public class PictureService {

    private final PictureRepo pictureRepo;
    private final Cloudinary cloudinary;
    private final RandomUUIDGenerator randomUUIDGenerator;

    public PictureService(PictureRepo pictureRepo, Cloudinary cloudinary, RandomUUIDGenerator randomUUIDGenerator) {
        this.pictureRepo = pictureRepo;
        this.cloudinary = cloudinary;
        this.randomUUIDGenerator = randomUUIDGenerator;
    }

    public String getFileUrl(Optional<MultipartFile> file, String username) {
        try {
            if (file.isPresent()) {
                File fileToUpload = File.createTempFile("file", null);
                file.get().transferTo(fileToUpload);
                Map response = cloudinary.uploader().upload(fileToUpload, Map.of());
                Picture picture = Picture.builder().id(randomUUIDGenerator.getRandomId()).username(username).url(response.get("url").toString()).build();
                pictureRepo.save(picture);
                return response.get("url").toString();
            }

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return "NO IMAGE";
    }

}
