// src/middleware/keycloakAuth.ts

import { Request, Response, NextFunction } from 'express';
import jwt, { JwtHeader, SigningKeyCallback } from 'jsonwebtoken';
import jwksRsa from 'jwks-rsa';

const keycloakIssuer = 'http://localhost:8060/realms/demo-otic-29'; // cambia esto por tu URL real
const clientId = 'perueduca-movil';

const jwksClient = jwksRsa({
  jwksUri: `${keycloakIssuer}/protocol/openid-connect/certs`,
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
});

export const keycloakAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  // Esta función resuelve la clave pública correcta para el JWT
  const getKey = (header: JwtHeader, callback: SigningKeyCallback) => {
    jwksClient.getSigningKey(header.kid!, (err, key) => {
      const signingKey = key?.getPublicKey();
      callback(err, signingKey);
    });
  };

  jwt.verify(
    token,
    getKey,
    {
      // audience: clientId,
      issuer: keycloakIssuer,
      algorithms: ['RS256'],
    },
    (err, decoded: any) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid token', detail: err.message });
      }

      req.user = decoded; // Aquí se guarda el payload decodificado (que incluye roles)
      next();
    }
  );
};
