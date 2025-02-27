import { getOctokit } from "../../../shared/api/getOctokit";

import type { Repository } from "../types";

export const deleteUserRepo = async (
  token: string,
  data: Omit<Repository, "id">,
  username: string,
) => {
  const octokit = getOctokit(token);

  await octokit.request(`DELETE /repos/${username}/${data.name}`, {
    owner: username,
    repo: data.name,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
};
