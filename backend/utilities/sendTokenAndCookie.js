//send back response and set http only cookie
//use cookie instead of local storage because
// the cookie can only be accessed by server
// cannot use js code to access in client side
// and will not show in http header
// it is more secure

// once we set cookie in res, req will also provide back this cookie
// cookie could be saved in client memory some place for our use

const sendAndSetCookie = (user, statusCode, res) => {
  const token = user.getJWT();
  const option = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE_DATE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, option).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendAndSetCookie;
