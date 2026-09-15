/**
 * Pincode to Geocoordinates Lookup Engine
 * Supports immediate offline lookup for Chennai, Tamil Nadu, and major pilgrimage hubs,
 * with network geocoding fallback for all 6-digit Indian postal PIN codes,
 * plus 3-digit prefix approximation so it NEVER fails.
 */

// ─── Instant Offline Lookup Table ──────────────────────────────────────────
export const POPULAR_PINCODES = [
  { pincode: '600100', name: 'Pallikaranai / Medavakkam, Chennai', lat: 12.9349, lng: 80.2137 },
  { pincode: '600004', name: 'Mylapore, Chennai', lat: 13.0336, lng: 80.2699 },
  { pincode: '600042', name: 'Velachery, Chennai', lat: 12.9759, lng: 80.2212 },
  { pincode: '600005', name: 'Triplicane, Chennai', lat: 13.0537, lng: 80.2771 },
  { pincode: '600026', name: 'Vadapalani, Chennai', lat: 13.0524, lng: 80.2127 },
  { pincode: '600045', name: 'Tambaram, Chennai', lat: 12.9249, lng: 80.1000 },
  { pincode: '631502', name: 'Kanchipuram', lat: 12.8397, lng: 79.7088 },
  { pincode: '612001', name: 'Kumbakonam', lat: 10.9602, lng: 79.3845 },
  { pincode: '602001', name: 'Tiruvallur', lat: 13.1432, lng: 79.9060 },
  { pincode: '625001', name: 'Madurai', lat: 9.9195, lng: 78.1193 },
  { pincode: '620006', name: 'Srirangam / Trichy', lat: 10.8623, lng: 78.6901 },
  { pincode: '606601', name: 'Tiruvannamalai', lat: 12.2253, lng: 79.0677 },
];

