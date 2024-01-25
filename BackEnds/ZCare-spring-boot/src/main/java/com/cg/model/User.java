package com.cg.model;

import com.cg.model.enumeration.ELockStatus;
import com.cg.model.enumeration.ERole;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotEmpty(message = "Email không được trống")
    @Email(message = "Email không hợp lệ")
    @Column(unique = true)
    private String email;
    @NotEmpty(message = "Mật khẩu không được trống")
    private String password;
    private String code;
    @Enumerated(EnumType.STRING)
    private ERole role;
    @Column(name="un_lock")
    private boolean unlock=true;


}
