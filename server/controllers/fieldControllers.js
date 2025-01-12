import Field from "../models/Field.js";

// Add a new field
export const addField = async (req, res) => {
  const { fieldName, location, cropType, areaSize } = req.body;

  try {
    const field = new Field({
      user: req.user.id,
      fieldName,
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
      cropType,
      areaSize,
    });

    await field.save();
    res.status(201).json({ message: "Field added successfully", field });
  } catch (error) {
    res.status(500).json({ message: "Error adding field", error: error.message });
  }
};

// Get all fields for the authenticated user
export const getFields = async (req, res) => {
  try {
    const fields = await Field.find({ user: req.user.id });
    res.status(200).json(fields);
  } catch (error) {
    res.status(500).json({ message: "Error fetching fields", error: error.message });
  }
};

// Update a field
export const updateField = async (req, res) => {
  const { id } = req.params;
  const { fieldName, location, cropType, areaSize } = req.body;

  try {
    const field = await Field.findById(id);

    if (!field) {
      return res.status(404).json({ message: "Field not found" });
    }

    // Ensure the field belongs to the logged-in user
    if (field.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this field" });
    }

    // Update fields
    field.fieldName = fieldName || field.fieldName;
    if (location) {
      field.location.latitude = location.latitude || field.location.latitude;
      field.location.longitude = location.longitude || field.location.longitude;
    }
    field.cropType = cropType || field.cropType;
    field.areaSize = areaSize || field.areaSize;

    const updatedField = await field.save();
    res.status(200).json({ message: "Field updated successfully", updatedField });
  } catch (error) {
    res.status(500).json({ message: "Error updating field", error: error.message });
  }
};

// Delete a field
export const deleteField = async (req, res) => {
  const { id } = req.params;

  try {
    const field = await Field.findOneAndDelete({ _id: id, user: req.user.id });

    if (!field) {
      return res.status(404).json({ message: "Field not found or not authorized to delete" });
    }

    res.status(200).json({ message: "Field deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting field", error: error.message });
  }
};
