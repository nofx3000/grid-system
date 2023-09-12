import React, { useState, useCallback } from "react";
import { useMap, useMapEvents, Rectangle } from "react-leaflet";
import _ from "lodash";
import Rect1 from "./Rect1";
import Rect2 from "./Rect2";
import Rect3 from "./Rect3";

export default function Rect() {
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
        return <Rect1></Rect1>;
      case 9:
        return <Rect2></Rect2>;
      case 10:
        return <Rect3></Rect3>;
      default:
        break;
    }
  };

  return <>{renderGrids()}</>;
}
