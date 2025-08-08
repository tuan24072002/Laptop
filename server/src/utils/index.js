import jwt from "jsonwebtoken";
// import { googleClient } from "../configs/google.js";
import axios from "axios";

export const createAccessToken = (user) => {
  return jwt.sign(
    { userId: user._id, tokenSecretVersion: user.tokenSecretVersion },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: "5h" }
  );
};

export const createRefreshToken = (user) => {
  return jwt.sign(
    { userId: user._id, tokenSecretVersion: user.tokenSecretVersion },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    { expiresIn: "3h" }
  );
};

// export async export function verifyTokenGoogle(token) {
//     const ticket = await googleClient.verifyIdToken({
//         idToken: token,
//         audience: process.env.GOOGLE_CLIENT_ID
//     })
//     const payload = ticket.getPayload();
//     return payload;
// }

export async function verifyAccessToken(accessToken) {
  const { data } = await axios.get(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data;
}

export function incrementCounter() {
  let count = 0;
  if (fs.existsSync(counterFile)) {
    count = parseInt(fs.readFileSync(counterFile, "utf8")) || 0;
  }
  count++;
  fs.writeFileSync(counterFile, count.toString());
}

// Load tokens đã dùng
export function loadUsedTokens() {
  if (!fs.existsSync(tokenFile)) return {};
  return JSON.parse(fs.readFileSync(tokenFile, "utf8"));
}

export function saveUsedTokens(tokens) {
  fs.writeFileSync(tokenFile, JSON.stringify(tokens));
}
