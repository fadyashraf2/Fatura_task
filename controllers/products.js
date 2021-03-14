const models = require("../models");
exports.getProductsByCategory = async (req, res) => {
  try {
    let data = await models.product_providers.findAndCountAll({
      offset: req.offset,
      limit: req.query.limit,
      include: [
        {
          model: models.product,
          as: "product",
          where: { category_id: req.params.categoryId },
          include: [{ model: models.category, as: "category" }],
        },
        {
          model: models.provider,
        },
      ],
      order: [
        ["price", "asc"],
        ["product_id", "asc"],
      ],
    });

    let pagination_details = { ...res.locals.paginate, count: data.count };
    pagination_details.lastPage = Math.ceil(data.count / req.query.limit);

    res.status(200).json({ products: data.rows, pagination_details });
  } catch (error) {
    res
      .status(400)
      .json({ message: "error while getting data ", error: error.message });
  }
};



/////////////////////////////////////////////////////////
///////////////////////////set unset category//////////// 
///////////////////////////////////////////////////////////
exports.toggleCategory = async (req, res) => {
  try {
    const productId = req.body.productId;
    const categoryId = req.body.categoryId;
    
    // check if product is existed 
    const  product = await models.product.findByPk(productId);
    if (!product) {
      throw new Error("please make sure to enter valid product id ");
    }



    //======================== set or update existing category ===========================//
    if (productId && categoryId) {
      // check if category id is existed
      category = await models.category.findByPk(categoryId);
      if (!category) {
        throw new Error("please make sure to enter valid category id ");
      }
      
      product.category_id = categoryId;


    } else if (productId && !categoryId) {
      //======================== unset  category ===========================//

      product.category_id = null;
    } else {
      throw new Error("please make sure to enter valid data");
    }


    await product.save();
    res.status(200).json({ message: "Product's Category is updated successfuly", product });
  } catch (error) {
    // console.log(error);
    res.status(400).json({
      message: "error while updating category ",
      error: error.message,
    });
  }
};
