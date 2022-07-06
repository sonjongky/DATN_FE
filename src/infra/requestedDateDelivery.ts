enum Country {
    Vietnam = 'Vietnam',
    Campodia = 'Campodia',
}

const extraDateNumber = 1;

export const getRequestedDateDelivery = (country: string, AddedDaysForRDD: number): Date => {
    const defaultRDD = defaultRequestedDateDelivery(AddedDaysForRDD);
    if (country === Country.Campodia) {
        if (defaultRDD.getDay() === 0) {
            defaultRDD.setDate(defaultRDD.getDate() + extraDateNumber);
        }
    }
    return defaultRDD;
};

const defaultRequestedDateDelivery = (AddedDaysForRDD: number): Date => {
    const currentDate = new Date();
    if (currentDate.getHours() > 16) {
        currentDate.setDate(currentDate.getDate() + AddedDaysForRDD + extraDateNumber);
    } else {
        currentDate.setDate(currentDate.getDate() + AddedDaysForRDD);
    }

    return currentDate;
};
