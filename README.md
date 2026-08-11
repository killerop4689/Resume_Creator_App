# Resume Creator

A Java Spring Boot REST API that uses the Google Gemini API to create, format, and review professional résumés from user-provided details.

The application accepts personal information and skills through REST endpoints, sends structured prompts to Gemini, and returns AI-generated résumé content or validation feedback.

## Features

- Generate professional résumé content with AI
- Format résumés for readability and ATS compatibility
- Validate résumé quality and provide improvement suggestions
- REST API built with Spring Boot
- Maven-based project
- Gemini 3.5 Flash integration
- Basic static homepage to confirm that the application is running

## Tech Stack

- Java 21
- Spring Boot
- Maven
- Spring Web MVC
- Spring WebFlux `WebClient`
- Google Gemini API
- Jackson JSON processing

## Project Structure

```text
resume/
├── src/
│   ├── main/
│   │   ├── java/com/resumecreator/resume/
│   │   │   ├── ResumeApplication.java
│   │   │   ├── controller/
│   │   │   │   └── ResumeContoller.java
│   │   │   ├── service/
│   │   │   │   └── ResumeService.java
│   │   │   ├── agent/
│   │   │   │   ├── ContentAgent.java
│   │   │   │   ├── FormattingAgent.java
│   │   │   │   └── ValidationAgent.java
│   │   │   ├── client/
│   │   │   │   └── LLMClient.java
│   │   │   └── model/
│   │   │       └── ResumeRequest.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── static/index.html
│   └── test/
├── pom.xml
├── mvnw
├── mvnw.cmd
└── .gitignore
```

## How It Works

```text
User / Postman
      |
      v
POST /resume/generate
      |
      v
ResumeController
      |
      v
ResumeService
      |
      ├── ContentAgent      → Generates raw résumé content
      ├── FormattingAgent   → Formats the résumé for ATS readability
      └── ValidationAgent   → Reviews résumé quality
      |
      v
Google Gemini API
      |
      v
Response returned to the client
```

## Prerequisites

Install:

- Java 21
- A Google Gemini API key
- Git (optional, for version control)

You do not need to install Maven separately because this project includes the Maven Wrapper.

## Configuration

The project reads the Gemini API key from an environment variable.

In `src/main/resources/application.properties`:

```properties
spring.application.name=resume
gemini.api.key=${GEMINI_API_KEY}
gemini.api.url=https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent
```

Set your API key in PowerShell before starting the app:

```powershell
$env:GEMINI_API_KEY="your-gemini-api-key"
```

> Never commit your actual API key to GitHub.

## Run the Application

Open PowerShell in the project folder:

```powershell
cd resume
```

Start the application:

```powershell
.\mvnw.cmd spring-boot:run
```

The API starts on:

```text
http://localhost:8080
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/resume/` | Checks whether the Resume Creator API is running |
| `POST` | `/resume/generate` | Generates and formats a résumé |
| `POST` | `/resume/validate` | Generates a résumé and returns quality feedback |

## Test the API

### Check application status

```text
GET http://localhost:8080/resume/
```

Expected response:

```text
Resume Creator API is running. Use POST /resume/generate to create resumes.
```

### Generate a résumé

```text
POST http://localhost:8080/resume/generate
Content-Type: application/json
```

Example request body:

```json
{
  "name": "Rahul",
  "email": "rahul@example.com",
  "phone": "9876543210",
  "skills": ["Java", "Spring Boot", "SQL"]
}
```

### Validate a résumé

```text
POST http://localhost:8080/resume/validate
Content-Type: application/json
```

Use the same JSON request body:

```json
{
  "name": "Rahul",
  "email": "rahul@example.com",
  "phone": "9876543210",
  "skills": ["Java", "Spring Boot", "SQL"]
}
```

## Current Limitations

This is an early backend prototype. Planned improvements include:

- Add a complete frontend form and résumé preview
- Parse Gemini responses into clean Java response objects
- Return correct HTTP error codes for Gemini/API failures
- Validate required request fields
- Add user authentication
- Save generated résumés in a database
- Export résumés as PDF
- Add automated endpoint and integration tests

## Security

- Do not upload Gemini API keys, passwords, or `.env` files.
- Keep secret files in `.gitignore`.
- If a key was accidentally committed, revoke it immediately and create a new one.

## Contributing

1. Create a new branch:

   ```powershell
   git switch -c feature/your-feature-name
   ```

2. Make and test your changes.

3. Commit them:

   ```powershell
   git add .
   git commit -m "Add meaningful change description"
   ```

4. Push the branch and open a Pull Request.

## License

This project is currently intended for learning and personal use.
