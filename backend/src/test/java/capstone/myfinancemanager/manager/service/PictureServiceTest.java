package capstone.myfinancemanager.manager.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.Uploader;
import com.cloudinary.utils.ObjectUtils;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.IOException;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class PictureServiceTest {

    private final Cloudinary cloudinary = mock(Cloudinary.class);

    private final Uploader uploader = mock(Uploader.class);

    @Test
    void getImageUrl() throws IOException {
        File file = new File(("myPicture1.png"));

        when(cloudinary.uploader()).thenReturn(uploader);
        when(uploader.upload(file, Map.of())).thenReturn(Map.of("url1", "myPicture1"));

        Map<String, String> actual = cloudinary.uploader().upload(file, ObjectUtils.emptyMap());

        assertThat(actual).isEqualTo(Map.of("url1", "myPicture1"));
    }
}
