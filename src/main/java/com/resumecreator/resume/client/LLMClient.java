package com.resumecreator.resume.client;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component 
public class LLMClient {

    private final RestClient restClient;
    
    @Value("${gemini.api.key}")
    private String apiKey;
    
    @Value("${gemini.api.url}")
    private String geminiUrl;

    public LLMClient() {
        this.restClient = RestClient.builder().build();
    }

    public String callLLM(String prompt) {
        Map<String, Object> requestBody = Map.of(
            "contents", List.of(Map.of("parts", List.of(Map.of("text", prompt))))
        );

        int maxRetries = 3;
        long backoffMillis = 2000;

        for (int attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                Map<String, Object> response = restClient.post()
                        .uri(geminiUrl + "?key=" + apiKey)
                        .header("Content-Type", "application/json")
                        .body(requestBody)
                        .retrieve()
                        .body(Map.class);

                List<Map> candidates = (List<Map>) response.get("candidates");
                Map content = (Map) candidates.get(0).get("content");
                List<Map> parts = (List<Map>) content.get("parts");
                return (String) parts.get(0).get("text");

            } catch (Exception e) {
                System.out.println("✗ LLM call failed on attempt " + attempt + "/" + maxRetries + ": " + e.getMessage());

                if (attempt == maxRetries) {
                    e.printStackTrace();
                    return "Error calling LLM: " + e.getMessage();
                }

                try {
                    Thread.sleep(backoffMillis);
                } catch (InterruptedException ignored) {}

                backoffMillis *= 2;
            }
        }

        return "Error calling LLM: retries exhausted";
    }
}