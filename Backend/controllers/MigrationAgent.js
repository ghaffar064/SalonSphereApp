import { MigrationAgent } from "../models/MigrationAgentSchema.js";

// Create agent controller
export const createAgent = async (req, res) => {
  const { agentName, email, age, experience, MARN, languagesSpoken } = req.body;
  const fileName = req.file ? req.file.filename : null; // Check if the file exists

  try {
    let agent = await MigrationAgent.findOne({ email });
    if (agent) {
      return res.status(409).json({
        success: false,
        msg: "Agent already exists",
      });
    } else {
      agent = new MigrationAgent({
        agentName,
        email,
        age,
        experience,
        MARN,
        languagesSpoken,
        fileName,
      });

      await agent.save();

      return res.status(201).json({
        success: true,
        msg: "Agent created successfully",
        agent, // This should include the _id
      });
    }
  } catch (error) {
    console.error("Error creating agent:", error);
    return res.status(500).json({
      success: false,
      msg: "Error creating agent",
      error: error.message,
    });
  }
};
// Get all agents controller
export const allAgents = async (req, res) => {
  try {
    let agents = await MigrationAgent.find();
    return res.status(200).json({
      success: true,
      agents,
    });
  } catch (error) {
    console.error("Error fetching agents:", error.message, error.stack);
    return res.status(500).json({
      success: false,
      msg: "Error fetching agents",
      error: error.message,
    });
  }
};
