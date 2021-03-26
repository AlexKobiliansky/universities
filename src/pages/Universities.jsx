import React from 'react';

function Universities() {

  let universities = [
    {
      id: 1,
      title: 'Киевский Политехнический Университет',
      city: 'Киев',
      site: 'https://kpi.ua/',
      alias: 'КПИ'
    },
    {
      id: 2,
      title: 'Черкасский Национальный Университет им. Богдана Хмельницкого',
      city: 'Черкассы',
      site: 'https://cdu.edu.ua/',
      alias: 'ЧНУ'
    },
    {
      id: 3,
      title: 'КНУ имени Тараса Шевченко',
      city: 'Киев',
      site: 'http://www.univ.kiev.ua/ru/',
      alias: 'им. Шевченка'
    },
  ]

  return (
    <>
      <h1>Университеты</h1>

      <table className="table table-hover table-striped">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Название</th>
          <th scope="col">Город</th>
          <th scope="col">Сайт</th>
          <th />
        </tr>
        </thead>
        <tbody>

        {universities?.map((item, index) => {
          return (
            <tr key={item.id}>
              <th scope="row">{index+1}</th>
              <td>{item.title}</td>
              <td>{item.city}</td>
              <td><a href={item.site} target="_blank" rel="noreferrer">{item.site}</a></td>
              <td>
                <button type="button" className="close" aria-label="Закрыть">
                  <span aria-hidden="true">&times;</span>
                </button>
              </td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </>
  );
}

export default Universities;