const form = document.querySelector('form');
let image = "";
const preview = document.getElementById('preview');

document.getElementById('image').addEventListener('change', (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onloadend = () => {
    const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
    image = base64String;
    preview.src = 'data:image/png;base64,' + image;
  };
  reader.readAsDataURL(file);
});

const createPost = async (e) => {
  e.preventDefault();


  const doc = {
    title: form.title.value,
    body: form.body.value,
    image: image,
  }

  await fetch('http://localhost:3000/posts', {
    method: 'POST',
    body: JSON.stringify(doc),
    headers: { 'Content-Type': 'application/json' }
  })

  window.location.replace('/blog.html')
}

form.addEventListener('submit', createPost);