import React, { useState, useCallback } from "react";
import { useMap, FeatureGroup, useMapEvents } from "react-leaflet";
import _ from "lodash";
import Grid from "./Grid";

const Grids: React.FC = () => {
  const map = useMap();
  const [zoom, setZoom] = useState<number>(map.getZoom());
  // 地图缩放的回调
  const events = useMapEvents({
    zoom: (e) => {
      setZoom(e.target._zoom);
    },
  });

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

  const range: GridRangeType = {
    latStart,
    latEnd,
    lngStart,
    lngEnd,
  };

  const renderGrids = () => {
    switch (zoom) {
      case 8:
        return <Grid lineWidth={1} range={range} D={0.5}></Grid>;
      case 9:
        return (
          <>
            <Grid lineWidth={1.5} range={range} D={0.5}></Grid>
            <Grid lineWidth={0.6} range={range} D={0.25}></Grid>
          </>
        );
      case 10:
        return (
          <>
            <Grid lineWidth={1.5} range={range} D={0.5}></Grid>
            <Grid lineWidth={0.8} range={range} D={0.25}></Grid>
            <Grid lineWidth={0.3} range={range} D={0.25 / 3}></Grid>
          </>
        );
      default:
        break;
    }
  };

  return <FeatureGroup>{renderGrids()}</FeatureGroup>;
};

export default Grids;
