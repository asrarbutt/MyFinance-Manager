package capstone.myfinancemanager.manager.security;

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

    public PictureService(PictureRepo pictureRepo, Cloudinary cloudinary) {
        this.pictureRepo = pictureRepo;
        this.cloudinary = cloudinary;
    }

    public String getFileUrl(Optional<MultipartFile> file) {
        try {
            if (file.isPresent()) {
                File fileToUpload = File.createTempFile("Photo", null);
                file.get().transferTo(fileToUpload);
                Map response = cloudinary.uploader().upload(fileToUpload, Map.of());
                System.out.println(response);
                return response.get("url").toString();
            }

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return "NO IMAGE";
    }

}
