package com.cg.model.enumeration;

import lombok.Getter;

@Getter
public enum EWeekday {
    T2("2","Thứ 2"),
    T3("3","Thứ 3"),
    T4("4","Thứ 4"),
    T5("5","Thứ 5"),
    T6("6","Thứ 6"),
    T7("7","Thứ 7"),
    CN("8","Chủ nhật");
    private String id;
    private String weekday;
    EWeekday(String id, String weekday) {
        this.id = id;
        this.weekday = weekday;
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

