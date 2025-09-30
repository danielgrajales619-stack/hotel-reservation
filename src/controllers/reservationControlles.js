import { Reservation } from "../models/hotelReservation.js";
import { User } from "../models/users.js";

const createReservation = async (req, res, next) => {
  try {
    const { name, lastName, age, roomNumber, reservationDay } = req.body;

    const existing = await Reservation.findOne({ roomNumber, reservationDay });
    if (existing) {
      return res.status(400).json({
        message: "Ya existe una reserva para esta habitación en la misma fecha"
      });
    }

    const reservation = new Reservation({ 
      name, 
      lastName, 
      age, 
      roomNumber, 
      reservationDay, 
      userId: req.user._id 
    });
    await reservation.save(); 

    res.status(201).json({
      message: "Reserva creada con éxito",
      reservation
    });
  } catch (error) {
    next(error);
  }
};

const getReservations = async (req, res, next) => {
  try {
    const { role } = req.user;
    let reservations;

    if (role === "admin") {
      reservations = await Reservation.find().populate("invitedUsers", "username email");
    } else {
      reservations = await Reservation.find({
        $or: [
          { userId: req.user._id },
          { invitedUsers: req.user._id }
        ]
      }).populate("invitedUsers", "username email");
    }

    res.status(200).json(reservations);
  } catch (error) {
    next(error);
  }
};

const getReservationById = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate("invitedUsers", "username email");
    if (!reservation) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }
    res.json(reservation);
  } catch (error) {
    next(error);
  }
};

const updateReservation = async (req, res, next) => {
  try {
    const { roomNumber, reservationDay } = req.body;
    const { id } = req.params;

    if (roomNumber && reservationDay) {
      const existing = await Reservation.findOne({
        roomNumber,
        reservationDay,
        _id: { $ne: id }
      });

      if (existing) {
        return res.status(400).json({
          message: "Ya existe una reserva para esta habitación en la misma fecha"
        });
      }
    }

    const updatedReservation = await Reservation.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedReservation) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    res.status(200).json({
      message: "Reserva actualizada con éxito",
      updatedReservation
    });
  } catch (error) {
    next(error);
  }
};

const deleteReservation = async (req, res, next) => {
  try {
    const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!deletedReservation) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }
    res.json({ message: "Reserva eliminada correctamente" });
  } catch (error) {
    next(error);
  }
};

const invitedUsersReservation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { invitedUsers } = req.body;

    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ message: "No se encontró la reserva" });
    }


    if (reservation.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "No tienes permiso para invitar a esta reserva" });
    }


    const users = await User.find({
      $or: [
        { email: { $in: invitedUsers } },
        { username: { $in: invitedUsers } }
      ]
    }).select("_id");

    const ids = users.map(u => u._id);

    const cantInviteMe = users.some(u => u._id.toString() === req.user.id);
    if (cantInviteMe) {
      return res.status(400).json({ message: "No puedes invitarte a ti mismo" });
    }


    reservation.invitedUsers = ids;
    await reservation.save();
    await reservation.populate("invitedUsers", "username email");

    res.status(200).json({
      message: "Usuarios invitados exitosamente",
      reservation
    });
  } catch (error) {
    next(error);
  }
};

export {
  createReservation,
  getReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
  invitedUsersReservation
};
  