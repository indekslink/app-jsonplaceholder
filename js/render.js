import {
  fetchPostsByUser,
  fetchAlbumsByUser,
  fetchTodosByUser,
  fetchCommentsByPost,
  fetchPhotosByAlbum,
} from "./api.js";

// Render table rows for all users
export const renderUserTable = (users, container) => {
  users.forEach((user) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>
                <button class="btn btn-info btn-sm" data-user-id="${user.id}" data-action="posts">Detail Post</button>
                <button class="btn btn-primary btn-sm" data-user-id="${user.id}" data-action="albums">Detail Albums</button>
                <button class="btn btn-success btn-sm" data-user-id="${user.id}" data-action="todos">Detail Todos</button>
            </td>
        `;
    container.appendChild(row);
  });
};

// Render post modal
export const renderPostModal = async (userId) => {
  const posts = await fetchPostsByUser(userId);
  let modalContent = `
        <div class="modal fade" id="postModal" tabindex="-1" aria-labelledby="postModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="postModalLabel">Posts by User</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <ul class="list-group">
                            ${posts
                              .map(
                                (post) => `
                                <li class="list-group-item">
                                    ${post.title}
                                    <button class="btn btn-link btn-sm float-end" data-post-id="${post.id}" data-action="view-comments">View Comments</button>
                                </li>
                            `
                              )
                              .join("")}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
  document.getElementById("modal-container").innerHTML = modalContent;
  new bootstrap.Modal(document.getElementById("postModal")).show();
};

// Render albums modal (cards UI)
export const renderAlbumsModal = async (userId) => {
  const albums = await fetchAlbumsByUser(userId);
  let modalContent = `
        <div class="modal fade" id="albumsModal" tabindex="-1" aria-labelledby="albumsModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="albumsModalLabel">Albums by User</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body row">
                        ${albums
                          .map(
                            (album) => `
                            <div class="col-md-4 album-card">
                                <div class="card" data-album-id="${album.id}" data-action="view-photos">
                                    <div class="card-body">
                                        <h5 class="card-title">${album.title}</h5>
                                        <button class="btn btn-primary" data-action="view-photos">Detail Album</button>
                                    </div>
                                </div>
                            </div>
                        `
                          )
                          .join("")}
                    </div>
                </div>
            </div>
        </div>
    `;
  document.getElementById("modal-container").innerHTML = modalContent;
  new bootstrap.Modal(document.getElementById("albumsModal")).show();
};

// Render photos modal for an album
export const renderPhotosModal = async (albumId) => {
  const photos = await fetchPhotosByAlbum(albumId);
  let modalContent = `
        <div class="modal fade" id="photosModal" tabindex="-1" aria-labelledby="photosModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="photosModalLabel">Photos in Album</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body row">
                        ${photos
                          .map(
                            (photo) => `
                            <div class="col-md-3 mb-3">
                                <div class="card">
                                    <img src="${photo.thumbnailUrl}" class="card-img-top" alt="${photo.title}">
                                    <div class="card-body">
                                        <p class="card-text">${photo.title}</p>
                                    </div>
                                </div>
                            </div>
                        `
                          )
                          .join("")}
                    </div>
                </div>
            </div>
        </div>
    `;
  document.getElementById("modal-container").innerHTML = modalContent;
  new bootstrap.Modal(document.getElementById("photosModal")).show();
};

// Render todos modal
export const renderTodosModal = async (userId) => {
  const todos = await fetchTodosByUser(userId);
  let modalContent = `
        <div class="modal fade" id="todosModal" tabindex="-1" aria-labelledby="todosModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="todosModalLabel">Todos by User</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <ul class="list-group">
                            ${todos
                              .map(
                                (todo) => `
                                <li class="list-group-item ${
                                  todo.completed
                                    ? "list-group-item-success"
                                    : ""
                                }">
                                    ${todo.title} - ${
                                  todo.completed ? "Completed" : "Pending"
                                }
                                </li>
                            `
                              )
                              .join("")}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
  document.getElementById("modal-container").innerHTML = modalContent;
  new bootstrap.Modal(document.getElementById("todosModal")).show();
};

// Render comments modal for a post
export const renderCommentsModal = async (postId) => {
  const comments = await fetchCommentsByPost(postId);
  let modalContent = `
        <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" id="commentsModal" tabindex="-1" aria-labelledby="commentsModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="commentsModalLabel">Comments</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <ul class="list-group">
                            ${comments
                              .map(
                                (comment) => `
                                <li class="list-group-item">
                                    <strong>${comment.name}</strong>: ${comment.body}
                                </li>
                            `
                              )
                              .join("")}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
  document.getElementById("modal-container").innerHTML = modalContent;
  new bootstrap.Modal(document.getElementById("commentsModal")).show();
};
