import { OrderItemLine } from '../../types';

export const groupCartOrderByProductCode = (cartOrder: OrderItemLine[]): OrderItemLine[][] => {
    const processingCartOrder = [...cartOrder];
    const orderItemsByProductCodeList: OrderItemLine[][] = [];
    processingCartOrder.forEach((orderItemLine, index) => {
        const orderItemsByProductCode = processingCartOrder.filter(
            (orderItem) => orderItem.productCode === orderItemLine.productCode,
        );
        orderItemsByProductCodeList.push(orderItemsByProductCode);
        processingCartOrder.splice(index, orderItemsByProductCode.length - 1);
    });

    return orderItemsByProductCodeList;
};
