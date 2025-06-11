import { createClient } from "../database/dbClient";
import { Product } from "../../domain/entities/product.entity";
import { Category } from "../../domain/entities/category.entity";
import { ProductCreateInput } from "../../domain/repositories/product.repository";
import { SecondaryImage } from "../../domain/entities/secondaryImage.entity";
import { Tag } from "../../domain/entities/tag.entity";

// const mapRowToProduct = (row: any): Product => {
//   const category = new Category(
//     row.category_id,
//     row.category_name,
//     row.category_description,
//     row.category_image,
//     row.category_created_at,
//     row.category_updated_at,
//   );

//   const secondary_images = new SecondaryImage(
//     row.secondary_image_id,
//     row.secondary_image,
//     row.secondary_image_created_at,
//     row.secondary_image_updated_at,
//   );

//   const tags = new Tag(
//     row.tag_id,
//     row.tag_name,
//     row.tag_created_at,
//     row.tag_updated_at,
//   );

//   return new Product(
//     row.product_id ?? row.id,
//     row.product_name,
//     category,
//     row.price,
//     row.product_image ?? row.image,
//     [] as SecondaryImage[],
//     [] as Tag[],
//     row.product_description ?? row.description,
//     row.discount_percentage,
//     row.rating,
//     row.sku,
//     row.created_at,
//     row.updated_at,
//   );
// };
const mapRowsToProduct = (rows: any[]): Product => {
  const firstRow = rows[0];

  const category = new Category(
    firstRow.category_id,
    firstRow.category_name,
    firstRow.category_description,
    firstRow.category_image,
    firstRow.category_created_at,
    firstRow.category_updated_at,
  );

  const secondaryImageMap = new Map<number, SecondaryImage>();
  const tagMap = new Map<number, Tag>();

  for (const row of rows) {
    // 處理 Secondary Images
    if (row.secondary_image_id && !secondaryImageMap.has(row.secondary_image_id)) {
      secondaryImageMap.set(
        row.secondary_image_id,
        new SecondaryImage(
          row.secondary_image_id,
          row.secondary_image,
          row.secondary_image_created_at,
          row.secondary_image_updated_at,
        )
      );
    }

    // 處理 Tags
    if (row.tag_id && !tagMap.has(row.tag_id)) {
      tagMap.set(
        row.tag_id,
        new Tag(
          row.tag_id,
          row.tag_name,
          row.tag_created_at,
          row.tag_updated_at,
        )
      );
    }
  }

  return new Product(
    firstRow.product_id ?? firstRow.id,
    firstRow.product_name,
    category,
    firstRow.price,
    firstRow.main_image ?? firstRow.product_image ?? firstRow.image,
    Array.from(secondaryImageMap.values()),
    Array.from(tagMap.values()),
    firstRow.description ?? firstRow.product_description,
    firstRow.discount_percentage,
    firstRow.rating,
    firstRow.sku,
    firstRow.created_at,
    firstRow.updated_at
  );
};


const getAllProducts = async (): Promise<Product[]> => {
  const client = createClient();
  try {
    await client.connect();
    const result = await client.query(`
      SELECT
        product.id AS product_id,
        product.product_name,
        product.price,
        product.main_image,
        product.description,
        product.discount_percentage,
        product.rating,
        product.sku,
        product.created_at,
        product.updated_at,

        category.id AS category_id,
        category.category_name,
        category.description AS category_description,
        category.image AS category_image,
        category.created_at AS category_created_at,
        category.updated_at AS category_updated_at,

        secondary_image.id AS secondary_image_id,
        secondary_image.image AS secondary_image,
        secondary_image.created_at AS secondary_image_created_at,
        secondary_image.updated_at AS secondary_image_updated_at,

        tag.id AS tag_id,
        tag.tag_name,
        tag.created_at AS tag_created_at,
        tag.updated_at AS tag_updated_at

      FROM "product"
      LEFT JOIN "category" ON product.category_id = category.id
      LEFT JOIN "secondary_image" ON product.id = secondary_image.product_id
      LEFT JOIN "product_tag" ON product.id = product_tag.product_id
      LEFT JOIN "tag" ON product_tag.tag_id = tag.id
      ORDER BY product.id ASC
    `);

    const rows = result.rows;

    // 用 Map 分組每個 product
    const productMap = new Map<number, any[]>();

    for (const row of rows) {
      const productId = row.product_id;
      if (!productMap.has(productId)) {
        productMap.set(productId, []);
      }
      productMap.get(productId)!.push(row);
    }

    // 每組 row 呼叫 mapRowsToProduct
    const products: Product[] = [];
    for (const groupRows of productMap.values()) {
      products.push(mapRowsToProduct(groupRows));
    }

    return products;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.end();
  }
};

