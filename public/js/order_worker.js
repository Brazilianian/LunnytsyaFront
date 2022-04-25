export function getOrder() {
    let order = JSON.parse(localStorage.getItem('order'));
    if (order === null) {
        order = {
            orderedProducts: []
        };
    }
    return order;
}

export function saveOrder(order) {
    localStorage.setItem('order', JSON.stringify(order));
    return order;
}

export function isProductPresentInOrder(product) {
    let order = getOrder();

   return order.orderedProducts.some(op => op.product.id === product.id)
}

export function addToOrder(product) {
    let order = getOrder();

    let orderedProduct = {
        product: {
            id: product.id
        },
        count: 1,
    };

    if (!isProductPresentInOrder(product)) {
        order.orderedProducts[order.orderedProducts.length] = orderedProduct;
    }

    return saveOrder(order);
}

export function removeFromOrder(product) {
    let order = getOrder();
    order.orderedProducts = order.orderedProducts.filter(orderedProduct => orderedProduct.product.id !== product.id);
    return saveOrder(order);
}