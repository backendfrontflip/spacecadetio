fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const { currentUser, comments } = data;

    renderComments(comments, currentUser);

    setupReplyInput(currentUser, comments);
  })
  .catch(error => console.error("Error fetching JSON data:", error));

const renderComments = (comments, currentUser) => {
  const commentsWrap = document.querySelector('.comments-wrap');
  commentsWrap.innerHTML = ""; // Clear existing content

  comments.forEach(comment => {
    const isCurrentUser = comment.user.username === currentUser.username;
    const commentHTML = `
      <div class="comment container" data-id="${comment.id}">
        <div class="c-score">
          <img src="images/icon-plus.svg" alt="plus" class="score-control score-plus">
          <p class="score-number">${comment.score}</p>
          <img src="images/icon-minus.svg" alt="minus" class="score-control score-minus">
        </div>
        <div class="c-user">
          <img src="${comment.user.image.png}" alt="${comment.user.username}" class="user-img">
          <div>
            <p class="user-name">${comment.user.username}</p>
            <p class="count-at">${comment.createdAt}</p>
          </div>
        </div>
        <p class="c-text">${comment.content}</p>
        <div class="c-controls">
          ${isCurrentUser
            ? `
              <button class="edit-btn">Edit</button>
              <button class="delete-btn">Delete</button>
            `
            : `
              <button class="reply-btn">Reply</button>
            `
          }
        </div>
      </div>
    `;

    commentsWrap.insertAdjacentHTML('beforeend', commentHTML);

    if (comment.replies.length > 0) {
      const repliesContainer = document.createElement('div');
      repliesContainer.classList.add('replies');
      comment.replies.forEach(reply => {
        const isReplyByCurrentUser = reply.user.username === currentUser.username;
        const replyHTML = `
          <div class="comment container reply" data-id="${reply.id}">
            <div class="c-score">
              <img src="images/icon-plus.svg" alt="plus" class="score-control score-plus">
              <p class="score-number">${reply.score}</p>
              <img src="images/icon-minus.svg" alt="minus" class="score-control score-minus">
            </div>
            <div class="c-user">
              <img src="${reply.user.image.png}" alt="${reply.user.username}" class="user-img">
              <div>
                <p class="user-name">${reply.user.username}</p>
                <p class="count-at">${reply.createdAt}</p>
              </div>
            </div>
            <p class="c-text">
              <span class="reply-to">@${reply.replyingTo}</span> ${reply.content}
            </p>
            <div class="c-controls">
              ${isReplyByCurrentUser
                ? `
                  <button class="edit-btn">Edit</button>
                  <button class="delete-btn">Delete</button>
                `
                : `
                  <button class="reply-btn">Reply</button>
                `
              }
            </div>
          </div>
        `;
        repliesContainer.insertAdjacentHTML('beforeend', replyHTML);
      });
      commentsWrap.appendChild(repliesContainer);
    }
  });

  setupCommentControls(comments, currentUser);
};

const setupReplyInput = (currentUser, comments) => {
  const replyInput = document.querySelector('.reply-input');
  replyInput.innerHTML = `
    <img src="${currentUser.image.png}" alt="${currentUser.username}" class="user-img">
    <textarea class="count-input" placeholder="Add a comment..."></textarea>
    <button class="send-btn">SEND</button>
  `;

  const sendButton = replyInput.querySelector('.send-btn');
  const textarea = replyInput.querySelector('.count-input');

  sendButton.addEventListener('click', () => {
    const content = textarea.value.trim();

    if (content === "") {
      alert("Please write a comment before sending!");
      return;
    }

    const newComment = {
      id: comments.length + 1,
      content,
      createdAt: "Just now",
      score: 0,
      user: {
        image: currentUser.image,
        username: currentUser.username,
      },
      replies: [],
    };

    comments.push(newComment);

    renderComments(comments, currentUser);

    textarea.value = "";
  });
};

const setupCommentControls = (comments, currentUser) => {
  const replyButtons = document.querySelectorAll('.reply-btn');
  const editButtons = document.querySelectorAll('.edit-btn');
  const deleteButtons = document.querySelectorAll('.delete-btn');

  replyButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const commentElement = e.target.closest('.comment');
      const commentId = commentElement.dataset.id;

      let replyInput = commentElement.querySelector('.reply-input');
      if (!replyInput) {
        replyInput = document.createElement('div');
        replyInput.classList.add('reply-input');
        replyInput.innerHTML = `
          <textarea class="count-input" placeholder="Reply..."></textarea>
          <button class="send-reply-btn">Send Reply</button>
        `;
        commentElement.appendChild(replyInput);

        const sendReplyButton = replyInput.querySelector('.send-reply-btn');
        const textarea = replyInput.querySelector('.count-input');

        sendReplyButton.addEventListener('click', () => {
          const replyContent = textarea.value.trim();
          if (replyContent === "") {
            alert("Please write a reply before sending!");
            return;
          }

          const comment = comments.find(c => c.id == commentId);
          const newReply = {
            id: comment.replies.length + 1,
            content: replyContent,
            createdAt: "Just now",
            score: 0,
            replyingTo: comment.user.username,
            user: currentUser,
          };

          comment.replies.push(newReply);

          renderComments(comments, currentUser);
        });
      }
    });
  });

  editButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const commentElement = e.target.closest('.comment');
      const commentText = commentElement.querySelector('.c-text');
      const commentId = commentElement.dataset.id;

      const newText = prompt("Edit your comment:", commentText.textContent);
      if (newText) {
        commentText.textContent = newText;

        const comment = comments.find(c => c.id == commentId || c.replies.some(r => r.id == commentId));
        if (comment.id == commentId) comment.content = newText;
        else {
          const reply = comment.replies.find(r => r.id == commentId);
          reply.content = newText;
        }
      }
    });
  });

  deleteButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const commentId = e.target.closest('.comment').dataset.id;

      // Display the modal
      const modalWrap = document.querySelector('.modal-wrap');
      modalWrap.classList.add('visible');

      const confirmButton = modalWrap.querySelector('.confirm-btn');
      const cancelButton = modalWrap.querySelector('.cancel-btn');

      confirmButton.onclick = () => {
        // Remove the comment or reply
        comments.forEach((comment, index) => {
          if (comment.id == commentId) comments.splice(index, 1);
          else {
            const replyIndex = comment.replies.findIndex(reply => reply.id == commentId);
            if (replyIndex !== -1) comment.replies.splice(replyIndex, 1);
          }
        });

        // Re-render comments and hide modal
        renderComments(comments, currentUser);
        modalWrap.classList.remove('visible');
      };

      cancelButton.onclick = () => {
        modalWrap.classList.remove('visible');
      };
    });
  });
};
