package capstone.myfinancemanager.manager.exceptions;

public class FileUploadException extends RuntimeException {

    public FileUploadException(String exceptionMessage) {
        super(exceptionMessage, null, false, false);
    }
}
