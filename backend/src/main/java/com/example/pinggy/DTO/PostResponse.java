package com.example.pinggy.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL) 
public class PostResponse {
    private String title;
    private String body;
    private String authHeader;

    public PostResponse(String title, String body, String authHeader) {
        this.title = title;
        this.body = body;
        this.authHeader = authHeader;
    }

    public String getTitle() {
        return title;
    }

    public String getBody() {
        return body;
    }

    public String getAuthHeader() {
        return authHeader;
    }
}
