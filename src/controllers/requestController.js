const requestService = require("../services/requestService");
const asyncHandler = require("../utils/asyncHandler");

// POST /api/requests
const createRequest = asyncHandler(async (req, res) => {
  const { clientName, title, description } = req.body;
  const request = await requestService.createRequest({
    clientName,
    title,
    description,
  });
  res.status(201).json({ success: true, data: request });
});

// GET /api/requests
const getAllRequests = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const requests = await requestService.getAllRequests({ status });
  res
    .status(200)
    .json({ success: true, count: requests.length, data: requests });
});

// GET /api/requests/:id
const getRequestById = asyncHandler(async (req, res) => {
  const request = await requestService.getRequestById(req.params.id);
  res.status(200).json({ success: true, data: request });
});

// PATCH /api/requests/:id/status
const updateRequestStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const updated = await requestService.updateRequestStatus(
    req.params.id,
    status,
  );
  res.status(200).json({ success: true, data: updated });
});

module.exports = {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequestStatus,
};
