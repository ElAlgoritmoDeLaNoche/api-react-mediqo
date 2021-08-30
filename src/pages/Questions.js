import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from '../components/Form';
import Select from '../components/Select'
import { FormClass } from '../config/FormClass';

const View = () => {
  const [data, setData] = useState({});
  
  const apiUrl = 'https://ike-colombia-test.mediqo.com/appointments/14f29e3d924f4df2b3ade1cf14e1c114/answers';

  const getData = () => {
    axios.get(apiUrl)
      .then((res) => setData(res.data.objects))
      .catch((error) => alert(error))
  }

  useEffect(() => {
    getData();
  }, []);

  const getId = (e) => {
    const id = e.target.value;
    return id;
  }

  const edit2 = (e) => {
    const prueba = document.getElementById("prueba-2");
    prueba.setAttribute('className', getId(e));
    document.getElementsByClassName('form2')[0].style.display = "block";
    document.getElementsByClassName('form')[0].style.display = "none";
    document.getElementsByClassName('form-container')[0].style.display = "block"
  }

  const edit = (e) => {
    const prueba = document.getElementById("prueba");
    prueba.setAttribute('className', getId(e));
    document.getElementsByClassName('form')[0].style.display = "block";
    document.getElementsByClassName('form2')[0].style.display = "none";
    document.getElementsByClassName('form-container')[0].style.display = "block"
  }

  const putData = () => {
    const p = document.getElementById('prueba')
    const attr = p.getAttribute('className');
    const lectura = p.value;
    const update = new FormClass(attr, lectura)
    axios.put(apiUrl, update)
      .then(() => getData())
      .catch(err => console.log(err))
    document.getElementsByClassName('form')[0].style.display = "none";
    document.getElementsByClassName('form-container')[0].style.display = "none"
  }

  const putData2 = () => {
    const p = document.getElementById('prueba-2')
    const attr = p.getAttribute('className');
    const lectura = p.value;
    const update = new FormClass(attr, lectura)
    axios.put(apiUrl, update)
      .then(() => getData())
      .catch(err => console.log(err))
    document.getElementsByClassName('form2')[0].style.display = "none";
    document.getElementsByClassName('form-container')[0].style.display = "none"
  }

  return (
    <div className="container">
      <div className="form-container">
        <Form
          putData={putData}
        />
        <Select
          putData2={putData2}
          getData={getData}
        />
      </div>
      <div className="row justify-content-center my-row">
        <div className="col-12">
          {data
            ? Object.keys(data).map(i => {
              if (data[i].question.responseType === 1) {
                return <div
                  key={data[i].id}
                  id={data[i].id}
                  className="mb-3"
                >
                  <div className="con">
                    <h3>{[i]} : {data[i].question.content}</h3>
                    <button
                      value={data[i].id}
                      type="submit"
                      className="btn btn-danger"
                      onClick={edit2}>
                      Editar
                    </button>
                  </div>
                  <p className="res">Respuesta : <span className="data">{data[i].content}</span></p>
                  <hr />
                </div>
              } else if (data[i].question.content === "ANAMNESIS ALIMENTARIA") {
                return <h2
                  key={data[i].id}
                  className="h2"
                >
                  {data[i].question.content}
                </h2>
              } else if (data[i].content) {
                return <div
                  key={data[i].id}
                  id={data[i].id}
                  className="mb-3"
                >
                <div className="con">
                  <h3>{[i]} : {data[i].question.content}</h3>
                    <button
                      value={data[i].id}
                      type="submit"
                      className="btn btn-danger"
                      onClick={edit}>
                      Editar
                    </button>
                </div>
                  <p className="res">Respuesta : <span className="data">{data[i].content}</span></p>
                  <hr />
                </div>
              } else if (!data[i].content) {
                return <div
                  key={data[i].id}
                  id={data[i].id}
                  className="mb-3"
                >
                  <h3>{[i]}: {data[i].question.content}</h3>
                  <p>Agregue respuesta</p>
                  <button
                    value={data[i].id}
                    type="submit"
                    className="btn btn-primary"
                    onClick={edit}>
                    Agregar Respuesta
                  </button>
                </div>

              }
              return null;
            })
            : null
          }
        </div>
      </div>

    </div>
  )
}

export default View
