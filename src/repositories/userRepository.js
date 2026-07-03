const User = require("../models/User");

// Creates a new user
async function create({ email, password }) {
  return User.create({ email, password });
}

// Finds a user by email and password
async function findByEmailWithPassword(email) {
  return User.findOne({ email }).select("+password");
}

// Finds a user by email
async function findByEmail(email) {
  return User.findOne({ email });
}

// Finds a user by id
async function findById(id) {
  return User.findById(id);
}

module.exports = { create, findByEmailWithPassword, findByEmail, findById };
