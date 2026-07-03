const ClientRequest = require("../models/ClientRequest");

// Creates a new client request document.
async function create(data) {
  return ClientRequest.create(data);
}

// Fetches all requests
async function findAll(filter = {}) {
  return ClientRequest.find(filter).sort({ createdAt: -1 });
}

// Fetches a single request by its Mongo _id.
async function findById(id) {
  return ClientRequest.findById(id);
}

// Updates only the status field
async function updateStatus(id, status) {
  return ClientRequest.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true },
  );
}

module.exports = { create, findAll, findById, updateStatus };
