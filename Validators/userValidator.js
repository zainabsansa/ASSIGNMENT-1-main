const { z } = require("zod");

const createUserValidator = z.object({
    firstName, lastName: z.string({required_error:"${} is required!"}).max(255, "Maximum of 255 characters"),
    email: z.string({required_error: "Email is required"}).email("Invalid email" ),
    password: z.string({required_error: "password is required!"}).max(8, "Maximum of 8 characters").min(6, "Minimum of 6 characters")
})
module.exports = {createUserValidator}