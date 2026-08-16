import API_URL from "../config";

const list = async () => {
  try {
    const response = await fetch(`${API_URL}/api/posts`);
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const read = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/posts/${id}`);
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const create = async (post, token) => {
  try {
    const response = await fetch(`${API_URL}/api/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(post),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const update = async (id, post, token) => {
  try {
    const response = await fetch(`${API_URL}/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(post),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const remove = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/api/posts/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export { list, read, create, update, remove };