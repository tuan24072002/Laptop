import arcjet, { protectSignup, tokenBucket } from "@arcjet/node";

export const ajRegister = arcjet({
    key: process.env.ARCJET_KEY,
    rules: [
        protectSignup({
            email: {
                mode: "LIVE",
                block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
            },
            bots: {
                mode: "LIVE",
                allow: [],
            },
            rateLimit: {
                mode: "LIVE",
                interval: "1m",
                max: 10,
            },
        })
    ]
})

export const ajRateLimit = arcjet({
    key: process.env.ARCJET_KEY,
    rules: [
        tokenBucket({
            mode: "LIVE",
            capacity: 10, // Max 10 tokens
            refillRate: 1, // Refill 1 tokens every 10 seconds
            interval: 10
        })
    ]
})