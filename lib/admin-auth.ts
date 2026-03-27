import { NextRequest } from 'next/server';

/**
 * Returns true if the request is authorized for admin access.
 * Requires header: X-Admin-Secret: <ADMIN_SECRET env var>
 */
export function isAdminAuthorized(request: NextRequest): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false; // Deny all if secret not configured
  return request.headers.get('x-admin-secret') === secret;
}
