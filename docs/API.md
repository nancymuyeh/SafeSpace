# API Documentation

Complete API reference for SafeSpace backend.

**Base URL**: `http://localhost:3000/api/v1`

**Interactive Documentation**: Visit `/api-docs` for Swagger UI

## Authentication

Currently, the API does not require authentication as all posts are anonymous. Future versions may implement optional user accounts.

## Endpoints

### Stories

#### Get All Stories
```http
GET /api/v1/stories
```

**Response:**
```json
[
  {
    "id": "uuid",
    "content": "Story content here...",
    "mood": "anxious",
    "userId": null,
    "createdAt": "2024-01-15T10:00:00Z"
  }
]
```

**Status Codes:**
- `200` - Success

---

#### Create Story
```http
POST /api/v1/stories
```

**Request Body:**
```json
{
  "content": "Story content here...",
  "mood": "hopeful",
  "userId": "uuid" // optional
}
```

**Validation:**
- `content`: Required, string, min 10 characters, max 1000 characters
- `mood`: Required, one of: `hopeful`, `anxious`, `healing`, `lonely`, `grateful`, `tired`
- `userId`: Optional, UUID format

**Response:**
```json
{
  "id": "uuid",
  "content": "Story content here...",
  "mood": "hopeful",
  "userId": null,
  "createdAt": "2024-01-15T10:00:00Z"
}
```

**Status Codes:**
- `201` - Created
- `400` - Validation error

**Features:**
- Content is automatically filtered for offensive words
- Stories are anonymous by default

---

#### Add Reaction to Story
```http
POST /api/v1/stories/:id/reactions
```

**Path Parameters:**
- `id` - Story UUID

**Request Body:**
```json
{
  "type": "heart"
}
```

**Response:**
```json
{
  "id": "uuid",
  "storyId": "story-uuid",
  "type": "heart",
  "createdAt": "2024-01-15T10:00:00Z"
}
```

**Status Codes:**
- `201` - Created
- `400` - Invalid story ID or type

---

#### Report Story
```http
POST /api/v1/stories/:id/report
```

**Path Parameters:**
- `id` - Story UUID

**Request Body:**
```json
{
  "reason": "Inappropriate content"
}
```

**Response:**
```json
{
  "id": "uuid",
  "storyId": "story-uuid",
  "reason": "Inappropriate content",
  "createdAt": "2024-01-15T10:00:00Z"
}
```

**Status Codes:**
- `201` - Created
- `400` - Invalid story ID or reason

**Note:** Reported stories are flagged but not automatically deleted.

---

### Resources

#### Get All Resources
```http
GET /api/v1/resources
```

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "National Suicide Prevention Lifeline",
    "description": "24/7 crisis support",
    "url": "https://988lifeline.org",
    "type": "crisis",
    "createdAt": "2024-01-15T10:00:00Z"
  }
]
```

**Status Codes:**
- `200` - Success

---

## Error Handling

All errors follow this format:

```json
{
  "error": "Error message description"
}
```

For validation errors (Zod):
```json
{
  "error": [
    {
      "path": ["field"],
      "message": "Field is required"
    }
  ]
}
```

## Rate Limiting

Currently not implemented. Consider adding rate limiting for production.

## CORS

CORS is enabled for all origins in development. Configure for specific domains in production.

## Data Types

### Mood Enum
Valid mood values:
- `hopeful`
- `anxious`
- `healing`
- `lonely`
- `grateful`
- `tired`

### Reaction Type
Currently supports:
- `heart`
- `hug`
- `support`

## Pagination

Not currently implemented. All endpoints return full result sets. Consider adding pagination for production:

```http
GET /api/v1/stories?page=1&limit=20
```

## Filtering & Sorting

Not currently implemented on backend. Frontend handles filtering by mood. Consider moving to backend:

```http
GET /api/v1/stories?mood=anxious&sort=createdAt:desc
```

## Webhooks

Not currently supported.

## Versioning

API is versioned via URL path (`/api/v1`). Breaking changes will increment the version number.

## Support

For API issues, open a GitHub issue or contact the development team.
