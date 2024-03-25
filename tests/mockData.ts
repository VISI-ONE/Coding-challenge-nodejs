// Copied from seeds as it as to test with the same data

export const mockedTenantData = [
    { id: 1, name: 'Tenant A' },
    { id: 2, name: 'Tenant B' },
]

export const mockedPriceboardData = [
    { product_name: 'Product 1', price: 10.99, tenant_id: 1 },
    { product_name: 'Product 2', price: 15.99, tenant_id: 1 },
    { product_name: 'Product 3', price: 8.49, tenant_id: 2 },
    { product_name: 'Product 4', price: 12.99, tenant_id: 2 },
]

export const mockedVehicleData = [
    { id: 1, name: "Mercedes", tenant_id: 1 },
    { id: 2, name: "Porsche", tenant_id: 1 },
    { id: 3, name: "Ferrari", tenant_id: 2 },
    { id: 4, name: "Bugatti", tenant_id: 2 },
]