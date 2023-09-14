// 根据鼠标所在经纬度计算出高亮框的四个角坐标
export default function getRect(point: CoordsType, level: 1 | 2 | 3) {
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
  let D;
  if (level === 1) {
    D = 0.5;
  } else if (level === 2) {
    D = 0.25;
  } else {
    D = 0.25 / 3;
  }

  // 纬度除1取余数获得小数点后小数
  const latRem = point.lat % 1;
  // 纬度小数点前正数
  const latInt = Math.floor(point.lat);
  // 在1度4等分里的第几个网格
  const latIndex = Math.floor(latRem / D);
  // 高亮框纬度范围
  const latRange: number[] = [];
  latRange[0] = latInt + latIndex * D;
  latRange[1] = latInt + (latIndex + 1) * D;

  // 经度同理
  const lngRem = point.lng % 1;
  const lngInt = Math.floor(point.lng);
  const lngIndex = Math.floor(lngRem / D);
  const lngRange: number[] = [];
  lngRange[0] = lngInt + lngIndex * D;
  lngRange[1] = lngInt + (lngIndex + 1) * D;

  // 返回高亮框四个角的坐标
  return {
    topLeft: [latRange[0], lngRange[0]],
    topRight: [latRange[0], lngRange[1]],
    bottomLeft: [latRange[1], lngRange[0]],
    bottomRight: [latRange[1], lngRange[1]],
  };
}
