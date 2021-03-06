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
import {wrapToMark} from "../utils";

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
        return {
          ...item,
          title: wrapToMark(item.title, str),
          alias: wrapToMark(item.alias, str),
          city: wrapToMark(item.city, str)
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
        currValue={search}
      />

      {<UniversitiesList
        items={search.length > 0 ? searchData : universities}
        loading={loading}
      />}

      {currentUser?.priority < 2 && !loading &&
      <div className="add-line">
        <Link to="/add/university" className="btn btn-primary">Добавить новый университет</Link>
      </div>
      }
    </>
  );
}

export default Universities;