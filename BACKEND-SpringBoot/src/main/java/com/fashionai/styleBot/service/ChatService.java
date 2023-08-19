package com.fashionai.styleBot.service;

import com.fashionai.styleBot.model.ChatMessage;
import com.fashionai.styleBot.model.User;
import com.fashionai.styleBot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@Service
public class ChatService {
    private final UserRepository userRepository;

    private  final String apiKey = "850203f7f5mshf213930f43d4224p1a4dbajsn072f2a097041";


    @Autowired
    public ChatService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<ChatMessage> getChatMessagesByUserId(String userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            // Handle the case when user is not found
            return Collections.emptyList();
        }

        List<ChatMessage> allChatMessages = user.getChats();
        int totalMessages = allChatMessages.size();

        if (totalMessages <= 5) {
            // If there are 5 or fewer messages, return all of them
            return allChatMessages;
        } else {
            // Return the last 5 messages using subList
            return allChatMessages.subList(totalMessages - 6, totalMessages);
        }

    }

    public void addChatMessage(String userId, String messageText) {
        User user = userRepository.findById(userId).orElse(new User());
        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setText(messageText);
        chatMessage.setTimestamp(new Date());

        user.getChats().add(chatMessage);
        userRepository.save(user);
    }


    public String getAIResponse(String prompt) throws Exception {
        String url = "https://open-ai21.p.rapidapi.com/conversationllama";

        String requestBody = "{\r\n" +
                "    \"messages\": [\r\n" +
                "        {\r\n" +
                "            \"role\": \"user\",\r\n" +
                "            \"content\": \"" + prompt + "\"\r\n" +
                "        }\r\n" +
                "    ],\r\n" +
                "    \"web_access\": false\r\n" +
                "}";

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("content-type", "application/json")
                .header("X-RapidAPI-Key", apiKey)
                .header("X-RapidAPI-Host", "open-ai21.p.rapidapi.com")
                .method("POST", HttpRequest.BodyPublishers.ofString(requestBody))
                .build();

        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        return response.body();
    }


    public String generateImageFromText(String text) throws Exception {
        String url = "https://open-ai21.p.rapidapi.com/texttoimage2";
        String requestBody = "text=" + text;

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("content-type", "application/x-www-form-urlencoded")
                .header("X-RapidAPI-Key", apiKey)
                .header("X-RapidAPI-Host", "open-ai21.p.rapidapi.com")
                .method("POST", HttpRequest.BodyPublishers.ofString(requestBody))
                .build();

        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

        return response.body();
    }
}


