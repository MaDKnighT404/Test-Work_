import { Octokit } from "octokit";

import type { Repository } from "../types";

export const createUserRepo = async (
  token: string,
  data: Omit<Repository, "id">,
) => {
  const octokit = new Octokit({
    auth: token,
  });

  await octokit.request("POST /user/repos", {
    name: data.name,
    description: data.description,
    visibility: data.visibility,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
};
