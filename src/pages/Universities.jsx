import React, {useEffect, useState} from 'react';
import UniversitiesList from "../components/UniversitiesList";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Breadcrumb from "../components/UI/Breadcrumb";
import {fetchUniversities} from "../redux/actions/university";
import {mainRoute, universitiesRoute} from "../config/breadcrumbs";

const breadcrumbs = [mainRoute(), universitiesRoute()]

function Universities() {
  const dispatch = useDispatch();
  const universities = useSelector(({university}) => university.universities);
  const {currentUser} = useSelector(({user}) => user);
  const loading = useSelector(({university}) => university.isLoading);

  const [breadcrumbRoutes] = useState(breadcrumbs);

  useEffect( () => {
    dispatch(fetchUniversities()); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Breadcrumb routes = {breadcrumbRoutes} />
      <h1>Университеты</h1>

      {<UniversitiesList items={universities} loading={loading} />}

      {currentUser && currentUser.priority < 2 && !loading &&
        <div className="add-line">
          <Link to="/add/university" className="btn btn-primary">Добавить новый университет</Link>
        </div>
      }
    </>
  );
}

export default Universities;