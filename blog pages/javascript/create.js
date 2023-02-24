const form = document.querySelector('form');

function previewFile() {
  const preview = document.querySelector('#img_preview');
  const file = document.querySelector('#image').files[0];
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    // convert image file to base64 string
    preview.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}

const axios = require('axios').default;

function saveView() {
  const form = document.querySelector('form');
  const head = document.querySelector('#header').value;
  const blog = document.querySelector('#body').value;
  const pic = document.querySelector('#img_preview').getAttribute('src');

  const createPost = async (e) => {
    e.preventDefault();
    const doc = {
      title: head,
      body: blog,
      image: pic,
    };

    try {
      const response = await axios.post('http://localhost:3000/posts', doc);
      console.log(response.data); // logs the created post object
      window.location.replace('/index.html');
    } catch (error) {
      console.error(error);
    }
  };

  form.addEventListener('submit', createPost);
}
