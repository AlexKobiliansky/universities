import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {disciplinesRoute, mainRoute} from "../config/breadcrumbs";
import {fetchDisciplines} from "../redux/actions/discipline";
import Breadcrumb from "../components/UI/Breadcrumb";
import {Link} from "react-router-dom";
import DisciplinesList from "../components/Disciplines/DisciplinesList";
import {searchQueryDiscipline, setSearchDataDiscipline} from "../redux/reducers/disciplineReducer";
import SearchLabel from "../components/SearchLabel/SearchLabel";
import {wrapToMark} from "../utils";

const breadcrumbs = [mainRoute(), disciplinesRoute()];

function Disciplines() {
  const dispatch = useDispatch();
  const disciplines = useSelector(({discipline}) => discipline.disciplines);
  const {currentUser} = useSelector(({user}) => user);
  const loading = useSelector(({discipline}) => discipline.isLoading);
  const search = useSelector(({discipline}) => discipline.search);
  const searchData = useSelector(({discipline}) => discipline.searchData);
  const [breadcrumbRoutes] = useState(breadcrumbs);

  useEffect(() => {
    dispatch(fetchDisciplines()); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e) => {
    let str = e.target.value.toLowerCase();
    dispatch(searchQueryDiscipline(str));

    const newArr = disciplines.filter(item =>
      item.title.toLowerCase().includes(str)
    )
      .map(item => {
        return {
          ...item,
          title: wrapToMark(item.title, str),
        }
      });

    dispatch(setSearchDataDiscipline(newArr));
  }

  return (
    <>
      <Breadcrumb routes = {breadcrumbRoutes} />
      <h1>Дисциплины</h1>

      <SearchLabel
        placeholder="Поиск по дисциплинам"
        onInput={handleSearch}
        currValue={search}
      />

      <DisciplinesList
        items={search.length > 0 ? searchData : disciplines}
        loading={loading} />

      {currentUser?.priority < 2 && !loading &&
      <div className="add-line">
        <Link to="/add/discipline" className="btn btn-primary">Добавить дисциплину</Link>
      </div>
      }
    </>
  );
}

export default Disciplines;