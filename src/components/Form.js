import React from 'react';
import Text from '../components/Text'

const Form = ({ putData }) => {
  const submit = (e) => {
    e.preventDefault();
  }

  return (
    <form
      onSubmit={submit}
      className="form"
    >
      <h3 className="boxTitle">Editar respuesta</h3>
      <Text
        submit={submit}
      />
      <button
        type="submit"
        className="btn btn-danger"
        id="my-button"
        onClick={putData}
      >
        Aceptar
      </button>
    </form>
  )
}

export default Form
