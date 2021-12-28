export enum ItemType {
  SPOT = 1,
  USER = 4,
  PHOTO = 5,
  VIDEO = 6,
  LOCATION = 7,
  CONTENT = 8,
  RIG = 9,
  CLUSTER = 10,
  MAP = 11,
  COMMENT = 12,
  POST = 13
}

export enum ItemSubtype {
  SPOT_HIGHLINE = 1,
  SPOT_MIDLINE = 2,
  SPOT_LONGLINE = 3,
  SPOT_WATERLINE = 4,
  SPOT_RODEOLINE = 5,
  SPOT_SLACKLINE = 6,
  SPOT_TRICKLINE = 7,
  SPOT_SPACELINE = 8,

  SPOT_AREA = 50,
  SPOT_PARK = 52,
  SPOT_GYM = 51,
  SPOT_URBAN = 54,
  SPOT_MOUNTAIN = 55,

  SPOT_WATERLINE_AREA = 53,
  SPOT_HIGHLINE_AREA = 54,

  SPOT_DIVING_POOL = 54,

  LOCATION_WORLD = 100,
  LOCATION_CONTINENT = 101,
  LOCATION_COUNTRY = 102,
  LOCATION_REGION = 103,
  LOCATION_COUNTY = 104,
  LOCATION_CITY = 105,
  LOCATION_DISTRICT = 106,
  LOCATION_STREET = 107,
  LOCATION_GEOLOCATION = 109,

  CLUSTER_CLUSTER = 150,
  CLUSTER_SPOT = 151,

  CONTENT_NOTES = 201,
  CONTENT_DESCRIPTION = 202,
  CONTENT_ANCHORS = 203,
  CONTENT_ASCEND = 204,
  CONTENT_ACCESS = 205,

  COMMENT_COMMENT = 300,
  COMMENT_REPLY = 301,

  POST_TEXT = 400,
  POST_USER = 401,
  POST_SPOT = 402,
  POST_PHOTO = 403,

  USER_ADMIN = 500,
  USER_USER = 501,

  PHOTO_PHOTO = 600,

  MAP_MAP = 650
}

export type SpotSubtype =
  ItemSubtype.SPOT_HIGHLINE |
  ItemSubtype.SPOT_MIDLINE |
  ItemSubtype.SPOT_HIGHLINE |
  ItemSubtype.SPOT_MIDLINE |
  ItemSubtype.SPOT_LONGLINE |
  ItemSubtype.SPOT_WATERLINE |
  ItemSubtype.SPOT_RODEOLINE |
  ItemSubtype.SPOT_SLACKLINE |
  ItemSubtype.SPOT_TRICKLINE |
  ItemSubtype.SPOT_SPACELINE |
  ItemSubtype.SPOT_AREA |
  ItemSubtype.SPOT_PARK |
  ItemSubtype.SPOT_GYM |
  ItemSubtype.SPOT_URBAN |
  ItemSubtype.SPOT_MOUNTAIN |
  ItemSubtype.SPOT_WATERLINE_AREA |
  ItemSubtype.SPOT_HIGHLINE_AREA |
  ItemSubtype.SPOT_DIVING_POOL;

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
  subtype: ItemSubtype;
  location_path?: LocationPathEntity[] | null;
  coordinates: Coordinates;
  shape: Shape;
  created_at: string;
  views_count: number;
  _version: number;
}

export type ContentSubtype =
  ItemSubtype.CONTENT_ACCESS |
  ItemSubtype.CONTENT_ANCHORS |
  ItemSubtype.CONTENT_ASCEND |
  ItemSubtype.CONTENT_DESCRIPTION |
  ItemSubtype.CONTENT_NOTES;

export interface SlackmapSpotContent {
  id: string;
  rid: string;
  text: string;
  lang: string;
  type: number;
  subtype: ContentSubtype;
  created_at: string;
  _version: number;
  user_name: string;
  user_rid: string;
  item_rid: string;
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
