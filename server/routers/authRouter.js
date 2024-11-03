const express = require("express");
const router = express.Router();
const msal = require("@azure/msal-node");
const Token = require("../models/tokenModel");
const driveController = require("../controllers/driveController");

const clientConfig = {
  auth: {
    clientId: process.env.CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
    clientSecret: process.env.CLIENT_SECRET,
  },
};

const pca = new msal.ConfidentialClientApplication(clientConfig);

// Route to initiate authentication
router.get("/", async (req, res) => {
  const authUrl = await pca.getAuthCodeUrl({
    scopes: ["Files.ReadWrite", "Files.ReadWrite.All", "Sites.ReadWrite.All"],
    redirectUri: process.env.REDIRECT_URI,
  });
  res.redirect(authUrl);
});

// Callback route to receive token and save it in database
router.get("/callback", async (req, res) => {
  try {
    const tokenResponse = await pca.acquireTokenByCode({
      code: req.query.code,
      scopes: ["Files.ReadWrite", "Files.ReadWrite.All", "Sites.ReadWrite.All"],
      redirectUri: process.env.REDIRECT_URI,
    });

    // Calculate token expiration
    const expirationTime =
      Date.now() + tokenResponse.expiresOn.getTime() * 1000;

    // Update the database with the new token and expiration time
    const tokenDoc = await Token.findOneAndUpdate(
      {},
      { accessToken: tokenResponse.accessToken, expiration: expirationTime },
      { upsert: true, new: true }
    );

    // Update in-memory cache
    driveController.updateCachedToken(tokenDoc);

    res.redirect(process.env.WEBSITE_URI);
  } catch (error) {
    console.error("Error in callback:", error);
    res.status(500).send("Authentication failed");
  }
});

module.exports = router;
