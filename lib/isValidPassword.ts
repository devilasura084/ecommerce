export async function isValidPassword(
  password: string,
  HASHED_ADMIN_PASSWORD: string
) {
  return (await hashpassword(password)) === HASHED_ADMIN_PASSWORD;
}
async function hashpassword(password: string) {
  const arrayBuffer = await crypto.subtle.digest(
    'SHA-512',
    new TextEncoder().encode(password)
  );
  return Buffer.from(arrayBuffer).toString('base64');
}
