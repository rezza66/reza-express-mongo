export const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "You are not authenticated" });
};

export const ensureAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "admin") {
    return next();
  }
  res
    .status(403)
    .json({ message: "You are not authorized to perform this action" });
};
  