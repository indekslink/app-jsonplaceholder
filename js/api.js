// Fetch all users
export const fetchUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  return response.json();
};

// Fetch user by ID (for detailed information)
export const fetchUserById = async (userId) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  return response.json();
};

// Fetch posts by user ID
export const fetchPostsByUser = async (userId) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}/posts`
  );
  return response.json();
};

// Fetch albums by user ID
export const fetchAlbumsByUser = async (userId) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}/albums`
  );
  return response.json();
};

// Fetch todos by user ID
export const fetchTodosByUser = async (userId) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}/todos`
  );
  return response.json();
};

// Fetch comments by post ID
export const fetchCommentsByPost = async (postId) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  );
  return response.json();
};

// Fetch photos by album ID
export const fetchPhotosByAlbum = async (albumId) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
  );
  return response.json();
};
