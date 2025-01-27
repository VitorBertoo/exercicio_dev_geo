'use client';

import { useRef, useEffect, useState } from 'react';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import MapboxDraw, { DrawSelectionChangeEvent } from '@mapbox/mapbox-gl-draw';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { readPoints } from '@/lib/api/points';
import { Point } from '@/interfaces/point';
import { addSingleMarker as addMarker } from '@/lib/helpers/map/addSingleMarker';
import { getPlace } from '@/lib/openStreetMaps/place';
import { showPolygonPopup } from '@/lib/helpers/map/showPolygonPopup';

export default function Map() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  const mapRef = useRef<mapboxgl.Map>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const drawRef = useRef<MapboxDraw>(null);

  const [points, setPoints] = useState<Point[]>([]);

  // Pegando os pontos no backend (só roda uma vez)
  useEffect(() => {
    const getPoints = async () => {
      const markers = await readPoints();
      setPoints(markers);
    };
    getPoints();
  }, []);

  useEffect(() => {
    if (!loading && !isAuthenticated) router.push('/sign-in');
  }, [isAuthenticated, loading, router]);

  // Cria o mapa, adiciona os pontos e observa eventos dos polígonos
  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    // RENDERIZANDO MAPA
    const mapConfig = {
      container: mapContainerRef.current || 'map-container',
      center: [-50.547538, -20.267391] as LngLatLike,
      zoom: 13,
    };
    const map = new mapboxgl.Map(mapConfig);

    drawRef.current = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
    });

    points.forEach(point => {
      addMarker(
        map,
        { lat: point.latitude, lng: point.longitude },
        `
          <p><strong>latitude:</strong> ${point.latitude}</p>
          <p><strong>longitude:</strong> ${point.longitude}</p>
          <p><strong>contagem:</strong> ${point.poi_counts}</p>`
      );
    });

    map.addControl(drawRef.current);

    const polygonPopup = new mapboxgl.Popup();

    mapRef.current = map;

    // Quando um poligono é selecionado
    // Quando um polígono é criado ele é automaticamente selecionado
    mapRef.current.on('draw.selectionchange', (e: DrawSelectionChangeEvent) =>
      showPolygonPopup({ feature: e.features[0], points, map, polygonPopup })
    );

    // desabilitando zoom com double click
    mapRef.current.doubleClickZoom.disable();

    // double click cria markers no mapa
    mapRef.current.on('dblclick', async e => {
      const { lat, lng } = e.lngLat;
      const openMapResponse = await getPlace(lat, lng);

      const htmlBuilder: { [key: string]: string | undefined } = {
        latitude: openMapResponse?.lat,
        longitude: openMapResponse?.lon,
        nome: openMapResponse?.name,
        // endereço: openMapResponse?.display_name,
      };

      let popupContent: string = '';
      Object.keys(htmlBuilder).forEach(key => {
        popupContent += `<p><strong>${key}</strong>: ${htmlBuilder[key]} </p>`;
      });

      addMarker(
        map,
        e.lngLat,
        openMapResponse?.error ? 'Sem informação deste ponto.' : popupContent,
        true
      );
    });

    return () => {
      mapRef.current?.remove();
    };
  }, [points]);

  return (
    <>
      <div
        className={`absolute top-0 left-0 h-full w-full ${
          !isAuthenticated && 'hidden'
        }`}
        id="map-container"
        ref={mapContainerRef}
      ></div>
    </>
  );
}