// get product by id
const getProductById = async (id: number): Promise<Product | null> => {
  const client = createClient();
  try {
    await client.connect();
    const result = await client.query(
      `SELECT
        product.id AS product_id,
        product.product_name,
        product.price,
        product.main_image,
        product.description,
        product.discount_percentage,
        product.rating,
        product.sku,
        product.created_at,
        product.updated_at,

        category.id AS category_id,
        category.category_name,
        category.description AS category_description,
        category.image AS category_image,
        category.created_at AS category_created_at,
        category.updated_at AS category_updated_at,

        secondary_image.id AS secondary_image_id,
        secondary_image.image AS secondary_image,
        secondary_image.created_at AS secondary_image_created_at,
        secondary_image.updated_at AS secondary_image_updated_at,

        tag.id AS tag_id,
        tag.tag_name,
        tag.created_at AS tag_created_at,
        tag.updated_at AS tag_updated_at
        
      FROM product
        LEFT JOIN category ON product.category_id = category.id
        LEFT JOIN secondary_image ON product.id = secondary_image.product_id
        LEFT JOIN product_tag ON product.id = product_tag.product_id
        LEFT JOIN tag ON product_tag.tag_id = tag.id

       WHERE product.id = $1`,
      [id],
    );

    if (result.rows.length === 0) return null;
    return mapRowsToProduct(result.rows);
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.end();
  }
};

// get product by name
const getProductByName = async (
  productName: string,
): Promise<Product | null> => {
  const client = createClient();
  try {
    await client.connect();
    const result = await client.query(
      `SELECT
        product.id AS product_id,
        product.product_name,
        product.price,
        product.main_image,
        product.description,
        product.discount_percentage,
        product.rating,
        product.sku,
        product.created_at,
        product.updated_at,

        category.id AS category_id,
        category.category_name,
        category.description AS category_description,
        category.image AS category_image,
        category.created_at AS category_created_at,
        category.updated_at AS category_updated_at,

        secondary_image.id AS secondary_image_id,
        secondary_image.image AS secondary_image,
        secondary_image.created_at AS secondary_image_created_at,
        secondary_image.updated_at AS secondary_image_updated_at,

        tag.id AS tag_id,
        tag.tag_name,
        tag.created_at AS tag_created_at,
        tag.updated_at AS tag_updated_at
        
      FROM product
        LEFT JOIN category ON product.category_id = category.id
        LEFT JOIN secondary_image ON product.id = secondary_image.product_id
        LEFT JOIN product_tag ON product.id = product_tag.product_id
        LEFT JOIN tag ON product_tag.tag_id = tag.id

       WHERE product.product_name = $1`,
      [productName],
    );
    if (result.rows.length === 0) return null;
    return mapRowsToProduct(result.rows);
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.end();
  }
};

// get products by group category
const getProductsByCategoryId = async (
  categoryId: number,
): Promise<Product[]> => {
  const client = createClient();
  try {
    await client.connect();
    const result = await client.query(
      `SELECT
        product.id AS product_id,
        product.product_name,
        product.price,
        product.main_image,
        product.description,
        product.discount_percentage,
        product.rating,
        product.sku,
        product.created_at,
        product.updated_at,

        category.id AS category_id,
        category.category_name,
        category.description AS category_description,
        category.image AS category_image,
        category.created_at AS category_created_at,
        category.updated_at AS category_updated_at,

        secondary_image.id AS secondary_image_id,
        secondary_image.image AS secondary_image,
        secondary_image.created_at AS secondary_image_created_at,
        secondary_image.updated_at AS secondary_image_updated_at,

        tag.id AS tag_id,
        tag.tag_name,
        tag.created_at AS tag_created_at,
        tag.updated_at AS tag_updated_at
        
      FROM product
        LEFT JOIN category ON product.category_id = category.id
        LEFT JOIN secondary_image ON product.id = secondary_image.product_id
        LEFT JOIN product_tag ON product.id = product_tag.product_id
        LEFT JOIN tag ON product_tag.tag_id = tag.id

       WHERE product.category_id = $1`,
      [categoryId],
    );

    const rows = result.rows;

    // 用 Map 分組每個 product
    const productMap = new Map<number, any[]>();

    for (const row of rows) {
      const productId = row.product_id;
      if (!productMap.has(productId)) {
        productMap.set(productId, []);
      }
      productMap.get(productId)!.push(row);
    }

    // 每組 row 呼叫 mapRowsToProduct
    const products: Product[] = [];
    for (const groupRows of productMap.values()) {
      products.push(mapRowsToProduct(groupRows));
    }

    return products;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.end();
  }
};

