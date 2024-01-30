function buildTenant() {
    return {
        id: 1,
        name: 'tenant1'
    };
}

function buildPriceBoard() {
    return {
        id: 1,
        product_name: 'priceboard1',
        price: 100,
        tenant_id: null
    };
}

function buildVehicle() {
    return {
        id: 1,
        vehicle_name: 'vehicle1',
        tenant_id: null,
        priceboard_id: null
    };
}

module.exports = {
    buildTenant,
    buildPriceBoard,
    buildVehicle
};
