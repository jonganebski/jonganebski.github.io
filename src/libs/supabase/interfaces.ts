export interface Point__point {
  lat: number;
  lon: number;
  ele: number;
  time: string;
}

export interface Point {
  id: number;
  created_at: string; //'2022-02-07T05:56:07+00:00'
  date: string; // '2018-05-11'
  points_summary: Point__point[];
  points: Point__point[];
}
