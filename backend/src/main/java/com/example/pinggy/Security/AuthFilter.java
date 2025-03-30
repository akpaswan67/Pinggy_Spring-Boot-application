package com.example.pinggy.Security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class AuthFilter implements jakarta.servlet.Filter {

    private static String authHeader;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        authHeader = httpRequest.getHeader("PinggyAuthHeader");

        if (authHeader == null || authHeader.isEmpty()) {
            System.out.println("No PinggyAuthHeader found in request!");
        } else {
            System.out.println("PinggyAuthHeader received: " + authHeader);
        }

        chain.doFilter(request, response);
    }

    public static String getAuthHeader() {
        return authHeader;
    }
}