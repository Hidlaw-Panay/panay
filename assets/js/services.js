const url = '/assets/files/services.json';
let servicesContent = [];
let category;
const serviceDiv = document.getElementById('services-content');

function handleClick(e) {
  servicesContent = [];
  category = e.getAttribute('data-category');
  serviceDiv.innerHTML =
    '<div class="text-center my-5"><div class="spinner-border text-danger" role="status"><span class="visually-hidden">Loading...</span></div></div>';

  fetch(url)
    .then((blob) => blob.json())
    .then((data) => servicesContent.push(...data));

  asyncCall();
}

function displayService() {
  const html = servicesContent
    .filter((data) => data.category === category)
    .map((data) => {
      return `
            <div class="modal-header">
                <h5 class="modal-title" id="serviceModalLabel">${
                  data.title
                }</h5>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
            </div>
            <div class="modal-body" id="services-content">
                <h6>Services</h6>
                <ol>
                    ${Object.values(data.services)
                      .map((d) => `<li>${d}`)
                      .join('</li>')}
                </ol>
            </div>
            <div class="modal-footer">
                <p>Contact Detail: <strong class="text-primary">${
                  data.contact
                }</strong></p>
            </div>
            `;
    })
    .join('');
  serviceDiv.innerHTML = html;
}

function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

async function asyncCall() {
  console.log('calling services');
  const result = await resolveAfter2Seconds();
  console.log(result);
  displayService();
  // expected output: "resolved"
}

asyncCall();
