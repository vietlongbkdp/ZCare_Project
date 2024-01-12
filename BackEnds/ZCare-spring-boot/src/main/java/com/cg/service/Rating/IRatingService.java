package com.cg.service.Rating;

import com.cg.model.DTO.RatingReqDTO;
import com.cg.model.Rating;
import com.cg.service.IGeneralService;

public interface IRatingService extends IGeneralService<Rating,Long> {
    void createRating(RatingReqDTO ratingReqDTO);
}
