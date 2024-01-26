package com.cg.model.enumeration;

public enum EStatusBooking {
    CONFIRMING(1L,"Đang chờ xác nhận"),
    CONFIRMED(2L,"Đã xác nhận"),
    CANCEL(3L,"Đã huỷ");
    private Long id;
    private String status;
    EStatusBooking(Long id, String status) {
        this.id = id;
        this.status = status;
    }
    public static EStatusBooking getStatusById(Long idIn){
        for (EStatusBooking eStatusBooking : EStatusBooking.values()) {
            if (eStatusBooking.id == idIn) {
                return eStatusBooking;
            }
        }
        throw new IllegalArgumentException("Không tìm thấy Status này");
    }
    public static EStatusBooking getByStatus(String statusBooking) {
        for (EStatusBooking eStatusBooking : EStatusBooking.values()) {
            if (eStatusBooking.status.equals(statusBooking)) {
                return eStatusBooking;
            }
        }
        throw new IllegalArgumentException("Không tìm thấy Status này");
    }
}
