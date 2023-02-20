const container = document.querySelector('.main-content');

const renderPosts = async () => {
    let uri = 'http://localhost:3000/posts';
    const res = await fetch(uri);
    const wrapper = await res.json();

    let template = ``;
    wrapper.forEach( posts => {
        template += `
        <div class="wrapper">
                    <img src="${posts.image}" alt="article1">
                    <p>
                        ${posts.body.slice(0,50)} 
                    </p>
                    <div class="readmore">
                        <a href="blog-page.html?id=${posts.id}">Readmore</a>
                    </div>
                    </div>
        `
    });
    container.innerHTML = template;
}

window.addEventListener('DOMContentLoaded', () => renderPosts());


