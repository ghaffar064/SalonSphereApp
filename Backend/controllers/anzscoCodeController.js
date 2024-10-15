import { AnzscoCode } from "../models/AnzscoCodeModel.js";
import { UnitGroup } from "../models/UnitGroupModel.js"; // Import UnitGroup model
import csv from "csvtojson";

export const importAnzscoData = async (req, resp) => {
  try {
    const data = [];
    const response = await csv().fromFile(req.file.path);

    for (const item of response) {
      let unitGroupId = null;

      // Check if unitGroupCode is provided in the CSV
      if (item.unitGroupCode && item.unitGroupCode.trim() !== "") {
        // Find the corresponding UnitGroup document by the unitGroupCode string
        const unitGroupDoc = await UnitGroup.findOne({
          unitGroupCode: item.unitGroupCode,
        });

        if (unitGroupDoc) {
          unitGroupId = unitGroupDoc._id; // Set the reference to the UnitGroup document _id
        } else {
          console.log(`Unit Group not found for ${item.unitGroupCode}`);
        }
      }

      // Debugging: Log minorGroupCode to see if it's parsed correctly
      // console.log("Parsed minorGroupCode:", item.minorGroupCode);

      // Prepare ANZSCO data with the unitGroup set to either the found ObjectId or null
      data.push({
        anzscoCode: item.anzscoCode,
        occupation: item.occupation,
        majorGroup: item.majorGroup,
        subMajorGroup: item.subMajorGroup,
        minorGroup: item.minorGroup,
        unitGroup: unitGroupId, // Set to ObjectId if found, otherwise null
        majorGroupCode: item.majorGroupCode,
        subMajorGroupCode: item.subMajorGroupCode,
        minorGroupCode: item.minorGroupCode, // Ensure this field is passed from the CSV
      });
    }

    // Insert the processed data into the AnzscoCode collection if there is any valid data
    if (data.length > 0) {
      await AnzscoCode.insertMany(data);
      resp
        .status(200)
        .send({ success: true, message: "ANZSCO Codes Imported Successfully" });
    } else {
      resp
        .status(400)
        .send({ success: false, message: "No valid records found to import." });
    }
  } catch (err) {
    console.error(err);
    resp.status(500).send({
      success: false,
      message: err.message,
      err,
    });
  }
};
