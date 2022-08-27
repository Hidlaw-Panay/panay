const url = '/assets/files/blogs.json';
// const url = 'https://hidlaw-panay.github.io/panay/assets/files/blogs.json';
let routeName;
let blogs = [];
let blogDiv;
const header = document.querySelector('#header');
const featured = document.querySelector('#featured');
const services = document.querySelector('#services');
const blog = document.querySelector('#blog');
const footer = document.querySelector('#footer');

if(header) {
  fetch('https://hidlaw-panay.github.io/panay/components/common/header.html')
  .then((res) => res.text())
  .then((data) => {
    header.innerHTML = data;
  });
}

if(featured) {
  fetch('https://hidlaw-panay.github.io/panay/components/home/featured.html')
  .then((res) => res.text())
  .then((data) => {
    featured.innerHTML = data;
  });
}

if(services) {
  fetch('https://hidlaw-panay.github.io/panay/components/home/services.html')
  .then((res) => res.text())
  .then((data) => {
    services.innerHTML = data;
  });
}

if(blog) {
  fetch('https://hidlaw-panay.github.io/panay/components/home/blog.html')
  .then((res) => res.text())
  .then((data) => {
    blog.innerHTML = data;
  });

}

if(footer) {
  fetch('https://hidlaw-panay.github.io/panay/components/common/footer.html')
  .then((res) => res.text())
  .then((data) => {
    footer.innerHTML = data;
  });

}

window.onload = function() {
  // set active nav-item
  var mainRoute = window.location.pathname.split('/')[1];
  routeName = mainRoute.split('.')[0];
  setTimeout(() => {
    let navItem = document.querySelector(`[data-route="${routeName}"]`);

    if(navItem) {
      navItem.classList.add('active')
    }

    // set featured blog
    blogDiv = document.getElementById('featured-blog');
    if(blogDiv) {
      fetch(url)
      .then((blob) => blob.json())
      .then((data) => blogs.push(...data));
    }
  }, 250);


}

function displayData() {
  if(blogDiv) {
    if(routeName === 'index') {
      blogs = blogs.slice(0,1)
    }
    const html = blogs
      .sort((next, prev) => {
        let prevDate = new Date(prev.dateCreated);
        let nextDate = new Date(next.dateCreated);
        return prevDate - nextDate;
      })
      .map((data) => {
        return `
          <article class="entry">
            <div class="entry-img">
              <img src="${data.img}" alt="" class="img-fluid" />
            </div>

            <h2 class="entry-title">
              <a href="blog-single.html"
                >${data.title}</a
              >
            </h2>

            <div class="entry-meta">
              <ul>
                <li class="d-flex align-items-center">
                  <i class="bi bi-person"></i>
                  <a href="blog-single.html">${data.author}</a>
                </li>
                <li class="d-flex align-items-center">
                  <i class="bi bi-clock"></i>
                  <a href="blog-single.html"
                    ><time datetime="2020-01-01">${data.dateCreated}</time></a
                  >
                </li>
            </div>

            <div class="entry-content">
              <p>
                ${data.content}
              </p>
              <div class="read-more">
                <a href="${data.url}">Read More</a>
              </div>
            </div>
          </article>
        `;
      })
      .join('');
    blogDiv.innerHTML = html;
  }
  
}

function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

async function asyncCall() {
  console.log('calling');
  const result = await resolveAfter2Seconds();
  console.log(result);
  displayData();
  // expected output: "resolved"
}

asyncCall();