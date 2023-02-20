const id = new URLSearchParams(window.location.search).get('id');
const container = document.querySelector(".container");

const renderDetails = async () => {
    const res = await fetch(`http://localhost:3000/posts/` + id );
    const posts = await res.json();
    const template = `
    <div class="post">
    <h1>${posts.title}</h1>
    <div class="img-wrapper">
        <img src="blog-images/Repairs-2.jpg" alt="author">
        <p><time datetime="feb 07 2023 18:02">feb 07 2023 18:02</time> Niyobuzima Theophile</p>
    </div>
    <div class="wrapper">
    <img src="${posts.image}" alt="article">Lorem ipsum dolor sit 
    <p>${posts.body}</p>
    
    </div>
    </div>
    `
    container.innerHTML = template;

    console.log(container)
}

window.addEventListener('DOMContentLoaded', () => renderDetails());
