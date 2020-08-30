import { Request, Response } from 'express';

/**
 * GET /hello
 * Home page.
 */
export async function world(_req: Request, res: Response<string>) {
  return res.json('Hello, World!');
}
