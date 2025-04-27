function toggleLanguageMenu() {
  const menu = document.getElementById("language-menu");
  menu.classList.toggle("show");
}
const elements = document.querySelectorAll(".result-value, .code-example");
elements.forEach((element) => {
  element.addEventListener("click", function () {
    const range = document.createRange();
    range.selectNodeContents(this);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  });
});
let isRunning = true;
function updateTime() {
  if (!isRunning) return;
  const now = new Date();
  const timestamp = Math.floor(now.getTime() / 1000);
  const timestamp2 = Math.floor(now.getTime());
  document.getElementById("currentTimestamp").textContent = `${timestamp}`;
  document.getElementById("currentTimestamp2").textContent = `${timestamp2}`;
  document.getElementById("currentDateTime").textContent = formatDate(now);
  setTimeout(updateTime, 1000);
}
updateTime();
document.getElementById("copyTime").addEventListener("click", () => {
  const timestamp = document.getElementById("currentTimestamp").textContent;
  copyToClipboard(timestamp);
});
document.getElementById("copyTime2").addEventListener("click", () => {
  const timestamp = document.getElementById("currentTimestamp2").textContent;
  copyToClipboard(timestamp);
});
document.getElementById("toggleTimer").addEventListener("click", () => {
  isRunning = !isRunning;
  const button = document.getElementById("toggleTimer");
  button.textContent = isRunning ? "Stop" : "Start";
  button.classList.toggle("stop", !isRunning);
  button.classList.toggle("start", isRunning);
  showToast(isRunning ? "Started" : "Stopped");
  if (isRunning) updateTime();
});
document.getElementById("tabs1").addEventListener("click", function () {
    document.getElementById("tabs1").classList.add("active");
    document.getElementById("tabs2").classList.remove("active");
    document.getElementById("timestampToDate").style.display = "";
    document.getElementById("dateToTimestamp").style.display = "none";
  });
document.getElementById("tabs2").addEventListener("click", function () {
    document.getElementById("tabs1").classList.remove("active");
    document.getElementById("tabs2").classList.add("active");
    document.getElementById("timestampToDate").style.display = "none";
    document.getElementById("dateToTimestamp").style.display = "";
  });
document.getElementById("currentTimestamp").addEventListener("click", function () {
    const currentTimestampValue = this.textContent;
    const timestampInput = document.getElementById("timestampInput");
    timestampInput.value = currentTimestampValue;
    document.getElementById("tabs1").classList.add("active");
    document.getElementById("tabs2").classList.remove("active");
    document.getElementById("timestampToDate").style.display = "";
    document.getElementById("dateToTimestamp").style.display = "none";
    const inputEvent = new Event("input", { bubbles: true });
    timestampInput.dispatchEvent(inputEvent);
  });
document.getElementById("currentTimestamp2").addEventListener("click", function () {
    const currentTimestampValue = this.textContent;
    const timestampInput = document.getElementById("timestampInput");
    timestampInput.value = currentTimestampValue;
    document.getElementById("tabs1").classList.add("active");
    document.getElementById("tabs2").classList.remove("active");
    document.getElementById("timestampToDate").style.display = "";
    document.getElementById("dateToTimestamp").style.display = "none";
    const inputEvent = new Event("input", { bubbles: true });
    timestampInput.dispatchEvent(inputEvent);
  });
document.getElementById("currentDateTime").addEventListener("click", function () {
    const currentDateTimeValue = this.textContent;
    const dateInput = document.getElementById("dateInput");
    dateInput.value = currentDateTimeValue;
    document.getElementById("tabs1").classList.remove("active");
    document.getElementById("tabs2").classList.add("active");
    document.getElementById("timestampToDate").style.display = "none";
    document.getElementById("dateToTimestamp").style.display = "";
    const inputEvent = new Event("input", { bubbles: true });
    dateInput.dispatchEvent(inputEvent);
  });
