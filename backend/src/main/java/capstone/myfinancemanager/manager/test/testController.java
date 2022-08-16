package capstone.myfinancemanager.manager.test;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class testController {

    @GetMapping(path = "hallo")
    public String getHallo(){
        return "hallo world";
    }
}
