export type Product = {
    _id: string;
    Type: number;
    Name: string;
    Image: string;
    BrandId: string;
    CategoryId: string;
    Description: string;
    TrongLuongBao: string;
    NoiSanXuat: string;
    KichThuocHat: string;
    SoLuong: string;
    GiaTien: string;
};

export type CustomerCode = {
    Id: string;
    ERPCustomerCode: string;
    AddedDaysForRDD: number;
};
export type Category = {
    Id: string;
    Name: string;
};
export type Brand = {
    Id: string;
    Name: string;
};
export type ProductDetail = {
    Id: string;
    Name: string;
    Description: string;
    Details: string;
    BrandId: string;
    CategoryId: string;
    Images: string[];
    IsFavourite: boolean;
    Type: number;
};
export enum ProductDescriptionKey {
    PACKING_TYPE = 'PackingType',
    PELLET_SIZE = 'PelletSize',
}

export type ProductCode = {
    Id: string;
    Code: string;
    Name: string;
    PackagingType: string;
    ProductId: string;
    BrandId: string;
    CategoryId: string;
    ImagePath: string;
    Description: string;
    Details: string;
    Weight: number;
    Millimeter: number;
    OrderType: number;
};
export enum Brands {
    WINDMILL = 'Windmill',
    KOUDIJS = 'Koudijs',
    DEHEUS = 'De Heus',
}
export type OrderItemLine = {
    productCode: string;
    quantity: number;
    totalWeight: number;
    orderType: number;
    ordinal: number;
    requestedDeliveryDate: Date;
    productCodeId: string;
    weight: number;
};

export enum OrderErrorType {
    RDDError = 'RDDError',
    QuantityError = 'QuantityError',
    UnsupportedError = 'UnsupportedError',
    NoPriceError = 'NoPriceError',
    DeliveryInfoError = 'DeliveryInfoError',
    InvalidPhoneNumber = 'InvalidPhoneNumber',
    EmptyCartOrder = 'EmptyCartOrder',
    UnselectedFactory = 'UnselectedFactory',
    DuplicatedRequestedDate = 'DuplicatedRequestedDate',
}

export enum OrderErrorMessage {
    RDDError = 'rdd_error',
    QuantityError = 'quantity_error.text',
    WeightError = 'quantity_error.weight',
    PackageError = 'quantity_error.package',
    UnsupportedError = 'unsupported_error',
    NoPriceError = 'no_price_error',
    DeliveryInfoError = 'delivery_info_error',
    InvalidPhoneNumber = 'invalid_phone_number',
    EmptyCartOrder = 'empty_cart_order',
    UnselectedFactory = 'unselected_factory',
    DuplicatedRequestedDate = 'duplicated_requested_date',
}

export type OrderError = {
    type: OrderErrorType;
    data: any;
};