// get Product by Tag name
const getProductByTagName = async (tagName: string): Promise<Product[]> => {
  const client = createClient();
  try {
    await client.connect();
    const result = await client.query(`
      SELECT
        product.id AS product_id,
        product.product_name,
        product.price,
        product.main_image,
        product.description,
        product.discount_percentage,
        product.rating,
        product.sku,
        product.created_at,
        product.updated_at,

        category.id AS category_id,
        category.category_name,
        category.description AS category_description,
        category.image AS category_image,
        category.created_at AS category_created_at,
        category.updated_at AS category_updated_at,

        secondary_image.id AS secondary_image_id,
        secondary_image.image AS secondary_image,
        secondary_image.created_at AS secondary_image_created_at,
        secondary_image.updated_at AS secondary_image_updated_at,

        tag.id AS tag_id,
        tag.tag_name,
        tag.created_at AS tag_created_at,
        tag.updated_at AS tag_updated_at

      FROM product
        LEFT JOIN category ON product.category_id = category.id
        LEFT JOIN secondary_image ON product.id = secondary_image.product_id
        LEFT JOIN product_tag ON product.id = product_tag.product_id
        LEFT JOIN tag ON product_tag.tag_id = tag.id

      WHERE tag.tag_name = $1
      ORDER BY product.id ASC
    `, [tagName]);

    const rows = result.rows;

    // 用 Map 分組每個 product
    const productMap = new Map<number, any[]>();

    for (const row of rows) {
      const productId = row.product_id;
      if (!productMap.has(productId)) {
        productMap.set(productId, []);
      }
      productMap.get(productId)!.push(row);
    }

    // 每組 row 呼叫 mapRowsToProduct
    const products: Product[] = [];
    for (const groupRows of productMap.values()) {
      products.push(mapRowsToProduct(groupRows));
    }

    return products;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.end();
  }
};