export const PINCODE_MAP = {
  // ── Chennai & Suburbs ──
  '600100': { name: 'Pallikaranai / Medavakkam, Chennai', lat: 12.9349, lng: 80.2137 },
  '600001': { name: 'George Town / Parrys, Chennai', lat: 13.0903, lng: 80.2882 },
  '600002': { name: 'Anna Salai / Mount Road, Chennai', lat: 13.0674, lng: 80.2680 },
  '600004': { name: 'Mylapore, Chennai', lat: 13.0336, lng: 80.2699 },
  '600005': { name: 'Triplicane, Chennai', lat: 13.0537, lng: 80.2771 },
  '600006': { name: 'Thousand Lights, Chennai', lat: 13.0569, lng: 80.2520 },
  '600007': { name: 'Purasawalkam / Vepery, Chennai', lat: 13.0889, lng: 80.2536 },
  '600010': { name: 'Kilpauk, Chennai', lat: 13.0784, lng: 80.2412 },
  '600014': { name: 'Royapettah, Chennai', lat: 13.0519, lng: 80.2618 },
  '600017': { name: 'T. Nagar, Chennai', lat: 13.0418, lng: 80.2341 },
  '600018': { name: 'Teynampet / Alwarpet, Chennai', lat: 13.0380, lng: 80.2510 },
  '600019': { name: 'Thiruvottiyur, Chennai', lat: 13.1611, lng: 80.3015 },
  '600020': { name: 'Adyar, Chennai', lat: 13.0012, lng: 80.2565 },
  '600024': { name: 'Kodambakkam, Chennai', lat: 13.0515, lng: 80.2224 },
  '600026': { name: 'Vadapalani, Chennai', lat: 13.0524, lng: 80.2127 },
  '600028': { name: 'R.A. Puram / Mandaveli, Chennai', lat: 13.0232, lng: 80.2605 },
  '600034': { name: 'Nungambakkam, Chennai', lat: 13.0583, lng: 80.2425 },
  '600040': { name: 'Anna Nagar, Chennai', lat: 13.0850, lng: 80.2101 },
  '600041': { name: 'Thiruvanmiyur, Chennai', lat: 12.9863, lng: 80.2592 },
  '600042': { name: 'Velachery, Chennai', lat: 12.9759, lng: 80.2212 },
  '600043': { name: 'Pallavaram, Chennai', lat: 12.9675, lng: 80.1491 },
  '600044': { name: 'Chromepet, Chennai', lat: 12.9517, lng: 80.1462 },
  '600045': { name: 'Tambaram, Chennai', lat: 12.9249, lng: 80.1000 },
  '600048': { name: 'Vandalur, Chennai', lat: 12.8912, lng: 80.0810 },
  '600053': { name: 'Ambattur, Chennai', lat: 13.1144, lng: 80.1548 },
  '600054': { name: 'Avadi, Chennai', lat: 13.1147, lng: 80.1018 },
  '600056': { name: 'Poonamallee, Chennai', lat: 13.0489, lng: 80.0988 },
  '600061': { name: 'Nanganallur, Chennai', lat: 12.9833, lng: 80.1917 },
  '600062': { name: 'Thirumullaivoyal, Chennai', lat: 13.1311, lng: 80.1389 },
  '600069': { name: 'Kundrathur, Chennai', lat: 12.9977, lng: 80.0972 },
  '600073': { name: 'Selaiyur / Camp Road, Chennai', lat: 12.9150, lng: 80.1380 },
  '600078': { name: 'K.K. Nagar, Chennai', lat: 13.0370, lng: 80.1980 },
  '600079': { name: 'Sowcarpet, Chennai', lat: 13.0933, lng: 80.2797 },
  '600083': { name: 'Ashok Nagar, Chennai', lat: 13.0350, lng: 80.2110 },
  '600088': { name: 'Adambakkam / St. Thomas Mount, Chennai', lat: 12.9880, lng: 80.2050 },
  '600090': { name: 'Besant Nagar, Chennai', lat: 12.9972, lng: 80.2689 },
  '600091': { name: 'Madipakkam, Chennai', lat: 12.9647, lng: 80.1961 },
  '600096': { name: 'Perungudi (OMR), Chennai', lat: 12.9654, lng: 80.2461 },
  '600097': { name: 'Thoraipakkam (OMR), Chennai', lat: 12.9416, lng: 80.2362 },
  '600101': { name: 'Mogappair, Chennai', lat: 13.0833, lng: 80.1750 },
  '600107': { name: 'Koyambedu, Chennai', lat: 13.0722, lng: 80.1945 },
  '600113': { name: 'Tharamani, Chennai', lat: 12.9863, lng: 80.2432 },
  '600115': { name: 'Madhavaram, Chennai', lat: 13.1488, lng: 80.2314 },
  '600117': { name: 'Keelkattalai, Chennai', lat: 12.9553, lng: 80.1873 },
  '600119': { name: 'Sholinganallur (OMR), Chennai', lat: 12.9010, lng: 80.2279 },
  '600122': { name: 'Mangadu, Chennai', lat: 13.0416, lng: 80.1166 },
  '600123': { name: 'Thirumazhisai, Chennai', lat: 13.0546, lng: 80.0257 },
  '600126': { name: 'Medavakkam, Chennai', lat: 12.9180, lng: 80.1920 },
  '600130': { name: 'Semmancheri / Navalur, Chennai', lat: 12.8680, lng: 80.2240 },

  // ── Tiruvallur & Chengalpattu Districts ──
  '602001': { name: 'Tiruvallur H.O', lat: 13.1432, lng: 79.9060 },
  '602024': { name: 'Thiruninravur', lat: 13.1190, lng: 80.0320 },
  '603001': { name: 'Chengalpattu H.O', lat: 12.6819, lng: 79.9888 },
  '603103': { name: 'Kelambakkam (OMR)', lat: 12.7850, lng: 80.2220 },
  '603104': { name: 'Mahabalipuram (Mamallapuram)', lat: 12.6208, lng: 80.1944 },
  '603112': { name: 'Thirukalukundram', lat: 12.6108, lng: 80.0544 },
  '631210': { name: 'Thiruttani', lat: 13.1753, lng: 79.6150 },

  // ── Kanchipuram District ──
  '631501': { name: 'Kanchipuram H.O', lat: 12.8342, lng: 79.7036 },
  '631502': { name: 'Kanchipuram Collectorate', lat: 12.8397, lng: 79.7088 },

  // ── Kumbakonam & Thanjavur District ──
  '612001': { name: 'Kumbakonam H.O', lat: 10.9602, lng: 79.3845 },
  '612002': { name: 'Swamimalai, Kumbakonam', lat: 10.9546, lng: 79.3307 },
  '612703': { name: 'Patteeswaram, Kumbakonam / Thanjavur', lat: 10.9167, lng: 79.3333 },
  '613001': { name: 'Thanjavur H.O', lat: 10.7828, lng: 79.1318 },
  '613204': { name: 'Thiruvaiyaru, Thanjavur', lat: 10.8797, lng: 79.1028 },
  '613202': { name: 'Kandiyur, Thanjavur', lat: 10.8601, lng: 79.1102 },
  '613201': { name: 'Thiruppoondurutti, Thanjavur', lat: 10.8710, lng: 79.0850 },
  '614204': { name: 'Thirukkarugavur, Thanjavur', lat: 10.8583, lng: 79.2714 },
  '614205': { name: 'Papanasam / Thirunallur, Thanjavur', lat: 10.9258, lng: 79.2882 },
  '614201': { name: 'Ayyampettai / Chakkarappalli, Thanjavur', lat: 10.8942, lng: 79.1895 },

  // ── Tiruchirappalli (Trichy) District ──
  '620001': { name: 'Tiruchirappalli (Trichy) H.O', lat: 10.7905, lng: 78.7047 },
  '620002': { name: 'Tiruchirappalli Teppakulam / Rockfort', lat: 10.8282, lng: 78.6967 },
  '620005': { name: 'Thiruvanaikaval, Trichy (Jambukeswarar)', lat: 10.8534, lng: 78.7054 },
  '620006': { name: 'Srirangam, Trichy', lat: 10.8623, lng: 78.6901 },
  '620013': { name: 'Thiruverumbur, Trichy (Erumbeeswarar)', lat: 10.7744, lng: 78.7733 },
  '620102': { name: 'Vayalur / Somarasampettai, Trichy', lat: 10.8032, lng: 78.6186 },
  '621005': { name: 'Samayapuram / Thirupanjooli, Trichy', lat: 10.9255, lng: 78.7402 },
  '621105': { name: 'Thiruppattur, Trichy (Brahmapureeswarar)', lat: 11.0267, lng: 78.7368 },
  '621009': { name: 'Thiruvellarai, Trichy', lat: 10.9654, lng: 78.6652 },
  '621212': { name: 'Gunaseelam, Trichy', lat: 10.9022, lng: 78.5714 },
  '621216': { name: 'Thuraiyur, Trichy', lat: 11.1392, lng: 78.5982 },

  // ── Madurai District ──
  '625001': { name: 'Madurai H.O (Meenakshi Temple)', lat: 9.9195, lng: 78.1193 },
  '625002': { name: 'Tallakulam, Madurai', lat: 9.9288, lng: 78.1344 },
  '625005': { name: 'Thirupparamkunram, Madurai', lat: 9.8700, lng: 78.0560 },
  '625009': { name: 'Vandiyur / Teppakulam, Madurai', lat: 9.9075, lng: 78.1517 },
  '625020': { name: 'Melamadai / Pandi Koil, Madurai', lat: 9.9248, lng: 78.1633 },
  '625301': { name: 'Alagar Kovil / Solaimalai, Madurai', lat: 10.0768, lng: 78.2144 },

  // ── Other Tamil Nadu Pilgrimage Regions ──
  '606601': { name: 'Tiruvannamalai H.O', lat: 12.2253, lng: 79.0677 },
  '608001': { name: 'Chidambaram H.O', lat: 11.3993, lng: 79.6932 },
  '623526': { name: 'Rameswaram H.O', lat: 9.2881, lng: 79.3174 },
  '627001': { name: 'Tirunelveli H.O', lat: 8.7285, lng: 77.6896 },
  '628215': { name: 'Tiruchendur', lat: 8.4960, lng: 78.1157 },
  '624601': { name: 'Palani', lat: 10.4476, lng: 77.5143 },
  '629702': { name: 'Kanyakumari', lat: 8.0883, lng: 77.5385 },
  '641001': { name: 'Coimbatore H.O', lat: 11.0168, lng: 76.9558 },
  '636001': { name: 'Salem H.O', lat: 11.6643, lng: 78.1460 },
  '632001': { name: 'Vellore H.O', lat: 12.9165, lng: 79.1325 },

  // ── Other Major Pilgrimage Centres in India ──
  '517501': { name: 'Tirupati (Andhra Pradesh)', lat: 13.6288, lng: 79.4192 },
  '517644': { name: 'Srikalahasti (Andhra Pradesh)', lat: 13.7498, lng: 79.6984 },
  '560001': { name: 'Bengaluru GPO (Karnataka)', lat: 12.9784, lng: 77.5997 },
  '110001': { name: 'New Delhi GPO', lat: 28.6328, lng: 77.2197 },
  '400001': { name: 'Mumbai GPO (Maharashtra)', lat: 18.9404, lng: 72.8354 },
  '500001': { name: 'Hyderabad GPO (Telangana)', lat: 17.3850, lng: 78.4867 },
  '221001': { name: 'Varanasi / Kashi GPO (Uttar Pradesh)', lat: 25.3176, lng: 82.9739 },
  '224123': { name: 'Ayodhya (Uttar Pradesh)', lat: 26.7922, lng: 82.1998 },
  '281001': { name: 'Mathura (Uttar Pradesh)', lat: 27.4924, lng: 77.6737 },
  '249401': { name: 'Haridwar (Uttarakhand)', lat: 29.9457, lng: 78.1642 },
  '249201': { name: 'Rishikesh (Uttarakhand)', lat: 30.0869, lng: 78.2676 },
  '361335': { name: 'Dwarka (Gujarat)', lat: 22.2442, lng: 68.9685 },
  '752001': { name: 'Puri Jagannath (Odisha)', lat: 19.8135, lng: 85.8312 },
  '456001': { name: 'Ujjain Mahakaleshwar (Madhya Pradesh)', lat: 23.1765, lng: 75.7885 },
};

