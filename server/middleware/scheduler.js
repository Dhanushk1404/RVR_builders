import schedule from 'node-schedule';
import RentalDetail from '../models/Rent.js';
import Vehicle from '../models/Vehicles.js';

async function checkAndCompleteRentals() {
  try {
    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0); // Set to 00:00:00 UTC

    const rentalsToComplete = await RentalDetail.find({
      endDate: { $lt: currentDate },
      status: 'Booked'
    });

    for (const rental of rentalsToComplete) {
      rental.status = 'Completed';
      await rental.save();

      await Vehicle.findByIdAndUpdate(rental.vehicle, {
        $inc: { availableStock: 1 }
      });

    }

  } catch (error) {
    console.error('❌ Error completing rentals:', error);
  }
}


checkAndCompleteRentals();

schedule.scheduleJob('0 0 * * *', checkAndCompleteRentals);
