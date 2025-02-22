import { Octokit } from "octokit";
import type { Repository } from "../types";

interface ReposResponse {
  repos: Repository[];
  totalPages: number;
}

export const getUserRepos = async (
  token: string,
  page: number = 1,
): Promise<ReposResponse> => {
  const octokit = new Octokit({
    auth: token,
  });

  const timestamp = Date.now().toString();

  const response = await octokit.request("GET /user/repos", {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
    timestamp,
    per_page: 7,
    page,
  });

  const pageLinks = response.headers.link;
  let totalPages = 1;

  if (pageLinks) {
    const lastPageMatch = pageLinks.match(/page=(\d+)>; rel="last"/);
    if (lastPageMatch) {
      totalPages = parseInt(lastPageMatch[1]);
    } else {
      const prevPageMatch = pageLinks.match(/page=(\d+)>; rel="prev"/);
      if (prevPageMatch) {
        totalPages = page;
      }
    }
  }

  const data = response.data;

  const filteredData = data.map((repo) => ({
    id: repo.id,
    name: repo.name,
    description: repo.description || "",
    visibility: repo.visibility,
  }));

  return {
    repos: filteredData,
    totalPages,
  };
};
