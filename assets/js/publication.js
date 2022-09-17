const url = '/assets/files/positions.json';
let positions = [];
let posStatus = 'Vacant';
const tbody = document.getElementById('tbody');
const searchInput = document.getElementById('keyword');
const positionStatus = document.getElementById('status');

fetch(url)
  .then((blob) => blob.json())
  .then((data) => positions.push(...data));

function setStatus() {
  posStatus = this.value;
  displayMatches();
}

function displayData() {
  const html = positions
    .sort((next, prev) => {
      let prevDate = new Date(prev.dateCreated);
      let nextDate = new Date(next.dateCreated);
      return prevDate - nextDate;
    })
    .map((data) => {
      return `
        <tr">
          <td>${data.id}</td>
          <td>${data.position}</td>
          <td>${data.grade}</td>
          <td>${Object.values(data.qualification)
            .map((q) => q)
            .join('<br>')}</td>
          <td>${data.office}</td>
          <td class="${data.status === 'Closed' ? 'text-danger' : ''}">${
        data.status
      }</td>
        </tr>
        `;
    })
    .join('');
  tbody.innerHTML = html;
}

function findMatches(wordToMatch, positions) {
  return positions
    .sort((next, prev) => {
      next, prev;
      let prevDate = new Date(prev.dateCreated);
      let nextDate = new Date(next.dateCreated);
      return prevDate - nextDate;
    })
    .filter((data) => data.status === posStatus)
    .filter((data) => {
      const regex = new RegExp(wordToMatch, 'gi');
      return data.position.match(regex) || data.office.match(regex);
    });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
  let keyword = searchInput.value;
  const matchArray = findMatches(keyword, positions);
  if (matchArray.length > 0) {
    const html = matchArray
      .map((data) => {
        return `
        <tr>
            <td>${data.id}</td>
            <td>${data.position}</td>
            <td>${data.grade}</td>
            <td>${Object.values(data.qualification)
              .map((q) => q)
              .join('<br>')}</td>
            <td>${data.office}</td>
            <td class="${data.status === 'Closed' ? 'text-danger' : ''}">${
          data.status
        }</td>
        </tr>
    `;
      })
      .join('');
    tbody.innerHTML = html;
  } else {
    const html = `
        <tr>
            <td colspan="6" class="text-center">No record found</td>
        </tr>
    `;
    tbody.innerHTML = html;
  }
}

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
positionStatus.addEventListener('change', setStatus);

function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

async function asyncCall() {
  console.log('calling publication');
  const result = await resolveAfter2Seconds();
  console.log(result);
  displayData();
  // expected output: "resolved"
}

asyncCall();
