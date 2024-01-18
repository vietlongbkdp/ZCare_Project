package com.cg.controller.api;

import com.cg.model.Avatar;
import com.cg.service.avatar.AvatarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@RestController
@RequestMapping("/api/avatar")
@CrossOrigin(origins = "*")
public class AvatarAPI {
    @Autowired
    private AvatarService avatarService;

    @PostMapping
    public Avatar upload(@RequestParam("image") MultipartFile image) throws IOException {
        return avatarService.saveImage(image);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable String id) {
        avatarService.deleteImage(id);
    }
}
