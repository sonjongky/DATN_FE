import React from 'react';
import { action, makeAutoObservable, observable } from 'mobx';
import { Typography } from '@mui/material';

import { Brand, Category, CustomerCode, OrderItemLine, Product, ProductCode, ProductDetail } from '../../types';
import { $get } from '../../infra/http';
import { asyncAction } from '../../infra/mobx';
import useAsyncFunction from '../../infra/useAsyncFunction';

const INDEX_OF_OTHER_CATEGORY = 2;

const defaultProductCode: ProductCode = {
    Id: '',
    Code: '',
    Name: '',
    PackagingType: '',
    ProductId: '',
    CategoryId: '',
    ImagePath: '',
    Weight: 0,
    Millimeter: 0,
    OrderType: 0,
    Description: '',
    Details: '',
    BrandId: '',
};

class ProductStore {
    getRequestedDateDeliveryOfCustomerCode() {
        throw new Error('Method not implemented.');
    }
    @observable products: Product[] = [];

    @observable allProducts: Product[] = [];

    @observable defaultCustomerCodeId = '';

    @observable currentListProductCode: ProductCode[] = [];

    @observable pelletSizeFilteredProductCode: ProductCode[] = [];

    @observable productCode: ProductCode = defaultProductCode;

    @observable
    product: ProductDetail = {
        Id: '',
        Name: '',
        Description: '',
        Details: '',
        BrandId: '',
        IsFavourite: false,
        CategoryId: '',
        Images: [],
        Type: 0,
    };

    @observable currentOrderListRequest: OrderItemLine[] = [];

    @observable currentBrandName = 'Non-Brand';

    @observable currentCategoryName = 'Non-Category';

    @observable customerCodes: CustomerCode[] = [];

    @observable categories: Category[] = [];

    @observable brands: Brand[] = [];

    @observable selectedBrands: string[] = [];

    @observable selectedCategories: string[] = [];

    @observable cartOrder: OrderItemLine[] = [];

    @observable addedDaysForRDD = 0;
    constructor() {
        makeAutoObservable(this);
    }

    @action
    public getCategories() {
        this.categories = [
            { Id: '1', Name: 'Heo' },
            { Id: '2', Name: 'Ga' },
            { Id: '3', Name: 'Vit' },
        ];
    }

    @action
    public getBrands() {
        this.brands = [
            { Id: '1', Name: 'De Hues' },
            { Id: '2', Name: 'Mekong' },
            { Id: '3', Name: 'Comfeed' },
        ];
    }

    // @asyncAction
    // public *getAvailableProducts() {
    //     const response: Product[] = yield $get(`/products`);
    //     this.allProducts = [...response.sort((a, b) => a.Name.localeCompare(b.Name))];
    //     this.filterProduct();
    // }

    @action
    public getAvailableProducts() {
        this.allProducts = [
            {
                Id: '1',
                Type: 0,
                Name: 'Cam Heo Cao San',
                Image: 'https://www.bezkoder.com/wp-content/uploads/2019/11/node-upload-images-mongodb-collection-files.png',
                BrandId: '1',
                CategoryId: '1',
                Description: 'thit heo nhiem benh',
            },
            {
                Id: '2',
                Type: 0,
                Name: 'Cam Heo Cao San',
                Image: 'https://www.bezkoder.com/wp-content/uploads/2019/11/node-upload-images-mongodb-collection-files.png',
                BrandId: '1',
                CategoryId: '1',
                Description: 'thit cho',
            },
            {
                Id: '3',
                Type: 0,
                Name: 'Cam Heo Cao San',
                Image: 'https://www.bezkoder.com/wp-content/uploads/2019/11/node-upload-images-mongodb-collection-files.png',
                BrandId: '2',
                CategoryId: '1',
                Description: 'thitbo',
            },
        ];
    }

    @asyncAction
    public *getProductById(productId: string) {
        const getQuery = `?id=${productId}`;
        const response: ProductDetail = yield $get(`/product/ById${getQuery}`);
        this.product = response;
    }

