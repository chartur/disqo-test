export const environment = {
  production: true,
  gitAccessToken: 'GIT_ACCESS_TOKEN_HERE',
  baseUrl: 'https://api.github.com'
};

export const endpoints = {
  getGists: `${environment.baseUrl}/gists`, // GET
  getSingleGist: `${environment.baseUrl}/gists/:gistId`, // GET
  updateSingleGist: `${environment.baseUrl}/gists/:gistId`, // PATCH
  deleteSingleGist: `${environment.baseUrl}/gists/:gistId`, // DELETE
  createNotepad: `${environment.baseUrl}/gists`, // POST
  getPublicGists: `${environment.baseUrl}/gists/public`, // GET
};
