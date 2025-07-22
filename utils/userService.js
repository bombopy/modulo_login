const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class UserService {
  constructor() {
    this.usersFilePath = path.join(__dirname, '../data/users.json');
    this.ensureDataFileExists();
  }

  ensureDataFileExists() {
    try {
      // Create data directory if it doesn't exist
      const dataDir = path.dirname(this.usersFilePath);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      // Create users file if it doesn't exist
      if (!fs.existsSync(this.usersFilePath)) {
        fs.writeFileSync(this.usersFilePath, JSON.stringify([], null, 2));
      }
    } catch (error) {
      console.error('Error ensuring data file exists:', error);
    }
  }

  readUsers() {
    try {
      const data = fs.readFileSync(this.usersFilePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading users:', error);
      return [];
    }
  }

  writeUsers(users) {
    try {
      fs.writeFileSync(this.usersFilePath, JSON.stringify(users, null, 2));
      return true;
    } catch (error) {
      console.error('Error writing users:', error);
      return false;
    }
  }

  findUserByUsername(username) {
    const users = this.readUsers();
    return users.find(user => user.username === username);
  }

  findUserByEmail(email) {
    const users = this.readUsers();
    return users.find(user => user.email === email);
  }

  findUserById(id) {
    const users = this.readUsers();
    return users.find(user => user.id === id);
  }

  createUser(userData) {
    try {
      const users = this.readUsers();
      
      // Generate unique ID
      const id = crypto.randomUUID();
      
      const newUser = {
        id,
        username: userData.username,
        email: userData.email,
        password: userData.password,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      users.push(newUser);
      
      if (this.writeUsers(users)) {
        return newUser;
      } else {
        throw new Error('Failed to save user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  updateUser(id, updateData) {
    try {
      const users = this.readUsers();
      const userIndex = users.findIndex(user => user.id === id);
      
      if (userIndex === -1) {
        return null;
      }

      users[userIndex] = {
        ...users[userIndex],
        ...updateData,
        updatedAt: new Date().toISOString()
      };

      if (this.writeUsers(users)) {
        return users[userIndex];
      } else {
        throw new Error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  deleteUser(id) {
    try {
      const users = this.readUsers();
      const userIndex = users.findIndex(user => user.id === id);
      
      if (userIndex === -1) {
        return false;
      }

      users.splice(userIndex, 1);
      return this.writeUsers(users);
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  }

  getAllUsers() {
    return this.readUsers().map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }));
  }
}

module.exports = new UserService();