function MainModule(listingsID = "#listings") {
  const me = {};
  const listingsElement = document.querySelector(listingsID);
  let allListings = []; // store all fetched listings

  function getListingCode(listing) {
    return `
    <a href="listing.html?id=${listing.id}" class="listing-link">
      <div class="listing">
        <img
          src="${listing.picture_url}"
          alt="Thumbnail for ${listing.name}"
          class="listing-image"
        />
        <div class="listing-content">
          <h3 class="listing-title">${listing.name}</h3>
          <div class="listing-price"><strong>${listing.price}</strong></div>
          <div class="listing-host">
            <img src="${listing.host_picture_url}" alt="${listing.host_name}" class="host-avatar">
            <span class="host-name">${listing.host_name}</span>
          </div>
        </div>
      </div>
    </a>
    `;
  }

  function redraw(listings) {
    listingsElement.innerHTML = listings.length
      ? listings.map(getListingCode).join("\n")
      : `<div class="error">No results found</div>`;
  }

  async function loadData() {
    const res = await fetch("./airbnb_sf_listings_500.json");
    allListings = await res.json();
    me.redraw(allListings.slice(0, 50));
  }

  function setupSearch() {
    const form = document.querySelector(".search-form");
    const input = form.querySelector("input");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = input.value.trim().toLowerCase();
      if (!query) {
        me.redraw(allListings.slice(0, 50)); // show default first 50
        return;
      }
      const filtered = allListings.filter((listing) =>
        listing.name.toLowerCase().includes(query)
      );
      me.redraw(filtered);
    });
  }

  me.redraw = redraw;
  me.loadData = loadData;
  me.setupSearch = setupSearch;

  return me;
}

const main = MainModule();
main.loadData();
main.setupSearch();
