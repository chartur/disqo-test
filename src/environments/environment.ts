export const environment = {
  production: false,
  gitAccessToken: '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',
  baseUrl: 'https://api.github.com'
};

export const endpoints = {
  getGists: `${environment.baseUrl}/gists`, // GET
  createNotepad: `${environment.baseUrl}/gists`, // POST
  getPublicGists: `${environment.baseUrl}/gists/public`, // GET
};
