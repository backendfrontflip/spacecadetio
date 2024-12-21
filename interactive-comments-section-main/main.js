const data = {
    currentUser: {
      image: {
        png: "./images/avatars/image-juliusomo.png",
        webp: "./images/avatars/image-juliusomo.webp",
      },
      username: "juliusomo",
    },
    comments: [
      {
        parent: 0,
        id: 1,
        content:
          "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
        createdAt: "1 month ago",
        score: 12,
        user: {
          image: {
            png: "./images/avatars/image-amyrobson.png",
            webp: "./images/avatars/image-amyrobson.webp",
          },
          username: "amyrobson",
        },
        replies: [],
      },
      {
        parent: 0,
        id: 2,
        content:
          "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
        createdAt: "2 weeks ago",
        score: 5,
        user: {
          image: {
            png: "./images/avatars/image-maxblagun.png",
            webp: "./images/avatars/image-maxblagun.webp",
          },
          username: "maxblagun",
        },
        replies: [
          {
            parent: 2,
            id: 3,
            content:
              "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
            createdAt: "1 week ago",
            score: 4,
            replyingTo: "maxblagun",
            user: {
              image: {
                png: "./images/avatars/image-ramsesmiron.png",
                webp: "./images/avatars/image-ramsesmiron.webp",
              },
              username: "ramsesmiron",
            },
          },
          {
            parent: 2,
            id: 4,
            content:
              "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
            createdAt: "2 days ago",
            score: 2,
            replyingTo: "ramsesmiron",
            user: {
              image: {
                png: "./images/avatars/image-juliusomo.png",
                webp: "./images/avatars/image-juliusomo.webp",
              },
              username: "juliusomo",
            },
          },
        ],
      },
    ],
  };
  
  function appendFrag(frag, parent) {
    const child = Array.from(frag.childNodes);
    parent.appendChild(frag);
    console.log("Appended Fragment:", child[0]);
    return child[0];
  }
  
  const addComment = (body, parentId, replyTo = undefined) => {
    console.log("Adding Comment:", { body, parentId, replyTo });
  
    let commentParent =
      parentId === 0
        ? data.comments
        : data.comments.find((c) => c.id === parentId).replies;
  
    if (!commentParent) {
      console.error("Failed to find parent for comment:", parentId);
      return;
    }
  
    let newComment = {
      parent: parentId,
      id: commentParent.length === 0 ? 1 : commentParent[commentParent.length - 1].id + 1,
      content: body,
      createdAt: "Now",
      replyingTo: replyTo,
      score: 0,
      replies: parentId === 0 ? [] : undefined,
      user: data.currentUser,
    };
  
    commentParent.push(newComment);
    console.log("New Comment Added:", newComment);
  
    initComments();
  };
  
  const deleteComment = (commentObject) => {
    console.log("Deleting Comment:", commentObject);
  
    if (commentObject.parent === 0) {
      data.comments = data.comments.filter((e) => e !== commentObject);
    } else {
      let parentComment = data.comments.find((e) => e.id === commentObject.parent);
      parentComment.replies = parentComment.replies.filter((e) => e !== commentObject);
    }
  
    initComments();
  };
  
  const createCommentNode = (commentObject) => {
    const commentSection = document.querySelector(".comment-section");
    if (!commentSection) {
      console.error("Comment section template not found!");
      return;
    }
  
    const commentNode = commentSection.content.cloneNode(true);
    console.log("Cloning Comment Node for:", commentObject);
  
    const userNameElement = commentNode.querySelector(".user-name");
    const userImageElement = commentNode.querySelector(".user-img");
  
    if (userNameElement && userImageElement) {
      userNameElement.textContent = commentObject.user.username;
      userImageElement.src = commentObject.user.image.webp || "./images/default-user.webp";
    } else {
      console.error("Error: .user-name or .user-img elements not found in comment template");
    }
  
    console.log("User Name:", commentObject.user.username); // Debugging log to check username
  
    commentNode.querySelector(".score-number").textContent = commentObject.score;
    commentNode.querySelector(".count-at").textContent = commentObject.createdAt;
    commentNode.querySelector(".c-body").textContent = commentObject.content;
  
    if (commentObject.replyingTo) {
      commentNode.querySelector(".reply-to").textContent = `@${commentObject.replyingTo}`;
    }
  
    return commentNode;
  };
  
  function initComments(commentList = data.comments, parent = document.querySelector(".comments-wrap")) {
    console.log("Initializing Comments:", commentList);
  
    if (!parent) {
      console.error("Parent container for comments not found!");
      return;
    }
  
    parent.innerHTML = "";
    commentList.forEach((element) => {
      console.log("Rendering Comment:", element);
  
      const nodeComment = createCommentNode(element);
      if (!nodeComment) {
        console.error("Failed to create comment node for:", element);
        return;
      }
  
      if (element.replies && element.replies.length > 0) {
        initComments(element.replies, nodeComment.querySelector(".replies"));
      }
  
      parent.appendChild(nodeComment);
    });
  }
  
  initComments();
  
  const countInput = document.querySelector(".reply-input");
  if (countInput) {
    countInput.querySelector(".send-btn").addEventListener("click", () => {
      const commentBody = countInput.querySelector(".count-input").value.trim();
      if (commentBody.length === 0) {
        console.warn("Empty comment body. Skipping add.");
        return;
      }
  
      addComment(commentBody, 0);
      countInput.querySelector(".count-input").value = "";
    });
  } else {
    console.error(".reply-input not found in the DOM!");
  }
  