import { Octokit } from "octokit";

import type { Repository } from "../types";

export const updateUserRepo = async (
  token: string,
  data: Omit<Repository, "id">,
  username: string,
) => {
  const octokit = new Octokit({
    auth: token,
  });

  await octokit.request(`PATCH /repos/${username}/${data.name}`, {
    name: data.name,
    description: data.description,
    visibility: data.visibility,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
};
