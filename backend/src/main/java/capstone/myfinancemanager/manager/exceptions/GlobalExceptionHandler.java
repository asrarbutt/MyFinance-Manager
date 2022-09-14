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
    public ResponseEntity<Map<String, Object>> handleUserFoundException(UserExistsException exception) {
        Map<String, Object> responseBody = new LinkedHashMap<>();
        responseBody.put("Timestamp", LocalDateTime.now());
        responseBody.put("message", exception.getMessage());

        return new ResponseEntity<>(responseBody, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handlePasswordValidationExceptions(MethodArgumentNotValidException exception) {

        Map<String, Object> errors = new HashMap<>();
        exception.getBindingResult().getFieldErrors().forEach(error -> {
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
    public ResponseEntity<Map<String, Object>> handlePasswordNotMatchException(PasswordNotMatchException exception) {
        Map<String, Object> responseBody = new LinkedHashMap<>();
        responseBody.put("Timestamp", LocalDateTime.now());
        responseBody.put("message", exception.getMessage());

        return new ResponseEntity<>(responseBody, HttpStatus.BAD_REQUEST);
    }
}