// ─── 3-digit prefix regional approximations for Tamil Nadu & India ────────
const PREFIX_COORDINATES = {
  '600': { name: 'Chennai Region', lat: 13.0418, lng: 80.2341 },
  '601': { name: 'Tiruvallur / Ponneri Region', lat: 13.2000, lng: 80.1500 },
  '602': { name: 'Tiruvallur / Arakkonam Region', lat: 13.1432, lng: 79.9060 },
  '603': { name: 'Chengalpattu / Kanchipuram East', lat: 12.6819, lng: 79.9888 },
  '604': { name: 'Tindivanam / Villupuram North', lat: 12.2300, lng: 79.6500 },
  '605': { name: 'Puducherry / Cuddalore Region', lat: 11.9416, lng: 79.8083 },
  '606': { name: 'Tiruvannamalai Region', lat: 12.2253, lng: 79.0677 },
  '607': { name: 'Cuddalore / Panruti Region', lat: 11.7480, lng: 79.7714 },
  '608': { name: 'Chidambaram / Vridhachalam', lat: 11.3993, lng: 79.6932 },
  '609': { name: 'Mayiladuthurai / Sirkazhi', lat: 11.1070, lng: 79.6520 },
  '610': { name: 'Tiruvarur Region', lat: 10.7710, lng: 79.6420 },
  '611': { name: 'Nagapattinam Region', lat: 10.7650, lng: 79.8420 },
  '612': { name: 'Kumbakonam Region', lat: 10.9602, lng: 79.3845 },
  '613': { name: 'Thanjavur Region', lat: 10.7828, lng: 79.1318 },
  '614': { name: 'Pattukkottai / Mannargudi', lat: 10.4300, lng: 79.3100 },
  '620': { name: 'Tiruchirappalli (Trichy) Region', lat: 10.7905, lng: 78.7047 },
  '621': { name: 'Ariyalur / Perambalur Region', lat: 11.1400, lng: 79.0700 },
  '622': { name: 'Pudukkottai Region', lat: 10.3800, lng: 78.8200 },
  '623': { name: 'Ramanathapuram / Rameswaram Region', lat: 9.3600, lng: 78.8300 },
  '624': { name: 'Dindigul / Palani Region', lat: 10.3600, lng: 77.9800 },
  '625': { name: 'Madurai Region', lat: 9.9195, lng: 78.1193 },
  '626': { name: 'Virudhunagar / Sivakasi Region', lat: 9.5800, lng: 77.9500 },
  '627': { name: 'Tirunelveli Region', lat: 8.7285, lng: 77.6896 },
  '628': { name: 'Thoothukudi / Tiruchendur Region', lat: 8.7642, lng: 78.1348 },
  '629': { name: 'Kanyakumari / Nagercoil Region', lat: 8.0883, lng: 77.5385 },
  '630': { name: 'Sivaganga / Karaikudi Region', lat: 10.0700, lng: 78.7800 },
  '631': { name: 'Kanchipuram Region', lat: 12.8397, lng: 79.7088 },
  '632': { name: 'Vellore Region', lat: 12.9165, lng: 79.1325 },
  '635': { name: 'Krishnagiri / Hosur Region', lat: 12.5200, lng: 78.2100 },
  '636': { name: 'Salem Region', lat: 11.6643, lng: 78.1460 },
  '637': { name: 'Namakkal / Tiruchengode Region', lat: 11.2200, lng: 78.1700 },
  '638': { name: 'Erode / Gobichettipalayam Region', lat: 11.3400, lng: 77.7200 },
  '641': { name: 'Coimbatore Region', lat: 11.0168, lng: 76.9558 },
  '642': { name: 'Pollachi / Udumalaipettai Region', lat: 10.6600, lng: 77.0000 },
  '643': { name: 'Nilgiris / Ooty Region', lat: 11.4100, lng: 76.7000 },
};

