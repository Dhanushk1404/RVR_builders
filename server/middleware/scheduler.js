import schedule from 'node-schedule';
import RentalDetail from '../models/Rent.js';
import Vehicle from '../models/Vehicles.js';

// Schedule the job to run daily at midnight
schedule.scheduleJob('0 0 * * *', async () => {
  try {
    const now = new Date();
    const rentalsToComplete = await RentalDetail.find({
      rentalEndDate: { $lt: now },
      status: 'Booked'
    });

    for (const rental of rentalsToComplete) {
      rental.status = 'Completed';
      await rental.save();

      // Increment the vehicle's available stock
      await Vehicle.findByIdAndUpdate(rental.vehicle, {
        $inc: { availableStock: 1 }
      });
    }

    console.log(`Completed ${rentalsToComplete.length} rentals.`);
  } catch (error) {
    console.error('Error completing rentals:', error);
  }
});
