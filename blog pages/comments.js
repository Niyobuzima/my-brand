function addComment() {
    const comment = document.getElementById("newComment").value;
    const commentList = document.getElementById("commentList"); 
    const newComment = document.createElement("div");
    newComment.innerHTML = comment; 
    commentList.appendChild(newComment); 
    document.getElementById("newComment").value = ""; 
  }
  
  
  const likeButton = document.getElementById("like-button");
const likeCount = document.getElementById("like-count");

likeButton.addEventListener("click", function() {
  const currentCount = parseInt(likeCount.innerText);
  likeCount.innerText = currentCount + 1;
});
