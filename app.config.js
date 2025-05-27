import 'dotenv/config';

export default {
  expo: {
    name: 'wristo-app',
    slug: 'wristo-app',
    version: '1.0.0',
    extra: {
      apiUrl: process.env.API_URL,
    },
  },
};
