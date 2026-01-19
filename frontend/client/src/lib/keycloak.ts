import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8081',
  realm: 'safespace-realm',
  clientId: 'safespace-frontend',
});

export default keycloak;
