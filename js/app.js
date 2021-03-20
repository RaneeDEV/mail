const senderWrapperEl = document.getElementById("senderWrapper");

// ========== GET DATA JSON START ==========
getData("/data/senders.json");

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

// {
//     "id": 1,
//     "phone": "+63 (924) 979-2252",
//     "name": "Guss Marvelley",
//     "message": "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
//     "avatar": "https://robohash.org/repellendusimpeditnisi.png?size=50x50&set=set1",
//     "date": 1609595510000,
//     "seen": false
//   },

function insertSendersElement(whereEl, senders) {
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
      <p class="sender-time text-muted">${sender.date}</p>
      <p class="sender-date text-muted">${sender.date}</p>
    </div>
  </div>
</div>`;
}