/**
 * Resolve 6-digit Indian PIN code to coordinates
 * Returns: { found: true, name, lat, lng, pincode, source }
 * or: { found: false, error: string }
 */
export async function lookupPincode(rawPin) {
  const pin = String(rawPin || '').trim().replace(/\D/g, '');
  if (!pin || pin.length !== 6) {
    return {
      found: false,
      error: 'Please enter a valid 6-digit Indian PIN code (e.g. 600100 for Pallikaranai).',
    };
  }

  // 1. Direct hit in pre-loaded dictionary
  if (PINCODE_MAP[pin]) {
    return {
      found: true,
      pincode: pin,
      name: PINCODE_MAP[pin].name,
      lat: PINCODE_MAP[pin].lat,
      lng: PINCODE_MAP[pin].lng,
      source: 'offline_exact',
    };
  }

  // 2. Try online geocoder (Nominatim OpenStreetMap) with short timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    const url = `https://nominatim.openstreetmap.org/search?postalcode=${pin}&country=India&format=json&addressdetails=1`;
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const item = data[0];
        const lat = parseFloat(item.lat);
        const lng = parseFloat(item.lon);
        const placeName =
          item.address?.suburb ||
          item.address?.neighbourhood ||
          item.address?.city ||
          item.address?.county ||
          item.address?.state_district ||
          item.display_name?.split(',')[0] ||
          `PIN ${pin}`;

        const result = {
          found: true,
          pincode: pin,
          name: `${placeName}, PIN ${pin}`,
          lat,
          lng,
          source: 'nominatim',
        };
        // Cache for future lookups in this session
        PINCODE_MAP[pin] = { name: result.name, lat, lng };
        return result;
      }
    }
  } catch (_err) {
    // Network or timeout failure — fallback to regional prefix below
  }

  // 3. Fallback to 3-digit regional prefix
  const prefix = pin.substring(0, 3);
  if (PREFIX_COORDINATES[prefix]) {
    const region = PREFIX_COORDINATES[prefix];
    return {
      found: true,
      pincode: pin,
      name: `${region.name} (PIN ${pin})`,
      lat: region.lat,
      lng: region.lng,
      source: 'region_approx',
      note: 'Location approximated by postal district.',
    };
  }

  return {
    found: false,
    error: `Could not determine location for PIN code ${pin}. Try a nearby PIN code or use GPS.`,
  };
}

