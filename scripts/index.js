const apiURL = "http://localhost:3001";

// Header
const searchInput = document.querySelector(".header input");
const searchButton = document.querySelector(".header button");

// Helper function to format input according to the pattern
const formatInput = (value) => {
  // Remove any non-digit characters
  let digits = value.replace(/\D/g, "");

  // Insert hyphens at the correct positions
  let formatted = "";
  if (digits.length > 0) formatted += digits.substring(0, 3);
  if (digits.length > 3) formatted += "-" + digits.substring(3, 6);
  if (digits.length > 6) formatted += "-" + digits.substring(6, 9);
  if (digits.length > 9) formatted += "-" + digits.substring(9, 12);

  return formatted;
};

searchInput.addEventListener("input", () => {
  // Apply formatting
  const formattedValue = formatInput(searchInput.value);
  searchInput.value = formattedValue;

  // Enable/disable button based on input
  searchButton.disabled = searchInput.value === "";
});

searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    searchCard();
  }
});

searchButton.addEventListener("click", async () => {
  searchCard();
});

async function searchCard() {
  const cardValid = new RegExp(/^\d{3}-\d{3}-\d{3}-\d{3}$/);
  if (!cardValid.test(searchInput.value)) {
    alert("Número de cartão inválido.");
    return;
  }
  const cardId = searchInput.value;
  try {
    if (!cardId) {
      throw new Error("Card ID is required.");
    }

    const response = await fetch(`${apiURL}/clients/${cardId}`);
    const data = await response.json();

    setCardInfo(data);
  } catch (err) {
    alert(`Usuário com id ${cardId} não foi encontrado.`);
  }
}

function setCardInfo(info) {
  const name = document.getElementById("name");
  const clientSince = document.getElementById("clientSince");
  const cuts = document.getElementById("cuts");
  const history = document.querySelector(".history-content");

  name.textContent = info.name;
  clientSince.textContent = `Cliente desde ${info.clientSince}`;

  cuts.textContent = `${info.loyaltyCard.totalCuts} cortes`;

  history.innerHTML = "";
  info.appointmentHistory.forEach((hist) => {
    const historyItem = document.createElement("li");
    const texts = document.createElement("div");
    texts.classList.add("texts");

    const date = document.createElement("strong");
    texts.appendChild(date);
    date.textContent = hist.date;

    const time = document.createElement("span");
    texts.appendChild(time);
    time.textContent = hist.time;

    historyItem.appendChild(texts);

    const icon = document.createElement("div");
    icon.classList.add("icon");
    const image = document.createElement("img");
    image.src = "assets/icons/SealCheck.svg";
    icon.appendChild(image);

    historyItem.appendChild(icon);

    history.appendChild(historyItem);
  });

  const cardId = document.querySelector(".card-id");
  cardId.textContent = `ID: ${info.id}`;

  const pendingCuts = document.getElementById("pending-cuts");
  pendingCuts.textContent = info.loyaltyCard.cutsRemaining;

  const cutsCount = document.getElementById("cuts-count");
  cutsCount.textContent = `${info.loyaltyCard.totalCuts} de ${info.loyaltyCard.cutsNeeded}`;

  const innerBar = document.querySelector(".inner-bar");
  innerBar.style.width = `${
    (info.loyaltyCard.totalCuts / info.loyaltyCard.cutsNeeded) * 100
  }%`;

  const slotsContainer = document.querySelector(".slot-content");
  slotsContainer.innerHTML = "";

  Array.from({ length: 10 }, (_, index) => {
    const slot = document.createElement("div");
    slot.classList.add("slot");

    if (index < info.loyaltyCard.totalCuts) {
      const image = document.createElement("img");
      image.src = "assets/images/PinCheck.png";
      slot.appendChild(image);
    } else if (index === 9) {
      const image = document.createElement("img");
      image.src = "assets/icons/Gift-Solid.svg";
      image.classList.add("gift-solid");
      slot.appendChild(image);
    }

    slotsContainer.appendChild(slot);
  });
}
