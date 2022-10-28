const API_KEY = process.env.REACT_APP_MAP_TOKEN;
const BASE_URL_Location = `https://api.mapbox.com/geocoding/v5/mapbox.places
`;
const BASE_URL_Direction = "https://api.mapbox.com/directions/v5/mapbox";
const tripUrl = "https://api.winnipegtransit.com/v3/trip-planner.json?";
const tripApi = process.env.REACT_APP_TRIP_TOKEN;
// "bbox=-97.325875,49.766204,-96.953987,49.99275&"  = winnipeg
export const getLocations = async (query, userCurrent) => {
  const bbox =
    userCurrent.length > 0 &&
    `bbox=${userCurrent[0] - 1},${userCurrent[1] - 1},${userCurrent[0] + 1},${
      userCurrent[1] + 1
    }&`;

  const request = await fetch(
    BASE_URL_Location +
      `/${query}.json?${bbox}autocomplete=true&fuzzyMatch=true&limit=10&access_token=${API_KEY}`
  );
  const response = await request.json();
  const locations = await response;

  return locations;
};

export const getUserLocations = async (query, userCurrent) => {
  const request = await fetch(
    BASE_URL_Location +
      `/${query}.json?autocomplete=true&fuzzyMatch=true&limit=10&access_token=${API_KEY}`
  );
  const response = await request.json();
  const locations = await response;

  return locations;
};

export const getDirection = async (start, end) => {
  //mapbox/driving-traffic, mapbox/driving, mapbox/walking, or mapbox/cycling.
  const request = await fetch(
    BASE_URL_Direction +
      `/driving-traffic/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${API_KEY}`,
    { method: "GET" }
  );
  const response = await request.json();
  const direction = await response.routes[0];

  return direction;
};

export const getTrips = async (start, destination) => {
  const request = await fetch(
    `${tripUrl}api-key=${tripApi}&origin=geo/${start[1]},${start[0]}&destination=geo/${destination[1]},${destination[0]}`
  );

  const response = await request.json();
  const trips = await response.plans;

  return trips;
};
