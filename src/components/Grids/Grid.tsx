import React, { useState, useCallback } from "react";
import { useMap, FeatureGroup, Polyline } from "react-leaflet";
import _ from "lodash";

const Grid: React.FC<GridsProps> = (props) => {
  const { lineWidth, range, D } = props;
  const { latStart, latEnd, lngStart, lngEnd } = range;

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
    <>
      {/* 渲染纬线 */}
      {rows.map((points) => {
        const { startPoint, endPoint } = points;
        return (
          <Polyline
            positions={[
              [startPoint.lat as any, startPoint.lng],
              [endPoint.lat as any, endPoint.lng],
            ]}
            pathOptions={{ weight: lineWidth }}
          ></Polyline>
        );
      })}
      {/* 渲染经线 */}
      {columns.map((points) => {
        const { startPoint, endPoint } = points;
        return (
          <Polyline
            positions={[
              [startPoint.lat as any, startPoint.lng],
              [endPoint.lat as any, endPoint.lng],
            ]}
            pathOptions={{ weight: lineWidth }}
          ></Polyline>
        );
      })}
    </>
  );
};

export default Grid;
