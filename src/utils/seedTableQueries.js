export const seedLocationTypeTable = `
  INSERT INTO location_type(description)
  VALUES ('SHOP'), ('WAREHOUSE')
`;

export const seedRoleTable = `
  INSERT INTO role(description)
  VALUES ('SHOP_MANAGER'), ('WAREHOUSE_OFFICER')
`;

export const seedStatusTable = `
  INSERT INTO status(description)
  VALUES ('PENDING'), ('IN_PROGRESS'), ('DELIVERED')
`;

export const seedLocationTable = `
  INSERT INTO location(name, city, address, type_id)
  VALUES
    ('Prestige Imports', 'Miami', '14800 Biscayne Blvd', 1),
    ('Curated', 'Miami', '2100 NE 2nd Ave', 1),
    ('Central Warehouse', 'Tampa', '1234 Unpopular St', 2)
`;

export const seedEmployeeTable = `
  INSERT INTO employee(name, password, location_id, role_id)
  VALUES
    ('Jimmy Page', 'a92dd4403', 1, 1),
    ('Robert Plant', '92aef1f3f', 1, 1),
    ('Brian Johnson', '62ddc01fc', 2, 1),
    ('Angus Young', '84adcbfb', 2, 1),
    ('John Fogerty', 'da399086', 3, 2)
`;

export const seedProductTable = `
  INSERT INTO product(name, brand, description, stock)
  VALUES
    ('Tire', 'Pirelli', 'P-Zero Sport Tires', 12),
    ('Oil Can', 'Castrol', 'Synthetic Oil', 3),
    ('Battery', 'AC Delco', '12v Battery', 10),
    ('Sparkplug', 'Bosch', 'Sparkplugs', 48)
`;
