package com.cg.util;

public class SendEmail {
    public static String EmailCooperate(String username) {
        return "Kính gửi " + username + ",\n\n"
                + "Cảm ơn bạn đã đăng ký hợp tác thành công với chúng tôi!\n"
                + "Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất để hoàn thiện thủ tục hợp tác.\n"
                + "Xin chân thành cảm ơn sự hợp tác của bạn.\n\n"
                + "Trân trọng,\n\n"
                + "ZCare Team";
    }
    public static String EmailResetPassword(String username, String code) {
        return "Kính gửi " + username + ",\n\n"
                + "Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản của mình.\n"
                + "Vui lòng nhập mã " + code + " để đặt lại mật khẩu:\n"
                + "Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.\n\n"
                + "Trân trọng,\n\n"
                + "ZCare Team";
    }

    public static String EmailRegisterDoctor(String username, String password,String email) {
        return "Kính gửi " + username + ",\n\n"
                + "Chúc mừng! Tài khoản của bạn đã được tạo thành công.\n"
                + "Thông tin đăng nhập:\n"
                + "Tài khoản: " + email + "\n"
                + "Mật khẩu: " + password + "\n\n"
                + "Hãy sử dụng thông tin trên để đăng nhập và trải nghiệm dịch vụ của chúng tôi.\n\n"
                + "Chúc bạn một ngày tốt lành!\n\n"
                + "Trân trọng,\n\n"
                + "ZCare Team";
    }

    public static String EmailScheduledSuccessfully(String username, String day,String time,String url) {
        return "Kính gửi " + username + ",\n\n"
                + "Bạn đã đặt lịch khám thành công tại ZCare.\n"
                + "Thông tin đặt lịch:\n"
                + "Ngày khám: " + day
                + "Thời gian: " + time + "\n\n"
                + "Vui lòng xác nhận đặt lịch khám bằng cách truy cập đường liên kết sau:\n"
                + url + "\n\n"
                + "Cám ơn bạn đã sử dụng dịch vụ của chúng tôi.\n\n"
                + "Chúc bạn một ngày tốt lành!\n\n"
                + "Trân trọng,\n\n"
                + "ZCare Team";
    }
    public static String ExamScheduleReminder(String name, String bookingDate, String bookingTime) {
        return "Xin chào " + name + ",\n\n"
                + "Bạn đã đặt lịch khám vào ngày " + bookingDate + " vào lúc " + bookingTime + "\n"
                + "Bạn hãy sắp xếp thời gian để đến đúng lịch hẹn nhé!\n"
                + "Trân trọng,\n\n"
                + "ZCare Team";
    }
    public static String Resulting(String name, String bookingDate) {
        return "Xin chào " + name + ",\n\n"
                + "Cảm ơn bạn đã tin tưởng chọn và ủng hộ hệ thống của chúng tôi\n"
                + "Email này chúng tôi xin gửi trả kết quả khám và đơn thuốc của lịch khám ngày " + bookingDate
                +" ở file đính kèm bên dưới, " + "\n"
                + " Vui lòng xem qua và phản hồi cho đội ngũ của chúng tôi nếu có bất cứ thắc mắc nào" + "\n"
                + "Vui lòng xem\n"
                + "Trân trọng,\n\n"
                + "ZCare Team";
    }
}
