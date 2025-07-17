import { signup } from "@/controllers/authController"

export const POST = async (req) => {
    return await signup(req);
}