import React, { useState, useCallback, useEffect } from "react";
import { useMap, FeatureGroup, useMapEvents, Rectangle } from "react-leaflet";
import _ from "lodash";
import store, { fetchBoxes } from "../../store/store";
import { observer } from "mobx-react";
import axios from "axios";

const Boxes: React.FC = () => {
  const map = useMap();
  // const [boxes, setBoxes] = useState<FormDataType[]>([]);
  const boxes = store.boxes as FormDataType[];
  useEffect(() => {
    fetchBoxes();
    // fetchData();
  }, []);
  // const fetchData = async () => {
  //   const res = await axios.get("http://localhost:3000/api/data");
  //   console.log(res.data.data);
  //   setBoxes(res.data.data);
  // };

  const renderBoxes = () => {
    return boxes.map((box) => {
      let D;
      if (box.level === 1) {
        D = 0.5;
      } else if (box.level === 2) {
        D = 0.25;
      } else {
        D = 0.25 / 3;
      }
      return (
        <Rectangle
          bounds={[
            [box.coorlat as number, box.coorlon as number],
            [(box.coorlat as number) - D, (box.coorlon as number) + D],
          ]}
          pathOptions={{
            color: box.type,
          }}
          eventHandlers={{
            click: (e) => {
              console.log(box.id);
            },
          }}
        ></Rectangle>
      );
    });
  };

  return <FeatureGroup>{renderBoxes()}</FeatureGroup>;
};

export default observer(Boxes);
