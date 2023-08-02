const db = require('./db/db.js');

const auth = (req, res, next) => {
    const bearer = req.headers?.authorization,
        [id, token] = (bearer && String(bearer)?.startsWith('Bearer ') && bearer.split(' ')?.pop()?.split('~')) || [];

    if(id && token) {
        db.get(
            "SELECT * FROM users WHERE id = ?", 
            [id], 
            (err, user) => {
                // if (err) {
                //     res.status(400).json({"error": err.message});
                //     return;
                // }
                // res.json({user});
                
                if (err) user = {error: err.message, status: 400};
                if (user?.token !== token) user = {error: "Token is wrong", status: 403};
                // expired ?
                req.user = user;
                
                next();

            }
        );
    }
    else {
        req.user = {name: '👽'};
        next();
    }
}

module.exports = auth;