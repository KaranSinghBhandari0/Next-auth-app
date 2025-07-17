import { logout } from "@/controllers/authController"

export const GET = async (req) => {
    return await logout(req);
}