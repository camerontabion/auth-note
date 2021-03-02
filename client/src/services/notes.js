const baseUrl = '/api/notes';

const getAll = async () => {
  const res = await fetch(baseUrl);
  return res.json();
};

const create = async (text) => {
  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });
  return res.json();
};

const remove = async (id) => {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};

const update = async (id, text) => {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });
  return res.json();
};

export default {
  getAll, create, remove, update,
};
