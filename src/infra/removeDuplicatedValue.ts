export const removeDuplicatedItem = (arr: any[]) => {
    const uniqueArr = [
        ...arr.filter((item, index) => {
            return arr.indexOf(item) === index;
        }),
    ];
    return uniqueArr;
};
