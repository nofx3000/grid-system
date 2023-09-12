import React, { useState, useCallback } from "react";
import { useMap, FeatureGroup, Polyline } from "react-leaflet";
import _ from "lodash";

const FirstGrids: React.FC<GridsProps> = (props) => {
  const { lineWidth } = props;
  const map = useMap();

  // 获得地图边界
  const bounds = map.getBounds();
  // 纬线起点
  const latStart = Math.floor(bounds.getSouth());
  // 纬线终点
  const latEnd = Math.ceil(bounds.getNorth());
  // 经线起点
  const lngStart = Math.floor(bounds.getWest());
  // 经线终点
  // 多画1度，防止有空白区域
  const lngEnd = Math.floor(bounds.getEast()) + 1;

  // 网格间隔0.5度
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

export default FirstGrids;
