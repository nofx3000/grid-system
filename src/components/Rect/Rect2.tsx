import React, { useState, useCallback } from "react";
import { useMap, Rectangle } from "react-leaflet";
import _ from "lodash";
import getRect from "../../utils/getRect";

export default function Rect2() {
  // 高亮框坐标初始画
  const [rect, setRect] = useState({
    topLeft: [0, 0],
    topRight: [0, 0],
    bottomLeft: [0, 0],
    bottomRight: [0, 0],
  });
  const map = useMap();

  // 监听鼠标移动
  map.addEventListener(
    "mousemove",
    // React使用防抖或节流需要使用useCallback防止函数重复创建
    useCallback(
      // 节流函数，解约性能， 100毫秒触发一次鼠标移动事件
      _.throttle((e) => {
        // 根据鼠标位置获得高亮框的四个角坐标
        // console.log(e.latlng.lat % 1, "----", e.latlng.lng % 1);
        setRect(getRect(e.latlng, 2));
      }, 100),
      []
    )
  );

  return (
    <Rectangle bounds={[rect.topLeft as any, rect.bottomRight]}></Rectangle>
  );
}
