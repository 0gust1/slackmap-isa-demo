import { ItemSubtype } from '$lib/slackMapAPITypes';
const spotLabelsMap:Map<ItemSubtype, string> = new Map();
spotLabelsMap.set(ItemSubtype.SPOT_HIGHLINE, 'highline');
spotLabelsMap.set(ItemSubtype.SPOT_MIDLINE, 'midline');
spotLabelsMap.set(ItemSubtype.SPOT_LONGLINE, 'longline');
spotLabelsMap.set(ItemSubtype.SPOT_WATERLINE, 'waterline');
spotLabelsMap.set(ItemSubtype.SPOT_RODEOLINE, 'rodeoline');
spotLabelsMap.set(ItemSubtype.SPOT_SLACKLINE, 'slackline');
spotLabelsMap.set(ItemSubtype.SPOT_TRICKLINE, 'trickline');
spotLabelsMap.set(ItemSubtype.SPOT_SPACELINE, 'spaceline');
spotLabelsMap.set(ItemSubtype.SPOT_AREA, 'slackline area');
spotLabelsMap.set(ItemSubtype.SPOT_PARK, 'park area');
spotLabelsMap.set(ItemSubtype.SPOT_GYM, 'sport/gym facility');
spotLabelsMap.set(ItemSubtype.SPOT_URBAN, 'urban area');
spotLabelsMap.set(ItemSubtype.SPOT_MOUNTAIN, 'mountain area');
spotLabelsMap.set(ItemSubtype.SPOT_WATERLINE_AREA, 'waterline area');
spotLabelsMap.set(ItemSubtype.SPOT_HIGHLINE_AREA, 'highline area');
spotLabelsMap.set(ItemSubtype.SPOT_DIVING_POOL, 'diving pool');

export { spotLabelsMap };
