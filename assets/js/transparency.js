const url = {
  'bayanihan-grants': '/assets/files/transparency/bayanihan-grants.json',
  'citizen-charter': '/assets/files/transparency/citizen-charter.json',
};

let records = [];
let transparencyDiv = document.getElementById('transparency');
let category;

function handleClick(e) {
  category = e.getAttribute('data-category');
  transparencyDiv.innerHTML =
    '<div class="text-center"><div class="spinner-border text-danger" role="status"><span class="visually-hidden">Loading...</span></div></div>';

  records = [];

  fetch(url[category])
    .then((blob) => blob.json())
    .then((data) => records.push(...data));

  asyncCall();
}

function displayCharterData() {
  const html = records
    .sort((next, prev) => {
      return next.order - prev.order;
    })
    .map((data) => {
      return `
            <div class="accordion accordion-flush" id="accordionFlush${data.tag}">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-heading${data.tag}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-${data.tag}" aria-expanded="false" aria-controls="flush-collapse-${data.tag}">
                        ${data.title}
                    </button>
                    </h2>
                    <div id="flush-collapse-${data.tag}" class="accordion-collapse collapse" aria-labelledby="flush-heading${data.tag}" data-bs-parent="#accordionFlush${data.tag}">
                    <div class="accordion-body">
                        <div class="row">
                            <div class="col-md-10">${data.content}</div>
                            <div class="col-md-2"><a href="${data.url}" class="btn btn-primary btn-sm" download>Download</a></div>
                        </div>
                    </div>
                </div>
            </div>
            `;
    })
    .join('');
  transparencyDiv.innerHTML = html;
}

function displayGrantData() {
  const html = records
    .sort((next, prev) => {
      return next.order - prev.order;
    })
    .map((data) => {
      return `
            <div class="accordion accordion-flush" id="accordionFlush${
              data.tag
            }">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-heading${data.tag}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-${
                      data.tag
                    }" aria-expanded="false" aria-controls="flush-collapse-${
        data.tag
      }">
                        ${data.title}
                    </button>
                    </h2>
                    <div id="flush-collapse-${
                      data.tag
                    }" class="accordion-collapse collapse" aria-labelledby="flush-heading${
        data.tag
      }" data-bs-parent="#accordionFlush${data.tag}">
                    <div class="accordion-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>Fund Source</th>
                                        <th>NADAI</th>
                                        <th>Name/Title of PPA</th>
                                        <th>Specific Location</th>
                                        <th>Mechanism/Mode of Implementation</th>
                                        <th>Estimated Number of Beneficiaries</th>
                                        <th>Received</th>
                                        <th>Obligation</th>
                                        <th>Disbursement</th>
                                        <th>Estimated Period of Completion</th>
                                        <th>Programs/Projects Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                ${Object.values(data.value)
                                  .map((v) => {
                                    return `
                                        <tr>
                                            <td>${v.source}</td>
                                            <td>${v.nadai}</td>
                                            <td>${v.title}</td>
                                            <td>${v.location}</td>
                                            <td>${v.mode}</td>
                                            <td>${v.beneficiary}</td>
                                            <td>${v.received}</td>
                                            <td>${v.obligation}</td>
                                            <td>${v.disbursement}</td>
                                            <td>${v.period}</td>
                                            <td>${v.status}</td>
                                        </tr>
                                    `;
                                  })
                                  .join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            `;
    })
    .join('');
  transparencyDiv.innerHTML = html;
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
  if (category === 'bayanihan-grants') {
    displayGrantData();
  } else if (category === 'citizen-charter') {
    displayCharterData();
  }
  // expected output: "resolved"
}

asyncCall();
