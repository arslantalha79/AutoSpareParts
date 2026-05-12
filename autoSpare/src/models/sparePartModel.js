class SparePart {
    constructor(id, category_id, model_id, name, sku, description, price, stock_quantity, image_url, is_active, created_date) {
        this.id = id;
        this.category_id = category_id;
        this.model_id = model_id;
        this.name = name;
        this.sku = sku;
        this.description = description;
        this.price = price;
        this.stock_quantity = stock_quantity;
        this.image_url = image_url;
        this.is_active = is_active;
        this.created_date = created_date;
    }
}

module.exports = SparePart;