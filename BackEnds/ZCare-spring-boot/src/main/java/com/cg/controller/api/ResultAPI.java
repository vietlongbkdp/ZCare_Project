package com.cg.controller.api;

import com.cg.model.Booking;
import com.cg.model.DTO.MedicineDTO;
import com.cg.model.DTO.ResultJsonDTO;
import com.cg.model.DTO.ResultReqDTO;
import com.cg.model.DTO.ResultReqFormDTO;
import com.cg.model.Result;
import com.cg.model.enumeration.EStatusBooking;
import com.cg.service.Result.ResultService;
import com.cg.service.booking.IBookingService;
import com.cg.service.medicineDetail.IMedicineDetailService;
import com.cg.util.EmailUtil;
import com.cg.util.SendEmail;
import com.google.gson.Gson;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/result")
@CrossOrigin(origins = "*")
public class ResultAPI {
    @Autowired
    private ResultService resultService;
    @Autowired
    private IMedicineDetailService medicineDetailService;
    @Autowired
    private IBookingService bookingService;
    @Autowired
    private EmailUtil emailUtil;

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
    public ResponseEntity<?> createResult(@ModelAttribute ResultReqFormDTO resultReqFormDTO) throws IOException, MessagingException {
            Gson gson = new Gson();
            ResultJsonDTO resultJsonDTO = gson.fromJson(resultReqFormDTO.getData(), ResultJsonDTO.class);
        ResultReqDTO resultReqDTO = new ResultReqDTO().setFile(resultReqFormDTO.getFile().getBytes()).setFileName(resultReqFormDTO.getFile().getOriginalFilename())
                .setFileType("PDF")
                .setDiagResult(resultJsonDTO.getDiagResult()).setAdvice(resultJsonDTO.getAdvice())
                .setDoctorNotice(resultJsonDTO.getDoctorNotice()).setMedicineList(resultJsonDTO.getMedicineList());
        Result result = new Result().setDoctorNotice(resultReqDTO.getDoctorNotice())
                .setDiagResult(resultReqDTO.getDiagResult())
                .setAdvice(resultReqDTO.getAdvice())
                .setFile(resultReqDTO.getFile())
                .setFileName(resultReqDTO.getFileName())
                .setFileType(resultReqDTO.getFileType());
        resultService.save(result);
        Long idResultNow = result.getId();
        Result resultSaved = resultService.findById(idResultNow).get();
            for (MedicineDTO medicineDTO: resultReqDTO.getMedicineList()) {
                medicineDetailService.toMedicineDetail(medicineDTO, resultSaved);
            }
        Long idBooking = Long.parseLong(resultJsonDTO.getIdBooking());
            Booking booking = bookingService.findById(idBooking).get();
            booking.setStatus(EStatusBooking.RESULTING);
            booking.setResult(result);
            bookingService.save(booking);

            String toEmail = booking.getCustomer().getEmail();
            String subject = "Trả kết quả khám ngày " + booking.getBookingDate();
            String body = SendEmail.Resulting(booking.getCustomer().getFullName(), booking.getBookingDate());

            emailUtil.sendEmailWithAttachment(toEmail, subject, body, booking.getResult().getFile(), booking.getResult().getFileName());

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
