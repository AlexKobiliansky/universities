import React, {useEffect, useState} from 'react';
import InfoLabel from "../components/InfoLabel/InfoLabel";
import DepartmentsList from "../components/DepartmentsList";
import {univerAPI} from "../api/univer";
import {NavLink, useParams} from 'react-router-dom';
import Spinner from "../components/Spinner";
import ImgLabel from "../components/ImgLabel/ImgLabel";

function University() {
  const [loading, setLoading] = useState(true);
  const [univer, setUniver] = useState(null);

  const univerId = useParams().id;

  useEffect(() => {
    univerAPI.getUniver(univerId).then(({data}) => {
      setUniver(data);
      setLoading(false);
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const onEditInput = (inputEntity, value) => {
    if(!value) {
      return alert('Значение не может быть пустым!')
    }

    let updatedUniver = {...univer}
    updatedUniver[inputEntity] = value

    setUniver(updatedUniver)

    univerAPI.editUniver(univerId, {[inputEntity]: value}).catch(() => {
      alert('Не удалось обновить данные!');
    });
  }


  const onEditImg = () => {
    console.log('img changed')
  }

  const onDeleteImg = () => {
    console.log('img deleted')
  }

  return (
    <>
      {loading
        ? <Spinner />
        : <div>

          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><NavLink to="/">Университеты</NavLink></li>
              <li className="breadcrumb-item active" aria-current="page">{univer.title}</li>
            </ol>
          </nav>

          <h1>{univer.title}</h1>
          <div className="row mb">
            <div className="col-md-4 col-lg-3">
              <ImgLabel
                img={univer.logoUrl}
                onEdit={onEditImg}
                onDelete={onDeleteImg}
              />
            </div>

            <div className="col-md-8 col-lg-9">
              <div className="info-labels-wrap">
                <InfoLabel title="Название" value={univer.title} entity="title" onEdit={onEditInput} />
                <InfoLabel title="Сайт" value={univer.site} entity="site" onEdit={onEditInput} />
                <InfoLabel title="Город" value={univer.city} entity="city" onEdit={onEditInput}/>
              </div>
            </div>
          </div>
          <h2>Список факультетов университета:</h2>

          <DepartmentsList items={univer.departments} univer={univer.alias} />
        </div>
      }
    </>
  );
}

export default University;