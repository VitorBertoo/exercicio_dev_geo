import { Point } from '@/interfaces/point';
import mapboxgl, { Map } from 'mapbox-gl';

export const addMarkers = (points: Point[], map: Map): void => {
  const popup = new mapboxgl.Popup({
    closeButton: true,
    closeOnClick: false,
  });

  points.forEach((point, index) => {
    const el = document.createElement('div');
    el.className = 'marker';
    el.id = `markser-${index}`;

    new mapboxgl.Marker(el)
      .setLngLat([point.longitude, point.latitude])
      .addTo(map);

    el.addEventListener('click', () => {
      popup
        .setLngLat([point.longitude, point.latitude])
        .setHTML(`<strong>${point.poi_counts}</strong>`)
        .addTo(map);
    });
  });
};
