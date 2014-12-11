# Product

- Need to implement a way for users to make edits to posts as they come in.
  - Eventually edits will require klout and democratic approaches.
- A way for users to associate items that already exist in the db with posts rather than duplicates.
- Need to think about the front page layout.
- Track bounty on images would be nice, sort by highest bounty.
  - Need a way to notify users who are tracking images.
- How is user klout generated?
- Autocomplete for filling out brand name.

# Technical

- Refactor api models to use bookshelf factories rather than deferred imports.
- Implement proper access tokens.
- Implement proper client side models and collections.
- Image uploads for edited items. I.e., user uploads an image from a url or multipart.


# BUGS
- Can comment while logged out
- Can submit items while logged out
