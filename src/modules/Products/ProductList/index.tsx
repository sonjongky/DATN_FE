import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Pagination, PaginationItem, Typography, styled } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { t } from 'i18next';
import { useLocation } from 'react-router-dom';

import { useProductStore } from '../store';
import { useOrderStore } from '../../Order/store';
import { useAuthStore } from '../../Auth/store';
import Footer from '../../../components/Footer';
import Navbar from '../../../components/Navbar';
import { Product } from '../../../types';

import SearchBar from './SearchBar';
import Sidebar from './Sidebar';
import ProductItem from './ProductItem';

const ProductList: React.FunctionComponent = observer(() => {
    const PRODUCTS_PER_PAGE = 25;

    const { store: authStore } = useAuthStore();
    const { store: orderStore } = useOrderStore();
    const { store } = useProductStore();
    const location = useLocation();

    const [productsPerPage, setProductsPerPage] = React.useState<Product[]>(store.allProducts);

    const [page, setPage] = React.useState<number>(1);
    const handleProductPerPageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setNewProductsPerPage(page);
        setPage(page);
    };

    const setNewProductsPerPage = (page: number) => {
        const products = store.products;
        const newProductsPerPage = products.slice(PRODUCTS_PER_PAGE * (page - 1), PRODUCTS_PER_PAGE * page);
        setProductsPerPage(newProductsPerPage);
    };

    const refreshPage = () => {
        store.reloadProduct();
        setPage(1);
    };

    React.useEffect(() => {
        store.getCategories();
        store.getBrands();
        store.getAvailableProducts();
    }, []);

    React.useEffect(() => {
        setPage(1);
    }, [store.allProducts, store.products]);

    React.useEffect(() => {
        setNewProductsPerPage(page);
    }, [store.products, page]);

    return (
        <Box>
            <Navbar />
            <Box display="flex" flex-direction="row">
                <Sidebar />
                <Box
                    margin-left="2%"
                    width="70%"
                    display="flex"
                    justifyContent="center"
                    flexDirection="column"
                    columnGap="1rem"
                >
                    <SearchBar />
                    <Box
                        width="100%"
                        minHeight="40rem"
                        paddingTop="1rem"
                        marginLeft="5%"
                        columnGap="3%"
                        display="flex"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        alignSelf="center"
                        flexWrap="wrap"
                    >
                        {productsPerPage.map((item) => (
                            <ProductItem productItem={item} key={item._id} />
                        ))}
                    </Box>
                    <Box
                        width="50%"
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="space-between"
                        alignSelf="flex-start"
                        marginLeft="15%"
                        paddingBottom="1%"
                    >
                        <Typography> {store.products.length + ` ${t('product.result')} `} </Typography>
                        <StyledPagination
                            count={Math.ceil(store.products.length / 25)}
                            page={page}
                            variant="outlined"
                            shape="rounded"
                            renderItem={(item) => (
                                <PaginationItem
                                    components={{
                                        previous: ArrowBackIcon,
                                        next: ArrowForwardIcon,
                                    }}
                                    {...item}
                                />
                            )}
                            onChange={handleProductPerPageChange}
                        />
                    </Box>
                </Box>
            </Box>
            <Footer />
        </Box>
    );
});

export default ProductList;

const StyledPagination = styled(Pagination)`
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-self: center;
`;
