const senderWrapperEl = document.getElementById("senderWrapper");
const lengthAllEl = document.getElementById("lengthAll");
const lengthUnseenEl = document.getElementById("lengthUnseen");
const refreshBtnEl = document.getElementById("refreshBtn");
const searchFormEl = document.getElementById("searchForm");
const toTopLinkEl = document.getElementById("toTopLink");

// ========== GET DATA JSON START ==========
getData("/mail/data/senders.json");

async function getData(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      SENDERS = data;
      insertSendersElement(senderWrapperEl, SENDERS);
    } else {
      throw new Error();
    }
  } catch (error) {
    console.warn(error);
  }
}
// ========== GET DATA JSON END ==========

// ========== TIME & DATE FORMATTER START ==========
const dateFormatter = new Intl.DateTimeFormat();
const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: "2-digit",
  minute: "2-digit",
});
// ========== TIME & DATE FORMATTER END ==========

// ========== REFRESH BTN START ==========
refreshBtnEl.addEventListener("click", (event) => {
  const refreshEl = event.target.closest(".btn-refresh");
  refreshEl.classList.add("refresh");
  setTimeout(() => {
    refreshEl.classList.remove("refresh");
    getData("/data/senders.json");
  }, 1100);
});
// ========== REFRESH BTN END ==========

// ========== SEARCH START ==========
searchFormEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = event.target.search.value.toLowerCase().trim().split(" ");
  const filterFields = ["phone", "name", "message"];
  const filteredSenders = SENDERS.filter((sender) => {
    return query.every((word) => {
      return (
        !word ||
        filterFields.some((field) => {
          return `${sender[field]}`.toLowerCase().trim().includes(word);
        })
      );
    });
  });
  insertSendersElement(senderWrapperEl, filteredSenders);
});
// ========== SEARCH END ==========

// ========== TO TOP LINK ==========
let scrollerTime = null;

window.addEventListener("scroll", () => {
  clearTimeout(scrollerTime);
  scrollerTime = setTimeout(() => {
    if (window.pageYOffset > 1000) {
      toTopLinkEl.classList.remove("d-none");
    } else if (window.pageYOffset < 1000) {
      toTopLinkEl.classList.add("d-none");
    }
  }, 100);
});
// ========== TO TOP LINK ==========

// {
//     "id": 1,
//     "phone": "+63 (924) 979-2252",
//     "name": "Guss Marvelley",
//     "message": "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
//     "avatar": "https://robohash.org/repellendusimpeditnisi.png?size=50x50&set=set1",
//     "date": 1609595510000,
//     "seen": false
//   },

// ========== CREATE & INSERT SENDERS WRAPPER BOX START ==========
function insertSendersElement(whereEl, senders) {
  lengthAllEl.textContent = SENDERS.length;
  lengthUnseenEl.textContent = SENDERS.filter(
    (messege) => !messege.seen
  ).length;

  senders.sort((a, b) => a.seen - b.seen || b.date - a.date);

  let html = "";

  senders.forEach((sender) => {
    html += createSendersWrap(sender);
  });

  whereEl.innerHTML = "";
  whereEl.insertAdjacentHTML("beforeEnd", html);
}

function createSendersWrap(sender) {
  return `<div class="sender p-4 ${sender.seen ? "seen" : "unseen"}" >
  <div class="sender-wrapper-inf col-3">
    <img src="${sender.avatar}" alt="Avatar" class="sender-avatar" />
    <div class="sender-inf">
      <p class="sender-name">${sender.name}</p>
      <a href="tel:${sender.phone}" class="sender-number">${sender.phone}</a>
    </div>
  </div>
  <div class="col-6">
    <p class="sender-mail">${sender.message}</p>
  </div>
  <div class="col-3">
    <div class="sender-answer-times">
      <p class="sender-time text-muted">${timeFormatter.format(sender.date)}</p>
      <p class="sender-date text-muted">${dateFormatter.format(sender.date)}</p>
    </div>
  </div>
</div>`;
}
// ========== CREATE & INSERT SENDERS WRAPPER BOX END ==========
