import { getOctokit } from "../../../shared/api/getOctokit";

import type { Repository } from "../types";

export const createUserRepo = async (
  token: string,
  data: Omit<Repository, "id">,
) => {
  const octokit = getOctokit(token);

  await octokit.request("POST /user/repos", {
    name: data.name,
    description: data.description,
    private: data.visibility === "private",
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
};
