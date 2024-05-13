interface Coords {
  lat: string;
  lng: string;
}

export interface CoordsInfo {
  origin: Coords;
  destination: Coords;
}

type Bound = {
  min_x: number;
  min_y: number;
  max_x: number;
  max_y: number;
};

type Location = {
  name: string;
  x: number;
  y: number;
};

type Road = {
  name: string;
  distance: number;
  duration: number;
  traffic_speed: number;
  traffic_state: number;
  vertexes: number[];
};

type Guide = {
  name: string;
  x: number;
  y: number;
  distance: number;
  duration: number;
  type: number;
  guidance: string;
  road_index: number;
};

type Section = {
  bound: Bound;
  distance: number;
  duration: number;
  roads: Road[];
  guides: Guide[];
};

type Route = {
  result_code: number;
  result_msg: string;
  summary: {
    origin: Location;
    destination: Location;
    waypoints: Location;
    priority: string;
    fare: {
      taxi: number;
      toll: number;
    };
    bound: Bound;
    distance: number;
    duration: number;
  };
  sections: Section[];
};

export interface CarDirectionData {
  trans_id: string;
  routes: Route[];
}
