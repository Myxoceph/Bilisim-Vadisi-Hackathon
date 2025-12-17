import { successResponse, errorResponse } from "../../utils/responseFormatter.js";

async function refreshToken(request, reply) {
  const { refreshToken } = request.body;

  if (!refreshToken) {
    return reply.code(400).send(errorResponse("Refresh token is required"));
  }

  try {
    request.log.info("Refreshing token");

    // Redis'ten refresh token'ı kontrol et
    const storedData = await request.server.redis.get(`refresh_token:${refreshToken}`);
    
    if (!storedData) {
      return reply.code(401).send(errorResponse("Invalid or expired refresh token"));
    }

    const userData = JSON.parse(storedData);

    // Yeni access token üret
    const accessToken = request.server.jwt.sign(
      {
        id: userData.id,
        email: userData.email,
        fullname: userData.fullname,
      },
      { expiresIn: "15m" }
    );

    request.log.info({ userId: userData.id }, "Token refreshed successfully");

    reply.code(200).send(
      successResponse(
        {
          accessToken,
          expiresIn: 900, // 15 dakika (saniye cinsinden)
        },
        "Token refreshed successfully"
      )
    );
  } catch (error) {
    request.log.error({ error: error.message }, "Token refresh error");
    reply.code(401).send(errorResponse("Invalid refresh token"));
  }
}

export default {
  refreshToken,
};
