package capstone.myfinancemanager.manager.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = UserExistsException.class)
    public ResponseEntity handleUserFoundException() {
        Map<String, Object> responseBody = new LinkedHashMap<>();
        responseBody.put("Timestamp", LocalDateTime.now());
        responseBody.put("message", "User Exists. Please choose another E-Mail");

        return new ResponseEntity(responseBody, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = PasswordNotMatchException.class)
    public ResponseEntity handlePasswordNotMatchException() {
        Map<String, Object> responseBody = new LinkedHashMap<>();
        responseBody.put("Timestamp", LocalDateTime.now());
        responseBody.put("message", "Passwords do not match");

        return new ResponseEntity(responseBody, HttpStatus.BAD_REQUEST);
    }
}
