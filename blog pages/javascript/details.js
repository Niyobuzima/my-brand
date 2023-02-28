const container = document.querySelector('.container');

const renderPosts = async () => {
  let uri = 'http://localhost:3000/posts';
  const res = await fetch(uri);
  const wrapper = await res.json();

  let template = ``;
  wrapper.forEach( post => {
    template += `
      <div class="posts">
        <a href="">${post.body.slice(0,100)}</a>
        <i class="fa-solid fa-pen-to-square edit-icon" data-id="${post.id}"></i>
        <i class="fa-solid fa-trash delete-icon" data-id="${post.id}"></i>   
      </div>
    `;
  });
  container.innerHTML = template;

  document.querySelectorAll('.delete-icon').forEach(icon => {
    icon.addEventListener('click', async event => {
      event.preventDefault();
      const postId = event.target.dataset.id;

      try {
        const response = await fetch(`http://localhost:3000/posts/${postId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          // Remove the post from the UI
          const postElem = event.target.closest('.posts');
          postElem.parentNode.removeChild(postElem);
        } else {
          throw new Error('Failed to delete post');
        }
      } catch (error) {
        console.error(error);
        // Display an error message
      }
    });
  });

  document.querySelectorAll('.edit-icon').forEach(icon => {
    icon.addEventListener('click', async event => {
      event.preventDefault();
      const postId = event.target.dataset.id;
      const response = await fetch(`http://localhost:3000/posts/${postId}`);
      const post = await response.json();
      const title = prompt('Enter the new title', post.title);
      const body = prompt('Enter the new body', post.body);
      const doc = {
        title: title,
        body: body
      };
      await fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'PATCH',
        body: JSON.stringify(doc),
        headers: { 'Content-Type': 'application/json' }
      });
      renderPosts();
    });
  });
}

window.addEventListener('DOMContentLoaded', () => renderPosts());


