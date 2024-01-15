package com.cg.service.User;

import com.cg.model.User;
import com.cg.service.IGeneralService;

public interface IUserService extends IGeneralService<User,Long> {
    User findByFullName(String fullName);
}
