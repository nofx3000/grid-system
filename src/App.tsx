import {
  Menu,
  MenuItem,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { MapContainer, TileLayer } from "react-leaflet";
import { observer } from "mobx-react";
import _ from "lodash";
// style
import "leaflet/dist/leaflet.css";
import "./App.css";
// 一级网格网
import Grids from "./components/Grids/Grids";
// 随鼠标移动的高亮矩形
import Rect from "./components/Rect/Rect";
//
import AddDialog from "./components/Dialog/AddDialog";
// store
import store from "./store/store";
// boxes
import Boxes from "./components/Boxes/Boxes";
// boxesList
import BoxesList from "./components/Boxes/BoxesList";
// codeCard
import CodeCard from "./components/CodeCard";

const App = () => {
  return (
    <div style={{ height: "100vh" }}>
      <div className="header">
        <span className="title">联合作战火力协同措施管理系统</span>
        <Button
          variant="contained"
          sx={{
            height: "4vh",
            position: "absolute",
            right: "10px",
            top: "5px",
          }}
          onClick={(e) => {
            store.boxesDrawerOpen = true;
          }}
        >
          查看列表
        </Button>
      </div>
      <Card
        sx={{
          position: "absolute",
          right: 5,
          bottom: 5,
          zIndex: 9999,
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            {store.level}级网格
          </Typography>
        </CardContent>
      </Card>
      <MapContainer
        style={{ height: "100vh" }}
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
        <Boxes></Boxes>
        {/* 编码 */}
        <CodeCard></CodeCard>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
      <Menu
        open={store.menuOpen}
        anchorEl={store.anchorEl}
        onClose={() => {
          store.menuOpen = false;
        }}
      >
        <MenuItem
          onClick={() => {
            store.createModalOpen = true;
            store.menuOpen = false;
          }}
        >
          创建杀伤盒
        </MenuItem>
        <MenuItem>编辑</MenuItem>
        <MenuItem>删除</MenuItem>
      </Menu>
      <AddDialog />
      <BoxesList></BoxesList>
    </div>
  );
};

export default observer(App);
