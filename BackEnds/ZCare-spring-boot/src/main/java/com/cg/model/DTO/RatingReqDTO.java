package com.cg.model.DTO;

import com.cg.model.Rating;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RatingReqDTO {
    private String star;
    private String comment;

    public Rating toRating(){
        return new Rating()
                .setStar(Integer.parseInt(star))
                .setComment(comment);
    }
}
