import { Octokit } from "octokit";

let octokitInstance: Octokit | null = null;

export const getOctokit = (token: string): Octokit => {
  if (!octokitInstance) {
    octokitInstance = new Octokit({
      auth: token,
    });
  }
  return octokitInstance;
};
