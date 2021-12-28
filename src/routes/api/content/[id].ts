import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async (req) => {
  const spotId = req.params?.id;
  console.log(`spotId !!! ${spotId}`)
  const spotAPIURL = `https://slackmap.com/api/v1/items/${spotId}`;
  //console.log(`slackmap url = ${slackmapAPIURL}`);
  
  const slackMapSpotResponse = await (await fetch(spotAPIURL)).json();
  const slackMapSpotContentResponse = await (await fetch(`${spotAPIURL}/content`)).json()

  const res = {
    spot: slackMapSpotResponse,
    content: slackMapSpotContentResponse
  }
  
  return {
    body: res
  };
};