// create product
const createProduct = async (
  newProduct: ProductCreateInput,
): Promise<Product | null> => {
  const {
    productName,
    categoryId,
    price,
    mainImage,
    description,
    discountPercentage,
    rating,
    sku,
    secondaryImages = [], // array of string image URLs
    tagIds = [],          // array of tag ID numbers
  } = newProduct;

  const client = createClient();
  try {
    await client.connect();

    await client.query('BEGIN');

    // 1. 插入 product
    const result = await client.query(
      `INSERT INTO product (product_name, category_id, price, main_image, description, discount_percentage, rating, sku)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        productName,
        categoryId,
        price,
        mainImage,
        description,
        discountPercentage,
        rating,
        sku,
      ]
    );
    const inserted = result.rows[0];
    if (!inserted) {
      await client.query('ROLLBACK');
      return null;
    }

    const productId = inserted.id;

    // 2. 插入 secondary_images 並建立關聯
    for (const imageUrl of secondaryImages) {
      const imageResult = await client.query(
        `INSERT INTO secondary_image (image) VALUES ($1) RETURNING id`,
        [imageUrl]
      );
      const secondaryImageId = imageResult.rows[0].id;

      await client.query(
        `INSERT INTO product_secondary_image (product_id, secondary_image_id) VALUES ($1, $2)`,
        [productId, secondaryImageId]
      );
    }

    // 3. 建立 tag 關聯（假設 tag 已經存在）
    for (const tagId of tagIds) {
      await client.query(
        `INSERT INTO product_tag (product_id, tag_id) VALUES ($1, $2)`,
        [productId, tagId]
      );
    }

    await client.query('COMMIT');

    // 4. 查詢完整資料（包含 join）後回傳
    const resultWithJoin = await client.query(
      `SELECT
        product.id AS product_id,
        product.product_name,
        product.price,
        product.main_image,
        product.description,
        product.discount_percentage,
        product.rating,
        product.sku,
        product.created_at,
        product.updated_at,

        category.id AS category_id,
        category.category_name,
        category.description AS category_description,
        category.image AS category_image,
        category.created_at AS category_created_at,
        category.updated_at AS category_updated_at,

        secondary_image.id AS secondary_image_id,
        secondary_image.image AS secondary_image,
        secondary_image.created_at AS secondary_image_created_at,
        secondary_image.updated_at AS secondary_image_updated_at,

        tag.id AS tag_id,
        tag.tag_name,
        tag.created_at AS tag_created_at,
        tag.updated_at AS tag_updated_at

      FROM product
        LEFT JOIN category ON product.category_id = category.id
        LEFT JOIN secondary_image ON product.id = secondary_image.product_id
        LEFT JOIN product_tag ON product.id = product_tag.product_id
        LEFT JOIN tag ON product_tag.tag_id = tag.id

      WHERE product.id = $1`,
      [productId]
    );

    const rows = resultWithJoin.rows;
    if (rows.length === 0) return null;

    return mapRowsToProduct(rows);

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Failed to create product:', err);
    throw err;
  } finally {
    await client.end();
  }
};



// edit product by id
const editProduct = async (
  id: number,
  updatedProduct: Partial<ProductCreateInput>,
): Promise<Product | null> => {
  const foundProduct = await getProductById(id);
  if (!foundProduct) return null;

  const client = createClient();
  try {
    await client.connect();
    await client.query("BEGIN");

    const updateData = {
      productName: updatedProduct.productName ?? foundProduct.productName,
      categoryId: updatedProduct.categoryId ?? foundProduct.category.id,
      price: updatedProduct.price ?? foundProduct.price,
      mainImage: updatedProduct.mainImage ?? foundProduct.mainImage,
      description: updatedProduct.description ?? foundProduct.description,
      discountPercentage:
        updatedProduct.discountPercentage ?? foundProduct.discountPercentage,
      rating: updatedProduct.rating ?? foundProduct.rating,
      sku: updatedProduct.sku ?? foundProduct.sku,
    };

    // 1. 更新主 product 欄位
    const result = await client.query(
      `UPDATE product
       SET product_name = $1, category_id = $2, price = $3, main_image = $4,
           description = $5, discount_percentage = $6, rating = $7, sku = $8
       WHERE id = $9
       RETURNING *`,
      [
        updateData.productName,
        updateData.categoryId,
        updateData.price,
        updateData.mainImage,
        updateData.description,
        updateData.discountPercentage,
        updateData.rating,
        updateData.sku,
        id,
      ]
    );

    const updated = result.rows[0];
    if (!updated) {
      await client.query("ROLLBACK");
      return null;
    }

    // 2. 如果 secondaryImages 有傳入，就清空舊的再新增
    if (updatedProduct.secondaryImages) {
      // 先刪掉關聯
      await client.query(
        `DELETE FROM product_secondary_image WHERE product_id = $1`,
        [id]
      );

      for (const imageUrl of updatedProduct.secondaryImages) {
        const imgRes = await client.query(
          `INSERT INTO secondary_image (image) VALUES ($1) RETURNING id`,
          [imageUrl]
        );
        const imgId = imgRes.rows[0].id;

        await client.query(
          `INSERT INTO product_secondary_image (product_id, secondary_image_id) VALUES ($1, $2)`,
          [id, imgId]
        );
      }
    }

    // 3. 如果 tagIds 有傳入，也清掉再重建
    if (updatedProduct.tagIds) {
      await client.query(
        `DELETE FROM product_tag WHERE product_id = $1`,
        [id]
      );

      for (const tagId of updatedProduct.tagIds) {
        await client.query(
          `INSERT INTO product_tag (product_id, tag_id) VALUES ($1, $2)`,
          [id, tagId]
        );
      }
    }

    await client.query("COMMIT");

    // 4. 查詢完整 product 資料，回傳
    const resultWithJoin = await client.query(
      `SELECT
        product.id AS product_id,
        product.product_name,
        product.price,
        product.main_image,
        product.description,
        product.discount_percentage,
        product.rating,
        product.sku,
        product.created_at,
        product.updated_at,

        category.id AS category_id,
        category.category_name,
        category.description AS category_description,
        category.image AS category_image,
        category.created_at AS category_created_at,
        category.updated_at AS category_updated_at,

        secondary_image.id AS secondary_image_id,
        secondary_image.image AS secondary_image,
        secondary_image.created_at AS secondary_image_created_at,
        secondary_image.updated_at AS secondary_image_updated_at,

        tag.id AS tag_id,
        tag.tag_name,
        tag.created_at AS tag_created_at,
        tag.updated_at AS tag_updated_at

      FROM product
        LEFT JOIN category ON product.category_id = category.id
        LEFT JOIN secondary_image ON product.id = secondary_image.product_id
        LEFT JOIN product_tag ON product.id = product_tag.product_id
        LEFT JOIN tag ON product_tag.tag_id = tag.id
        
      WHERE product.id = $1`,
      [id]
    );

    const rows = resultWithJoin.rows;
    if (rows.length === 0) return null;

    return mapRowsToProduct(rows);
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Failed to edit product:", err);
    throw err;
  } finally {
    await client.end();
  }
};


// delete product by id
const deleteProduct = async (id: number): Promise<Product | null> => {
  const existing = await getProductById(id);
  if (!existing) return null;
  const client = createClient();
  try {
    await client.connect();
    await client.query(`DELETE FROM "product" WHERE id = $1`, [id]);
    return existing;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.end();
  }
};



export default {
  getAllProducts,
  getProductById,
  getProductByName,
  getProductsByCategoryId,
  getProductByTagName,
  createProduct,
  editProduct,
  deleteProduct,
};
