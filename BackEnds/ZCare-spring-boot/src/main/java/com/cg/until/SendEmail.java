package com.cg.until;

public class SendEmail {
    public static String EmailCooperate(String username) {
        return "Kính gửi " + username + ",\n\n"
                + "Cảm ơn bạn đã đăng ký hợp tác thành công với chúng tôi!\n"
                + "Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất để hoàn thiện thủ tục hợp tác.\n"
                + "Xin chân thành cảm ơn sự hợp tác của bạn.\n\n"
                + "Trân trọng,\n"
                + "ZCare Team";
    }
    public static String EmailResetPassword(String username, String code) {
        return "Kính gửi " + username + ",\n\n"
                + "Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản của mình.\n"
                + "Vui lòng nhập mã " + code + " để đặt lại mật khẩu:\n"
                + "Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.\n\n"
                + "Trân trọng,\n"
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
                + "Trân trọng,\n"
                + "ZCare Team";
    }
}
