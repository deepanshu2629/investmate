import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema(
  {
    investorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Investor",
      required: true,
    },
    startupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Startup",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    message: {
      type: String,
      maxlength: 500,
    },
  },
  { timestamps: true }
);

// Prevent duplicate connection requests
connectionSchema.index({ investorId: 1, startupId: 1 }, { unique: true });

export default mongoose.models.Connection || mongoose.model("Connection", connectionSchema);
