const createGetProductsFunction = `
  DROP FUNCTION IF EXISTS get_products;
  CREATE FUNCTION get_products(wanted_brand VARCHAR DEFAULT NULL)
  RETURNS TABLE (LIKE product)
  AS $$
    SELECT P.product_id, P.name, P.brand, P.description, P.stock FROM product P
    WHERE ( wanted_brand IS NULL OR LOWER(P.brand) = wanted_brand );
  $$  LANGUAGE sql;
`;

export default createGetProductsFunction;
