import { createClient } from "../database/dbClient";
import { SecondaryImage } from "../../domain/entities/secondaryImage.entity";

const mapRowToSecondaryImage = (row: any): SecondaryImage => {
  return new SecondaryImage(
    row.id,
    row.image,
    row.created_at,
    row.updated_at,
  );
};

const getAllSecondaryImages = async (): Promise<SecondaryImage[]> => {
  const client = createClient();
  try {
    await client.connect();
    const result = await client.query(`SELECT * FROM secondary_image`);
    return result.rows.map(mapRowToSecondaryImage);
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.end();
  }
};

const getSecondaryImageById = async (id: number): Promise<SecondaryImage | null> => {
  const client = createClient();
  try {
    await client.connect();
    const result = await client.query(`SELECT * FROM secondary_image WHERE id = $1`, [id]);
    return result.rows[0] ? mapRowToSecondaryImage(result.rows[0]) : null;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.end();
  }
};

const createSecondaryImage = async (
  data: Omit<SecondaryImage, 'id' | 'createdAt' | 'updatedAt'>
): Promise<SecondaryImage | null> => {
  const client = createClient();
  try {
    await client.connect();
    const result = await client.query(
      `INSERT INTO secondary_image (image) VALUES ($1) RETURNING *`,
      [data.image]
    );
    return mapRowToSecondaryImage(result.rows[0]);
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.end();
  }
};

const removeSecondaryImageById = async (id: number): Promise<SecondaryImage | null> => {
  const client = createClient();
  try {
    await client.connect();
    const result = await client.query(
      `DELETE FROM secondary_image WHERE id = $1 RETURNING *`,
      [id]
    );
    return result.rows[0] ? mapRowToSecondaryImage(result.rows[0]) : null;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.end();
  }
};

export default {
  getAllSecondaryImages,
  getSecondaryImageById,
  createSecondaryImage,
  removeSecondaryImageById
}
