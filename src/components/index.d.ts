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
