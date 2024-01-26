package com.cg.model.enumeration;

public enum EStatusBooking {
    CONFIRMING(1L,"Tiếp nhận"),
    CUSTOMERCONFIMED(1L,"Khách hàng đã xác nhận"),
    DOCTORCONFIRMED(1L,"Bác sĩ xác nhận"),
    PAID(1L,"Đã thanh toán"),
    EXAMINED(1L,"Đã khám"),
    RESULTING(2L,"Đã trả kết quả"),
    CANCEL(3L,"Đã huỷ");
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
