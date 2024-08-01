import axios from "axios";

// Function to extract specific cookies from a cookie string
function extractCookies(cookieString, names) {
  const cookies = {};
  cookieString.split(';').forEach(cookie => {
    const [name, value] = cookie.split('=').map(c => c.trim());
    if (names.includes(name)) {
      cookies[name] = value;
    }
  });
  return cookies;
}

const sendPostRequest = async (text, mint, token, auth, additionalCookies) => {
  const cookieString = `auth_token=${auth}`;
  for (const [name, value] of Object.entries(additionalCookies)) {
    cookieString += `; ${name}=${value}`;
  }

  const headers = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "en-US,en;q=0.9,en-GB-oxendict;q=0.8,en-GB;q=0.7",
    "Content-Type": "application/json",
    "Cookie": cookieString,
    "Origin": "https://pump.fun",
    "Referer": "https://pump.fun/",
    "Sec-Ch-Ua": "\"Microsoft Edge\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Platform": "\"Windows\"",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-site",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 Edg/125.0.0.0"
  };

  const data = {
    text: text,
    mint: mint,
    token: token
  };

  try {
    const response = await axios.post('https://frontend-api.pump.fun/replies', data, { headers });
    return response.data;
  } catch (error) {
    console.error("Error response:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export default sendPostRequest;
