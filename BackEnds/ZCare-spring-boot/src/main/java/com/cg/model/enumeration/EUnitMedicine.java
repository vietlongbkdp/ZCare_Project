package com.cg.model.enumeration;

public enum EUnitMedicine {
    VIEN(1L, "Viên"),
    CHAI(2L, "Chai"),
    VI(3L, "Vỉ"),
    GOI(4L, "Gói"),
    HOP(5L, "Hộp");
    private final Long id;
    private final String unit;
    EUnitMedicine(Long id, String unit) {
        this.id = id;
        this.unit = unit;
    }
    public static EUnitMedicine getUnitById(Long idIn){
        for (EUnitMedicine eUnitMedicine : EUnitMedicine.values()) {
            if (eUnitMedicine.id.equals(idIn)) {
                return eUnitMedicine;
            }
        }
        throw new IllegalArgumentException("Không tìm thấy đơn vị này");
    }
    public static EUnitMedicine getByUnit(String unit) {
        for (EUnitMedicine eUnitMedicine : EUnitMedicine.values()) {
            if (eUnitMedicine.unit.equals(unit)) {
                return eUnitMedicine;
            }
        }
        throw new IllegalArgumentException("Không tìm thấy đơn vị này");
    }
}