    @action
    public setCurrentBrandAndCategoryName(
        brand: Brand,
        category: Category,
        ProductDetail: ProductDetail | ProductCode,
    ) {
        brand = this.brands.filter((item) => item.Id === ProductDetail.BrandId)[0];
        category = this.categories.filter((item) => item.Id === ProductDetail.CategoryId)[0];
        this.currentBrandName = brand.Name;
        this.currentCategoryName = category.Name;
    }

    // @action
    // public setCurrentBreadCrumb(isMarketingProduct: boolean) {
    //     const brand: Brand = {
    //         Id: '',
    //         Name: '',
    //     };
    //     const category: Category = {
    //         Id: '',
    //         Name: '',
    //         Icon: '',
    //     };
    //     const isProductCodeBreadCrumb = !isMarketingProduct && this.productCode.BrandId && this.productCode.CategoryId;
    //     const isMarketingProductCodeBreadCrumb = isMarketingProduct && this.product.BrandId && this.product.CategoryId;
    //     if (isMarketingProductCodeBreadCrumb) {
    //         this.setCurrentBrandAndCategoryName(brand, category, this.product);
    //     } else if (isProductCodeBreadCrumb) {
    //         this.setCurrentBrandAndCategoryName(brand, category, this.productCode);
    //     }
    // }

    @action
    public setDefaultCustomerCode(value: string) {
        this.defaultCustomerCodeId = value;
        this.addedDaysForRDD = this.customerCodes.find((item) => item.Id === value)?.AddedDaysForRDD || 0;
    }

    @action
    private arrangeCategoryList(response: Category[]) {
        const fromIndex = INDEX_OF_OTHER_CATEGORY;
        const element = response.splice(fromIndex, 1)[0];
        const toIndex = response.length;
        response.splice(toIndex, 0, element);
        this.categories = [...response];
    }

    @action
    public setSelectedBrands(value: string) {
        const currentIndex = this.selectedBrands.indexOf(value);
        const newSelectedBrands = [...this.selectedBrands];
        if (currentIndex === -1) {
            newSelectedBrands.push(value);
        } else newSelectedBrands.splice(currentIndex, 1);
        this.selectedBrands = [...newSelectedBrands];
        this.filterProduct();
    }

    @action
    public setSelectedCategories(value: string) {
        const currentIndex = this.selectedCategories.indexOf(value);
        const newSelectedCategories = [...this.selectedCategories];
        if (currentIndex === -1) {
            newSelectedCategories.push(value);
        } else newSelectedCategories.splice(currentIndex, 1);
        this.selectedCategories = [...newSelectedCategories];
        this.filterProduct();
    }

    @action
    public filterProduct() {
        if (this.selectedBrands.length === 0 && this.selectedCategories.length === 0) {
            this.products = [...this.allProducts];
            return;
        }
        this.products = this.allProducts.filter((item) => {
            const brandIdIndex = this.selectedBrands.indexOf(item.BrandId);
            const categoryIdIndex = this.selectedCategories.indexOf(item.CategoryId);
            const isNonFilteredItem = brandIdIndex !== -1 && categoryIdIndex !== -1;
            const isFilteredByBrandAndCate =
                (this.selectedCategories.length === 0 && brandIdIndex !== -1) ||
                (this.selectedBrands.length === 0 && categoryIdIndex !== -1);
            if (isNonFilteredItem || isFilteredByBrandAndCate) return item;
        });
    }

    @action
    public reloadProduct() {
        this.selectedBrands = [];
        this.selectedCategories = [];
        this.getAvailableProducts();
    }

    @action
    public setDefaultProduct() {
        if (this.products.length === 0 && this.customerCodes.length > 0) {
            this.defaultCustomerCodeId = this.customerCodes[0].Id;
            this.getAvailableProducts();
        }
    }

    @action
    public setProductCode(productCode: ProductCode) {
        this.productCode = productCode;
    }

    @action
    public resetProductCode() {
        this.productCode = defaultProductCode;
    }
}

const ProductsStoreContext = React.createContext({} as { store: ProductStore });
let store: ProductStore | null = new ProductStore();

export const ProductsStoreProvider = (props: any) => {
    const { children } = props;
    if (!store) {
        store = new ProductStore();
    }

    return <ProductsStoreContext.Provider value={{ store }}>{children}</ProductsStoreContext.Provider>;
};

export const useProductStore = () => React.useContext(ProductsStoreContext);
