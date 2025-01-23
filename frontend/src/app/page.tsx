"use client";

import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

export default function Home() {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current || "map-container",
    });

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  return (
    <div
      className="absolute top-0 left-0 h-full w-full"
      id="map-container"
      ref={mapContainerRef}
    ></div>
  );
}
