export interface SlackmapCluster {
  rid: string;
  type: number;
  subtype: number;
  coordinates: Coordinates;
  expansion_zoom: number;
  spot_count: number;
  cluster_id: number;
}

export interface SlackmapSpot {
  rid: string;
  length: number;
  type: number;
  subtype: number;
  location_path?: LocationPathEntity[] | null;
  coordinates: Coordinates;
  shape: Shape;
  created_at: string;
  views_count: number;
  _version: number;
}
export interface LocationPathEntity {
  code?: string | null;
  name: string;
  rid?: string | null;
}
export interface Coordinates {
  type: string;
  coordinates?: number[] | null;
}
export interface Shape {
  coordinates?: (number[] | null)[] | null;
  type: string;
}
