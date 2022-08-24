package capstone.myfinancemanager.manager.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = UserExistsException.class)
    public ResponseEntity<Map<String, Object>> handleUserFoundException() {
        Map<String, Object> responseBody = new LinkedHashMap<>();
        responseBody.put("Timestamp", LocalDateTime.now());
        responseBody.put("message", "User Exists. Please choose another E-Mail");

        return new ResponseEntity<>(responseBody, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handlePasswordValidationExceptions(MethodArgumentNotValidException ex) {

        Map<String, Object> errors = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(error -> {
                    if (errors.containsKey(error.getField())) {
                        errors.put(error.getField(), String.format("%s, %s", errors.get(error.getField()), error.getDefaultMessage()));
                    } else {
                        errors.put(error.getField(), error.getDefaultMessage());
                    }
                }
        );
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = PasswordNotMatchException.class)
    public ResponseEntity<Map<String, Object>> handlePasswordNotMatchException() {
        Map<String, Object> responseBody = new LinkedHashMap<>();
        responseBody.put("Timestamp", LocalDateTime.now());
        responseBody.put("message", "Passwords do not match");

        return new ResponseEntity<>(responseBody, HttpStatus.BAD_REQUEST);
    }
}
