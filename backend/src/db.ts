/*
Note: To keep this Challenge small we use static data instead of a real database.
*/

interface Product {
    id: string; //productId
    name: string; //productName
    price: number;
}

interface PurchaseItem {
    product_id: string;
    quantity: number;
    timestamp: number;
}

interface UserPurchases {
    id: string; //userId
    name: string; //userName
    purchases: PurchaseItem[];
}

export class Database {
    private productsCollection: Product[] = [
        {id: '123', name: 'Product 1', price: 22},
        {id: '234', name: 'Product 2', price: 13},
        {id: '345', name: 'Product 3', price: 42},
        {id: '456', name: 'Product 4', price: 34}
    ];
    private userPurchasesCollection: UserPurchases[] = [
        {
            id: 'abc',
            name: 'Gabi',
            purchases: [
                { product_id: '123', quantity: 3, timestamp: 1709285319 },
                { product_id: '456', quantity: 1, timestamp: 1706779719 },
                { product_id: '123', quantity: 1, timestamp: 1706779719 },
                { product_id: '234', quantity: 2, timestamp: 1705224519 }
            ]
        },
        {
            id: 'fgh',
            name: 'Kim',
            purchases: [
                { product_id: '456', quantity: 5, timestamp: 1709112519 },
                { product_id: '123', quantity: 1, timestamp: 1706434119 },
            ]
        },
        {
            id: 'abc',
            name: 'Yasin',
            purchases: [
                { product_id: '456', quantity: 1, timestamp: 1710840519 },
                { product_id: '345', quantity: 1, timestamp: 1708334919 },
                { product_id: '234', quantity: 1, timestamp: 1705915719 }
            ]
        },
    ];

    /**
     * Retrieves a user based on id or a range of users from the collection.
     * @param {string} [id="-1"] - The unique identifier of the user. Default is -1, indicating undefined.
     * @param {number} [from=-1] - Starting index of the user range. Default is -1, indicating undefined.
     * @param {number} [to=-1] - Ending index of the user range. Default is -1, indicating undefined.
     * @returns {Array} - An array of formatted user DTOs within the specified range.
     */
    public getUsers(id: string = "-1", from: number = -1, to: number = -1): Array<any>{
        let users = []

        // Retrieves a user with id
        if(id !== "-1") users = [this.userPurchasesCollection.find((el: UserPurchases) => el.id === id)];

        // Retrieves users array and shortens it with from and to
        else if (from !== -1 && to !== -1 && from <= to) users = this.userPurchasesCollection.slice(from, to + 1);

        // Retrieves all users
        else users = this.userPurchasesCollection;

       return users.map(user => this.mapToUserDTO(user));
    }

    /**
     * Fetches purchase history for a specific user.
     * @param {string} id - The unique identifier of the user.
     * @returns {Array} - An array of purchase DTOs for the specified user, or undefined if user is not found.
     */
    public getUserPurchases(id: string): Array<any> {
        const user = this.userPurchasesCollection.find((el: UserPurchases) => el.id === id);
        if(user)
            return user.purchases.map(purchase =>
                this.mapToPurchaseDTO(
                    purchase,
                    this.productsCollection.find((el: Product) => el.id === purchase.product_id)
                )
            )
    }

    /**
     * Updates the name of a specified user.
     * @param {string} id - The unique identifier of the user to update.
     * @param {string} newName - The new name to assign to the user.
     */
    public updateUserName(id: string, newName: string) {
        const user = this.userPurchasesCollection.find((el: UserPurchases) => el.id === id);
        if (user) user.name = newName;
    }

    /**
     * Converts a user object to a user Data Transfer Object.
     * @param {UserPurchases} user - The user object to convert.
     * @returns {{id: string, name: string, score: number}} - A user DTO containing the id, name, and score of the user.
     * @private
     */
    private mapToUserDTO(user: UserPurchases): { id: string; name: string; score: number; }{
        return {
            id: user.id,
            name: user.name,
            score: user.purchases.reduce((acc, purchase) =>
                acc +
                (this.productsCollection.find(product => product.id === purchase.product_id)?.price || 0) * purchase.quantity, 0
            )
        }
    }

    /**
     * Converts a purchase item to a purchase Data Transfer Object.
     * @param {PurchaseItem} purchaseItem - The purchase item to convert.
     * @param {Product} product - The product associated with the purchase item.
     * @returns {{product_id: string, product_name: string, price: number, purchased_quantity: number, purchase_date: number}} - A purchase DTO containing detailed information about the product purchase.
     * @private
     */
    private mapToPurchaseDTO(purchaseItem: PurchaseItem, product: Product): { product_id: string; product_name: string; price: number; purchased_quantity: number; purchase_date: number; }{
        return {
            product_id: product.id,
            product_name: product.name,
            price: product.price,
            purchased_quantity: purchaseItem.quantity,
            purchase_date: purchaseItem.timestamp
        }
    }
}