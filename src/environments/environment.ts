export const environment = {
  production: false,
  gitAccessToken: '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',
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
