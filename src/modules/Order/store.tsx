import React from 'react';
import { action, makeAutoObservable, observable } from 'mobx';
import moment from 'moment';
import { Typography } from '@mui/material';

import { $get, $post } from '../../infra/http';
import { asyncAction } from '../../infra/mobx';
import { OrderItemLine } from '../../types';
import useAsyncFunction from '../../infra/useAsyncFunction';

import {
    CustomerCode,
    DefaultRDD,
    DeliveryInfor,
    ReceiveLocation,
    ShippingAddress,
    OrderModel,
    OrderDetail,
    ProductPrice,
    ProductCodePrice,
} from './types';

class OrderStore {
    @observable customerCodes: CustomerCode[] = [];
    @observable customerCodeId = '';
    @observable factoriesOfUser: ReceiveLocation[] = [];
    @observable factoryId = '';
    @observable customerCode = '';
    @observable customerName = '';
    @observable receiveLocations: ReceiveLocation[] = [];
    @observable shippingAddresses: ShippingAddress[] = [];
    @observable productCodePrices: ProductCodePrice[] = [];
    @observable cartOrderDetail: OrderDetail[] = [];
    @observable cartOrder: OrderItemLine[] = [];
    @observable orderItemLinesByProductCode: OrderItemLine[][] = [];
    @observable addedDaysForRDD = 0;
    @observable receiveLocationName = '';
    @observable deliveryDate = '';

    @observable resultRequestDates: string[] = [];
    @observable deliveryInfor: DeliveryInfor = {
        fullName: '',
        phoneNumber: '',
        shippingAddress: {
            Id: '',
            Address: '',
        },
        note: '',
    };

    @observable unSupportedProductCodes: string[] = [];
    @observable withoutPriceProductCodes: string[] = [];
    @observable totalPrice = 0;
    @observable totalWeight = 0;

    @observable orderItemLines: OrderItemLine[] = [];

    @observable orderModel: OrderModel = {
        factoryId: '',
        customerName: '',
        customerCode: '',
        customerCodeId: '',
        addedDaysForRDD: 0,
        phoneNumber: '',
        shippingAddress: '',
        deliveryDate: '',
        totalWeight: 0,
        totalOriginalPrice: 0,
        note: '',
        orderDetails: [],
    };

    constructor() {
        makeAutoObservable(this);
    }

    @action
    public setDeliveryInfor(deliveryInfor: DeliveryInfor) {
        this.deliveryInfor = deliveryInfor;
    }

    @action
    public getReciveDays() {
        const listRequestDates = this.cartOrder
            .map((item) => item.requestedDeliveryDate)
            .sort((a, b) => a.getTime() - b.getTime());
        const sortedListRequestDates = listRequestDates.map((item) => moment(item).format('DD/MM'));
        this.deliveryDate = moment
            .min(this.orderItemLines.map((item) => moment(item.requestedDeliveryDate)))
            .toString();

        const resultRequestDates: string[] = [];

        sortedListRequestDates.forEach(function (item) {
            if (!resultRequestDates.includes(item)) resultRequestDates.push(item);
        });
        this.resultRequestDates = [...resultRequestDates];
    }

    @action
    public getTotalWeight() {
        this.totalWeight = 0;
        this.cartOrder.forEach((product) => {
            this.totalWeight += product.totalWeight;
        });
    }

    @asyncAction
    public *getUnSupportedProductCodesByCustomerId() {
        const query = `/productCode/getUnSupportedProductCodesByCustomerCodeFromList?customerCodeId=${this.customerCodeId}`;
        const productCodes: string[] = this.cartOrder.map((product) => product.productCode);
        this.unSupportedProductCodes = yield $post(query, productCodes);
    }

    @asyncAction
    public *getProductCodePriceDto() {
        const query = `/productCode/getProductCodePriceDto?customerCode=${this.customerCodes[0].ERPCustomerCode}&factoryId=${this.factoryId}`;
        const productCodeIds: string[] = this.cartOrder.map((product) => product.productCodeId);
        const respone: ProductPrice = yield $post(query, productCodeIds);
        this.productCodePrices = respone.ProductCodePrices;
        const productsHavePriceCode: string[] = respone.ProductCodePrices.map((item) => item.ProductCode);

        this.withoutPriceProductCodes = this.cartOrder
            .filter((product) => !productsHavePriceCode.includes(product.productCode))
            .map((item) => item.productCode);
    }

    @action
    public setCustomerCodeId(customerCodeId: string) {
        this.customerCodeId = customerCodeId;
    }
    @action
    public setCustomerCode(customerCode: string) {
        this.customerCode = customerCode;
    }

    @action
    public setCartOrderDetail() {
        const CartOrderDetail = this.cartOrder.map((product) => {
            const unitPrice = this.productCodePrices.filter((item) => item.ProductCode === product.productCode)[0]
                .Price;
            return {
                productCode: product.productCode,
                quantity: product.quantity,
                totalWeight: product.totalWeight,
                orderType: product.orderType,
                ordinal: product.ordinal,
                requestedDeliveryDate: product.requestedDeliveryDate,
                productCodeDto: null,
                unitPrice: unitPrice,
                stock: null,
            };
        });
        this.totalPrice = 0;
        CartOrderDetail.forEach((item) => {
            this.totalPrice += item.quantity * item.unitPrice;
        });
        this.orderModel.orderDetails = [...CartOrderDetail];
    }

