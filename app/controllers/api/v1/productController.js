// const {Product} = require("../../../models");
const productService = require("../../../services/productService");

module.exports = {
    listAllProduct(req, res) {
        productService
            .listProduct()
            .then((product) => {
                res.render("index", { product });
            });
    },

    // listOwnProduct(req, res){
    //     productService
    //         .listOwnProduct()
    //         .then((product) => {
    //             res.render("index", { product });
    //         });
    // },

    formAdd(req, res) {
        productService
            .list()
            .then((kategori,stat) => {
                console.log("list", kategori)
                res.render("addproduct", { kategori, stat });
            });
    },

    add(req, res) {
        productService
            .create({
                id_kategori: req.body.id_kategori,
                id_status: req.body.id_status,
                nama_product: req.body.nama_product,
                harga: req.body.harga,
                deskripsi: req.body.deskripsi,
                foto: req.file.filename,
            })
            .then((car) => {
                console.log(car);
                res.send(
                    '<script>window.location.href="/";document.getElementById("alert-save").click();</script>'
                );
            })
            .catch((err) => {
                res.status(422).json({
                    status: "FAIL",
                    message: err.message,
                });
            });
    },

    async selectProduct(req, res) {
        // const token = req.cookies.jwt;
        // const pengguna = req.user;
        const id = req.params.id;
        console.log("lihat id", id) 
        const product = await productService.oneProduct({
            id
        })
        console.log("lihat cc", product);
        // console.log("get id", req.params.id);
        // console.log("hasil id", id);

        const coba = await productService.listSize()
        console.log("coba", coba)
        console.log("product", product)
        res.render("edit", { product, coba });
    },

    updateProduct(req, res) {
        const id = req.params;
        productService.updateProduct({ id }, {
            id_kategori: req.body.id_kategori,
            id_status: req.body.id_status,
            nama_product: req.body.nama_product,
            harga: req.body.harga,
            deskripsi: req.body.deskripsi,
            foto: req.file.filename,
        }).then(() => {
            res.redirect("/");
        }).catch(err => {
            res.status(422).json("Can't update Product")
        })
    },

    deleteProduct(req, res) {
        const id = req.params.id;
        console.log("coba lihat id", id)
        productService.deleteProduct({ id }).then(() => {
            res.redirect("/");
        }).catch(err => {
            res.status(422).json("Can't delete Product")
        })
    }

};