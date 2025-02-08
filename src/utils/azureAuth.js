import { PublicClientApplication } from '@azure/msal-browser';

// Azure AD configuration
const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_AZURE_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_AZURE_TENANT_ID}`,
    redirectUri: window.location.origin,
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

// Function to log in the user
export const login = async () => {
  try {
    const loginResponse = await msalInstance.loginPopup({
      scopes: ['user.read'], // Add required scopes here
    });
    console.log('Login successful:', loginResponse);
    return loginResponse;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

// Function to get the access token
export const getAccessToken = async () => {
  try {
    const account = msalInstance.getAllAccounts()[0];
    if (!account) {
      throw new Error('No account found. Please log in.');
    }

    const tokenResponse = await msalInstance.acquireTokenSilent({
      scopes: ['user.read'], // Add required scopes here
      account,
    });

    return tokenResponse.accessToken;
  } catch (error) {
    console.error('Error acquiring token:', error);
    throw error;
  }
};