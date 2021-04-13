import React, {useEffect, useState} from 'react';
import UniversitiesList from "../components/UniversitiesList";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Breadcrumb from "../components/UI/Breadcrumb";
import {fetchUniversities} from "../redux/actions/university";
import {mainRoute, universitiesRoute} from "../config/breadcrumbs";
import {
  searchQueryUniversity,
  setSearchDataUniversity
} from "../redux/reducers/universityReducer";
import SearchLabel from "../components/SearchLabel/SearchLabel";

const breadcrumbs = [mainRoute(), universitiesRoute()]

function Universities() {
  const dispatch = useDispatch();
  const universities = useSelector(({university}) => university.universities);
  const {currentUser} = useSelector(({user}) => user);
  const loading = useSelector(({university}) => university.isLoading);

  const search = useSelector(({university}) => university.search);
  const searchData = useSelector(({university}) => university.searchData);

  const [breadcrumbRoutes] = useState(breadcrumbs);

  useEffect( () => {
    dispatch(fetchUniversities()); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e) => {
    let str = e.target.value.toLowerCase();
    dispatch(searchQueryUniversity(str));

    const newArr = universities.filter(item =>
      item.title.toLowerCase().includes(str) ||
      item.alias.toLowerCase().includes(str) ||
      item.city.toLocaleLowerCase().includes(str)
    )
      .map(item => {
        let newTitle = item.title.replace(
          new RegExp(str, 'gi'),
          match => `<mark>${match}</mark>`
        );

        let newAlias = item.alias.replace(
          new RegExp(str, 'gi'),
          match => `<mark>${match}</mark>`
        );

        let newCity = item.city.replace(
          new RegExp(str, 'gi'),
          match => `<mark>${match}</mark>`
        );

        return {
          ...item,
          title: newTitle,
          alias: newAlias,
          city: newCity
        }
      });

    dispatch(setSearchDataUniversity(newArr));
  }

  return (
    <>
      <Breadcrumb routes = {breadcrumbRoutes} />
      <h1>Университеты</h1>

      <SearchLabel
        placeholder="Поиск по университетам"
        onInput={handleSearch}
      />

      {<UniversitiesList
        items={search.length > 0 ? searchData : universities}
        loading={loading}
      />}

      {currentUser && currentUser.priority < 2 && !loading &&
      <div className="add-line">
        <Link to="/add/university" className="btn btn-primary">Добавить новый университет</Link>
      </div>
      }
    </>
  );
}

export default Universities;