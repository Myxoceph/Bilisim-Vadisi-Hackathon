const STORAGE_KEYS = {
  USERS         : 'vet_app_users',
  CURRENT_USER  : 'vet_app_current_user',
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {

  async register(userData)
  {
    await delay(500); // API simülasyonu

    const users = this.getAllUsers();

    if (users.find(u => u.email === userData.email))
      throw new Error('This email is already registered');

    if (userData.password !== userData.confirmPassword)
      throw new Error('Passwords do not match');

    const newUser =
    {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      userType: userData.userType,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser));

    return newUser;
  },

  async login(email, password)
  {
    await delay(500); // API simülasyonu

    const users = this.getAllUsers();
    const user = users.find(u => u.email === email);

    if (!user)
      throw new Error('User not found');

    // Mock: Şifre kontrolü (hash kontrol edilecek)
    
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));

    return user;
  },

  logout()
  {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },

  getCurrentUser()
  {
    const userStr = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);

    return userStr ? JSON.parse(userStr) : null;
  },

  getAllUsers()
  {
    const usersStr = localStorage.getItem(STORAGE_KEYS.USERS);

    return usersStr ? JSON.parse(usersStr) : [];
  },

  isAuthenticated()
  {
    return !!this.getCurrentUser();
  },
};
