/**
 * Haversine formula — compute great-circle distance between two lat/lng points.
 * Returns distance in kilometres.
 *
 * @param {number} lat1 - Latitude of point 1 (degrees)
 * @param {number} lng1 - Longitude of point 1 (degrees)
 * @param {number} lat2 - Latitude of point 2 (degrees)
 * @param {number} lng2 - Longitude of point 2 (degrees)
 * @returns {number} Distance in kilometres
 */
export function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth radius in km
  const toRad = (deg) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Filter temples within a given radius from a user's location.
 *
 * @param {Array} temples - Array of temple objects (must have `lat` and `lng` fields)
 * @param {number} userLat - User's latitude
 * @param {number} userLng - User's longitude
 * @param {number} radiusKm - Search radius in kilometres (default 20)
 * @returns {Array} Temples within radius, each with an added `distance` field (km, rounded to 1 decimal)
 */
export function filterTemplesByRadius(temples, userLat, userLng, radiusKm = 20) {
  const results = [];

  for (const temple of temples) {
    if (temple.lat == null || temple.lng == null) continue;

    const dist = haversineDistance(userLat, userLng, temple.lat, temple.lng);
    if (dist <= radiusKm) {
      results.push({ ...temple, distance: Math.round(dist * 10) / 10 });
    }
  }

  // Sort by ascending distance
  results.sort((a, b) => a.distance - b.distance);
  return results;
}
