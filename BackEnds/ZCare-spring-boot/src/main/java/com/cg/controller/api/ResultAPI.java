package com.cg.controller.api;

import com.cg.model.DTO.MedicineDTO;
import com.cg.model.DTO.ResultReqDTO;
import com.cg.model.MedicineDetail;
import com.cg.model.Result;
import com.cg.service.Result.ResultService;
import com.cg.service.medicineDetail.IMedicineDetailService;
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
    @Autowired
    private IMedicineDetailService medicineDetailService;

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

//    @PostMapping
//    public ResponseEntity<?> create(@ModelAttribute ResultReqDTO resultReqDTO) {
//        try {
//            resultService.Create(resultReqDTO);
//            return new ResponseEntity<>("Lưu dữ liệu thành công", HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity<>("Lưu dữ liệu thất bại: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

        @PostMapping
    public ResponseEntity<?> createResult(@RequestBody ResultReqDTO resultReqDTO) {
        Result result = new Result().setDoctorNotice(resultReqDTO.getDoctorNotice())
                .setDiagResult(resultReqDTO.getDiagResult())
                .setAdvice(resultReqDTO.getAdvice());
        resultService.save(result);
        Long idResultNow = result.getId();
        Result resultSaved = resultService.findById(idResultNow).get();
            for (MedicineDTO medicineDTO: resultReqDTO.getMedicineList()) {
                medicineDetailService.toMedicineDetail(medicineDTO, resultSaved);
            }
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
