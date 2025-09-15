function ListingDetailModule() {
  const me = {};
  
  const detailElement = document.querySelector('#listing-detail');
  
  function getListingDetailHTML(listing) {
    return `
      <div class="listing-detail">
        <img src="${listing.picture_url}" alt="${listing.name}" class="detail-image" />
        
        <div class="detail-content">
          <h1 class="detail-title">${listing.name}</h1>
          <div class="detail-price">${listing.price} per night</div>
          
          <div class="detail-host">
            <img src="${listing.host_picture_url}" alt="${listing.host_name}" class="host-avatar-large">
            <div class="host-info">
              <h3>Hosted by ${listing.host_name}</h3>
              <p>Host since ${new Date(listing.host_since).getFullYear()}</p>
              ${listing.host_is_superhost === 't' ? '<span class="superhost-badge">Superhost</span>' : ''}
            </div>
          </div>
          
          <div class="detail-description">
            <h3>About this place</h3>
            <p>${listing.description.replace(/<br\s*\/?>/gi, '<br>')}</p>
          </div>
          
          <div class="detail-amenities">
            <h3>What this place offers</h3>
            <div class="amenities-grid">
                ${JSON.parse(listing.amenities)
                    .map(amenity => `<span class="amenity-tag">${amenity}</span>`)
                    .join('')}
            </div>

          </div>
          
          <div class="detail-info">
            <div class="info-item">
              <strong>Property type:</strong> ${listing.property_type}
            </div>
            <div class="info-item">
              <strong>Room type:</strong> ${listing.room_type}
            </div>
            <div class="info-item">
              <strong>Accommodates:</strong> ${listing.accommodates} guests
            </div>
            <div class="info-item">
              <strong>Bedrooms:</strong> ${listing.bedrooms}
            </div>
            <div class="info-item">
              <strong>Beds:</strong> ${listing.beds}
            </div>
            <div class="info-item">
              <strong>Bathrooms:</strong> ${listing.bathrooms_text}
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  function getListingId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
  }
  
  async function loadListing() {
    const listingId = getListingId();
    
    if (!listingId) {
      detailElement.innerHTML = '<div class="error">No listing ID provided</div>';
      return;
    }
    
    try {
      const res = await fetch('./airbnb_sf_listings_500.json');
      const listings = await res.json();
      
      const listing = listings.find(l => l.id.toString() === listingId);
      
      if (!listing) {
        detailElement.innerHTML = '<div class="error">Listing not found</div>';
        return;
      }
      
      detailElement.innerHTML = getListingDetailHTML(listing);
      document.title = `${listing.name} - AirBNB`;
      
    } catch (error) {
      detailElement.innerHTML = '<div class="error">Error loading listing</div>';
      console.error('Error loading listing:', error);
    }
  }
  
  me.loadListing = loadListing;
  return me;
}

const listingDetail = ListingDetailModule();
listingDetail.loadListing();