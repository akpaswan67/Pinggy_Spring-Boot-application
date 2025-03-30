package com.example.pinggy.DTO;
import lombok.Data;

@Data

public class PostRequest {
    private String title;
    private String body;

    // Add constructor
    public PostRequest(String title, String body) {
        this.title = title;
        this.body = body;
    }

    // Add getters
    public String getTitle() {
        return title;
    }

    public String getBody() {
        return body;
    }

    // Optional: Add setters if needed
    public void setTitle(String title) {
        this.title = title;
    }

    public void setBody(String body) {
        this.body = body;
    }
}