document.getElementById("timestampInput").addEventListener("input", (e) => {
  const timestamp = e.target.value;
  const timestampLength = timestamp.toString().length;
  const timeZone = new Intl.DateTimeFormat().resolvedOptions().timeZone;
  let finalTimestamp;
  if (timestampLength === 13) {
    finalTimestamp = parseInt(timestamp);
  } else {
    finalTimestamp = parseInt(timestamp) * 1000;
  }
  const date = new Date(finalTimestamp);
  document.getElementById("timestampResult").textContent = `${timestamp}`;
  document.getElementById("timestampMillisResult").textContent =
    `${finalTimestamp}`;
  document.getElementById("isoResult").textContent = `${date.toISOString()}`;
  document.getElementById("utcResult").textContent = formatUTCDate(date);
  document.getElementById("localResult").textContent = `${formatDate(date)}`;
  document.getElementById("timeZoneResult").textContent = timeZone;
});
function getTodayDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day} 00:00:00`;
}

function formatUTCDate(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function updateResults() {
  const dateInput = document.getElementById("dateInput");
  const dateString = dateInput.value;
  let date;

  if (!dateString) {
	dateInput.value = getTodayDate();
	date = new Date(dateInput.value);
  } else {
	date = new Date(dateString);
  }

  if (isNaN(date.getTime())) {
	console.error("Invalid time format");
	return;
  }

  const timestamp = Math.floor(date.getTime() / 1000);
  const timestampMillis = date.getTime();
  const timeZone = new Intl.DateTimeFormat().resolvedOptions().timeZone;

  document.getElementById("dateTimestampResult").textContent = timestamp;
  document.getElementById("dateTimestampMillisResult").textContent = timestampMillis;
  document.getElementById("dateIsoResult").textContent = date.toISOString();
  document.getElementById("dateUtcResult").textContent = formatUTCDate(date);
  document.getElementById("dateLocalResult").textContent = formatDate(date);
  document.getElementById("dateTimeZoneResult").textContent = timeZone;
}
document.addEventListener("DOMContentLoaded", function() {
  updateResults();
});
document.getElementById("dateInput").addEventListener("input", updateResults);

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showToast("OK");
      })
      .catch(() => {
        fallbackCopyText(text);
      });
  } else {
    fallbackCopyText(text);
  }
}
function fallbackCopyText(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    const successful = document.execCommand("copy");
    if (successful) {
      showToast("OK");
    } else {
      showToast("Please copy manually!");
    }
  } catch (err) {
    showToast("Please copy manually!");
  }
  document.body.removeChild(textArea);
}
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 2000);
}
function copyText(elementId) {
  const text = document.getElementById(elementId).textContent;
  copyToClipboard(text);
}
function copyCode(code) {
  copyToClipboard(code);
}
document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", () => {
    document
      .querySelectorAll(".nav-item")
      .forEach((i) => i.classList.remove("active"));
    item.classList.add("active");
    document.querySelectorAll(".converter-section").forEach((sec) => {
      sec.style.display = "none";
    });
    document.getElementById(item.getAttribute("data-target")).style.display =
      "block";
  });
});
function toggleShareDialog() {
  const dialog = document.getElementById("share-dialog");
  dialog.classList.toggle("show");
}
function shareToTwitter() {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(
    "Free online tool to convert timestamp to date",
  );
  window.open(
    `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
    "_blank",
  );
}
function shareToFacebook() {
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
}
function shareToLine() {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(
    "Free online tool to convert timestamp to date",
  );
  window.open(
    `https://social-plugins.line.me/lineit/share?url=${url}&text=${text}`,
    "_blank",
  );
}
function shareToWhatsApp() {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(
    "Free online tool to convert timestamp to date",
  );
  window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, "_blank");
}
function shareToInstagram() {
  copyUrl();
}
function shareToSnapchat() {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(
    "Free online tool to convert timestamp to date",
  );
  window.open(
    `https://www.snapchat.com/scan?attachmentUrl=${url}&text=${text}`,
    "_blank",
  );
}
function shareToGoogle() {
  const url = encodeURIComponent(window.location.href);
  window.open(`https://plus.google.com/share?url=${url}`, "_blank");
}
function shareToTelegram() {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(
    "Free online tool to convert timestamp to date",
  );
  window.open(`https://t.me/share/url?url=${url}&text=${text}`, "_blank");
}
function shareByEmail() {
  const url = window.location.href;
  const subject = encodeURIComponent(
    "Free online tool to convert timestamp to date",
  );
  const body = encodeURIComponent(
    `I found a super useful timestamp converter :${url}`,
  );
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
}
function copyUrl() {
  const url = window.location.href;
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        showToast("OK");
      })
      .catch(() => {
        fallbackCopyUrl(url);
      });
  } else {
    fallbackCopyUrl(url);
  }
}
function fallbackCopyUrl(url) {
  const textarea = document.createElement("textarea");
  textarea.value = url;
  textarea.style.position = "fixed";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    const success = document.execCommand("copy");
    if (success) {
      showToast("OK");
    } else {
      showToast("copy failed");
    }
  } catch (err) {
    showToast("copy failed");
  } finally {
    document.body.removeChild(textarea);
  }
}
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function toggleBackToTop() {
  const backToTop = document.getElementById("back-to-top");
  const screenHeight = window.innerHeight;
  const pageHeight = document.documentElement.scrollHeight;
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  if (pageHeight > screenHeight && scrollTop > screenHeight / 2) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
}
function isPc() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  var isMobile =
    /windows phone|ipad|iphone|ipod|android|blackberry|mini|windows ce|palm/i.test(
      userAgent,
    );
  return !isMobile;
}
window.addEventListener("scroll", toggleBackToTop);