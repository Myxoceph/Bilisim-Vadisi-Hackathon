import bcryptjs from "bcryptjs";
import User from "../../models/user.js";
import { successResponse, errorResponse } from "../../utils/responseFormatter.js";
import {
  sanitizeEmail,
  sanitizeString,
  sanitizePhoneNumber,
  isValidEmail,
  isValidPhoneNumber,
  isStrongPassword,
} from "../../utils/sanitizer.js";

async function loginUser(request, reply) {
  let { email, password } = request.body;

  try {
    email = sanitizeEmail(email);

    if (!isValidEmail(email)) {
      return reply.code(400).send(errorResponse("Invalid email format"));
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return reply.code(401).send(errorResponse("Invalid email or password"));
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return reply.code(401).send(errorResponse("Invalid email or password"));
    }

    // Access token (kısa ömürlü - 15 dakika)
    const accessToken = request.server.jwt.sign(
      {
        id: user.id,
        email: user.email,
        fullname: user.fullname,
      },
      { expiresIn: "15m" }
    );

    // Refresh token (uzun ömürlü - 7 gün)
    const refreshToken = request.server.jwt.sign(
      {
        id: user.id,
        type: "refresh",
      },
      { expiresIn: "7d" }
    );

    // Refresh token'ı Redis'te sakla (7 gün)
    await request.server.redis.setEx(
      `refresh_token:${refreshToken}`,
      7 * 24 * 60 * 60, // 7 gün (saniye cinsinden)
      JSON.stringify({
        id: user.id,
        email: user.email,
        fullname: user.fullname,
      })
    );

    request.log.info({ userId: user.id }, "User logged in successfully");
    
    reply.code(200).send(
      successResponse(
        {
          accessToken,
          refreshToken,
          expiresIn: 900, // 15 dakika (saniye cinsinden)
          user: {
            id: user.id,
            fullname: user.fullname,
            email: user.email,
            phonenumber: user.phonenumber,
          },
        },
        "Login successful"
      )
    );
  } catch (error) {
    request.log.error({ error: error.message }, "Login error");
    reply.code(500).send(errorResponse("Login failed"));
  }
}

