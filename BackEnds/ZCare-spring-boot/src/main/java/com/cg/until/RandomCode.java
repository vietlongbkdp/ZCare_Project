package com.cg.until;

import java.util.Random;

public class RandomCode {
    public static String generateRandomCode(int length) {
        Random random = new Random();
        StringBuilder codeBuilder = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int digit = random.nextInt(10);
            codeBuilder.append(digit);
        }
        return codeBuilder.toString();
    }
}
