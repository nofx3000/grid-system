type CoordsType = {
  lat: number;
  lng: number;
};

type GridPointsType = {
  startPoint: CoordsType;
  endPoint: CoordsType;
};

interface GridsProps {
  lineWidth: number;
}
