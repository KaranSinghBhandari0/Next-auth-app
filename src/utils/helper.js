export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
};