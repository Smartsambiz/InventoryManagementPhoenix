const Product = require('../models/productModel');
const sendEmail = require("../configs/mailer");

// Create
exports.createProduct = async (req, res) => {
    console.log("request hits controller");
    try{

        // Handle image
        let imageUrl = null;
        let imageId = null;
        if (req.file) {
            
            imageUrl = req.file.path;      // Cloudinary URL
            imageId = req.file.filename;   // Cloudinary public_id
        }

        // Create product
        const product = await Product.create({
        ...req.body,
        image: imageUrl,
        imageId: imageId,
        });

        // Send email asynchronously so user isn't waiting
        sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: "New Product Created",
        text: `A new product has been added: ${product.name}`,
        html: `
            <h3>New Product Added</h3>
            <p><strong>Name:</strong> ${product.name}</p>
            <p><strong>Price:</strong> $${product.price}</p>
            <p><strong>Description:</strong> ${product.description}</p>
            ${imageUrl ? `<p><img src="${imageUrl}" width="200"/></p>` : ""}
        `,
        }).catch(console.error); // log any errors

        res.status(201).json(product);

        //  // Send email to admin
        // const adminEmail = process.env.ADMIN_EMAIL;

        // const mailOptions = {
        // from: process.env.GMAIL_USER,
        // to: adminEmail,
        // subject: "New Product Created",
        // html: `
        //     <h2>New Product Alert</h2>
        //     <p>A new product has been added to the inventory:</p>
        //     <ul>
        //     <li><strong>Name:</strong> ${product.name}</li>
        //     <li><strong>Price:</strong> ${product.price}</li>
        //     <li><strong>Quantity:</strong> ${product.quantity}</li>
        //     ${
        //         product.image
        //         ? `<li><strong>Image:</strong> <a href="${product.image}">View Image</a></li>`
        //         : ""
        //     }
        //     </ul>
        // `,
        // };

        // transporter.sendMail(mailOptions, (err, info) => {
        // if (err) console.error("Error sending email:", err);
        // else console.log("Email sent:", info.response);
        // });

        
    } catch(error){
        res.status(500).json({error: error.message});
    }
    
};

// Get all
exports.getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
};

// Get one
exports.getProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
};

// Update
exports.updateProduct = async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
};

// Delete
exports.deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
};