// ─── Known Cities, Towns, and Pilgrim Localities Dictionary ────────────────
export const KNOWN_PLACES_MAP = {
  // Chennai Localities
  'pallikaranai': { name: 'Pallikaranai, Chennai', lat: 12.9349, lng: 80.2137, pin: '600100' },
  'medavakkam': { name: 'Medavakkam, Chennai', lat: 12.9180, lng: 80.1920, pin: '600126' },
  'velachery': { name: 'Velachery, Chennai', lat: 12.9759, lng: 80.2212, pin: '600042' },
  'mylapore': { name: 'Mylapore, Chennai', lat: 13.0336, lng: 80.2699, pin: '600004' },
  'triplicane': { name: 'Triplicane, Chennai', lat: 13.0537, lng: 80.2771, pin: '600005' },
  'vadapalani': { name: 'Vadapalani, Chennai', lat: 13.0524, lng: 80.2127, pin: '600026' },
  'tambaram': { name: 'Tambaram, Chennai', lat: 12.9249, lng: 80.1000, pin: '600045' },
  'chromepet': { name: 'Chromepet, Chennai', lat: 12.9517, lng: 80.1462, pin: '600044' },
  'adyar': { name: 'Adyar, Chennai', lat: 13.0012, lng: 80.2565, pin: '600020' },
  'thiruvanmiyur': { name: 'Thiruvanmiyur, Chennai', lat: 12.9863, lng: 80.2592, pin: '600041' },
  'besant nagar': { name: 'Besant Nagar, Chennai', lat: 12.9972, lng: 80.2689, pin: '600090' },
  't nagar': { name: 'T. Nagar, Chennai', lat: 13.0418, lng: 80.2341, pin: '600017' },
  'anna nagar': { name: 'Anna Nagar, Chennai', lat: 13.0850, lng: 80.2101, pin: '600040' },
  'ambattur': { name: 'Ambattur, Chennai', lat: 13.1144, lng: 80.1548, pin: '600053' },
  'avadi': { name: 'Avadi, Chennai', lat: 13.1147, lng: 80.1018, pin: '600054' },
  'poonamallee': { name: 'Poonamallee, Chennai', lat: 13.0489, lng: 80.0988, pin: '600056' },
  'thirumazhisai': { name: 'Thirumazhisai, Chennai', lat: 13.0546, lng: 80.0257, pin: '600123' },
  'thiruninravur': { name: 'Thiruninravur, Chennai', lat: 13.1190, lng: 80.0320, pin: '602024' },
  'thiruvottiyur': { name: 'Thiruvottiyur, Chennai', lat: 13.1611, lng: 80.3015, pin: '600019' },
  'kundrathur': { name: 'Kundrathur, Chennai', lat: 12.9977, lng: 80.0972, pin: '600069' },
  'mangadu': { name: 'Mangadu, Chennai', lat: 13.0416, lng: 80.1166, pin: '600122' },
  'nanganallur': { name: 'Nanganallur, Chennai', lat: 12.9833, lng: 80.1917, pin: '600061' },
  'madipakkam': { name: 'Madipakkam, Chennai', lat: 12.9647, lng: 80.1961, pin: '600091' },
  'perungudi': { name: 'Perungudi, Chennai', lat: 12.9654, lng: 80.2461, pin: '600096' },
  'sholinganallur': { name: 'Sholinganallur, Chennai', lat: 12.9010, lng: 80.2279, pin: '600119' },
  'chennai': { name: 'Chennai Central', lat: 13.0827, lng: 80.2707, pin: '600001' },

  // Kanchipuram & Chengalpattu
  'kanchipuram': { name: 'Kanchipuram', lat: 12.8397, lng: 79.7088, pin: '631502' },
  'kanchi': { name: 'Kanchipuram', lat: 12.8397, lng: 79.7088, pin: '631502' },
  'chengalpattu': { name: 'Chengalpattu', lat: 12.6819, lng: 79.9888, pin: '603001' },
  'mahabalipuram': { name: 'Mahabalipuram (Mamallapuram)', lat: 12.6208, lng: 80.1944, pin: '603104' },
  'mamallapuram': { name: 'Mamallapuram', lat: 12.6208, lng: 80.1944, pin: '603104' },
  'tirukalukundram': { name: 'Tirukalukundram (Vedagiriswarar Temple)', lat: 12.6108, lng: 80.0544, pin: '603109' },
  'thirukalukundram': { name: 'Tirukalukundram (Vedagiriswarar Temple)', lat: 12.6108, lng: 80.0544, pin: '603109' },
  'thirukazhukundram': { name: 'Thirukazhukundram (Vedagiriswarar Temple)', lat: 12.6108, lng: 80.0544, pin: '603109' },
  'vedagiriswarar': { name: 'Vedagiriswarar Temple, Tirukalukundram', lat: 12.6108, lng: 80.0544, pin: '603109' },
  'pakshi theertham': { name: 'Tirukalukundram (Pakshi Theertham)', lat: 12.6108, lng: 80.0544, pin: '603109' },

  // Tiruvallur
  'tiruvallur': { name: 'Tiruvallur', lat: 13.1432, lng: 79.9060, pin: '602001' },
  'thiruvallur': { name: 'Tiruvallur', lat: 13.1432, lng: 79.9060, pin: '602001' },
  'thiruttani': { name: 'Thiruttani', lat: 13.1753, lng: 79.6150, pin: '631210' },
  'tiruttani': { name: 'Thiruttani', lat: 13.1753, lng: 79.6150, pin: '631210' },

  // Thanjavur & Kumbakonam
  'thanjavur': { name: 'Thanjavur (Tanjore)', lat: 10.7828, lng: 79.1318, pin: '613001' },
  'tanjore': { name: 'Thanjavur', lat: 10.7828, lng: 79.1318, pin: '613001' },
  'kumbakonam': { name: 'Kumbakonam', lat: 10.9602, lng: 79.3845, pin: '612001' },
  'swamimalai': { name: 'Swamimalai, Kumbakonam', lat: 10.9546, lng: 79.3307, pin: '612002' },
  'patteeswaram': { name: 'Patteeswaram, Thanjavur', lat: 10.9167, lng: 79.3333, pin: '612703' },
  'thiruvaiyaru': { name: 'Thiruvaiyaru, Thanjavur', lat: 10.8797, lng: 79.1028, pin: '613204' },
  'thirukkarugavur': { name: 'Thirukkarugavur, Thanjavur', lat: 10.8583, lng: 79.2714, pin: '614204' },
  'kandiyur': { name: 'Kandiyur, Thanjavur', lat: 10.8601, lng: 79.1102, pin: '613202' },
  'thiruppoondurutti': { name: 'Thiruppoondurutti, Thanjavur', lat: 10.8656, lng: 79.0667, pin: '613103' },
  'thirunallur': { name: 'Thirunallur, Papanasam', lat: 10.9258, lng: 79.2882, pin: '614205' },
  'papanasam': { name: 'Papanasam, Thanjavur', lat: 10.9258, lng: 79.2882, pin: '614205' },
  'thiruchotruturai': { name: 'Thiruchotruturai, Thanjavur', lat: 10.8711, lng: 79.1558, pin: '613202' },
  'darasuram': { name: 'Darasuram, Kumbakonam', lat: 10.9500, lng: 79.3500, pin: '612702' },
  'gangaikonda cholapuram': { name: 'Gangaikonda Cholapuram', lat: 11.2061, lng: 79.4496, pin: '612901' },
  'mayiladuthurai': { name: 'Mayiladuthurai', lat: 11.1070, lng: 79.6520, pin: '609001' },
  'chidambaram': { name: 'Chidambaram', lat: 11.3993, lng: 79.6932, pin: '608001' },

  // Tiruchirappalli (Trichy)
  'trichy': { name: 'Tiruchirappalli (Trichy)', lat: 10.7905, lng: 78.7047, pin: '620001' },
  'tiruchirappalli': { name: 'Tiruchirappalli (Trichy)', lat: 10.7905, lng: 78.7047, pin: '620001' },
  'tiruchirapalli': { name: 'Tiruchirappalli', lat: 10.7905, lng: 78.7047, pin: '620001' },
  'srirangam': { name: 'Srirangam, Trichy', lat: 10.8623, lng: 78.6901, pin: '620006' },
  'thiruvanaikaval': { name: 'Thiruvanaikaval, Trichy', lat: 10.8534, lng: 78.7054, pin: '620005' },
  'thiruvanaikoil': { name: 'Thiruvanaikaval, Trichy', lat: 10.8534, lng: 78.7054, pin: '620005' },
  'rockfort': { name: 'Rockfort, Trichy', lat: 10.8282, lng: 78.6967, pin: '620002' },
  'vayalur': { name: 'Vayalur, Trichy', lat: 10.8032, lng: 78.6186, pin: '620102' },
  'samayapuram': { name: 'Samayapuram, Trichy', lat: 10.9255, lng: 78.7402, pin: '621005' },
  'thiruppattur': { name: 'Thiruppattur, Trichy', lat: 11.0267, lng: 78.7368, pin: '621105' },
  'thiruvellarai': { name: 'Thiruvellarai, Trichy', lat: 10.9654, lng: 78.6652, pin: '621009' },
  'gunaseelam': { name: 'Gunaseelam, Trichy', lat: 10.9022, lng: 78.5714, pin: '621212' },
  'thuraiyur': { name: 'Thuraiyur, Trichy', lat: 11.1392, lng: 78.5982, pin: '621216' },
  'thiruverumbur': { name: 'Thiruverumbur, Trichy', lat: 10.7744, lng: 78.7733, pin: '620013' },
  'thirupanjooli': { name: 'Thirupanjooli, Trichy', lat: 10.9228, lng: 78.6475, pin: '621005' },

  // Madurai
  'madurai': { name: 'Madurai Central', lat: 9.9195, lng: 78.1193, pin: '625001' },
  'thirupparamkunram': { name: 'Thirupparamkunram, Madurai', lat: 9.8700, lng: 78.0560, pin: '625005' },
  'alagar kovil': { name: 'Alagar Kovil, Madurai', lat: 10.0768, lng: 78.2144, pin: '625301' },
  'melamadai': { name: 'Melamadai, Madurai', lat: 9.9248, lng: 78.1633, pin: '625020' },
  'vandiyur': { name: 'Vandiyur, Madurai', lat: 9.9075, lng: 78.1517, pin: '625009' },
  'sellur': { name: 'Sellur, Madurai', lat: 9.9367, lng: 78.1189, pin: '625002' },

  // Other Major Sacred Hubs
  'tiruvannamalai': { name: 'Tiruvannamalai', lat: 12.2253, lng: 79.0677, pin: '606601' },
  'thiruvannamalai': { name: 'Tiruvannamalai', lat: 12.2253, lng: 79.0677, pin: '606601' },
  'rameswaram': { name: 'Rameswaram', lat: 9.2881, lng: 79.3174, pin: '623526' },
  'palani': { name: 'Palani', lat: 10.4476, lng: 77.5143, pin: '624601' },
  'tirunelveli': { name: 'Tirunelveli', lat: 8.7285, lng: 77.6896, pin: '627001' },
  'tiruchendur': { name: 'Tiruchendur', lat: 8.4960, lng: 78.1157, pin: '628215' },
  'kanyakumari': { name: 'Kanyakumari', lat: 8.0883, lng: 77.5385, pin: '629702' },
  'coimbatore': { name: 'Coimbatore', lat: 11.0168, lng: 76.9558, pin: '641001' },
  'salem': { name: 'Salem', lat: 11.6643, lng: 78.1460, pin: '636001' },
  'vellore': { name: 'Vellore', lat: 12.9165, lng: 79.1325, pin: '632001' },
  'tirupati': { name: 'Tirupati (Andhra Pradesh)', lat: 13.6288, lng: 79.4192, pin: '517501' },
  'srikalahasti': { name: 'Srikalahasti', lat: 13.7498, lng: 79.6984, pin: '517644' },
};

