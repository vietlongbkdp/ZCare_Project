package com.cg.util;
import org.mindrot.jbcrypt.BCrypt;

public class PasswordEncryptionUtil {
    public static String encryptPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }

    public static boolean checkPassword(String password, String hashedPassword) {
        return BCrypt.checkpw(password, hashedPassword);
    }
}
