export const requireRole = (...allowed) => (req, res, next) => {
  if (!req.user) {
    res.status(401);
    return next(new Error("Not authenticated"));
  }
  if (!allowed.includes(req.user.role)) {
    res.status(403);
    return next(new Error("Forbidden: insufficient permissions"));
  }
  next();
};