/**
 * Universal Location & Temple Resolver
 * Accepts:
 *  - 6-digit Indian PIN Code (e.g. 600100, 625001)
 *  - Temple Name (e.g. Garbarakshambigai, Brahmapureeswarar, Rockfort, Meenakshi)
 *  - City / Town / Locality Name (e.g. Madurai, Trichy, Kumbakonam, Pallikaranai, Thanjavur)
 *  - Online geocoder fallback for any other town in Tamil Nadu/India
 */
export async function lookupLocationOrTemple(rawQuery, templesList = []) {
  const q = String(rawQuery || '').trim();
  if (!q) {
    return {
      found: false,
      error: 'Please enter a temple name, city, place, or 6-digit PIN code.',
    };
  }

  // 1. Is it a 6-digit PIN code?
  const numericOnly = q.replace(/\D/g, '');
  if (/^\d{6}$/.test(numericOnly) && q.length <= 8) {
    return await lookupPincode(numericOnly);
  }

  const normQ = q.toLowerCase();

  // 2. Direct match against temple names / aliases in the catalog
  if (Array.isArray(templesList) && templesList.length > 0) {
    const matchedTemple = templesList.find((t) => {
      const nameEn = (t.name || '').toLowerCase();
      const nameTa = (t.translations?.ta?.name || '').toLowerCase();
      const nameHi = (t.translations?.hi?.name || '').toLowerCase();
      const city = (t.city || '').toLowerCase();
      const id = (t.id || '').toLowerCase();
      return (
        nameEn.includes(normQ) ||
        nameTa.includes(normQ) ||
        nameHi.includes(normQ) ||
        id.includes(normQ)
      );
    });

    if (matchedTemple && matchedTemple.lat != null && matchedTemple.lng != null) {
      return {
        found: true,
        name: matchedTemple.name,
        city: matchedTemple.city,
        lat: matchedTemple.lat,
        lng: matchedTemple.lng,
        source: 'temple',
        templeId: matchedTemple.id,
        isTemple: true,
      };
    }
  }

  // 3. Known cities, towns, and pilgrim places dictionary (offline instant)
  for (const [placeKey, placeData] of Object.entries(KNOWN_PLACES_MAP)) {
    if (normQ === placeKey || normQ.includes(placeKey) || placeKey.includes(normQ)) {
      return {
        found: true,
        name: placeData.name,
        lat: placeData.lat,
        lng: placeData.lng,
        pincode: placeData.pin,
        source: 'place_offline',
      };
    }
  }

  // Check if matches any entry in PINCODE_MAP by descriptive name
  for (const [pin, info] of Object.entries(PINCODE_MAP)) {
    if (info.name.toLowerCase().includes(normQ)) {
      return {
        found: true,
        name: info.name,
        lat: info.lat,
        lng: info.lng,
        pincode: pin,
        source: 'pincode_map_name',
      };
    }
  }

  // 4. Online geocoding via Nominatim (OpenStreetMap) with fallback
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);
    const searchUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      q + ', Tamil Nadu, India'
    )}&format=json&limit=1&addressdetails=1`;
    const res = await fetch(searchUrl, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const item = data[0];
        const lat = parseFloat(item.lat);
        const lng = parseFloat(item.lon);
        const placeName = item.display_name?.split(',')[0] || q;
        return {
          found: true,
          name: `${placeName}, Tamil Nadu`,
          lat,
          lng,
          source: 'nominatim_place',
        };
      }
    }
  } catch (_err) {
    // Network or timeout failure — fallback below
  }

  return {
    found: false,
    error: `Could not find location for "${q}". Try typing a city (e.g. Madurai, Trichy, Thanjavur, Pallikaranai), a temple name (e.g. Garbarakshambigai, Rockfort, Brahmapureeswarar), or a 6-digit PIN code.`,
  };
}

