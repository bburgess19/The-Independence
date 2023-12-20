# The-Independence

## Body Parsing Policy

This documents how the body content for articles is parsed from Firestore

### Overview

1. Article metadata is stored in the DB
   - Author
   - Genre
   - Slug
   - Subtitle
   - Thumbnail
   - Title
   - Type
   - Upload date
   - File path to article contents
2. User fetches page
3. Client fetches metadata
4. The file path fetches the content markdown
5. The markdown is parsed and served to the user
