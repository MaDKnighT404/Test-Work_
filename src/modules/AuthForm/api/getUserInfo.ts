import { getOctokit } from "../../../shared/api/getOctokit";

export const getUserInfo = async (token: string) => {
  const octokit = getOctokit(token);

  const response = await octokit.request("GET /user", {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  const data = response.data;

  const filteredData = {
    avatar_url: data.avatar_url,
    login: data.login,
    name: data.name as string,
  };
  return filteredData;
};
