import React, { useState, useCallback } from "react";
import { useMap, FeatureGroup, useMapEvents } from "react-leaflet";
import _ from "lodash";
import FirstGrids from "./FirstGrids";
import SecondGrids from "./SecondGrids";
import ThirdGrids from "./ThirdGrids";
interface GridsProps {}

const Grids: React.FC<GridsProps> = () => {
  const map = useMap();
  const [zoom, setZoom] = useState<number>(map.getZoom());
  // 地图缩放的回调
  const events = useMapEvents({
    zoom: (e) => {
      setZoom(e.target._zoom);
    },
  });

  const renderGrids = () => {
    switch (zoom) {
      case 8:
        return <FirstGrids lineWidth={1}></FirstGrids>;
      case 9:
        return (
          <>
            <FirstGrids lineWidth={1.5}></FirstGrids>
            <SecondGrids lineWidth={0.6}></SecondGrids>
          </>
        );
      case 10:
        return (
          <>
            <FirstGrids lineWidth={1.5}></FirstGrids>
            <SecondGrids lineWidth={0.8}></SecondGrids>
            <ThirdGrids lineWidth={0.3}></ThirdGrids>
          </>
        );
      default:
        break;
    }
  };

  return <FeatureGroup>{renderGrids()}</FeatureGroup>;
};

export default Grids;
