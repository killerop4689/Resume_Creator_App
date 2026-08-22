package com.resumecreator.resume.client;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

/**
 * LLMClient - Communicates with Google Gemini API
 * 
 * LOGIC:
 * - Uses REST API to call Gemini model
 * - Builds request JSON with the prompt
 * - Handles response parsing and error management
 * 
 * SYNTAX:
 * - WebClient: Spring's non-blocking HTTP client
 * - .post(): HTTP POST request
 * - .bodyValue(): Sends JSON body
 * - .block(): Wait for response (synchronous)
 */
@Component 
public class LLMClient {

    private final WebClient webClient;
    
    @Value("${gemini.api.key}")
    private String apiKey;
    
    @Value("${gemini.api.url}")
    private String geminiUrl;

    public LLMClient() {
        this.webClient = WebClient.builder().build();
    }

    /**
     * Call Gemini API with a prompt
     * 
     * SYNTAX BREAKDOWN:
     * 1. webClient.post() - Start POST request
     * 2. .uri() - Set the API endpoint with API key
     * 3. .bodyValue() - Send the request body (prompt wrapped in JSON)
     * 4. .retrieve() - Execute and get response
     * 5. .bodyToMono(String.class) - Convert response to single String
     * 6. .block() - Wait for response (blocking call)
     */
    public String callLLM(String prompt) {
    Map<String, Object> requestBody = Map.of(
        "contents", List.of(Map.of("parts", List.of(Map.of("text", prompt))))
    );
        try {
            Map<String, Object> response = webClient.post()
                    .uri(geminiUrl + "?key=" + apiKey)
                    .header("Content-Type", "application/json")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

                List<Map> candidates = (List<Map>) response.get("candidates");
                Map content = (Map) candidates.get(0).get("content");
                List<Map> parts = (List<Map>) content.get("parts");
                return (String) parts.get(0).get("text");
        } 
        catch (Exception e) {
            return "Error calling LLM: " + e.getMessage();
        }
    }
}

