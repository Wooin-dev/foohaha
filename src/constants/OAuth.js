export const KAKAO_CLIENT_ID = "c23875cfdc64342735efd50df1d7af76";
export const KAKAO_REDIRECT_URI = process.env.REACT_APP_FRONTEND_BASE_URI + "/api/users/kakao/callback";
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;