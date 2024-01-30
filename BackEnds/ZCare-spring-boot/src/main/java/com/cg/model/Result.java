package com.cg.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="results")
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fileName;
    private String fileType;
    @Lob
    @Column(name = "file", columnDefinition = "LONGBLOB")
    private byte[] file;
    @Column(name = "note", columnDefinition = "LONGTEXT")
    private String note;
    private String doctorNotice;
    private String diagResult;
    private String advice;
}
