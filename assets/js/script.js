const header = document.querySelector('#header');
const featured = document.querySelector('#featured');
const services = document.querySelector('#services');
const blog = document.querySelector('#blog');
const footer = document.querySelector('#footer');

if(header) {
  fetch('/components/common/header.html')
  .then((res) => res.text())
  .then((data) => {
    header.innerHTML = data;
  });
}

if(featured) {
  fetch('/components/home/featured.html')
  .then((res) => res.text())
  .then((data) => {
    featured.innerHTML = data;
  });
}

if(services) {
  fetch('/components/home/services.html')
  .then((res) => res.text())
  .then((data) => {
    services.innerHTML = data;
  });
}

if(blog) {
  fetch('/components/home/blog.html')
  .then((res) => res.text())
  .then((data) => {
    blog.innerHTML = data;
  });

}

if(footer) {
  fetch('/components/common/footer.html')
  .then((res) => res.text())
  .then((data) => {
    footer.innerHTML = data;
  });

}
