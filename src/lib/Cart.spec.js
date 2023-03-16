import Cart from './Cart';

describe('Cart', () => {
    let cart;
    let product = {
        title: 'Adidas Running Shoes',
        price: 35388
    }

    let product2 = {
        title: 'Nike Socks',
        price: 41872
    }

    beforeEach(() => {
        cart = new Cart();
    });


    describe('getTotal()', () => {
        it('should return 0 when getTotal() is executed in a newly created instance', () => {
            expect(cart.getTotal().getAmount()).toEqual(0);
        });

        it('should multiply quantity and price and receive the total amount', () => {
            const item = {
                product,
                quantity: 2
            };

            cart.add(item);

            expect(cart.getTotal().getAmount()).toEqual(70776);
        });

        it('should ensure that no more one product exists at a time', () => {
            cart.add({
                product,
                quantity: 2
            });

            cart.add({
                product,
                quantity: 1
            });

            expect(cart.getTotal().getAmount()).toEqual(35388);
        });

        it('should update total when a product gets included and then removed', () => {
            cart.add({
                product,
                quantity: 2
            });

            cart.add({
                product: product2,
                quantity: 1
            });

            cart.remove(product);

            expect(cart.getTotal().getAmount()).toEqual(41872)
        });
    });

    describe('checkout()', () => {
        it('should return an object with the total and the list of items', () => {
            cart.add({
                product,
                quantity: 2
            });

            cart.add({
                product: product2,
                quantity: 1
            });

            expect(cart.checkout()).toMatchSnapshot();
        });

        it('should return an object with the total and the list of items', () => {
            cart.add({
                product,
                quantity: 2
            });

            cart.add({
                product: product2,
                quantity: 1
            });

            expect(cart.summary()).toMatchSnapshot();
            expect(cart.getTotal().getAmount()).toBeGreaterThan(0);
        });

        it('should include formatted amount in the summary', () => {
            cart.add({
                product,
                quantity: 2
            });

            cart.add({
                product: product2,
                quantity: 1
            });

            expect(cart.summary().formatted).toEqual('R$1,126.48');
        });

        it('should reset the cart when checkout() is called', () => {
            cart.add({
                product: product2,
                quantity: 3
            });

            cart.checkout()

            expect(cart.getTotal().getAmount()).toEqual(0);
        });
    });

    describe('special conditions', () => {
        it('should apply percentage discount above certain products quantity', () => {
            const condition = {
                percentage: 30,
                minimum: 2
            };

            cart.add({
                product,
                condition,
                quantity: 3
            });

            expect(cart.getTotal().getAmount()).toEqual(74315);
        });

        it('should not apply percentage discount below certain products quantity', () => {
            const condition = {
                percentage: 30,
                minimum: 4
            };

            cart.add({
                product,
                condition,
                quantity: 3
            });

            expect(cart.getTotal().getAmount()).toEqual(106164);
        });

        it('should apply discount for even quantities', () => {
            const condition = {
                quantity: 2
            };

            cart.add({
                product,
                condition,
                quantity: 4
            });

            expect(cart.getTotal().getAmount()).toEqual(70776);
        });

        it('should apply discount for odd quantities', () => {
            const condition = {
                quantity: 2
            };

            cart.add({
                product,
                condition,
                quantity: 5
            });

            expect(cart.getTotal().getAmount()).toEqual(106164);
        });

        it('should receive multiple discount conditions and apply the one that gives the biggest discount', () => {
            const condition = {
                percentage: 30,
                minimum: 2
            };

            const condition2 = {
                quantity: 2
            };

            cart.add({
                product,
                condition: [condition, condition2],
                quantity: 5
            });

            expect(cart.getTotal().getAmount()).toEqual(106164);
        });

        it('should receive multiple discount conditions and apply the one that gives the biggest discount. Second case.', () => {
            const condition = {
                percentage: 80,
                minimum: 2
            };

            const condition2 = {
                quantity: 2
            };

            cart.add({
                product,
                condition: [condition, condition2],
                quantity: 5
            });

            expect(cart.getTotal().getAmount()).toEqual(35388);
        });
    });
});