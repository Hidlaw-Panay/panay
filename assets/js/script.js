let routeName;
let blogs = [];
let blogDiv, blogRecentDiv;
const header = document.querySelector('#header');
const featured = document.querySelector('#featured');
const services = document.querySelector('#services');
const blog = document.querySelector('#blog');
const footer = document.querySelector('#footer');

if (header) {
  fetch('/components/common/header.html')
    .then((res) => res.text())
    .then((data) => {
      header.innerHTML = data;
    });
}

if (featured) {
  fetch('/components/home/featured.html')
    .then((res) => res.text())
    .then((data) => {
      featured.innerHTML = data;
    });
}

if (services) {
  fetch('/components/home/services.html')
    .then((res) => res.text())
    .then((data) => {
      services.innerHTML = data;
    });
}

if (blog) {
  fetch('/components/home/blog.html')
    .then((res) => res.text())
    .then((data) => {
      blog.innerHTML = data;
    });
}

if (footer) {
  fetch('/components/common/footer.html')
    .then((res) => res.text())
    .then((data) => {
      footer.innerHTML = data;
    });
}

window.onload = function () {
  // set active nav-item
  var mainRoute = window.location.pathname.split('/')[1];
  routeName = mainRoute.split('.')[0];
  setTimeout(() => {
    let navItem = document.querySelector(`[data-route="${routeName}"]`);

    if (navItem) {
      navItem.classList.add('active');
    }

    // set featured blog
    blogDiv = document.getElementById('featured-blog');
    blogRecentDiv = document.getElementById('recent-posts');
    if (blogDiv || blogRecentDiv) {
      const url = '/assets/files/blogs.json';
      fetch(url)
        .then((blob) => blob.json())
        .then((data) => blogs.push(...data));
    }
  }, 250);
};

function displayData() {
  if (blogDiv) {
    if (routeName === 'index') {
      blogs = blogs.slice(0, 1);
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
              <a href="/news/news-detail.html"
                >${data.title}</a
              >
            </h2>

            <div class="entry-meta">
              <ul>
                <li class="d-flex align-items-center">
                  <i class="bi bi-person"></i>
                  <a href="/news/news-detail.html">${data.author}</a>
                </li>
                <li class="d-flex align-items-center">
                  <i class="bi bi-clock"></i>
                  <a href="/news/news-detail.html"
                    ><time datetime="2020-01-01">${data.dateCreated}</time></a
                  >
                </li>
            </div>

            <div class="entry-content">
              <p>
              ${Object.values(data.content)
                .map((d) => `<p>${d}`)
                .join('</p>')}
              </p>
              <div class="read-more">
                <a href="/news/news-detail.html" data-slug="${
                  data.slug
                }" onclick="setBlogSlug(this)">Read More</a>
              </div>
            </div>
          </article>
        `;
      })
      .join('');
    blogDiv.innerHTML = html;
  }

  if (blogRecentDiv) {
    const recentData = blogs
      .sort((next, prev) => {
        let prevDate = new Date(prev.dateCreated);
        let nextDate = new Date(next.dateCreated);
        return prevDate - nextDate;
      })
      .map((data) => {
        return `
        <div class="post-item clearfix">
          <img src="${data.img}" alt="" />
          <h4>
            <a href="/news/news-detail.html" data-slug="${data.slug}" onclick="setBlogSlug(this)">
              ${data.title}
            </a>
          </h4>
          <time datetime="${data.dateCreated}">${data.dateCreated}</time>
        </div>
        `;
      })
      .join('');
    blogRecentDiv.innerHTML = recentData;
  }
}

function setBlogSlug(e) {
  slug = e.getAttribute('data-slug');
  localStorage.setItem('blog-slug', slug);
}

function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

async function asyncCall() {
  console.log('calling main news');
  const result = await resolveAfter2Seconds();
  console.log(result);
  displayData();
  // expected output: "resolved"
}

asyncCall();
