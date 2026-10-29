// OpenStreetMap standard tiles (docs/wiki/design/mappe.md): the exact address,
// without the {s} subdomains, and the attribution always visible.
export const OSM_TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
export const OSM_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>';

// Small maps inside the content: no interaction, attribution kept.
export const STATIC_MAP_OPTIONS = {
  zoomControl: false,
  dragging: false,
  doubleClickZoom: false,
  scrollWheelZoom: false,
  boxZoom: false,
  keyboard: false,
  tap: false,
  touchZoom: false,
};

// Marker HTML for L.divIcon; the look is in assets/css/main.css (.map-pin).
export const placePinHtml = (n: number, active = false) =>
  `<span class="map-pin${active ? ' map-pin--active' : ''}">${n}</span>`;
