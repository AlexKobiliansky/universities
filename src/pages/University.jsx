import React, {useEffect, useState} from 'react';
import InfoLabel from "../components/InfoLabel/InfoLabel";
import DepartmentsList from "../components/DepartmentsList";
import {useParams} from 'react-router-dom';
import Spinner from "../components/UI/Spinner";
import ImgLabel from "../components/ImgLabel/ImgLabel";
import Breadcrumb from "../components/UI/Breadcrumb";
import {useDispatch, useSelector} from "react-redux";
import {fetchSingleUniversity, updateSingleUniversity} from "../redux/actions/university";
import {fetchDepartments} from "../redux/actions/department";

function University() {
  const dispatch = useDispatch();
  const univer = useSelector(({university}) => university.currentUniversity);
  const loading = useSelector(({university}) => university.isLoading);
  const departments = useSelector(({department}) => department.departments);

  const [breadcrumbRoutes, setBreadcrumbRoutes] = useState([]);
  const univerId = useParams().id;

  useEffect(() => {
    dispatch(fetchSingleUniversity(univerId));
    dispatch(fetchDepartments(univerId));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [univerId]);

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

    dispatch(updateSingleUniversity(univerId, {[inputEntity]: value}));
  }

  const onEditImg = (url) => {
    dispatch(updateSingleUniversity(univerId, {logoUrl: url}));
  }

  const onDeleteImg = () => {
    dispatch(updateSingleUniversity(univerId, {logoUrl: ''}));
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

          <DepartmentsList items={departments} />
        </div>
      }
    </>
  );
}

export default University;