export const INTERNAL_ERROR_MSG = 'Internal server error while processing the order';

// eslint-disable-next-line max-len
export const INVALID_SHOP_MSG = (locationId) => `locationId ${locationId} does not exist or belong to a shop`;

// eslint-disable-next-line max-len
export const NO_VALID_PRODUCTS_MSG = 'All products requested had invalid productIds or not positive quantities. Order not created';

// eslint-disable-next-line max-len
export const NO_UPDATED_STATUS = 'Status not updated, due to one or more reasons: orderId does not exist, statusId does not exist, AND / OR statusId does not follow precendence rules (check API doc).';

export const NO_MSG_SENT = 'Error while sending message to dispatch queue:';
