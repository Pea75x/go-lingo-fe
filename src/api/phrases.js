import api from "./api";

export const searchPhrases = async (location) => {
  const { data } = await api.get(`/location-phrases/${encodeURIComponent(location)}`);
  return data;
};

export const searchLocation= async (latitude, longitude) => {
  const { data } = await api.get(`/get_locations_by_coordinates?lat=${latitude}&long=${longitude}`);
  return data;
}
