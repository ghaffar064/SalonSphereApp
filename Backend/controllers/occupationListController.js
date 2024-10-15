import { Occupation } from "../models/OccupationListModel.js";
import { AnzscoCode } from "../models/AnzscoCodeModel.js"; // Import AnzscoCode model
import csv from "csvtojson";

export const importOccupationListData = async (req, resp) => {
  try {
    const data = [];
    const response = await csv().fromFile(req.file.path);

    for (const item of response) {
      let anzscoCodeId = null;

      // Check if the anzscoCode exists in the item
      if (item.anzscoCode && item.anzscoCode.trim() !== "") {
        // Find the corresponding AnzscoCode document by the anzscoCode string
        const anzscoCodeDoc = await AnzscoCode.findOne({
          anzscoCode: item.anzscoCode,
        });

        if (anzscoCodeDoc) {
          anzscoCodeId = anzscoCodeDoc._id; // Set the reference to the AnzscoCode document _id
        } else {
          console.log(
            `ANZSCO Code not found for ${item.anzscoCode}, setting anzscoCode as null`
          );
        }
      } else {
        console.log(
          `anzscoCode missing or empty, setting anzscoCode as null for record:`,
          item
        );
      }

      // Prepare Occupation data with the anzscoCode set to either the found ObjectId or null
      data.push({
        occupation: item.occupation,
        anzscoCode: anzscoCodeId, // Set to ObjectId if found, otherwise null
        assessingAuthority: item.assessingAuthority
          ? item.assessingAuthority.split(",").map((auth) => auth.trim())
          : [], // Handle missing assessingAuthority field
        skillsList: item.skillsList ? item.skillsList.trim() : "", // Handle skillsList as a string and default to an empty string if missing
      });
    }

    // Insert the processed data into the Occupation collection if there is any valid data
    if (data.length > 0) {
      await Occupation.insertMany(data);
      resp.status(200).send({
        success: true,
        message: "CSV Imported Successfully",
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

export const searchByAnzscoCode = async (req, resp) => {
  try {
    const anzscoCodeValue = req.params.code; // Assuming the anzscoCode is passed as a URL parameter

    // Step 1: Find all Occupation documents that reference the anzscoCode
    const occupations = await Occupation.find()
      .populate({
        path: "anzscoCode", // Populate the AnzscoCode document
        match: { anzscoCode: anzscoCodeValue }, // Only match the provided anzscoCode
        populate: {
          path: "unitGroup", // Populate the unitGroup inside the AnzscoCode document
        },
      })
      .exec();

    // Filter out any occupations where the anzscoCode didn't match
    const filteredOccupations = occupations.filter(
      (occupation) => occupation.anzscoCode
    );

    if (filteredOccupations.length === 0) {
      return resp.status(404).send({
        success: false,
        message: `No occupations found for ANZSCO Code ${anzscoCodeValue}`,
      });
    }

    // Step 2: Structure the response with occupations, anzscoCode, unitGroup, and tasks
    const responseData = filteredOccupations.map((occupation) => ({
      occupation: occupation.occupation,
      assessingAuthority: occupation.assessingAuthority, // Include assessingAuthority
      skillsList: occupation.skillsList, // Include skillsList
      anzscoCode: {
        anzscoCode: occupation.anzscoCode.anzscoCode,
        occupation: occupation.anzscoCode.occupation,
        majorGroup: occupation.anzscoCode.majorGroup,
        subMajorGroup: occupation.anzscoCode.subMajorGroup,
        minorGroup: occupation.anzscoCode.minorGroup,
        majorGroupCode: occupation.anzscoCode.majorGroupCode,
        subMajorGroupCode: occupation.anzscoCode.subMajorGroupCode,
        minorGroupCode: occupation.anzscoCode.minorGroupCode,
        unitGroupCode: occupation.anzscoCode.unitGroup
          ? occupation.anzscoCode.unitGroup.unitGroupCode
          : null,
        unitGroup: occupation.anzscoCode.unitGroup
          ? {
              unitGroupCode: occupation.anzscoCode.unitGroup.unitGroupCode,
              unitGroup: occupation.anzscoCode.unitGroup.unitGroup,
              anzscoCodesInUnitGroup:
                occupation.anzscoCode.unitGroup.anzscoCodesInUnitGroup,
              occupationsInUnitGroup:
                occupation.anzscoCode.unitGroup.occupationsInUnitGroup,
              unitGroupDescription:
                occupation.anzscoCode.unitGroup.unitGroupDescription,
              tasks: occupation.anzscoCode.unitGroup.tasks, // Include tasks
              indicativeSkillLevel:
                occupation.anzscoCode.unitGroup.indicativeSkillLevel, // Include indicativeSkillLevel
            }
          : null, // Return full unitGroup details, including tasks and indicativeSkillLevel
      },
    }));

    // Step 3: Send the response with full details
    resp.status(200).send({
      success: true,
      data: responseData, // This will include everything from Occupation, AnzscoCode, and UnitGroup
    });
  } catch (err) {
    console.error(err);
    resp.status(500).send({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

export const showSearchFeildData = async (req, resp) => {
  try {
    // Step 1: Find all Occupation documents and populate the anzscoCode field
    const occupations = await Occupation.find()
      .populate({
        path: "anzscoCode", // Populate the AnzscoCode document
        select: "anzscoCode occupation", // Only select anzscoCode and occupation fields
      })
      .exec();

    // Step 2: Filter and structure the response data to return only the anzscoCode and occupation fields
    const responseData = occupations.map((occupation) => ({
      anzscoCode: occupation.anzscoCode.anzscoCode,
      occupation: occupation.anzscoCode.occupation,
    }));

    // Step 3: Send the response with the filtered data
    resp.status(200).send({
      success: true,
      data: responseData, // Return only anzscoCode and occupation
    });
  } catch (err) {
    console.error(err);
    resp.status(500).send({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};
