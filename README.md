##### Pinggy Posts App is a Next.js frontend and Spring Boot backend application that allows users to create and view posts.

Features:
1. Users can create posts with Title, Body, and Auth Code.
2. Posts are stored in memory in the backend.
3.The frontend fetches and displays all posts.
4.Basic error handling and loading states are implemented.

## Tech Stack Used:

1. Frontend: Next.js 
2. Backend: Spring Boot
3. Database: In-memory storage 
4. Authentication: Custom header (PinggyAuthHeader)


## Backend Setup:

1. Navigate to the Backend Directory
    cd backend

2. Ensure you have Java 17+ and Maven dependencies installed.

3. Then simply click on run and the backend runs on  http://localhost:8080.

## Frontend Setup:
1. Navigate to the Frontend Directory
    cd frontend
2. Install Dependencies
    npm install
3. Start the Frontend Server
    npm run dev
4. The frontend runs on http://localhost:3000.

   API Endpoints

1. Create a Post
Endpoint: POST /api/post

Headers:
PinggyAuthHeader: your-auth-token
Content-Type: application/json
Body:
{
  "title": "My Post",
  "body": "This is a test post"
}
Response:
{
  "title": "My Post",
  "body": "This is a first post",
  "authHeader": "your-auth-token"
}
2. Fetch All Posts
Endpoint: GET /api/list

Headers:
PinggyAuthHeader: your-auth-token
Content-Type: application/json
Response:
  {
    "title": "My Post",
    "body": "This is a first post",
    "authHeader": "your-auth-token"
  }
Screenshot: Attached in the folder




