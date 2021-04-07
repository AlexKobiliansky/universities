import React, {useEffect, useState} from 'react';
import InfoLabel from "../components/InfoLabel/InfoLabel";
import DepartmentsList from "../components/DepartmentsList";
import {univerAPI} from "../api/univer";
import {useParams} from 'react-router-dom';
import Spinner from "../components/UI/Spinner";
import ImgLabel from "../components/ImgLabel/ImgLabel";
import Breadcrumb from "../components/UI/Breadcrumb";

function University() {
  const [loading, setLoading] = useState(true);
  const [univer, setUniver] = useState(null);
  const [breadcrumbRoutes, setBreadcrumbRoutes] = useState([]);
  const univerId = useParams().id;



  useEffect(() => {
    univerAPI.getUniver(univerId).then(({data}) => {
      setUniver(data);
      setLoading(false);
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setBreadcrumbRoutes([
      {
        path: '/',
        title: 'Университеты'
      },
      {
        path: `/university/${univer?.id}`,
        title: univer?.title
      }
    ]);
  }, [univer]);

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

  const onEditImg = (url) => {
    univerAPI.editUniver(univerId, {logoUrl: url}).catch(() => {
      alert('Не удалось обновить данные!');
    });
  }

  const onDeleteImg = () => {
    univerAPI.editUniver(univerId, {logoUrl: ''}).catch(() => {
      alert('Не удалось обновить данные!');
    });
  }

  return (
    <>
      {loading
        ? <Spinner />
        : <div>

          <Breadcrumb routes={breadcrumbRoutes} />

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