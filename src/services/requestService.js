const requestRepository = require("../repositories/requestRepository");

const {
  isValidTransition,
  STATUS_VALUES,
} = require("../constants/requestStatus");
const ApiError = require("../utils/ApiError");

async function createRequest({ clientName, title, description }) {
  return requestRepository.create({ clientName, title, description });
}

async function getAllRequests({ status } = {}) {
  if (status && !STATUS_VALUES.includes(status)) {
    throw ApiError.badRequest(
      `Invalid status filter: ${status}. Must be one of: ${STATUS_VALUES.join(", ")}`,
    );
  }
  return requestRepository.findAll(status ? { status } : {});
}

// Fetches a single request by id

async function getRequestById(id) {
  const request = await requestRepository.findById(id);
  if (!request) {
    throw ApiError.notFound(`Client request not found: ${id}`);
  }
  return request;
}

// Updates a request's status

async function updateRequestStatus(id, newStatus) {
  if (!STATUS_VALUES.includes(newStatus)) {
    throw ApiError.badRequest(
      `Invalid status: ${newStatus}. Must be one of: ${STATUS_VALUES.join(", ")}`,
    );
  }

  const existing = await getRequestById(id); // reuses the 404 check above

  if (!isValidTransition(existing.status, newStatus)) {
    throw ApiError.badRequest(
      `Cannot change status from "${existing.status}" to "${newStatus}"`,
    );
  }

  return requestRepository.updateStatus(id, newStatus);
}

module.exports = {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequestStatus,
};
