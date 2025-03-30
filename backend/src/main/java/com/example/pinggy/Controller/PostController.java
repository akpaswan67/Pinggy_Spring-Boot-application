package com.example.pinggy.Controller;


import com.example.pinggy.DTO.PostRequest;
import com.example.pinggy.DTO.PostResponse;
import com.example.pinggy.Security.AuthFilter;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;

// Allow all methods and include necessary headers
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST})
@RestController
@RequestMapping("/api")

public class PostController {

    private final List<PostResponse> posts = new ArrayList<>();

    @PostMapping(value = "/post", produces = "application/json")
    public PostResponse createPost(@RequestBody PostRequest postRequest,
                                   @RequestHeader(value = "PinggyAuthHeader", required = false) String authHeader) {
        if (authHeader == null || authHeader.isEmpty()) {
            System.out.println("PinggyAuthHeader is missing!");
            throw new RuntimeException("Authentication header missing");
        }

        System.out.println("Received PinggyAuthHeader: " + authHeader);

        PostResponse postResponse = new PostResponse(postRequest.getTitle(), postRequest.getBody(), authHeader);
        posts.add(postResponse);
        return postResponse;
    }



    @GetMapping("/list")
    public List<PostResponse> getPosts() {
        return posts;
    }


}