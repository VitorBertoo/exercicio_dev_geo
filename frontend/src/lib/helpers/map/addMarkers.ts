import { Point } from '@/interfaces/point';
import mapboxgl, { Map } from 'mapbox-gl';

/* FUNÇÃO INUTILIZADA, MANTIDA APENAS PARA DOCUMENTAÇÃO */

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
        .setHTML(
          `
          <p><strong>latitude:</strong> ${point.latitude}</p>
          <p><strong>longitude:</strong> ${point.longitude}</p>
          <p><strong>contagem:</strong> ${point.poi_counts}</p>`
        )
        .addTo(map);
    });
  });
};
