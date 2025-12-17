async function refreshTokenToken(request, reply) {
  const { refreshToken } = request.body;

  if (!refreshToken) {
    return reply.code(400).send({ message: "Refresh token is required" });
  }

  try {
    console.log("Refreshing token:", refreshToken);

    reply.code(200).send({
      accessToken: "new_access_token_here",
      expiresIn: 3600,
    });
  } catch (error) {
    console.error("Token refresh error:", error);
    reply.code(401).send({ message: "Invalid refresh token" });
  }
}

export default {
  refreshTokenToken,
};
