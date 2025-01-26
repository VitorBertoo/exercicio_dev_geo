'use client';

import { useRef, useEffect, useState } from 'react';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { readPoints } from '@/lib/api/points';
import { Point } from '@/interfaces/point';
import { getPointsOperations } from '@/lib/helpers/points/getPointsOperations';
import { addMarkers } from '@/lib/helpers/map/addMarkers';
import { updateSelectedMarkers } from '@/lib/helpers/map/updateSelectedMarkers';
import { addSingleMarker } from '@/lib/helpers/map/addSingleMarker';
import { getPlace } from '@/lib/openStreetMaps/place';

export default function Map() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  const mapRef = useRef<mapboxgl.Map>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const drawRef = useRef<MapboxDraw>(null);

  // cria pontos de exemplo
  // substituir pelos pontos recuperados pelo backend
  const [selectedMarkers, setSelectedMarkers] = useState<Point[]>([]);

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

    addMarkers(points, map);

    map.addControl(drawRef.current);

    // RENDERIZANDO OS PONTOS

    mapRef.current = map;
    // Handle polygon creation/update
    mapRef.current.on('draw.create', () =>
      updateSelectedMarkers(points, drawRef, setSelectedMarkers)
    );
    mapRef.current.on('draw.update', () =>
      updateSelectedMarkers(points, drawRef, setSelectedMarkers)
    );
    mapRef.current.on('draw.delete', () =>
      updateSelectedMarkers(points, drawRef, setSelectedMarkers)
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

      addSingleMarker(
        map,
        e.lngLat,
        openMapResponse?.error ? 'Sem informação deste ponto.' : popupContent
      );
    });

    return () => {
      mapRef.current?.remove();
    };
  }, [points]);

  /** OPERAÇÕES DOS PONTOS */
  const pointsOperationResults = getPointsOperations(selectedMarkers);

  return (
    <>
      <div
        className={`absolute top-0 left-0 h-full w-full ${
          !isAuthenticated && 'hidden'
        }`}
        id="map-container"
        ref={mapContainerRef}
      ></div>
      <div className="flex flex-col absolute top-0 left-0 bg-gray-700 text-white p-3 rounded-md m-6">
        <span>Quantidade de pontos Selecionados: {selectedMarkers.length}</span>
        <span>
          Soma dos pontos Selecionados: {pointsOperationResults.sumPoints || 0}
        </span>
        <span>
          Média dos pontos Selecionados: {pointsOperationResults.avgPoints || 0}
        </span>
        <span>
          Mediana dos pontos Selecionados:{' '}
          {pointsOperationResults.medianPoints || 0}
        </span>
      </div>
    </>
  );
}
