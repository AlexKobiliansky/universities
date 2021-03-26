import React from 'react';
import DeleteButton from "../components/DeleteButton";

function Departments() {

  let departments = [
    {
      id: 1,
      title: 'Инженерно-химический факультет',
      universityId: 1
    },
    {
      id: 2,
      title: 'Приборостроительный факультет',
      universityId: 1
    },
    {
      id: 3,
      title: 'Радиотехнический факультет',
      universityId: 1
    },
    {
      id: 4,
      title: 'Совместный Украинско-немецкий факультет машиностроения',
      universityId: 1
    },
    {
      id: 5,
      title: 'Теплоэнергетический факультет',
      universityId: 1
    },
    {
      id: 6,
      title: 'Факультет биомедицинской инженерии',
      universityId: 1
    },
    {
      id: 7,
      title: 'Факультет биотехнологии и биотехники',
      universityId: 1
    },
    {
      id: 8,
      title: 'Факультет информатики и вычислительной техники',
      universityId: 1
    },
    {
      id: 9,
      title: 'УНИ Экономики и права',
      universityId: 2
    },
    {
      id: 10,
      title: 'УНИ Иностранных языков',
      universityId: 2
    },
    {
      id: 11,
      title: 'УНИ Международных отношений, истории и философии',
      universityId: 2
    },
    {
      id: 12,
      title: 'УНИ Педагогического образования, социальной работы и искусства',
      universityId: 2
    },
    {
      id: 13,
      title: 'УНИ Естественных и аграрных наук',
      universityId: 2
    },
    {
      id: 14,
      title: 'Географический факультет',
      universityId: 3
    },
    {
      id: 15,
      title: 'Факультет информационных технологий',
      universityId: 3
    },
    {
      id: 16,
      title: 'Факультет компьютерных наук и кибернетики',
      universityId: 3
    },
    {
      id: 17,
      title: 'Факультет радиофизики, электроники и компьютерных систем',
      universityId: 3
    },
  ];

  let handleClickDelete = (id) => {
    console.log('delete department: ', id);
  }

  return (
    <>
      <h1>Факультеты</h1>

      <table className="table table-hover table-striped">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Название</th>
          <th scope="col">Университет</th>
          <th />
        </tr>
        </thead>
        <tbody>

        {departments?.map((item, index) => (
            <tr key={item.id}>
              <th scope="row">{index+1}</th>
              <td>{item.title}</td>
              <td>Название Универа</td>
              <td>
                <DeleteButton onClick={() => handleClickDelete(item.id)}/>
              </td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </>
  );
}

export default Departments;