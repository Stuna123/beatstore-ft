import Product from "../models/Product.js"

// @desc Create product (Admin)
// @route POST /api/products

export const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc Get all products (PUBLIc)
// @route GET /api/products
export const getProducts = async (req, res) => {
    const products = await Product.find();
    res.status(200).json({
        success: true,
        data: products
    });
}

// @desc Get single product
// @route GET /api/products/:id 
export const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(!product) {
        return res.status(404).json({ message: "Le produit est introuvable !" })
    }
    res.status(200).json({
        success: true,
        data: product
    });
}

// @desc Update product (admin)
// @route PUT /api/products/:id

export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if(!product) {
            return res.status(404).json({ message: "Produit introuvable" })
        }

        // Object.assign(product, req.body);
        product.name = req.body.name ?? product.name;
        product.brand = req.body.brand ?? product.brand;
        product.price = req.body.price ?? product.price;
        product.image = req.body.image ?? product.image;

        
        const updatedProduct = await product.save();

        res.json({
            message: "Produit mis à jour",
            data: updatedProduct
        });

    } catch (error) {
        res.status(500).json({ 
            message: "Erreur mise à jour produit",
            error: error.message, 
        })
    }
};

// @desc Delete product (admin)
// @route DELETE /api/products/:id

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        
        if(!product) {
            return res.status(404).json({ message: "Produit introuvable" })
        }

        await product.deleteOne();
        res.json({ message: "Produit supprimé avec succès !" })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}