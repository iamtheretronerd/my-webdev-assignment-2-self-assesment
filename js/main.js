function MainModule(listingsID = "#listings") {
  const me = {};

  const listingsElement = document.querySelector(listingsID);

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
    listingsElement.innerHTML = "";
    listingsElement.innerHTML = listings.map(getListingCode).join("\n");
  }

  async function loadData() {
    const res = await fetch("./airbnb_sf_listings_500.json");
    const listings = await res.json();
    me.redraw(listings.slice(0, 50));
  }

  me.redraw = redraw;
  me.loadData = loadData;

  return me;
}

const main = MainModule();
main.loadData();