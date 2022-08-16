package capstone.myfinancemanager.manager.test;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MytestController {

    @GetMapping(path = "hallo")
    public String getHallo(){
        return "it My Capstone project";
    }
}
