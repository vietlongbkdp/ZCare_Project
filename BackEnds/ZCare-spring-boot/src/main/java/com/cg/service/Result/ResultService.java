package com.cg.service.Result;
import com.cg.model.DTO.ResultReqDTO;
import com.cg.model.Result;
import com.cg.repository.IResultRepository;
import com.cg.util.EmailUtil;
import jakarta.mail.MessagingException;
import org.jsoup.nodes.Element;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;


@Service
@Transactional
public class ResultService implements IResultService{
    @Autowired
    private IResultRepository iResultRepository;
    @Autowired
    private EmailUtil emailUtil;
    @Override
    public List<Result> findAll() {
        return iResultRepository.findAll();
    }

    @Override
    public Optional<Result> findById(Long id) {
        return iResultRepository.findById(id);
    }

    @Override
    public void save(Result result) {
        iResultRepository.save(result);
    }

    @Override
    public void deleteById(Long id) {
        iResultRepository.deleteById(id);
    }

    @Override
    public void Create(ResultReqDTO resultReqDTO) throws IOException, MessagingException {
        Result result = new Result();
        result.setFileName(resultReqDTO.getFile().getOriginalFilename());
        result.setFileType(resultReqDTO.getFile().getContentType());
        result.setFile(resultReqDTO.getFile().getBytes());
        result.setNote(resultReqDTO.getEditorContent());
        iResultRepository.save(result);

        String toEmail = "vietlongbkdp@gmail.com";
        String subject = "Trả kết quả khám";
        String plainText = resultReqDTO.getEditorContent();
        Document document = Jsoup.parse(plainText);
        Element body = document.body();
        StringBuilder formattedText = new StringBuilder();
        for (Element element : body.children()) {
            formattedText.append(element.text()).append("\n");
        }
        if (formattedText.length() > 0 && formattedText.charAt(formattedText.length() - 1) == '\n') {
            formattedText.setLength(formattedText.length() - 1);
        }
        String plainTextContent = formattedText.toString();
        byte[] fileBytes = resultReqDTO.getFile().getBytes();
        String fileName=resultReqDTO.getFile().getOriginalFilename();
        emailUtil.sendEmailWithAttachment(toEmail, subject, plainTextContent, fileBytes, fileName);
    }
}
