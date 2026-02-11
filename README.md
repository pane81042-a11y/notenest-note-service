# NoteNest Note Service

## Overview

The NoteNest Note Service is a serverless backend microservice responsible for managing notes within the NoteNest platform.

It enables users to create, retrieve, update, archive, and delete notes while enforcing secure access using Amazon Cognito JWT authorization.

This service operates fully within the AWS Always Free Tier.

---

## Architecture

- AWS Lambda (Note business logic)
- Amazon API Gateway (REST API endpoints)
- Amazon DynamoDB (Note persistence)
- Amazon Cognito (Authentication and JWT validation)
- IAM roles with least privilege access

---

## Responsibilities

- Create notes
- Retrieve user-specific notes
- Update note content and metadata
- Archive notes
- Delete notes
- Enforce note ownership validation

---

## Security

- Cognito User Pool integration
- JWT-based authorization via API Gateway
- User identity extraction from token claims
- Strict user-scoped data isolation
- IAM least privilege permissions

---

## Deployment Model

Deployed independently within a distributed serverless microservices architecture.

All API requests must include a valid Cognito access token in the Authorization header.

---

## Tech Stack

- Node.js
- AWS Lambda
- DynamoDB
- API Gateway
- Amazon Cognito

---

## Status

Initial note service scaffolding and serverless architecture setup.
