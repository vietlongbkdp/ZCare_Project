package com.cg.model;

import com.cg.model.DTO.CooperateReqDTO;
import com.cg.model.enumeration.EStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="Cooperates")
@Accessors(chain = true)
public class Cooperate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fullName;
    private String phone;
    private String email;
    private String clinicName;
    private String address;
    private String content;


}
