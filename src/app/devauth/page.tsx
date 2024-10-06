import { BASE_URL } from "../_utils/api";

const AuthPage = async ({
  searchParams,
}: {
  searchParams: { code: string };
}) => {
  const { code } = searchParams;

  const response: any = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: "Iv23lipZn6Q52xQOthNr",
        client_secret: "04b83b0d1f0edf94a62fce5c7f530edb40d4bdec",
        code: code,
      }),
    }
  );
  const data = await response.json();
  console.log(data);
  const accessToken = await fetch(`${BASE_URL}/api/user/v1/signup`, {
    method: "POST",
    body: JSON.stringify({
      accessToken: data.access_token,
    }),
  });
  const accessTokenData = await accessToken.json();
  console.log(accessTokenData);
  return null;
};

export default AuthPage;
