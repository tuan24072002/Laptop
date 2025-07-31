import { ajRateLimit } from "../lib/arcjet.js";

export const ratelimitMiddleware = async (req, res, next) => {
    try {
        const decision = await ajRateLimit.protect(req, { requested: 1 });

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res
                    .status(403)
                    .json({ success: false, message: "Too many requests. Please slow down." });
            } else if (decision.reason.isBot()) {
                return res.status(403).json({
                    success: false,
                    message: "Bot activity detected"
                })
            } else if (decision.reason.isShield()) {
                return res.status(403).json({
                    success: false,
                    message: "Suspicious activity detected"
                })
            }
            return res
                .status(403)
                .json({ success: false, message: "Request denied" });
        }
        next();
    } catch (err) {
        console.error("Arcjet middleware error:", err);
        return res.status(500).json({ success: false, message: err.message });
    }
}