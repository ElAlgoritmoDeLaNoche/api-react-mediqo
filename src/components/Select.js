import React from 'react';

const Select = ({ putData2 }) => {

  const submit = (e) => {
    e.preventDefault();
  }

  return (
    <form
      className="form2"
      onSubmit={submit}
    >
      <h3 className="boxTitle">Editar respuesta</h3>
      <select id="prueba-2" required>
        <option value="">Seleccionar</option>
        <option value="masculino">Masculino</option>
        <option value="femenino">Femenino</option>
        <option value="otro">Otro</option>
      </select>
      <button
        id="my-button"
        type="submit"
        className="btn btn-danger"
        onClick={putData2}
      >
        Aceptar
      </button>
    </form>
  )
}

export default Select
