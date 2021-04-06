import React, {useState} from 'react';
import Badge from "../components/Badge";
import DeleteButton from "../components/DeleteButton";
import Pagination from "../components/Pagination";

let data = [
  {
    "_id": "605e1a337867b020b759fc28",
    "firstName": "Murray",
    "lastName": "Bryan",
    "avatarUrl": "https://source.unsplash.com/random/100x100?6",
    "departmentId": 15
  },
  {
    "_id": "605e1a336f9b8d435813bcea",
    "firstName": "Rowe",
    "lastName": "Arnold",
    "avatarUrl": "https://source.unsplash.com/random/100x100?4",
    "departmentId": 16
  },
  {
    "_id": "605e1a33e8afcd80c44dc12d",
    "firstName": "Riddle",
    "lastName": "Wooten",
    "avatarUrl": "https://source.unsplash.com/random/100x100?10",
    "departmentId": 14
  },
  {
    "_id": "605e1a3374c15a0f7b9f241b",
    "firstName": "Tran",
    "lastName": "Briggs",
    "avatarUrl": "https://source.unsplash.com/random/100x100?1",
    "departmentId": 2
  },
  {
    "_id": "605e1a33ed2297e6c1833747",
    "firstName": "Hendrix",
    "lastName": "Santos",
    "avatarUrl": "https://source.unsplash.com/random/100x100?8",
    "departmentId": 8
  },
  {
    "_id": "605e1a337cad67f5e26ad323",
    "firstName": "Gates",
    "lastName": "Workman",
    "avatarUrl": "https://source.unsplash.com/random/100x100?4",
    "departmentId": 17
  },
  {
    "_id": "605e1a332d0820b84f16e250",
    "firstName": "Rae",
    "lastName": "Mclaughlin",
    "avatarUrl": "https://source.unsplash.com/random/100x100?4",
    "departmentId": 2
  },
  {
    "_id": "605e1a333665dace5cb1b8a3",
    "firstName": "Autumn",
    "lastName": "Paul",
    "avatarUrl": "https://source.unsplash.com/random/100x100?4",
    "departmentId": 2
  },
  {
    "_id": "605e1a3370c4f9d1a34b4326",
    "firstName": "Tamara",
    "lastName": "Gray",
    "avatarUrl": "https://source.unsplash.com/random/100x100?1",
    "departmentId": 17
  },
  {
    "_id": "605e1a3333304aa99185570a",
    "firstName": "Wilkins",
    "lastName": "Orr",
    "avatarUrl": "https://source.unsplash.com/random/100x100?9",
    "departmentId": 5
  },
  {
    "_id": "605e1a338ebae118b5f90ed1",
    "firstName": "Mamie",
    "lastName": "Bell",
    "avatarUrl": "https://source.unsplash.com/random/100x100?8",
    "departmentId": 16
  },
  {
    "_id": "605e1a331709f509cbc5ad03",
    "firstName": "Josephine",
    "lastName": "Le",
    "avatarUrl": "https://source.unsplash.com/random/100x100?6",
    "departmentId": 9
  },
  {
    "_id": "605e1a33e98c95c564eb7cf0",
    "firstName": "Mcintyre",
    "lastName": "Mccray",
    "avatarUrl": "https://source.unsplash.com/random/100x100?2",
    "departmentId": 9
  },
  {
    "_id": "605e1a33e451ff002978d0e6",
    "firstName": "Ruth",
    "lastName": "Dunlap",
    "avatarUrl": "https://source.unsplash.com/random/100x100?2",
    "departmentId": 8
  },
  {
    "_id": "605e1a330dcd06ed2a61b6e7",
    "firstName": "Barber",
    "lastName": "Kramer",
    "avatarUrl": "https://source.unsplash.com/random/100x100?8",
    "departmentId": 17
  },
  {
    "_id": "605e1a3357db9058fd73170e",
    "firstName": "Celeste",
    "lastName": "Compton",
    "avatarUrl": "https://source.unsplash.com/random/100x100?4",
    "departmentId": 8
  },
  {
    "_id": "605e1a337f45a9a49a73b6e4",
    "firstName": "Sexton",
    "lastName": "Strong",
    "avatarUrl": "https://source.unsplash.com/random/100x100?1",
    "departmentId": 6
  },
  {
    "_id": "605e1a3330a36418f4154c6e",
    "firstName": "Rocha",
    "lastName": "Floyd",
    "avatarUrl": "https://source.unsplash.com/random/100x100?9",
    "departmentId": 17
  },
  {
    "_id": "605e1a33d4fef48d8e9e9407",
    "firstName": "Rutledge",
    "lastName": "Warner",
    "avatarUrl": "https://source.unsplash.com/random/100x100?10",
    "departmentId": 12
  },
  {
    "_id": "605e1a33c1dad60fae4b19ee",
    "firstName": "Rosalie",
    "lastName": "Perkins",
    "avatarUrl": "https://source.unsplash.com/random/100x100?3",
    "departmentId": 5
  }
]

function Teachers() {
  let [pageOfItems, setPageOfItems] = useState([]);
  let [teachers] = useState(data);


  let handleClickDelete = (id) => {
    console.log('delete teacher: ', id);
  }



  let onChangePage = (pageOfItems) => {
    setPageOfItems(pageOfItems);
  }

  return (
    <>
      <h1>Список преподавателей</h1>

      <table className="table table-hover table-striped">
        <thead>
        <tr>
          <th scope="col">Фото</th>
          <th scope="col">Имя</th>
          <th scope="col">Факультет</th>
          <th />
        </tr>
        </thead>
        <tbody>

        {pageOfItems?.map(item => (
          <tr key={item._id}>
            <td>
              <Badge
                label={item.firstName.charAt(0)}
                img={item.avatarUrl}
              />
            </td>
            <td className="align-middle">{item.firstName} {item.lastName}</td>
            <td className="align-middle">Название факультета</td>
            <td className="align-middle">
              <DeleteButton onClick={() => handleClickDelete(item._id)}/>
            </td>
          </tr>
        ))
        }
        </tbody>
      </table>

      <Pagination items={teachers} onChangePage={onChangePage} pageSize={10}/>
    </>
  );
}

export default Teachers;