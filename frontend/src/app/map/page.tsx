"use client";

import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

import * as turf from "@turf/turf";
import { Polygon } from "geojson";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { readPoints } from "@/lib/api/points";
import { Point } from "@/interfaces/point";

export default function Map() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const drawRef = useRef<MapboxDraw>(null);

  // cria pontos de exemplo
  // substituir pelos pontos recuperados pelo backend
  const [selectedMarkers, setSelectedMarkers] = useState<Point[]>([]);

  const [points, setPoints] = useState<Point[]>([]);

  console.log(selectedMarkers);
  console.log(points);

  const getPoints = async () => {
    const pontinhos = await readPoints();
    setPoints(pontinhos);
  };

  useEffect(() => {
    getPoints();
  }, []);

  useEffect(() => {
    if (!loading && !isAuthenticated) router.push("/sign-in");
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    // usando função do turf para verificar se os markers estão dentro do poligono
    const updateSelectedMarkers = () => {
      if (drawRef.current) {
        const data = drawRef.current.getAll();
        if (data.features.length) {
          const polygon = data.features[0];

          // isso acaba passando por todos os marcadores
          // forma mais eficiente?
          const selected = points.filter((marker) =>
            turf.booleanPointInPolygon(
              turf.point([marker.longitude, marker.latitude]),
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
      center: [-50.547538, -20.267391], // kognita
      zoom: 13,
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

    points.forEach((point) => {
      if (mapRef.current)
        new mapboxgl.Marker()
          .setLngLat([point.longitude, point.latitude])
          .addTo(mapRef.current);
    });

    // Handle polygon creation/update
    mapRef.current.on("draw.create", updateSelectedMarkers);
    mapRef.current.on("draw.update", updateSelectedMarkers);
    mapRef.current.on("draw.delete", () => setSelectedMarkers([]));

    return () => {
      mapRef.current?.remove();
    };
  }, [isAuthenticated, loading, router, points]);

  return (
    <div
      className={`absolute top-0 left-0 h-full w-full ${
        !isAuthenticated && "hidden"
      }`}
      id="map-container"
      ref={mapContainerRef}
    ></div>
  );
}
