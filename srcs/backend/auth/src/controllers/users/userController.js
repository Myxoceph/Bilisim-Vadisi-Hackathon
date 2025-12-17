import bcryptjs from "bcryptjs";
import User from "../../models/user.js";

async function loginUser(request, reply) {
  const { email, password } = request.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return reply.code(401).send({ message: "Invalid email or password" });
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return reply.code(401).send({ message: "Invalid email or password" });
    }

    const token = request.server.jwt.sign(
      {
        id: user.id,
        email: user.email,
        fullname: user.fullname,
      },
      { expiresIn: "24h" }
    );

    console.log("User logged in:", user.id);
    reply.code(200).send({
      token,
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        phonenumber: user.phonenumber,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    reply.code(500).send({ message: "Login failed" });
  }
}

async function registerUser(request, reply) {
  const { fullname, email, phonenumber, password } = request.body;

  try {
    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await User.create({
      fullname,
      email,
      phonenumber,
      password: hashedPassword,
    });

    console.log("User registered:", user.id);
    reply.code(201).send({
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      phonenumber: user.phonenumber,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error("Registration error:", error);
    reply.code(400).send({ message: error.message });
  }
}

async function deleteUser(request, reply) {
  const { id } = request.params;
  console.log("Deleting user with ID:", id);
  reply.code(200).send({ message: `User with ID ${id} deleted successfully` });
}

async function getUser(request, reply) {
  const { id } = request.params;
  console.log("Fetching user with ID:", id);
  reply
    .code(200)
    .send({ id: id, username: "sampleUser", email: "sample@example.com" });
}

async function updateUser(request, reply) {
  const { id } = request.params;
  console.log("Updating user with ID:", id, "with data:", request.body);
  reply.code(200).send({ message: `User with ID ${id} updated successfully` });
}

export default {
  loginUser,
  registerUser,
  deleteUser,
  getUser,
  updateUser,
};
