package com.flexislot.payloads;

import lombok.Data;

@Data
public class AuthRequest {
    private String email;
    private String password;
}

