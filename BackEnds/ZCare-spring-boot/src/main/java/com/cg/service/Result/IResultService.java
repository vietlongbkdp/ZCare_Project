package com.cg.service.Result;

import com.cg.model.DTO.CustomerReqDTO;
import com.cg.model.DTO.RatingReqDTO;
import com.cg.model.DTO.ResultReqDTO;
import com.cg.model.Result;
import com.cg.service.IGeneralService;
import jakarta.mail.MessagingException;

import java.io.IOException;

public interface IResultService extends IGeneralService<Result,Long> {
    void Create(ResultReqDTO resultReqDTO) throws IOException, MessagingException;
}
