const url = '/assets/files/procurements.json';
let procurements = [];
let procStatus = 'Open';
const procurementDiv = document.getElementById('procurement');
const searchInput = document.getElementById('keyword');
const procurementStatus = document.getElementById('status');

fetch(url)
  .then((blob) => blob.json())
  .then((data) => procurements.push(...data));

function setStatus() {
  procStatus = this.value;
  displayMatches();
}

function displayData() {
  const html = procurements
    .sort((next, prev) => {
      let prevDate = new Date(prev.dateCreated);
      let nextDate = new Date(next.dateCreated);
      return prevDate - nextDate;
    })
    .map((data) => {
      return `
        <div class="border rounded">
            <div class="row">
                <div class="col-md-4 bg-primary text-white p-4">
                    <ul class="list-unstyled">
                        <li>Project ID:</li>
                    <li>Project Name:</li>
                    <br>
                    <li>Approved Budget for the Contract:</li>
                    <li>Pre-Bid Conference:</li>
                    <li>Submission Deadline:</li>
                    <li>Bid Opening:</li>
                    <li>Attachment:</li>
                    <li>Status:</li>
                    </ul>
                </div>
                <div class="col-md-8 p-4">
                    <ul class="list-unstyled">
                        <li>${data.id}</li>
                    <li>${data.name}</li>
                    <br>
                    <li>${data.budget}</li>
                    <li>${data.prebid ? data.prebid : 'None'}</li>
                    <li>${data.deadline ? data.deadline : 'None'}</li>
                    <li>${data.opening ? data.opening : 'None'}</li>
                    <li>
                      ${data.url ? `<a class="btn btn-sm btn-secondary" href="${data.url}" target="_blank"><i class="bi bi-eye text-light"></i> View</a>` : ''}
                    </li>
                    <li class="${data.status === 'Closed' ? 'text-danger' : 'text-success'}">
                        ${data.status}
                    </li>
                    </ul>
                </div>
            </div>
        </div>
        `;
    })
    .join('');
  procurementDiv.innerHTML = html;
}

function findMatches(wordToMatch, procurements) {
  return procurements
    .sort((next, prev) => {
      let prevDate = new Date(prev.dateCreated);
      let nextDate = new Date(next.dateCreated);
      return prevDate - nextDate;
    })
    .filter((data) => data.status === procStatus)
    .filter((data) => {
      const regex = new RegExp(wordToMatch, 'gi');
      return data.name.match(regex);
    });
}

function displayMatches() {
  let keyword = searchInput.value;
  const matchArray = findMatches(keyword, procurements);
  if (matchArray.length > 0) {
    const html = matchArray
      .map((data) => {
        return `
        <div class="border rounded">
            <div class="row">
                <div class="col-md-4 bg-primary text-white p-4">
                    <ul class="list-unstyled">
                        <li>Project ID:</li>
                    <li>Project Name:</li>
                    <br>
                    <li>Approved Budget for the Contract:</li>
                    <li>Pre-Bid Conference:</li>
                    <li>Submission Deadline:</li>
                    <li>Bid Opening:</li>
                    <li>Attachment:</li>
                    <li>Status</li>
                    </ul>
                </div>
                <div class="col-md-8 p-4">
                    <ul class="list-unstyled">
                        <li>${data.id}</li>
                    <li>${data.name}</li>
                    <br>
                    <li>${data.budget}</li>
                    <li>${data.prebid ? data.prebid : 'None'}</li>
                    <li>${data.deadline ? data.deadline : 'None'}</li>
                    <li>${data.opening ? data.opening : 'None'}</li>
                    <li>
                        ${data.url ? `<a class="btn btn-sm btn-secondary" href="${data.url}" target="_blank"><i class="bi bi-eye text-light"></i> View</a>` : ''}
                    </li>
                    <li class="${data.status === 'Closed' ? 'text-danger' : 'text-success'}">
                        ${data.status}
                    </li>
                    </ul>
                </div>
            </div>
        </div>
    `;
      })
      .join('');
    procurementDiv.innerHTML = html;
  } else {
    const html = `
        <div class="text-center">No record found</div>
    `;
    procurementDiv.innerHTML = html;
  }
}

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
procurementStatus.addEventListener('change', setStatus);

function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

async function asyncCall() {
  console.log('calling procurement');
  const result = await resolveAfter2Seconds();
  console.log(result);
  displayData();
  // expected output: "resolved"
}

asyncCall();
