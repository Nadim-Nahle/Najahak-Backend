const mongoose = require("mongoose");
const { STATUS, STATUS_VALUES } = require("../constants/requestStatus");

const clientRequestSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: [true, "Client name is required"],
      trim: true,
      maxlength: [100, "Client name cannot exceed 100 characters"],
    },
    title: {
      type: String,
      required: [true, "Request title is required"],
      trim: true,
      maxlength: [150, "Title cannot exceed 150 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
      default: "",
    },
    status: {
      type: String,
      enum: {
        values: STATUS_VALUES,
        message: "{VALUE} is not a valid status",
      },
      default: STATUS.NEW,
    },
  },
  {
    timestamps: true, // adds createdAt / updatedAt automatically
    versionKey: false,
  },
);

clientRequestSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model("ClientRequest", clientRequestSchema);
