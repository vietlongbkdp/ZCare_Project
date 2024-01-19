package com.cg.model.enumeration;

import lombok.Getter;

@Getter
public enum EWeekday {
    T2("Thứ Hai","Thứ 2"),
    T3("Thứ Ba","Thứ 3"),
    T4("Thứ Tư","Thứ 4"),
    T5("Thứ Năm","Thứ 5"),
    T6("Thứ Sáu","Thứ 6"),
    T7("Thứ Bảy","Thứ 7"),
    CN("Chủ Nhật","Chủ nhật");
    private String id;
    private String weekday;
    EWeekday(String id, String weekday) {
        this.id = id;
        this.weekday = weekday;
    }
    public static EWeekday getDayById(String idInp){
        for (EWeekday eWeekday : EWeekday.values()) {
            if (eWeekday.id.equals(idInp)) {
                return eWeekday;
            }
        }
        throw new IllegalArgumentException("Không tìm thấy");
    }
    public static EWeekday getByWeekday(String weekdayInt) {
        for (EWeekday eWeekday : EWeekday.values()) {
            if (eWeekday.weekday.equals(weekdayInt)) {
                return eWeekday;
            }
        }
        throw new IllegalArgumentException("Không tìm thấy");
    }

}

