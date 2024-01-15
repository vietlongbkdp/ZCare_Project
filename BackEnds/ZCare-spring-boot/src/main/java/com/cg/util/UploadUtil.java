package com.cg.util;

import com.cg.model.Avatar;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Component;
import java.util.Map;

@Component
public class UploadUtil {
    public static final String IMAGE_UPLOAD_FOLDER = "clinic-avatar";

    public Map buildImageUpLoadParams(Avatar file) {
        if (file == null || file.getId() == null)
            throw new RuntimeException("Không thể upload hình ảnh chưa được lưu");
        String publicId = String.format("%s/%s", IMAGE_UPLOAD_FOLDER, file.getId());

        return ObjectUtils.asMap(
                "public_id", publicId,
                "overwrite", true,
                "resource_type", "image"
        );
    }
}
