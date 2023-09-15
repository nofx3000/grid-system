import React, { useState, useCallback, useRef, useEffect } from "react";
import { useMap, FeatureGroup, useMapEvents } from "react-leaflet";
import { observer } from "mobx-react";
import getRect from "../utils/getRect";
import store from "../store/store";
import { Card } from "@mui/material";
import { CalCodes } from "../utils/CalCode";
import _ from "lodash";

const CodeCard: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const cardRef = useRef(null);
  const [codePosition, setCodePosition] = useState<number[]>([0, 0]);
  const map = useMap();
  useEffect(() => {
    if (!cardRef.current) return;
    // (cardRef.current as any).offsetTop = codePosition[0].toString();
    // (cardRef.current as any).offsetLeft = codePosition[1].toString();
    (cardRef.current as any).style.top = codePosition[0] + "px";
    (cardRef.current as any).style.left = codePosition[1] + "px";
  }, [codePosition]);
  map.addEventListener(
    "mousemove",
    useCallback(
      // 节流函数，解约性能， 100毫秒触发一次鼠标移动事件
      _.throttle((e) => {
        setCode(
          // @ts-ignore
          CalCodes(
            getRect(e.latlng, store.level as any).bottomLeft[0],
            getRect(e.latlng, store.level as any).bottomLeft[1]
            // e.latlng.lat,
            // e.latlng.lng
          )[store.level]
        );
        setCodePosition([e.originalEvent.y + 10, e.originalEvent.x + 10]);
        console.log("code:", getRect(e.latlng, store.level as any));
      }, 100),
      []
    )
  );
  return (
    <Card
      style={{
        position: "absolute",
        zIndex: 999,
        padding: 5,
      }}
      ref={cardRef}
    >
      <span>编码: {code}</span>
    </Card>
  );
};

export default observer(CodeCard);
