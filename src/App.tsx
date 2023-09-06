import React, { useState, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  ZoomControl,
  useMapEvents,
  FeatureGroup,
  Polyline,
  Rectangle,
} from "react-leaflet";
import _ from "lodash";
import "leaflet/dist/leaflet.css";
function App() {
  return (
    <div style={{ height: "100vh" }}>
      <MapContainer
        style={{ height: "100%" }}
        center={[23.52934988543054, 120.60696338212686]}
        zoom={8}
        maxZoom={11}
        minZoom={8}
        scrollWheelZoom={false}
        maxBounds={[
          [25.498062895686246, 123.37551806962686],
          [21.56063687517484, 117.83840869462686],
        ]}
      >
        <Rect></Rect>
        <Grids></Grids>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </div>
  );
}

type CoordsType = {
  lat: number;
  lng: number;
};

type GridPointsType = {
  startPoint: CoordsType;
  endPoint: CoordsType;
};

function Rect() {
  const [rect, setRect] = useState({
    topLeft: [0, 0],
    topRight: [0, 0],
    bottomLeft: [0, 0],
    bottomRight: [0, 0],
  });
  const map = useMap();

  map.addEventListener(
    "mousemove",
    // React使用防抖或节流需要使用useCallback防止函数重复创建
    useCallback(
      _.throttle((e) => {
        console.log(e.latlng, "-----", getRect(e.latlng));
        setRect(getRect(e.latlng));
      }, 100),
      []
    )
  );

  function getRect(point: CoordsType) {
    if (!point) {
      return {
        topLeft: [0, 0],
        topRight: [0, 0],
        bottomLeft: [0, 0],
        bottomRight: [0, 0],
      };
    }

    const latRem = point.lat % 1;
    const latInt = Math.floor(point.lat);
    const latRange: number[] = [];
    if (latRem < 0.5) {
      latRange[0] = latInt;
      latRange[1] = latInt + 0.5;
    } else {
      latRange[0] = latInt + 0.5;
      latRange[1] = latInt + 1;
    }

    const lngRem = point.lng % 1;
    const lngInt = Math.floor(point.lng);
    const lngRange: number[] = [];
    if (lngRem < 0.5) {
      lngRange[0] = lngInt;
      lngRange[1] = lngInt + 0.5;
    } else {
      lngRange[0] = lngInt + 0.5;
      lngRange[1] = lngInt + 1;
    }
    return {
      topLeft: [latRange[0], lngRange[0]],
      topRight: [latRange[0], lngRange[1]],
      bottomLeft: [latRange[1], lngRange[0]],
      bottomRight: [latRange[1], lngRange[1]],
    };
  }

  return (
    <Rectangle bounds={[rect.topLeft as any, rect.bottomRight]}></Rectangle>
  );
}

function Grids() {
  const map = useMap();
  const bounds = map.getBounds();
  const north = bounds.getNorth();
  const south = bounds.getSouth();
  const east = bounds.getEast();
  const west = bounds.getWest();

  const latStart = Math.floor(south);
  const latEnd = Math.ceil(north);
  const lngStart = Math.floor(west);
  // 多画1度，防止有空白区域
  const lngEnd = Math.floor(east) + 1;

  const D: number = 0.5;

  // 纬线
  const rows: GridPointsType[] = [];
  for (let i = 0; latStart + i * D <= latEnd; i++) {
    const startPoint = { lat: latStart + i * D, lng: lngStart };
    const endPoint = { lat: latStart + i * D, lng: lngEnd };
    rows.push({
      startPoint,
      endPoint,
    });
  }

  // 经线
  const columns: GridPointsType[] = [];
  for (let i = 0; lngStart + i * D <= lngEnd; i++) {
    const startPoint = { lat: latStart, lng: lngStart + i * D };
    const endPoint = { lat: latEnd, lng: lngStart + i * D };
    columns.push({
      startPoint,
      endPoint,
    });
  }

  return (
    <FeatureGroup>
      {rows.map((points) => {
        const { startPoint, endPoint } = points;
        return (
          <Polyline
            positions={[
              [startPoint.lat as any, startPoint.lng],
              [endPoint.lat as any, endPoint.lng],
            ]}
            pathOptions={{ weight: 0.5 }}
          ></Polyline>
        );
      })}
      {columns.map((points) => {
        const { startPoint, endPoint } = points;
        return (
          <Polyline
            positions={[
              [startPoint.lat as any, startPoint.lng],
              [endPoint.lat as any, endPoint.lng],
            ]}
            pathOptions={{ weight: 0.5 }}
          ></Polyline>
        );
      })}
    </FeatureGroup>
  );
}

export default App;
