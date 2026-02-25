const adminMiddleware = (req, res, next) => {
    // console.log("Mon user: ", req.user)

    if(req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Accès admin requis." })
    }
}

export default adminMiddleware;