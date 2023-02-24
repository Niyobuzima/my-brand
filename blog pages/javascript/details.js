const container = document.querySelector('.container');
const deleteBtn = document.querySelector('.fa trash')

const renderPosts = async () => {
    let uri = 'http://localhost:3000/posts';
    const res = await fetch(uri);
    const wrapper = await res.json();

    let template = ``;
    wrapper.forEach( posts => {
        template += `
        <div class="posts">
        <a href="">${posts.body.slice(0,100)}</a>
        <i class="fa-solid fa-pen-to-square"></i>
        <i class="fa-solid fa-trash delete-icon" data-id="${posts.id}"></i>   
    </div>
    
        `
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
     
}

window.addEventListener('DOMContentLoaded', () => renderPosts());


