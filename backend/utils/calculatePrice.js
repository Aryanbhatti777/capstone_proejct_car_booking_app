export const calculatePrice = (carFP, pickupDate, returnDate) => {
    const pickup = new Date(pickupDate);
    const returnD = new Date(returnDate);

    const timeDiff = returnD.getTime() - pickup.getTime();

    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    const totalPrice = daysDiff * carFP.pricePerDay;

    return totalPrice;
};