import { observable, flow } from "mobx";
import axios from "axios";
const store = observable({
  menuOpen: false,
  anchorEl: null,
  createModalOpen: false,
  level: 1,
  currentLat: 0,
  currentLng: 0,
  boxes: [],
});

export const fetchBoxes = flow(function* () {
  try {
    const res = yield axios.get("http://localhost:3000/api/data");
    store.boxes = res.data.data;
  } catch (error) {
    console.log(error);
  }
});

export default store;
