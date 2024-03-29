package com.cg.service.Rating;

import com.cg.model.DTO.RatingReqDTO;
import com.cg.model.Rating;
import com.cg.service.IGeneralService;

import java.util.List;

public interface IRatingService extends IGeneralService<Rating,Long> {
    boolean createRating(RatingReqDTO ratingReqDTO, Long doctorId, Long userId);
    List<Rating> findByDoctorId(Long doctorId);
}
