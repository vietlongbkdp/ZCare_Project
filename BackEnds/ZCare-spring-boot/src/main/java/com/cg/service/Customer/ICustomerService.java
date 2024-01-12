package com.cg.service.Customer;

import com.cg.model.Customer;
import com.cg.model.DTO.CustomerReqDTO;
import com.cg.model.DTO.EmailReqDTO;
import com.cg.service.IGeneralService;

import java.util.Optional;

public interface ICustomerService extends IGeneralService<Customer,Long> {
    void register(CustomerReqDTO customerReqDTO);
    Optional<Customer> findCustomerByEmail(String email);
   boolean confirmEmail(EmailReqDTO emailReqDTO);
}
