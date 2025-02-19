# Live Scoreboard System Specification

## Overview

This document outlines the technical specification for a real-time scoreboard system that tracks and displays the top 10 user scores. The system implements secure authentication, real-time updates, and protection against unauthorized score modifications.

## System Architecture

### Core Components

1. Authentication Service

   - JWT-based authentication system
   - Token validation and management
   - Session handling
2. WebSocket Service (Socket.IO)

   - Real-time score updates
   - Authenticated connections
   - Event broadcasting
3. Score Management Service

   - Score update handling via Redis HINCRBY
   - Asynchronous database updates via message queue
   - Rate limiting implementation
4. Redis Cache Layer

   - Primary storage for current scores
   - Fast increment operations (HINCRBY)
   - Leaderboard data caching
   - Fallback to database when data missing
5. Message Queue Service

   - Handles asynchronous database updates
   - Ensures data consistency between Redis and Database
   - Provides retry mechanism for failed updates

### Redis Data Structure

Redis serves as the primary storage for real-time score management using Sorted Set data structure.

1. Sorted Set Structure (`leaderboard`)
   - Maintains real-time ranking of all users based on their scores
   - Updates scores atomically using ZINCRBY operation
   - Scores serve as the sorting criteria for ranking
   - Example structure:
     ```
     leaderboard
       user:2 -> 150 (rank 1)
       user:1 -> 100 (rank 2)
       user:3 -> 75  (rank 3)
     ```

### Benefits of Sorted Set

1. Atomic Operations:

   - ZINCRBY guarantees atomic score updates
   - Automatically maintains sorted order after each update
   - No need for additional sorting operations
2. Performance Characteristics:

   - O(log N) for score updates via ZINCRBY
   - O(log N) for retrieving top N users
   - Perfect for real-time leaderboard applications
3. Data Access Patterns:

   - Efficient range queries for leaderboard data
   - Real-time ranking information
   - Built-in support for both score and rank tracking

### Recovery Strategy

When Redis data is missing or after system restart:

1. Load scores from persistent database
2. Rebuild Sorted Set using batch operations
3. Continue real-time operations with Redis

### Security Features

1. JWT Authentication

   - Secure token generation and validation
   - Token expiration and refresh mechanism
   - Role-based access control
2. Rate Limiting

   - Request rate limiting per user
   - Protection against score update spam
   - Configurable thresholds
3. WebSocket Security

   - Authentication middleware for Socket.IO
   - Connection validation
   - Event filtering

## API Endpoints

### Authentication

```
POST /api/auth/login
- Handles user authentication
- Returns JWT token

POST /api/auth/refresh
- Refreshes expired JWT tokens
```

### Score Management

```
POST /api/scores/update
- Updates user score
- Requires valid JWT
- Rate limited
- Triggers leaderboard:update WebSocket event
```

## WebSocket Events Communication Flow

### 1. Connection Event

**Event Name:** `connection`
**Direction:** Client -> Server
**Purpose:** Establish initial WebSocket connection
**Data Structure:**

```javascript
{
    "auth": {
        "token": "JWT_TOKEN"
    }
}
```

**Process Flow:**

1. Client initiates connection with JWT token
2. Server validates token
3. If valid:
   - Connection is established
   - Server immediately sends current leaderboard data
4. If invalid, connection is rejected

### 2. Leaderboard Update Event

**Event Name:** `leaderboard:update`
**Direction:** Server -> Client
**Purpose:** Broadcast updated leaderboard when changes occur
**Data Structure:**

```javascript
{
    "leaderboard": [
        {
            "userId": string,
            "username": string,
            "score": number,
            "rank": number
        }
    ],
    "lastUpdateTime": number
}
```

**Broadcast Strategy:**

- Automatically triggered when scores are updated via REST API
- Sent to all connected clients
- Optimized for minimum payload size
- Maintains real-time synchronization across all clients

## Rate Limiting Configuration

```javascript
{
  "scoreUpdate": {
    "windowMs": 60000,  // 1 minute
    "max": 10,          // 10 requests per window
    "message": "Too many score updates, please try again later"
  }
}
```

## Security Implementation Details

### JWT Structure

```javascript
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "userId": "<user_id>",
    "username": "<username>",
    "role": "<user_role>",
    "exp": "<expiration_timestamp>"
  }
}
```

### Socket.IO Authentication Middleware

```javascript
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  // Validate JWT token
  // Attach user data to socket
  next();
});
```

## Improvement Suggestions

### Third-Party Integration Security

For third-party systems that need to integrate without user authentication, implement a digital signature system:

1. Digital Signature Implementation

   ```javascript
   {
     "timestamp": "<current_timestamp>",
     "nonce": "<unique_random_string>",
     "signature": "<HMAC_SHA256(timestamp + nonce + secret_key)>"
   }
   ```
2. Benefits:

   - Allows secure integration without user authentication
   - Prevents replay attacks using timestamp validation
   - Ensures request authenticity through signature verification
3. Implementation Guidelines:

   - Issue unique API keys to third-party services
   - Implement signature verification middleware
   - Set strict timestamp validation windows (e.g., 5 minutes)
   - Maintain nonce history for replay prevention

### Additional Improvement Recommendations

1. Message Queue with Bull MQ

   - Use Bull MQ for reliable score persistence to database
   - Implement retry mechanism for failed database updates
   - Configure dead-letter queue for failed jobs after max retries
   - Example configuration:
     ```
     Max retries: 3
     Retry delay: exponential backoff (1min, 5min, 15min)
     TTL for failed jobs: 24 hours
     ```
   - Monitor job processing status through Bull MQ dashboard
   - Implement job rollback mechanisms for data consistency
2. Scalability

   - Implement horizontal scaling for WebSocket servers
   - Use Redis pub/sub for multi-server synchronization
   - Consider implementing a message queue for score updates
3. Monitoring and Logging

   - Implement comprehensive logging
   - Set up monitoring for suspicious activities
   - Track rate limit violations
4. Error Handling

   - Implement graceful degradation
   - Provide clear error messages
   - Maintain audit logs for security events

## Implementation Notes for Backend Team

1. Priority Implementation Order:

   - Authentication system
   - Basic score update API
   - WebSocket integration
   - Rate limiting
   - Third-party integration system
2. Development Guidelines:

   - Use TypeScript for better type safety
   - Implement comprehensive unit tests
   - Follow RESTful API best practices
   - Document all security-sensitive code
3. Security Considerations:

   - Store secrets in environment variables
   - Implement proper password hashing
   - Use HTTPS for all endpoints
   - Regular security audits
4. Performance Considerations:

   - Optimize database queries
   - Implement proper indexing
   - Consider batch updates for scores
   - Optimize WebSocket message payload size
