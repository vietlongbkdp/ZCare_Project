package com.cg.service.avatar;

import com.cg.model.Avatar;
import com.cg.repository.IAvatarRepository;
import com.cg.util.UploadUtil;
import com.cloudinary.Cloudinary;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@Transactional
public class AvatarService {
    @Autowired
    private Cloudinary cloudinary;
    @Autowired
    private IAvatarRepository avatarRepository;
    @Autowired
    private UploadUtil uploadUtil;

    public Avatar saveImage(MultipartFile image) throws IOException {
        var file = new Avatar();
        avatarRepository.save(file);

        var uploadResult = cloudinary.uploader().upload(image.getBytes(), uploadUtil.buildImageUpLoadParams(file));

        String fileUrl = (String) uploadResult.get("secure_url");
        String fileFormat = (String) uploadResult.get("format");
        file.setFileType(fileFormat);
        file.setFileName(file.getId() + "." + fileFormat);
        file.setFileUrl(fileUrl);
        file.setFileFolder(UploadUtil.IMAGE_UPLOAD_FOLDER);
        file.setCloudId(file.getFileFolder() + "/" + file.getId());

        avatarRepository.save(file);
        return file;
    }

    public void deleteImage(String fileUrl) {
        avatarRepository.deleteByFileUrl(fileUrl);
    }
}
