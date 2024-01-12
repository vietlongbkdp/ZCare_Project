package com.cg.until;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class PassDate {
    public static Date convertToDate(String dateString) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        try {
            return dateFormat.parse(dateString);
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
    }
}
