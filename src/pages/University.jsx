import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from "axios";
import InfoLabel from "../components/InfoLabel/InfoLabel";
import DepartmentsList from "../components/DepartmentsList";

function University() {
  const [univer, setUniver] = useState(null);
  const univerId = useParams().id;

  useEffect(() => {
    axios.get(`http://localhost:3001/universities/${univerId}?embed=departments`).then(({data}) => {
      setUniver(data);
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!univer
        ? 'Загрузка'
        : <div>
          <h1>{univer.title}</h1>
          <div className="row mb">
            <div className="col-md-4 col-lg-3">
              <div className="avatar-wrapper">
                <img
                  src={univer.logoUrl ? univer.logoUrl : 'https://aosa.org/wp-content/uploads/2019/04/image-placeholder-350x350.png'}
                  alt={univer.title}
                />
              </div>
            </div>

            <div className="col-md-8 col-lg-9">
              <div className="info-labels-wrap">
                <InfoLabel title="Название" value={univer.title} />
                <InfoLabel title="Сайт" value={univer.site} />
                <InfoLabel title="Город" value={univer.city} />
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