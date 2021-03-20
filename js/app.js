const senderWrapperEl = document.getElementById("senderWrapper");


// ========== GET DATA JSON START ==========
getData("/data/senders.json") 

async function getData(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      SENDERS = data;
    } else {
      throw new Error();
    }
  } catch (error) {
    console.warn(error);
  }
}
// ========== GET DATA JSON END ==========