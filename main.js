// //TIP With Search Everywhere, you can find any action, file, or symbol in your project. Press <shortcut actionId="Shift"/> <shortcut actionId="Shift"/>, type in <b>terminal</b>, and press <shortcut actionId="EditorEnter"/>. Then run <shortcut raw="npm run dev"/> in the terminal and click the link in its output to open the app in the browser.
// export function setupCounter(element)
//   //TIP Try <shortcut actionId="GotoDeclaration"/> on <shortcut raw="counter"/> to see its usages. You can also use this shortcut to jump to a declaration – try it on <shortcut raw="counter"/> on line 13.
//   let counter = 0;

//   const adjustCounterValue = value => {
//     if (value >= 100) return value - 100;
//     if (value <= -100) return value + 100;
//     return value;
//   };

//   const setCounter = value => {
//     counter = adjustCounterValue(value);
//     //TIP WebStorm has lots of inspections to help you catch issues in your project. It also has quick fixes to help you resolve them. Press <shortcut actionId="ShowIntentionActions"/> on <shortcut raw="text"/> and choose <b>Inline variable</b> to clean up the redundant code.
//     const text = `${counter}`;
//     element.innerHTML = text;
//   };

//   document.getElementById('increaseByOne').addEventListener('click', () => setCounter(counter + 1));
//   document.getElementById('decreaseByOne').addEventListener('click', () => setCounter(counter - 1));
//   document.getElementById('increaseByTwo').addEventListener('click', () => setCounter(counter + 2));
//   //TIP In the app running in the browser, you’ll find that clicking <b>-2</b> doesn't work. To fix that, rewrite it using the code from lines 19 - 21 as examples of the logic.
//   document.getElementById('decreaseByTwo')

//   //TIP Let’s see how to review and commit your changes. Press <shortcut actionId="GotoAction"/> and look for <b>commit</b>. Try checking the diff for a file – double-click main.js to do that.
//   setCounter(0);

// //TIP To find text strings in your project, you can use the <shortcut actionId="FindInPath"/> shortcut. Press it and type in <b>counter</b> – you’ll get all matches in one place.
// setupCounter(document.getElementById('counter-value'));

// //TIP There's much more in WebStorm to help you be more productive. Press <shortcut actionId="Shift"/> <shortcut actionId="Shift"/> and search for <b>Learn WebStorm</b> to open our learning hub with more things for you to try.

// ==========================================
// OLD PROPERTY CODE - KEPT FOR REFERENCE
// ==========================================

/*
const properties = {
  'yellow-house': {
    title: 'Yellow Sunshine Villa',
    address: 'Sunshine Way 12',
    description:
      'A cozy yellow family home featuring a large garden, modern kitchen, and energy-efficient solar panels.',
    size: '145 m²',
    price: '$350,000',
    mapBbox: '11.3300,55.3900,11.3700,55.4100'
  },

  'green-house': {
    title: 'Green Eco Cottage',
    address: 'Forest Lane 8',
    description:
      'A peaceful green estate surrounded by nature. Features 4 bedrooms, timber finishes, and proximity to local schools.',
    size: '180 m²',
    price: '$420,000',
    mapBbox: '11.3600,54.6800,11.4200,54.7100'
  }
};
*/


// ==========================================
// ALICE & BOB HOUSES - JSON PROPERTY DATA
// ==========================================

let houses = [];


// Load houses from houses.json
async function loadHouses() {
  try {
    const response = await fetch("Alice-n-Bob-Houses/houses.json");

    if (!response.ok) {
      throw new Error("Could not load houses.json");
    }

    houses = await response.json();

    displayHouses();

  } catch (error) {
    console.error("Error loading houses:", error);
  }
}


// ==========================================
// CREATE PROPERTY CARDS
// ==========================================

function displayHouses() {
  const propertyList = document.getElementById("propertyList");

  if (!propertyList) {
    console.error("Could not find propertyList");
    return;
  }

  propertyList.innerHTML = "";

  houses.forEach(function (house) {

    const card = document.createElement("article");

    card.classList.add("property-card");

    card.innerHTML = `
      <img src="${house.image}" alt="${house.title}">

      <div class="property-info">
        <h3>${house.title}</h3>

        <p>${house.address}</p>

        <p>
          <strong>Type:</strong>
          ${house.propertyType}
        </p>

        <p>
          <strong>Size:</strong>
          ${house.areaM2} m²
        </p>

        <p>
          <strong>Bedrooms:</strong>
          ${house.bedrooms}
        </p>

        <p>
          <strong>Bathrooms:</strong>
          ${house.bathrooms}
        </p>

        <p>
          <strong>Price:</strong>
          ${house.priceDKK.toLocaleString("da-DK")} DKK
        </p>
      </div>
    `;

    card.addEventListener("click", function () {
      openModal(house.id);
    });

    propertyList.appendChild(card);
  });
}


// ==========================================
// OPEN PROPERTY MODAL
// ==========================================

window.openModal = function (houseId) {

  const property = houses.find(function (house) {
    return house.id === Number(houseId);
  });

  if (!property) {
    return;
  }

  document.getElementById("modal-title").innerText =
    property.title;

  document.getElementById("modal-address").innerText =
    property.address +
    " • " +
    property.areaM2 +
    " m² • " +
    property.priceDKK.toLocaleString("da-DK") +
    " DKK";

  document.getElementById("modal-description").innerText =
    property.description;

  document.getElementById("details-modal").style.display =
    "flex";
};


// ==========================================
// CLOSE PROPERTY MODAL
// ==========================================

window.closeModal = function () {
  document.getElementById("details-modal").style.display =
    "none";
};


// Close modal by clicking outside it
window.onclick = function (event) {

  const modal =
    document.getElementById("details-modal");

  if (event.target === modal) {
    closeModal();
  }
};


// ==========================================
// LOAD HOUSES WHEN PAGE OPENS
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
  loadHouses();
});