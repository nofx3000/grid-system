type CoordsType = {
  lat: number;
  lng: number;
};

type GridPointsType = {
  startPoint: CoordsType;
  endPoint: CoordsType;
};

type GridRangeType = {
  latStart: number;
  latEnd: number;
  lngStart: number;
  lngEnd: number;
};

interface GridsProps {
  lineWidth: number;
  range: GridRangeType;
  D: number;
}

type FormDataType = {
  id?: number;
  type: "blue" | "purple";
  builder: "air" | "land" | "naval";
  starttime: string | null;
  endtime: string | null;
  level: number;
  coorlat: number | null;
  coorlon: number | null;
  code: string | null;
};
