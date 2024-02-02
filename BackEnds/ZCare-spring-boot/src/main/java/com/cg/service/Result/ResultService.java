package com.cg.service.Result;
import com.cg.model.Result;
import com.cg.repository.IResultRepository;
import com.cg.util.EmailUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ResultService implements IResultService{
    @Autowired
    private IResultRepository iResultRepository;
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

}
