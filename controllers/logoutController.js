const db = require('../models/db')

const handleLogout = async (req, res) => {
    // On client, also delete the accessToken
    try{
    const cookies = req.cookies;
    // console.log("Cookies::",req)
    console.log("Cookies::",cookies.refreshToken)
    if (!cookies?.refreshToken) return res.sendStatus(204); //No content
    const refreshToken = cookies.refreshToken;

    // Is refreshToken in db?
    const foundUser = await db.User.findOne(
        {
         where: {refreshToken:refreshToken}
        }
        )

    // console.log("Found User",foundUser)
    if (!foundUser) {
        res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    // Delete refreshToken in db
    foundUser.refreshToken = null;
    const result = await foundUser.save();
    // console.log("Logout Results",result);

    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(200);
} catch (error) {   
    console.log(error);
    res.sendStatus(500);
}
}

module.exports = { handleLogout }