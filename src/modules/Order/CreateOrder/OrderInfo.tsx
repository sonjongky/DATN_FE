import { Box, SelectChangeEvent, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { useOrderStore } from '../store';
import SelectBox from '../../../components/SelectBox';

const OrderInfo: React.FunctionComponent = observer(() => {
    const { store } = useOrderStore();
    const { t } = useTranslation();

    const customerCodes = store.customerCodes.map((item) => {
        return { key: item.Id, value: item.ERPCustomerCode };
    });
    const factoriesOfUser = store.factoriesOfUser.map((item) => {
        return { key: item.Id, value: item.Name };
    });

    return (
        <Box
            bgcolor="common.white"
            borderRadius="0.25rem"
            width="100%"
            height="6rem"
            display="flex"
            flexDirection="row"
            alignItems="center"
            columnGap="5%"
        >
            <Box width="50%" display="flex" flexDirection="row" marginLeft="1rem" alignItems="center">
                <Typography variant="body2" marginRight="1rem">
                    {t('order_info.customer_code')}
                </Typography>
                <SelectBox
                    onChange={(event: SelectChangeEvent<any>) => {
                        store.setCustomerCodeId(event.target.value);
                    }}
                    value={store.customerCodeId}
                    options={customerCodes}
                />
            </Box>
            <Box width="50%" display="flex" flexDirection="row" alignItems="center">
                <Typography variant="body2" whiteSpace="nowrap" marginRight="1rem">
                    {t('order_info.recieving_location')}
                </Typography>

                {store.factoriesOfUser.length > 1 ? (
                    <SelectBox
                        onChange={(event: SelectChangeEvent<any>) => {
                            store.setFactoryId(event.target.value);
                        }}
                        value={store.factoryId}
                        options={factoriesOfUser}
                        label={t('order_info.choose_location')}
                    />
                ) : (
                    <SelectBox
                        onChange={(event: SelectChangeEvent<any>) => {
                            store.setFactoryId(event.target.value);
                        }}
                        value={store.factoryId}
                        options={factoriesOfUser}
                    />
                )}
            </Box>
        </Box>
    );
});

export default OrderInfo;
