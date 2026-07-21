/**
 * Converts a base64 string to an ArrayBuffer.
 */
function base64ToArrayBuffer(b64) {
  const binaryString = atob(b64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

/**
 * Encodes a string or object into url-safe base64.
 */
function base64url(source) {
  let encoded = btoa(typeof source === 'string' ? source : JSON.stringify(source));
  return encoded.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

/**
 * Gets a Google OAuth 2.0 access token using a service account credentials.
 * @param {string} clientEmail Service account email
 * @param {string} privateKey PEM-formatted private key
 * @returns {Promise<string>} Access token
 */
export async function getGoogleAccessToken(clientEmail, privateKey) {
  // Clean the PEM key format
  const pemHeader = "-----BEGIN PRIVATE KEY-----";
  const pemFooter = "-----END PRIVATE KEY-----";
  const pemContents = privateKey
    .replace(pemHeader, "")
    .replace(pemFooter, "")
    .replace(/\s/g, "");

  const binaryDer = base64ToArrayBuffer(pemContents);

  const signingKey = await crypto.subtle.importKey(
    "pkcs8",
    binaryDer,
    {
      name: "RSASHA256",
      hash: { name: "SHA-256" }
    },
    false,
    ["sign"]
  );

  const header = { alg: "RS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/calendar",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now
  };

  const encodedHeader = base64url(header);
  const encodedClaim = base64url(claim);
  const message = `${encodedHeader}.${encodedClaim}`;

  const enc = new TextEncoder();
  const signature = await crypto.subtle.sign(
    "RSASHA256",
    signingKey,
    enc.encode(message)
  );

  const encodedSignature = base64url(String.fromCharCode(...new Uint8Array(signature)));
  const jwt = `${message}.${encodedSignature}`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt
    })
  });

  if (!tokenRes.ok) {
    const errorText = await tokenRes.text();
    throw new Error(`Google OAuth token exchange failed: ${errorText}`);
  }

  const tokenData = await tokenRes.json();
  return tokenData.access_token;
}
