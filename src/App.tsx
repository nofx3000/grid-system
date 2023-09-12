import { MapContainer, TileLayer } from "react-leaflet";
import _ from "lodash";
import "leaflet/dist/leaflet.css";
import "./App.css";
// 一级网格网
import Grids from "./components/Grids/Grids";
// 随鼠标移动的高亮矩形
import Rect from "./components/Rect/Rect";

function App() {
  return (
    <div style={{ height: "100vh", backgroundColor: "#000d4a" }}>
      <div className="header">
        <span className="title">地理空间参考网格系统</span>
      </div>
      <MapContainer
        style={{ height: "92vh" }}
        // 地图中心点
        center={[23.52934988543054, 121.30696338212686]}
        // 初始层级
        zoom={8}
        // 最大层级
        maxZoom={10}
        // 最小层级
        minZoom={8}
        scrollWheelZoom={false}
        // 地图边界
        maxBounds={[
          [25.498062895686246, 123.37551806962686],
          [21.56063687517484, 117.83840869462686],
        ]}
      >
        {/* 随鼠标移动的高亮矩形 */}
        <Rect></Rect>
        {/* 一级网格网 */}
        <Grids></Grids>
        {/* 底图 */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </div>
  );
}

export default App;
