package com.cg.model;

import com.cg.model.enumeration.EUnitMedicine;
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
@Table(name = "medicine_details")
@Accessors(chain = true)
public class MedicineDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name="medicine_id")
    private Medicine medicine;
    private Long quantity;
    @Enumerated(EnumType.STRING)
    private EUnitMedicine unitMedicine;
    @ManyToOne
    @JoinColumn(name="result_id")
    private Result result;
    private String useNote;
}
