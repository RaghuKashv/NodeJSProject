const QUERY = {
    SELECT_RAGHUS: 'SELECT * FROM raghus ORDER BY created_at DESC LIMIT 100',
    SELECT_RAGHU: 'SELECT * FROM raghus WHERE id = ?',
    CREATE_RAGHU: 'INSERT INTO raghus(first_name, last_name, email, address, diagonsis, phone, image_url) VALUES(?, ?, ?, ?, ?, ?, ?)',
    UPDATE_RAGHU: 'UPDATE raghus SET first_name = ?, last_name = ?, email = ?, address = ?, diagnosis = ?, phone = ?, image_url = ? WHERE id = ?',
    DELETE_RAGHU: 'DELETE FROM raghus WHERE id =?'
};

export default QUERY;
