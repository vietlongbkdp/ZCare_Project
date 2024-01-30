package com.cg.model.enumeration;

public enum EStatusBooking {
    CONFIRMING(1L,"Chưa xác nhận"),
    CUSTOMERCONFIMED(2L,"Đã xác nhận"),
    DOCTORCONFIRMED(3L,"Bác sĩ xác nhận"),
    PAID(4L,"Đã thanh toán"),
    EXAMINED(5L,"Đã khám"),
    RESULTING(6L,"Đã trả kết quả"),
    CANCEL(7L,"Đã huỷ");
    private final Long id;
    private final String status;
    EStatusBooking(Long id, String status) {
        this.id = id;
        this.status = status;
    }
    public static EStatusBooking getStatusById(Long idIn){
        for (EStatusBooking eStatusBooking : EStatusBooking.values()) {
            if (eStatusBooking.id.equals(idIn)) {
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
