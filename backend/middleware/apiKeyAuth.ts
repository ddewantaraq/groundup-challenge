import { Request, Response, NextFunction } from 'express';

export function apiKeyAuth(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers['x-api-key'];
  const expectedApiKey = process.env.API_KEY;

  if (!expectedApiKey) {
    console.error('API_KEY not configured in environment variables');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  if (!apiKey) {
    return res.status(401).json({ error: 'API key is required' });
  }

  if (apiKey !== expectedApiKey) {
    return res.status(401).json({ error: 'Invalid API key' });
  }

  next();
} 