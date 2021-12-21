export const INTERNAL_ERROR_MSG = 'Internal server error while processing the order';

// eslint-disable-next-line max-len
export const INVALID_SHOP_MSG = (locationId) => `locationId ${locationId} does not exist or belong to a shop`;

export const NO_VALID_PRODUCTS_MSG = 'All products requested had invalid productIds or not positive quantities. Order not created';
