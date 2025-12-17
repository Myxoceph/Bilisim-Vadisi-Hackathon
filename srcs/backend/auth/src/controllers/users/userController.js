async function registerUser(request, reply)
{
    //return id,username,email,created_at
    console.log("Registering user:", request.body);
    reply.code(201).send({ message: "User registered successfully" });
}

async function deleteUser(request, reply)
{
    const { id } = request.params;
    console.log("Deleting user with ID:", id);
    reply.code(200).send({ message: `User with ID ${id} deleted successfully` });
}

async function getUser(request, reply)
{
    const { id } = request.params;
    console.log("Fetching user with ID:", id);
    reply.code(200).send({ id: id, username: "sampleUser", email: "sample@example.com" });
}

async function updateUser(request, reply)
{
    const { id } = request.params;
    console.log("Updating user with ID:", id, "with data:", request.body);
    reply.code(200).send({ message: `User with ID ${id} updated successfully` });
}   


export default {
    registerUser,
    deleteUser,
    getUser,
    updateUser
}