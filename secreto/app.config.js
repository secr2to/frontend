// app.config.js
import "dotenv/config"; // .env 파일 로드를 위해 필요

export default ({ config }) => ({
  ...config,
  extra: {
    ...config.extra,
    MMKV_ENCRYPTION_KEY: process.env.MMKV_ENCRYPTION_KEY,
  },
});
