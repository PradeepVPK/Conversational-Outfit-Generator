package com.fashionai.styleBot.controller;

import com.fashionai.styleBot.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin
@RestController
@RequestMapping("/api")

public class ChatController {
    private final ChatService chatService;

    @Autowired
    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }


    @PostMapping("/addChatMessage")
    public ResponseEntity<String> addChatMessage(@RequestBody ChatRequest chatRequest) throws Exception {
        String userId =chatRequest.getUserId();
        String message=chatRequest.getMessageText();
        chatService.addChatMessage(userId, message);

//        if(message.toLowerCase().contains("generate")){
//
//        List<ChatMessage> getChatMessagesByUserId = chatService.getChatMessagesByUserId(userId);
//        StringBuilder prompt = new StringBuilder();
//        getChatMessagesByUserId.stream().forEach(e->prompt.append("," +e.getText()));
//        prompt.append("Generate a prompt for text to image for generating customized outfit based on the above content");
//        String botMessage=chatService.getAIResponse(prompt+" ");
//
//
//        }

        try {
            String botMessage=chatService.getAIResponse(message+"Consider yourself as a personalized outfit recommendation bot and Give response under 25 words.");
            return ResponseEntity.ok(botMessage);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred.");
        }
    }


}

class ChatRequest {
    private String userId;
    private String messageText;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getMessageText() {
        return messageText;
    }

    public void setMessageText(String messageText) {
        this.messageText = messageText;
    }
}
