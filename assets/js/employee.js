const url = '/assets/files/employees.json';
let employees = [];
const employeeDiv = document.getElementById('employees');
const type = employeeDiv.dataset.type;

fetch(url)
  .then((blob) => blob.json())
  .then((data) => employees.push(...data));

function displayData() {
  const html = employees
    .sort((next, prev) => {
      return next.order - prev.order;
    })
    .map((data) => {
      if(data.type  === type) {
        return `
          <div class="col-lg-4 col-md-6 d-flex align-items-stretch">
            <div class="member">
              <img src="${data.url ? data.url : '/assets/img/team/placeholder.jpg'}" alt="${data.last_name}" />
              <h4>${data.first_name} ${data.middle_name ? data.middle_name[0] + '.' : ''} ${data.last_name}</h4>
              <span>${data.position}</span>
              <span>${data.office}</span>
              ${data.designation ? `<h6 class="mt-2">${Object.values(data.designation).map((d) => d).join('<br>')}</h6>` : ''}
              <p>
                ${data.qualification}
              </p>
            </div>
          </div>
          `;
      }
    })
    .join('');
  employeeDiv.innerHTML = html;
}

function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

async function asyncCall() {
  console.log('calling employees');
  const result = await resolveAfter2Seconds();
  console.log(result);
  displayData();
  // expected output: "resolved"
}

asyncCall();