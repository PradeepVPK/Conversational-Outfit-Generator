package com.fashionai.styleBot.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "UserMessages")
public class User {
    @Id
    private String userId;
    private List<ChatMessage> chats = new ArrayList<>();

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public List<ChatMessage> getChats() {
        return chats;
    }

    public void setChats(List<ChatMessage> chats) {
        this.chats = chats;
    }
}
