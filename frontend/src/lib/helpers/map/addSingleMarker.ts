import mapboxgl, { Map } from 'mapbox-gl';

interface latLng {
  lat: number;
  lng: number;
}

export const addSingleMarker = (
  map: Map,
  latLng: latLng,
  popupContent: string,
  alternative?: boolean
) => {
  const { lat, lng } = latLng;

  const popup = new mapboxgl.Popup({
    closeButton: true,
    closeOnClick: false,
  });

  const el = document.createElement('div');
  el.className = 'marker';

  if (alternative) el.className += ' alternative-color';

  new mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(map);

  el.addEventListener('click', () => {
    popup
      .setLngLat([lng, lat])
      .setHTML(`<strong>${popupContent}</strong>`)
      .addTo(map);
  });
};
