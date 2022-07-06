export type CustomerCode = {
    Id: string;
    ERPCustomerCode: string;
};

export type ReceiveLocation = {
    Id: string;
    Name: string;
};

export type ShippingAddress = {
    Id: string;
    Address: string;
};

export type DeliveryInfor = {
    fullName: string;
    phoneNumber: string;
    shippingAddress: ShippingAddress;
    note: string;
};

export type OrderDetail = {
    productCode: string;
    quantity: number;
    totalWeight: number;
    orderType: number;
    ordinal: number;
    requestedDeliveryDate: Date;
    productCodeDto: ProductCodeDto | null;
    unitPrice: number;
    stock: number | null;
};

export type ProductCodePrice = {
    ProductCode: string;
    Price: number;
};

export type ProductPrice = {
    ProductCodePrices: ProductCodePrice[];
    PricingStrategy: number;
};

export type ProductCodeDto = {
    Id: string;
    Code: string;
    Name: string;
    PackagingType: string;
    ProductId: string;
    CategoryId: string;
    ImagePath: string | null;
    Weight: number;
    Millimeter: number;
    OrderType: number;
};

export type OrderModel = {
    factoryId: string;
    customerName: string;
    customerCode: string;
    customerCodeId: string;
    addedDaysForRDD: number;
    phoneNumber: string;
    shippingAddress: string;
    deliveryDate: string;
    totalWeight: number;
    totalOriginalPrice: number;
    note: string;
    orderDetails: OrderDetail[];
};

export type DefaultRDD = {
    AddedDaysForRDD: number;
};
