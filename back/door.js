const db = require('./db/db.js');
const md5 = require('md5');
const mailer = require('./mail.js');
const hash = (email) => md5(String(email).split().sort(() => Math.random() - 0.5) + process.env.SECRET_SALT + Date.now());

const door = (req, res) => {

    // get magic link 
    if (req.method === 'POST' && req.query.email) { // && res
        
        const email = req.query.email,
            token = hash(email);

        let user = {};//{email, token}; // token - is secret!

        db.get(
            `SELECT id,email FROM users WHERE email = ?`, 
            [email], 
            (err, row) => {
                if (err) {
                    user = {"error": err.message};
                }
                else {
                    user = row ?? {};

                    if(user?.id) {

                        // update
                        db.run(
                            `UPDATE users SET token = COALESCE(?,token) WHERE id = ?`,
                            [token, user.id],
                            function (err) {
                                if (err){
                                    user = {"error": err.message};
                                }
                                else {
                                    user.changes = this.changes;
                                }
                            }
                        );

                    }
                    else {


                        // create new user
                        user = {
                            name: String.fromCodePoint(Math.round(Math.random() * (128571 - 128511) + 128511)), //random emoji
                            email,
                            token
                        }
                        
                        db.run(
                            `INSERT INTO users (name, email, token) VALUES (?,?,?)`, 
                            Object.values(user), 
                            function (err) {
                                if (err){
                                    user = {"error": err.message};
                                }
                                else {
                                    user.id = this.lastID;
                                }
                            }
                        );
                    }
                }

                if(user?.id && user.email) {

                    // send token
                    mailer.sendMail(
                        {
                            from: process.env.MAIL_FROM,
                            to: user.email,
                            subject: '💎🗝 for practicum.trunow',
                            text: `${process.env.APP_URL}/?auth=${user.id}~${token}`
                        }, 
                        (err, info) => {
                            if (err) user = {"error": err.message};
                            // else console.log('mail sent');
                        }
                    );


                    user.id = 0;//null;// he is not auth yet 
                }
                else {
                    user = {"error": "Not found user.email or .id"};
                }
                
		        // res.send({ user });
		        return user;
            }
        );
    }

}

module.exports = door;