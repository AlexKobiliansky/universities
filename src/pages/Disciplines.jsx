import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {disciplinesRoute, mainRoute} from "../config/breadcrumbs";
import {fetchDisciplines} from "../redux/actions/discipline";
import Breadcrumb from "../components/UI/Breadcrumb";
import {Link} from "react-router-dom";
import DisciplinesList from "../components/Disciplines/DisciplinesList";

const breadcrumbs = [mainRoute(), disciplinesRoute()];

function Disciplines() {
  const dispatch = useDispatch();
  const disciplines = useSelector(({discipline}) => discipline.disciplines);
  const {currentUser} = useSelector(({user}) => user);
  const loading = useSelector(({discipline}) => discipline.isLoading);
  const [breadcrumbRoutes] = useState(breadcrumbs);

  useEffect(() => {
    dispatch(fetchDisciplines()); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Breadcrumb routes = {breadcrumbRoutes} />
      <h1>Дисциплины</h1>

      <DisciplinesList items={disciplines} loading={loading} />

      {currentUser?.priority < 2 && !loading &&
      <div className="add-line">
        <Link to="/add/discipline" className="btn btn-primary">Добавить дисциплину</Link>
      </div>
      }
    </>
  );
}

export default Disciplines;