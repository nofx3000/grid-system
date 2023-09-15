import React, { useRef, useState, useCallback } from "react";
import { useMap, useMapEvents } from "react-leaflet";
import _ from "lodash";
import Rect1 from "./Rect1";
import Rect2 from "./Rect2";
import Rect3 from "./Rect3";
import store from "../../store/store";
import { autorun, action } from "mobx";
import { observer } from "mobx-react";
import getRect from "../../utils/getRect";
import { Card } from "@mui/material";
import { CalCodes } from "../../utils/CalCode";
import { LeafletEvent } from "leaflet";

const Rect = () => {
  const map = useMap();
  // menu位置
  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // menu显示
  // const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(map.getZoom());
  // 地图缩放的回调
  const events = useMapEvents({
    zoom: (e) => {
      setZoom(e.target._zoom);
    },
    click: (e) => {
      // setMenuOpen(!menuOpen);
      store.menuOpen = true;
      // setAnchorEl(() => e.originalEvent.target as any);
      store.anchorEl = e.originalEvent.target as any;
      store.currentLat = getRect(e.latlng, store.level as any).bottomLeft[0];
      store.currentLng = getRect(e.latlng, store.level as any).bottomLeft[1];
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
};

export default observer(Rect);
