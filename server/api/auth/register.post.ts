import {User} from "~/server/models/User";

import bcrypt from "bcrypt"

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const {username,email, password} = JSON.parse(body);

    if (!email || !username || !password) {
        throw createError({
            statusCode: 400,
            statusMessage: "Bad Request",
            message: "Missing required fields",
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const user = await User.create({username,email, password: hashedPassword});

    return {...user, password: undefined}


});