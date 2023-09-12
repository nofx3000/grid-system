import React, { useState, useCallback } from "react";
import { useMap, Rectangle } from "react-leaflet";
import _ from "lodash";

export default function Rect3() {
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
        setRect(getRect(e.latlng));
      }, 100),
      []
    )
  );
  // 根据鼠标所在经纬度计算出高亮框的四个角坐标
  function getRect(point: CoordsType) {
    if (!point) {
      return {
        topLeft: [0, 0],
        topRight: [0, 0],
        bottomLeft: [0, 0],
        bottomRight: [0, 0],
      };
    }
    // 这部分思路是这样的：
    // 1. 获取鼠标位置在地图上对应的经纬度坐标point
    // 2. 30‘对应0.5度，通过分别将经度和纬度的余数与0.5对比，判定鼠标从而计算出鼠标应该落在哪个30’✖️30‘的网格内

    // 纬度除1取余数获得小数点后小数
    const latRem = point.lat % 1;
    // 纬度小数点前正数
    const latInt = Math.floor(point.lat);
    // 在1度4等分里的第几个网格
    const latIndex = Math.floor(latRem / (0.25 / 3));
    // 高亮框纬度范围
    const latRange: number[] = [];
    latRange[0] = latInt + latIndex * (0.25 / 3);
    latRange[1] = latInt + (latIndex + 1) * (0.25 / 3);

    // 经度同理
    const lngRem = point.lng % 1;
    const lngInt = Math.floor(point.lng);
    const lngIndex = Math.floor(lngRem / (0.25 / 3));
    const lngRange: number[] = [];
    lngRange[0] = lngInt + lngIndex * (0.25 / 3);
    lngRange[1] = lngInt + (lngIndex + 1) * (0.25 / 3);

    // 返回高亮框四个角的坐标
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
