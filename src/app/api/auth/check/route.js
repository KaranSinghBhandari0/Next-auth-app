import { checkAuth } from "@/controllers/authController"

export const GET = async (req) => {
    return await checkAuth(req);
}
