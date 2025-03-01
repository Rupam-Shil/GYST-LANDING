# GYST API Documentation

This document provides detailed information about the API endpoints available in the GYST server.

## Table of Contents

1. [Overview](#overview)
2. [Base URL](#base-url)
3. [Authentication](#authentication)
4. [Endpoints](#endpoints)
   - [Health Check](#health-check)
   - [Generate Commit Message](#generate-commit-message)
   - [Generate Commit Suggestions](#generate-commit-suggestions)
   - [Suggest Git Command](#suggest-git-command)
5. [Error Handling](#error-handling)
6. [Rate Limiting](#rate-limiting)

## Overview

The GYST API provides services for generating Git commit messages and suggesting Git commands using AI. It leverages the Anthropic API to provide intelligent and context-aware responses based on code changes and user requests.

## Base URL

```
http://localhost:3001
```

For production environments, the base URL will depend on your deployment configuration.

## Authentication

Currently, the API does not require authentication for requests. However, it requires a valid Anthropic API key to be set in the server's environment variables.

## Endpoints

### Health Check

Checks the health status of the API.

- **URL**: `/api/health`
- **Method**: `GET`
- **URL Parameters**: None
- **Data Parameters**: None

#### Success Response

- **Code**: 200 OK
- **Content**:

```json
{
  "status": "ok",
  "version": "0.1.0"
}
```

#### Example Request

```bash
curl -X GET http://localhost:3001/api/health
```

---

### Generate Commit Message

Generates a single commit message based on the provided changes and diff.

- **URL**: `/api/commit`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Data Parameters**:

```json
{
  "changes": {
    "added": ["file1.js", "file2.js"],
    "modified": ["file3.js"],
    "deleted": ["file4.js"],
    "renamed": [["oldName.js", "newName.js"]],
    "stats": {
      "files_changed": 4,
      "insertions": 100,
      "deletions": 50
    }
  },
  "diff": "diff --git a/file1.js b/file1.js\nnew file mode 100644\nindex 0000000..a5bce3f\n..."
}
```

| Parameter                   | Type                      | Description                                       |
| --------------------------- | ------------------------- | ------------------------------------------------- |
| changes.added               | Array of Strings          | List of added files                               |
| changes.modified            | Array of Strings          | List of modified files                            |
| changes.deleted             | Array of Strings          | List of deleted files                             |
| changes.renamed             | Array of [String, String] | List of renamed files as [oldName, newName] pairs |
| changes.stats.files_changed | Number                    | Total number of files changed                     |
| changes.stats.insertions    | Number                    | Number of lines inserted                          |
| changes.stats.deletions     | Number                    | Number of lines deleted                           |
| diff                        | String                    | Git diff output                                   |

#### Success Response

- **Code**: 200 OK
- **Content**:

```json
{
  "message": "feat(component): add new feature with improved functionality"
}
```

#### Error Response

- **Code**: 500 Internal Server Error
- **Content**:

```json
{
  "error": "Error message details"
}
```

#### Example Request

```bash
curl -X POST http://localhost:3001/api/commit \
  -H "Content-Type: application/json" \
  -d '{
    "changes": {
      "added": ["README.md"],
      "modified": [],
      "deleted": [],
      "renamed": [],
      "stats": {
        "files_changed": 1,
        "insertions": 10,
        "deletions": 0
      }
    },
    "diff": "diff --git a/README.md b/README.md\nnew file mode 100644\nindex 0000000..a5bce3f\n--- /dev/null\n+++ b/README.md\n@@ -0,0 +1,10 @@\n+# Test Project\n+\n+This is a test project for demonstrating Git functionality.\n+\n+## Features\n+\n+- Feature 1\n+- Feature 2\n+\n+More details coming soon."
  }'
```

---

### Generate Commit Suggestions

Generates multiple commit message suggestions based on the provided changes and diff.

- **URL**: `/api/commit/suggestions`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Data Parameters**:

```json
{
  "changes": {
    "added": ["file1.js", "file2.js"],
    "modified": ["file3.js"],
    "deleted": ["file4.js"],
    "renamed": [["oldName.js", "newName.js"]],
    "stats": {
      "files_changed": 4,
      "insertions": 100,
      "deletions": 50
    }
  },
  "diff": "diff --git a/file1.js b/file1.js\nnew file mode 100644\nindex 0000000..a5bce3f\n...",
  "count": 3
}
```

| Parameter                   | Type                      | Description                                       |
| --------------------------- | ------------------------- | ------------------------------------------------- |
| changes.added               | Array of Strings          | List of added files                               |
| changes.modified            | Array of Strings          | List of modified files                            |
| changes.deleted             | Array of Strings          | List of deleted files                             |
| changes.renamed             | Array of [String, String] | List of renamed files as [oldName, newName] pairs |
| changes.stats.files_changed | Number                    | Total number of files changed                     |
| changes.stats.insertions    | Number                    | Number of lines inserted                          |
| changes.stats.deletions     | Number                    | Number of lines deleted                           |
| diff                        | String                    | Git diff output                                   |
| count                       | Number                    | Number of suggestions to generate (default: 3)    |

#### Success Response

- **Code**: 200 OK
- **Content**:

```json
{
  "suggestions": [
    "feat(component): add new feature with improved functionality",
    "feat(ui): implement new component with feature support",
    "feat: add new component with enhanced capabilities"
  ]
}
```

#### Error Response

- **Code**: 500 Internal Server Error
- **Content**:

```json
{
  "error": "Error message details"
}
```

#### Example Request

```bash
curl -X POST http://localhost:3001/api/commit/suggestions \
  -H "Content-Type: application/json" \
  -d '{
    "changes": {
      "added": ["README.md"],
      "modified": [],
      "deleted": [],
      "renamed": [],
      "stats": {
        "files_changed": 1,
        "insertions": 10,
        "deletions": 0
      }
    },
    "diff": "diff --git a/README.md b/README.md\nnew file mode 100644\nindex 0000000..a5bce3f\n--- /dev/null\n+++ b/README.md\n@@ -0,0 +1,10 @@\n+# Test Project\n+\n+This is a test project for demonstrating Git functionality.\n+\n+## Features\n+\n+- Feature 1\n+- Feature 2\n+\n+More details coming soon.",
    "count": 2
  }'
```

---

### Suggest Git Command

Suggests Git commands based on a natural language description of what the user wants to do.

- **URL**: `/api/command`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Data Parameters**:

```json
{
  "description": "I want to undo my last commit but keep the changes"
}
```

| Parameter   | Type   | Description                                       |
| ----------- | ------ | ------------------------------------------------- |
| description | String | Natural language description of the Git operation |

#### Success Response

- **Code**: 200 OK
- **Content**:

```json
{
  "suggestion": "COMMAND: git reset HEAD~1\nEXPLANATION: This command will undo your last commit and keep the changes in your working directory, allowing you to modify or recommit the files.\n\nNOTE: If you've already pushed the commit, consider using git revert instead."
}
```

#### Error Response

- **Code**: 500 Internal Server Error
- **Content**:

```json
{
  "error": "Error message details"
}
```

#### Example Request

```bash
curl -X POST http://localhost:3001/api/command \
  -H "Content-Type: application/json" \
  -d '{
    "description": "I want to undo my last commit but keep the changes"
  }'
```

## Error Handling

The API uses standard HTTP status codes to indicate the success or failure of a request:

- **200 OK**: The request was successful.
- **400 Bad Request**: The request was invalid or cannot be served. This occurs when the request contains invalid parameters.
- **500 Internal Server Error**: The server encountered an unexpected condition that prevented it from fulfilling the request.

Error responses include a JSON object with an `error` field containing a description of the error.

## Rate Limiting

Currently, there is no rate limiting implemented in the API. However, be aware that the Anthropic API used by the server may have its own rate limits.

---

## Implementation Details

The API is built using Next.js API routes and leverages the Anthropic API for AI-powered commit message generation and Git command suggestions. The server requires the following environment variables to be set:

- `ANTHROPIC_API_KEY`: Your Anthropic API key
- `ANTHROPIC_MODEL`: The Anthropic model to use (default: "claude-3-5-haiku-20241022")

These can be set in the `.env.local` file in the project root.