    @action
    public setOrderDetails() {
        this.setCartOrderDetail();
        this.customerCode = this.customerCodes.filter((item) => item.Id === this.customerCodeId)[0].ERPCustomerCode;
        this.orderModel.customerName = this.customerName;
        this.orderModel.factoryId = this.factoryId;
        this.orderModel.customerCode = this.customerCode;
        this.orderModel.customerCodeId = this.customerCodeId;
        this.orderModel.addedDaysForRDD = this.addedDaysForRDD;
        this.orderModel.phoneNumber = this.deliveryInfor.phoneNumber;
        this.orderModel.shippingAddress = this.deliveryInfor.shippingAddress.Address;
        this.orderModel.deliveryDate = this.deliveryDate;
        this.orderModel.totalWeight = this.totalWeight;
        this.orderModel.totalOriginalPrice = this.totalPrice;
        this.orderModel.note = this.deliveryInfor.note;
    }

    @asyncAction
    public *createOrder() {
        const query = `/order/create`;
        const response: OrderModel = yield $post(query, this.orderModel);
        return response;
    }

    @asyncAction
    public *initCustomerCode() {
        const response: CustomerCode[] = yield $get(`/customerCode/getCustomerCodesOfUser`);
        const customerCodes: CustomerCode[] = response.map((item) => {
            return { Id: item.Id, ERPCustomerCode: item.ERPCustomerCode };
        });

        this.customerCodes = customerCodes;
        this.setCustomerCodeId(this.customerCodes[0].Id);
        this.setCustomerCode(this.customerCodes[0].ERPCustomerCode);
    }

    @action
    public setFactoryId(factoryId: string) {
        this.factoryId = factoryId;
        this.factoriesOfUser.forEach((location) => {
            if (location.Id === this.factoryId) this.receiveLocationName = location.Name;
        });
    }

    @asyncAction
    public *initFactoriesOfUser(customerCodeId: string) {
        const response: ReceiveLocation[] = yield $get(
            `/factory/getFactoriesBasedOnCustomerCodeId?customerCodeId=${customerCodeId}`,
        );
        const factories: ReceiveLocation[] = response.map((item) => {
            return { Id: item.Id, Name: item.Name };
        });

        this.factoriesOfUser = factories;
    }

    @action
    public addOrderItemLinesIntoCartOrder(orderItemLine: OrderItemLine, Ordinal: number) {
        const updatedCartOrder = [...this.cartOrder];

        updatedCartOrder.forEach((element, index) => {
            if (element.ordinal === Ordinal) {
                const newItemPosition = index + 1;
                updatedCartOrder.splice(newItemPosition, 0, orderItemLine);
                for (let orderItem = newItemPosition + 1; orderItem < updatedCartOrder.length; orderItem++) {
                    updatedCartOrder[orderItem].ordinal++;
                }
            }
        });

        this.cartOrder = updatedCartOrder;
    }
    @action
    public removeOrderItemOutOfCartOrder(orderItemOrdinal: number) {
        const updatedOrderItemLines = [...this.cartOrder];
        updatedOrderItemLines.forEach((element, orderItem) => {
            if (element.ordinal === orderItemOrdinal) {
                updatedOrderItemLines.splice(orderItem, 1);
                for (
                    let beHandledOrderItem = orderItem;
                    beHandledOrderItem < updatedOrderItemLines.length;
                    beHandledOrderItem++
                ) {
                    updatedOrderItemLines[beHandledOrderItem].ordinal--;
                }
                return;
            }
        });
        this.cartOrder = updatedOrderItemLines;
    }

    @asyncAction
    public *getRequestedDateDeliveryOfCustomerCode() {
        const response: DefaultRDD[] = yield $get(`/customerCode/getCustomerCodesOfUser`);
        this.addedDaysForRDD = response[0].AddedDaysForRDD;
    }

    @action
    public setOrderItemLine(orderItemLine: OrderItemLine) {
        this.cartOrder = this.cartOrder.map((o) => (o.ordinal === orderItemLine.ordinal ? orderItemLine : o));
    }

    @action
    public setCartOrder(orderItemLines: OrderItemLine[]) {
        orderItemLines.forEach((item) => {
            this.cartOrder.push(item);
        });
    }
    @action
    public clearCartOrder() {
        this.cartOrder = [];
    }

    @action
    public setPhoneNumber(phoneNumber: string) {
        this.deliveryInfor.phoneNumber = phoneNumber;
    }

    @action
    public setFullName(fullName: string) {
        this.deliveryInfor.fullName = fullName;
    }
    @asyncAction
    public *getShippingAddress() {
        const response: ShippingAddress[] = yield $get(`/shippingAddress/all`);

        this.shippingAddresses = [...response];
    }
}

type StoreProviderProps = {
    children: React.ReactNode;
};

const OderStoreContext = React.createContext({} as { store: OrderStore });
let store: OrderStore | null = new OrderStore();

export const OrderStoreProvider = (props: StoreProviderProps) => {
    const { children } = props;
    if (!store) {
        store = new OrderStore();
    }

    const { loading, error } = useAsyncFunction(async () => {
        try {
            await store?.initCustomerCode();
            await store?.getUnSupportedProductCodesByCustomerId();
        } catch (error) {
            console.error(error);
        }
    });

    if (error) {
        return null;
    }

    if (loading) {
        return (
            <Typography variant="h2" textTransform="uppercase">
                Loading...
            </Typography>
        );
    }

    return <OderStoreContext.Provider value={{ store }}>{children}</OderStoreContext.Provider>;
};

export const useOrderStore = () => React.useContext(OderStoreContext);
