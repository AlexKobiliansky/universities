import React from 'react';
import DeleteButton from "../UI/DeleteButton";
import './departments.sass';

function DepartmentDynamicLabel({name, value, handleChange, handleDelete}) {
  return (
    <div className="department-dynamic">
      <input
        placeholder="Введите название факультета"
        autoFocus
        className="form-control add-univer-dep"
        name={name}
        type="text"
        value={value}
        onChange={handleChange}
      />
      <DeleteButton onClick={() => handleDelete(name)}/>
    </div>
  );
}

export default DepartmentDynamicLabel;