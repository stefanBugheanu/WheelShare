import Car from "../modelsDB/Car.js";
import Rental from "../modelsDB/Rental.js";

export const createCar = async (req, res) => {
  try {
    const {
      brand,
      model,
      year,
      pricePerDay,
      seats,
      transmission,
      engine,
      imageUrl,
    } = req.body;

    if (!brand || !model || !year || !pricePerDay || !imageUrl) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    const newCar = await Car.create({
      brand,
      model,
      year,
      pricePerDay,
      location: "Aeroportul Otopeni",
      seats,
      transmission,
      engine,
      imageUrl,
    });

    res.status(201).json(newCar);
  } catch (err) {
    console.error("Create car error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (err) {
    console.error("Get cars error:", err.message);
    s;
    res.status(500).json({ message: "Server error" });
  }
};

export const getAvailableCars = async (req, res) => {
  try {
    const { pickup, returnDate } = req.query;

    if (!pickup || !returnDate) {
      return res
        .status(400)
        .json({ message: "Pickup and return dates required." });
    }

    console.log("Pickup query:", pickup);
    console.log("Return query:", returnDate);

    const pickupDate = new Date(pickup);
    const returnDateObj = new Date(returnDate);

    console.log("Parsed pickup:", pickupDate);
    console.log("Parsed return:", returnDateObj);

    const overlappingRentals = await Rental.find({
      status: "active",
      $or: [
        { startDate: { $lte: returnDateObj }, endDate: { $gte: pickupDate } },
      ],
    }).select("car");

    console.log("Overlapping rentals found:", overlappingRentals.length);

    const overlappingCarIds = overlappingRentals.map((r) => r.car.toString());

    const availableCars = await Car.find({
      _id: { $nin: overlappingCarIds },
    });

    console.log("Available cars found:", availableCars.length);

    res.status(200).json(availableCars);
  } catch (err) {
    console.error("Get available cars by date error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.status(200).json(car);
  } catch (err) {
    console.error("Get car error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });

    const updatedFields = req.body;
    Object.assign(car, updatedFields);

    const updatedCar = await car.save();
    res.status(200).json(updatedCar);
  } catch (err) {
    console.error("Update car error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const generateUniquePin = async () => {
  let pin;
  let exists = true;

  while (exists) {
    pin = Math.floor(1000 + Math.random() * 9000).toString();
    exists = await Car.exists({ pin });
  }

  return pin;
};

export const addUniquePinsToCars = async (req, res) => {
  try {
    const cars = await Car.find({ pin: { $exists: false } });

    if (cars.length === 0) {
      return res
        .status(200)
        .json({ message: "Toate mașinile au deja un PIN." });
    }

    for (const car of cars) {
      const pin = await generateUniquePin();
      car.pin = pin;
      await car.save();
    }

    res
      .status(200)
      .json({ message: `Pin-uri adăugate la ${cars.length} mașini.` });
  } catch (err) {
    console.error("Eroare la adăugare PIN-uri:", err.message);
    res.status(500).json({ message: "Eroare server." });
  }
};

export const removeAttribute = async (req, res) => {
  try {
    const { id } = req.params;
    const { field } = req.body;

    if (!field) {
      return res.status(400).json({ message: "Missing field" });
    }

    const car = await Car.findById(id);
    if (!car) return res.status(400).json({ message: "Didn't found the car" });

    car.set(field, undefined, { strict: false });
    car.markModified(field);

    const updatedCar = await car.save();
    res.status(200).json(updatedCar);
  } catch (err) {
    console.error("Remove attribute error", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE
export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });

    res.status(200).json({ message: "Car deleted" });
  } catch (err) {
    console.error("Delete car error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
