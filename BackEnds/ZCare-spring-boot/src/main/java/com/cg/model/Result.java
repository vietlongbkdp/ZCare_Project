package com.cg.model;

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
@Table(name="results")
@Accessors(chain = true)
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "LONGTEXT")
    private String fileName;
    @Column(columnDefinition = "LONGTEXT")
    private String fileType;
    @Lob
    @Column(name = "file", columnDefinition = "LONGBLOB")
    private byte[] file;
    @Column(name = "note", columnDefinition = "LONGTEXT")
    private String note;
    @Column(columnDefinition = "LONGTEXT")
    private String doctorNotice;
    @Column(columnDefinition = "LONGTEXT")
    private String diagResult;
    @Column(columnDefinition = "LONGTEXT")
    private String advice;
}
