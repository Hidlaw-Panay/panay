const url = '/assets/files/blogs.json';
let servicesContent = [];
let slug;
const entryDiv = document.getElementById('entry-single');
slug = localStorage.getItem('blog-slug');

fetch(url)
  .then((blob) => blob.json())
  .then((data) => servicesContent.push(...data));

function displayBlog() {
  const html = servicesContent
    .filter((data) => data.slug === slug)
    .map((data) => {
      var x = document.querySelectorAll('.page-title');
      for (var i = 0; i < x.length; i++) {
        x[i].innerHTML = data.title;
      }
      return `
            <article class="entry entry-single">
                <div class="entry-img">
                    <img
                    src="${data.img}"
                    alt=""
                    class="img-fluid"
                    />
                </div>

                <h2 class="entry-title">${data.title}</h2>

                <div class="entry-meta">
                    <ul>
                    <li class="d-flex align-items-center">
                        <i class="bi bi-person"></i>
                        ${data.author}
                    </li>
                    <li class="d-flex align-items-center">
                        <i class="bi bi-clock"></i>
                        <time datetime="2020-01-01">${data.dateCreated}</time>
                    </li>
                    </ul>
                </div>
                <div class="entry-content">
                ${Object.values(data.content)
                  .map((d) => `<p>${d}`)
                  .join('</p>')}
                </div>

                <div class="entry-footer">
                    <i class="bi bi-tags"></i>
                    <ul class="tags">
                    ${Object.values(data.categories)
                      .map((d) => `<li>${d}`)
                      .join('</li>')}
                    </ul>
                </div>
                </article>
            </div>
            `;
    })
    .join('');
  entryDiv.innerHTML = html;
}

function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

async function asyncCall() {
  const result = await resolveAfter2Seconds();
  displayBlog();
  // expected output: "resolved"
}

asyncCall();
