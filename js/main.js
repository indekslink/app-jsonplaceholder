import { fetchUsers } from "./api.js";
import {
  renderUserTable,
  renderPostModal,
  renderAlbumsModal,
  renderTodosModal,
  renderCommentsModal,
  renderPhotosModal,
  renderUserDetailModal,
} from "./render.js";

document.addEventListener("DOMContentLoaded", async () => {
  const userTableBody = document.querySelector("#user-table tbody");
  const users = await fetchUsers();

  // Render user data to table
  renderUserTable(users, userTableBody);

  // Event delegation for buttons inside the table
  userTableBody.addEventListener("click", (event) => {
    const userId = event.target.getAttribute("data-user-id");
    const action = event.target.getAttribute("data-action");
    const userName = event.target.closest("tr").querySelector("td").innerText;
    if (action === "posts") {
      renderPostModal(userId);
    } else if (action === "albums") {
      renderAlbumsModal(userId);
    } else if (action === "todos") {
      renderTodosModal(userId);
    } else if (action === "user-detail") {
      renderUserDetailModal(userId, userName);
    }
  });

  // Event delegation for album buttons to show photos
  document
    .getElementById("modal-container")
    .addEventListener("click", (event) => {
      const albumId = event.target
        .closest(".card")
        .getAttribute("data-album-id");
      const action = event.target.getAttribute("data-action");

      if (action === "view-photos") {
        renderPhotosModal(albumId);
      }
    });

  // Event delegation for buttons inside modals (view comments)
  document
    .getElementById("modal-container")
    .addEventListener("click", (event) => {
      const postId = event.target.getAttribute("data-post-id");
      const action = event.target.getAttribute("data-action");

      if (action === "view-comments") {
        renderCommentsModal(postId);
      }
    });

  document
    .getElementById("modal-container")
    .addEventListener("hidden.bs.modal", function () {
      // Menghapus backdrop secara manual ketika modal ditutup
      const modalBackdrop = document.querySelector(".modal-backdrop");
      if (modalBackdrop) {
        modalBackdrop.remove();
      }
    });
});
