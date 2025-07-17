import { login } from "@/controllers/authController"

export const POST = async (req) => {
    return await login(req);
}