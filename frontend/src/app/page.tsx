"use client";

import { useRef, useEffect, useState } from "react";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

import * as turf from "@turf/turf";
import { Polygon } from "geojson";

interface Marker {
  id: number;
  lngLat: number[];
  info: string;
}

export default function Home() {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const drawRef = useRef<MapboxDraw>(null);

  // cria pontos de exemplo
  // substituir pelos pontos recuperados pelo backend
  const [selectedMarkers, setSelectedMarkers] = useState<Marker[]>([]);
  const [markers] = useState<Marker[]>([
    { id: 1, lngLat: [-46.696607, -23.55429], info: "Marker 1" },
    { id: 2, lngLat: [-46.696382, -23.553798], info: "Marker 2" },
    { id: 3, lngLat: [-46.696312, -23.554325], info: "Marker 3" },
  ]);

  console.log(selectedMarkers);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    // usando função do turf para verificar se os markers estão dentro do poligono
    const updateSelectedMarkers = () => {
      if (drawRef.current) {
        const data = drawRef.current.getAll();
        console.log(data);
        if (data.features.length) {
          const polygon = data.features[0];

          // isso acaba passando por todos os marcadores
          // forma mais eficiente?
          const selected = markers.filter((marker) =>
            turf.booleanPointInPolygon(
              turf.point(marker.lngLat),
              // pegando apenas o geometry da feature (evita erro de typescript)
              polygon.geometry as Polygon
            )
          );
          setSelectedMarkers(selected);
        } else {
          setSelectedMarkers([]);
        }
      }
    };

    const map = new mapboxgl.Map({
      container: mapContainerRef.current || "map-container",
      center: [-46.696607, -23.55429], // kognita
      zoom: 18,
    });

    drawRef.current = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
    });

    map.addControl(drawRef.current);

    mapRef.current = map;

    markers.forEach((marker) => {
      if (mapRef.current)
        new mapboxgl.Marker()
          .setLngLat(marker.lngLat as LngLatLike)
          .addTo(mapRef.current);
    });

    // Handle polygon creation/update
    mapRef.current.on("draw.create", updateSelectedMarkers);
    mapRef.current.on("draw.update", updateSelectedMarkers);
    mapRef.current.on("draw.delete", () => setSelectedMarkers([]));

    return () => {
      mapRef.current?.remove();
    };
  }, [markers]);

  return (
    <div
      className="absolute top-0 left-0 h-full w-full"
      id="map-container"
      ref={mapContainerRef}
    ></div>
  );
}
