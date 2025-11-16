#!/bin/bash

# Script to create GitHub repository for Randrr project
# Usage: ./create_github_repo.sh <github_token> [repo_name] [description]

GITHUB_TOKEN=${1:-$GITHUB_TOKEN}
REPO_NAME=${2:-"Randrr"}
DESCRIPTION=${3:-"Randrr Mobile App Design Project"}

if [ -z "$GITHUB_TOKEN" ]; then
    echo "Error: GitHub token required"
    echo "Usage: ./create_github_repo.sh <github_token> [repo_name] [description]"
    echo "Or set GITHUB_TOKEN environment variable"
    exit 1
fi

# Get GitHub username
USERNAME=$(curl -s -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user | grep -o '"login":"[^"]*' | cut -d'"' -f4)

if [ -z "$USERNAME" ]; then
    echo "Error: Could not authenticate with GitHub. Please check your token."
    exit 1
fi

echo "Creating repository '$REPO_NAME' for user '$USERNAME'..."

# Create repository
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/user/repos \
  -d "{
    \"name\": \"$REPO_NAME\",
    \"description\": \"$DESCRIPTION\",
    \"private\": false,
    \"auto_init\": false
  }")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" -eq 201 ]; then
    REPO_URL=$(echo "$BODY" | grep -o '"clone_url":"[^"]*' | cut -d'"' -f4)
    SSH_URL=$(echo "$BODY" | grep -o '"ssh_url":"[^"]*' | cut -d'"' -f4)
    
    echo "✓ Repository created successfully!"
    echo "  Repository URL: $REPO_URL"
    echo "  SSH URL: $SSH_URL"
    echo ""
    echo "To connect your local repository:"
    echo "  git remote add origin $REPO_URL"
    echo "  git add ."
    echo "  git commit -m 'Initial commit'"
    echo "  git push -u origin master"
else
    echo "Error: Failed to create repository"
    echo "HTTP Code: $HTTP_CODE"
    echo "Response: $BODY"
    exit 1
fi