async function registerUser(request, reply) {
  let { fullname, email, phonenumber, password } = request.body;

  try {
    fullname = sanitizeString(fullname);
    email = sanitizeEmail(email);
    phonenumber = sanitizePhoneNumber(phonenumber);

    if (!isValidEmail(email)) {
      return reply.code(400).send(errorResponse("Invalid email format"));
    }

    if (!isValidPhoneNumber(phonenumber)) {
      return reply.code(400).send(errorResponse("Invalid phone number format"));
    }

    if (!isStrongPassword(password)) {
      return reply.code(400).send(
        errorResponse(
          "Password must be at least 8 characters and contain uppercase, lowercase, and numbers"
        )
      );
    }

    const existingUser = await User.findOne({
      where: {
        [User.sequelize.Sequelize.Op.or]: [{ email }, { phonenumber }],
      },
    });

    if (existingUser) {
      return reply.code(409).send(
        errorResponse("User with this email or phone number already exists")
      );
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await User.create({
      fullname,
      email,
      phonenumber,
      password: hashedPassword,
    });

    request.log.info({ userId: user.id }, "User registered successfully");
    
    reply.code(201).send(
      successResponse(
        {
          id: user.id,
          fullname: user.fullname,
          email: user.email,
          phonenumber: user.phonenumber,
          createdAt: user.createdAt,
        },
        "User registered successfully"
      )
    );
  } catch (error) {
    request.log.error({ error: error.message }, "Registration error");
    
    if (error.name === "SequelizeUniqueConstraintError") {
      return reply.code(409).send(
        errorResponse("User with this email or phone number already exists")
      );
    }
    
    reply.code(500).send(errorResponse("Registration failed"));
  }
}

async function deleteUser(request, reply) {
  const { id } = request.params;
  
  try {
    const user = await User.findByPk(id);
    
    if (!user) {
      return reply.code(404).send(errorResponse("User not found"));
    }

    await user.destroy();
    
    request.log.info({ userId: id }, "User deleted successfully");
    
    reply.code(200).send(
      successResponse(null, "User deleted successfully")
    );
  } catch (error) {
    request.log.error({ error: error.message, userId: id }, "Delete user error");
    reply.code(500).send(errorResponse("Failed to delete user"));
  }
}

async function getUser(request, reply) {
  const { id } = request.params;
  
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    
    if (!user) {
      return reply.code(404).send(errorResponse("User not found"));
    }
    
    request.log.info({ userId: id }, "User fetched successfully");
    
    reply.code(200).send(
      successResponse(
        {
          id: user.id,
          fullname: user.fullname,
          email: user.email,
          phonenumber: user.phonenumber,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        "User fetched successfully"
      )
    );
  } catch (error) {
    request.log.error({ error: error.message, userId: id }, "Get user error");
    reply.code(500).send(errorResponse("Failed to fetch user"));
  }
}

async function updateUser(request, reply) {
  const { id } = request.params;
  let { fullname, email, phonenumber, password } = request.body;
  
  try {
    const user = await User.findByPk(id);
    
    if (!user) {
      return reply.code(404).send(errorResponse("User not found"));
    }

    const updateData = {};
    
    if (fullname !== undefined) {
      updateData.fullname = sanitizeString(fullname);
    }
    
    if (email !== undefined) {
      email = sanitizeEmail(email);
      if (!isValidEmail(email)) {
        return reply.code(400).send(errorResponse("Invalid email format"));
      }
      updateData.email = email;
    }
    
    if (phonenumber !== undefined) {
      phonenumber = sanitizePhoneNumber(phonenumber);
      if (!isValidPhoneNumber(phonenumber)) {
        return reply.code(400).send(errorResponse("Invalid phone number format"));
      }
      updateData.phonenumber = phonenumber;
    }
    
    if (password !== undefined) {
      if (!isStrongPassword(password)) {
        return reply.code(400).send(
          errorResponse(
            "Password must be at least 8 characters and contain uppercase, lowercase, and numbers"
          )
        );
      }
      updateData.password = await bcryptjs.hash(password, 10);
    }

    await user.update(updateData);
    
    request.log.info({ userId: id }, "User updated successfully");
    
    reply.code(200).send(
      successResponse(
        {
          id: user.id,
          fullname: user.fullname,
          email: user.email,
          phonenumber: user.phonenumber,
          updatedAt: user.updatedAt,
        },
        "User updated successfully"
      )
    );
  } catch (error) {
    request.log.error({ error: error.message, userId: id }, "Update user error");
    
    if (error.name === "SequelizeUniqueConstraintError") {
      return reply.code(409).send(
        errorResponse("Email or phone number already in use")
      );
    }
    
    reply.code(500).send(errorResponse("Failed to update user"));
  }
}

async function logoutUser(request, reply) {
  const { refreshToken } = request.body;

  if (!refreshToken) {
    return reply.code(400).send(errorResponse("Refresh token is required"));
  }

  try {
    // Redis'ten refresh token'ı sil
    await request.server.redis.del(`refresh_token:${refreshToken}`);

    request.log.info("User logged out successfully");
    
    reply.code(200).send(
      successResponse(null, "Logout successful")
    );
  } catch (error) {
    request.log.error({ error: error.message }, "Logout error");
    reply.code(500).send(errorResponse("Logout failed"));
  }
}

// Test için kısa süreli token (sadece development için)
async function getShortLivedToken(request, reply) {
  const { email, password } = request.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return reply.code(401).send(errorResponse("Invalid email or password"));
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return reply.code(401).send(errorResponse("Invalid email or password"));
    }

    // 5 saniye süreli test token
    const shortToken = request.server.jwt.sign(
      {
        id: user.id,
        email: user.email,
        fullname: user.fullname,
      },
      { expiresIn: "5s" }
    );

    reply.code(200).send(
      successResponse(
        {
          accessToken: shortToken,
          expiresIn: 5,
          userId: user.id,
        },
        "Short-lived token for testing (5 seconds)"
      )
    );
  } catch (error) {
    request.log.error({ error: error.message }, "Short token generation error");
    reply.code(500).send(errorResponse("Failed to generate token"));
  }
}

export default {
  loginUser,
  logoutUser,
  registerUser,
  deleteUser,
  getUser,
  updateUser,
  getShortLivedToken,
};
