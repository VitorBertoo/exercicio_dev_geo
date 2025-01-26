"use client";

import { useRef, useEffect, useState } from "react";
import mapboxgl, { LngLatLike } from "mapbox-gl";
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

  const mapRef = useRef<mapboxgl.Map>(null);
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
          let selected: Point[] = [];

          console.log(data.features);
          data.features.forEach((polygon) => {
            // isso acaba passando por todos os marcadores
            // forma mais eficiente?
            const filteredPoints = points.filter((marker) =>
              turf.booleanPointInPolygon(
                turf.point([marker.longitude, marker.latitude]),
                // pegando apenas o geometry da feature (evita erro de typescript)
                polygon.geometry as Polygon
              )
            );

            selected = [...selected, ...filteredPoints];
          });

          // evita valores duplicados (caso poligonos sejam criados um em cima do outro)
          const uniqueValues = selected.filter(
            (value, index, array) => array.indexOf(value) === index
          );
          setSelectedMarkers(uniqueValues);
        } else {
          setSelectedMarkers([]);
        }
      }
    };

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    });

    // RENDERIZANDO MAPA
    const mapConfig = {
      container: mapContainerRef.current || "map-container",
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

    map.addControl(drawRef.current);

    // RENDERIZANDO OS PONTOS
    points.forEach((point, index) => {
      const el = document.createElement("div");
      el.className = "marker";
      el.id = `markser-${index}`;

      new mapboxgl.Marker(el)
        .setLngLat([point.longitude, point.latitude])
        .addTo(map);

      el.addEventListener("mouseenter", () => {
        popup
          .setLngLat([point.longitude, point.latitude])
          .setHTML(`<strong>${point.poi_counts}</strong>`)
          .addTo(map);
      });
    });

    mapRef.current = map;
    // Handle polygon creation/update
    mapRef.current.on("draw.create", updateSelectedMarkers);
    mapRef.current.on("draw.update", updateSelectedMarkers);
    mapRef.current.on("draw.delete", () => setSelectedMarkers([]));

    return () => {
      mapRef.current?.remove();
    };
  }, [isAuthenticated, loading, router, points]);

  return (
    <>
      <div
        className={`absolute top-0 left-0 h-full w-full ${
          !isAuthenticated && "hidden"
        }`}
        id="map-container"
        ref={mapContainerRef}
      ></div>
      <div className="flex flex-col absolute top-0 left-0 bg-gray-700 text-white p-3 rounded-md m-6">
        <span>Itens Selecionados: {selectedMarkers.length}</span>
        <span>Soma dos itens Selecionados: {selectedMarkers.length}</span>
      </div>
    </>
  );
}
