package com.cg.controller.api;

import com.cg.model.DTO.ResultReqDTO;
import com.cg.model.Result;
import com.cg.service.Result.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/result")
@CrossOrigin(origins = "*")
public class ResultAPI {
    @Autowired
    private ResultService resultService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        List<Result> results = resultService.findAll();
        return new ResponseEntity<>(results, HttpStatus.OK);
    }

    @GetMapping("/{fileId}")
    public ResponseEntity<?> getFileContent(@PathVariable Long fileId) {
        Result result = resultService.findById(fileId).get();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=\"" + result.getFileName() + "\"");
        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(result.getFile());
    }

    @PostMapping
    public ResponseEntity<?> create(@ModelAttribute ResultReqDTO resultReqDTO) {
        try {
            resultService.Create(resultReqDTO);
            return new ResponseEntity<>("Lưu dữ liệu thành công", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Lưu dữ liệu thất bại: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
