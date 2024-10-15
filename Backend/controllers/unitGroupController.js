import { UnitGroup } from "../models/UnitGroupModel.js"; // Import the UnitGroup model
import csv from "csvtojson";

export const importUnitGroupData = async (req, resp) => {
  try {
    const data = [];
    const response = await csv().fromFile(req.file.path);

    for (const item of response) {
      // Prepare UnitGroup data from the CSV file
      data.push({
        unitGroupCode: item.unitGroupCode ? item.unitGroupCode.trim() : "", // Handle unitGroupCode as a single string
        unitGroup: item.unitGroup ? item.unitGroup.trim() : "", // Handle unitGroup as a single string
        anzscoCodesInUnitGroup: item.anzscoCodesInUnitGroup
          ? item.anzscoCodesInUnitGroup.split(",").map((code) => code.trim())
          : [], // Handle anzscoCodesInUnitGroup as an array of strings
        occupationsInUnitGroup: item.occupationsInUnitGroup
          ? item.occupationsInUnitGroup
              .split(",")
              .map((occupation) => occupation.trim())
          : [], // Handle occupationsInUnitGroup as an array of strings
        unitGroupDescription: item.unitGroupDescription
          ? item.unitGroupDescription.trim()
          : "", // Handle unitGroupDescription as a single string
        tasks: item.tasks
          ? item.tasks
              .split(";")
              .map((task) => task.trim())
              .filter((task) => task.length > 0) // Remove empty tasks
          : [], // Handle tasks as an array of strings, separated by `;`
        indicativeSkillLevel: item.indicativeSkillLevel
          ? item.indicativeSkillLevel
              .split(":")
              .map((level) => level.trim())
              .filter((level) => level.length > 0) // Remove empty levels
          : [], // Handle indicativeSkillLevel as an array of strings, separated by `:`
      });
    }

    // Insert the processed data into the UnitGroup collection if there is any valid data
    if (data.length > 0) {
      await UnitGroup.insertMany(data);
      resp.status(200).send({
        success: true,
        message: "CSV Unit Group Imported Successfully",
      });
    } else {
      resp.status(400).send({
        success: false,
        message: "No valid records found to import.",
      });
    }
  } catch (err) {
    console.log(err);
    resp.status(500).send({
      success: false,
      message: err.message,
      err,
    });
  }
};
