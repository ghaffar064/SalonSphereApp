// Controllers/Services.js
import { Service } from "../models/ServiceSchema.js";
import { MigrationAgent } from "../models/MigrationAgentSchema.js"; // Assuming this schema exists

// Add a new service
// Add a new service
export const AddService = async (req, res) => {
  const { agentId, visaType, timeLimit, price, details, dateTimeSlots } =
    req.body;

  try {
    // Validate required fields
    if (
      !agentId ||
      !visaType ||
      !timeLimit ||
      !price ||
      !details ||
      !dateTimeSlots
    ) {
      return res.status(400).json({
        success: false,
        msg: "All fields are required.",
      });
    }

    // Check if the agent exists
    const agent = await MigrationAgent.findById(agentId);
    if (!agent) {
      return res.status(404).json({
        success: false,
        msg: "Agent not found.",
      });
    }

    // Check if the service already exists
    let service = await Service.findOne({
      agent: agentId,
      visaType,
      timeLimit,
    });
    if (service) {
      return res.status(409).json({
        success: false,
        msg: "Service already exists for this agent.",
      });
    }

    // Create new service
    service = new Service({
      agent: agentId, // Associate with agent using _id
      visaType,
      timeLimit,
      price,
      details,
      dateTimeSlots,
    });
    await service.save();

    return res.status(201).json({
      success: true,
      msg: "Service added successfully.",
      service,
    });
  } catch (error) {
    console.error("Error adding service:", error);
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

export const allServices = async (req, res) => {
  const { agentId } = req.query; // Ensure this matches with the frontend query

  try {
    const query = agentId ? { agent: agentId } : {};
    const services = await Service.find(query).populate("agent", "agentName");
    return res.status(200).json({
      success: true,
      services,
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    return res.status(500).json({
      success: false,
      msg: "Internal server error.",
    });
  }
};
