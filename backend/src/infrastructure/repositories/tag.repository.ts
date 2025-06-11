import { createClient } from "../database/dbClient";
import { Tag } from "../../domain/entities/tag.entity";

const mapRowToTag = (row: any): Tag => {
  return new Tag(
    row.id,
    row.tag_name,
    row.created_at,
    row.updated_at,
  );
};

const getAllTags = async (): Promise<Tag[]> => {
  const client = createClient();
  try {
    await client.connect();
    const result = await client.query(`SELECT * FROM tag`);
    return result.rows.map(mapRowToTag)
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.end();
  }
};

const getTagById = async (id: number): Promise<Tag | null> => {
  const client = createClient();
  try {
    await client.connect();
    const result = await client.query(
      `SELECT * FROM tag WHERE id = $1`, 
      [id]);
    return result.rows[0] ? mapRowToTag(result.rows[0]) : null;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.end();
  }
};

const createTag = async (tagName: string): Promise<Tag> => {
  const client = createClient();
  try {
    await client.connect();
    const result = await client.query(
      `INSERT INTO tag (tag_name) VALUES ($1) RETURNING *`,
      [tagName]
    );
    return mapRowToTag(result.rows[0]);
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.end();
  }
};

const editTag = async (id: number, tagName: string): Promise<Tag | null> => {
  const client = createClient();
  try {
    await client.connect();
    const result = await client.query(
      `UPDATE tag SET tag_name = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
      [tagName, id]
    );
    return result.rows[0] ? mapRowToTag(result.rows[0]) : null;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.end();
  }
};

const removeTagById = async (id: number): Promise<Tag | null> => {
  const client = createClient();
  try {
    await client.connect();
    const result = await client.query(`DELETE FROM tag WHERE id = $1`, [id]);
    return result.rows[0] ? mapRowToTag(result.rows[0]) : null;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.end();
  }
};

export default {
  getAllTags,
  getTagById,
  createTag,
  editTag,
  removeTagById,
};