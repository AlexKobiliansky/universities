import React, {useState} from 'react';
import DeleteButton from "../components/DeleteButton";
import Pagination from "../components/Pagination";
import Badge from "../components/Badge";

let students = [
  {
    "_id": "605e1706703d97364db4c726",
    "firstName": "Baker",
    "lastName": "Dunlap",
    "avatarUrl": "https://source.unsplash.com/random/100x100?10",
    "email": "baker.dunlap@google.io",
    "phone": "+38 (900) 491-2260",
    "departmentId": 8
  },
  {
    "_id": "605e170682a53fa779e9c63c",
    "firstName": "Fanny",
    "lastName": "Leach",
    "avatarUrl": "https://source.unsplash.com/random/100x100?6",
    "email": "fanny.leach@google.biz",
    "phone": "+38 (981) 458-2484",
    "departmentId": 8
  },
  {
    "_id": "605e1706b038d878f0010e0a",
    "firstName": "Wade",
    "lastName": "Cleveland",
    "avatarUrl": "",
    "email": "wade.cleveland@google.us",
    "phone": "+38 (902) 486-2795",
    "departmentId": 2
  },
  {
    "_id": "605e1706514315cf8a9b98a0",
    "firstName": "Patti",
    "lastName": "Jenkins",
    "avatarUrl": "https://source.unsplash.com/random/100x100?1",
    "email": "patti.jenkins@google.biz",
    "phone": "+38 (831) 560-3936",
    "departmentId": 10
  },
  {
    "_id": "605e17067c29b8bc1a94bb6b",
    "firstName": "Lidia",
    "lastName": "Jordan",
    "avatarUrl": "https://source.unsplash.com/random/100x100?9",
    "email": "lidia.jordan@google.com",
    "phone": "+38 (986) 557-3999",
    "departmentId": 14
  },
  {
    "_id": "605e1706444603ddac55cad8",
    "firstName": "Ruth",
    "lastName": "Gallagher",
    "avatarUrl": "",
    "email": "ruth.gallagher@google.tv",
    "phone": "+38 (976) 437-2276",
    "departmentId": 9
  },
  {
    "_id": "605e170674b624f381b90587",
    "firstName": "Evangeline",
    "lastName": "Randall",
    "avatarUrl": "https://source.unsplash.com/random/100x100?2",
    "email": "evangeline.randall@google.org",
    "phone": "+38 (824) 482-3686",
    "departmentId": 4
  },
  {
    "_id": "605e17064826aa0fd359d343",
    "firstName": "Sheena",
    "lastName": "Bradley",
    "avatarUrl": "https://source.unsplash.com/random/100x100?3",
    "email": "sheena.bradley@google.name",
    "phone": "+38 (929) 435-3007",
    "departmentId": 8
  },
  {
    "_id": "605e170650338fc168cc4724",
    "firstName": "Gallagher",
    "lastName": "Sargent",
    "avatarUrl": "https://source.unsplash.com/random/100x100?1",
    "email": "gallagher.sargent@google.net",
    "phone": "+38 (869) 438-2813",
    "departmentId": 2
  },
  {
    "_id": "605e17063a5e6f23b44ace7d",
    "firstName": "Carol",
    "lastName": "Duffy",
    "avatarUrl": "https://source.unsplash.com/random/100x100?4",
    "email": "carol.duffy@google.ca",
    "phone": "+38 (813) 417-3067",
    "departmentId": 2
  },
  {
    "_id": "605e1706556b3f51bf99118c",
    "firstName": "Sondra",
    "lastName": "Estes",
    "avatarUrl": "https://source.unsplash.com/random/100x100?6",
    "email": "sondra.estes@google.info",
    "phone": "+38 (841) 516-2612",
    "departmentId": 18
  },
  {
    "_id": "605e1706c4683142cb2ef7d1",
    "firstName": "Justine",
    "lastName": "Yates",
    "avatarUrl": "https://source.unsplash.com/random/100x100?8",
    "email": "justine.yates@google.me",
    "phone": "+38 (839) 600-2254",
    "departmentId": 3
  },
  {
    "_id": "605e1706d1b094da99e45c7e",
    "firstName": "Johnnie",
    "lastName": "Silva",
    "avatarUrl": "https://source.unsplash.com/random/100x100?6",
    "email": "johnnie.silva@google.io",
    "phone": "+38 (916) 507-3181",
    "departmentId": 13
  },
  {
    "_id": "605e17069f25521135bf39d0",
    "firstName": "Mona",
    "lastName": "Hubbard",
    "avatarUrl": "https://source.unsplash.com/random/100x100?4",
    "email": "mona.hubbard@google.biz",
    "phone": "+38 (916) 583-3465",
    "departmentId": 17
  },
  {
    "_id": "605e1706d2d0153db1e3c5b1",
    "firstName": "Alfreda",
    "lastName": "Goodwin",
    "avatarUrl": "https://source.unsplash.com/random/100x100?9",
    "email": "alfreda.goodwin@google.us",
    "phone": "+38 (978) 467-2525",
    "departmentId": 19
  },
  {
    "_id": "605e17062a187db43711a40a",
    "firstName": "Clayton",
    "lastName": "Gentry",
    "avatarUrl": "https://source.unsplash.com/random/100x100?8",
    "email": "clayton.gentry@google.biz",
    "phone": "+38 (933) 500-3079",
    "departmentId": 15
  },
  {
    "_id": "605e1706ac802d8db28cc3c9",
    "firstName": "Barbra",
    "lastName": "Key",
    "avatarUrl": "https://source.unsplash.com/random/100x100?1",
    "email": "barbra.key@google.com",
    "phone": "+38 (955) 443-3104",
    "departmentId": 19
  },
  {
    "_id": "605e170644ae4e53c2a04c31",
    "firstName": "Annette",
    "lastName": "Butler",
    "avatarUrl": "https://source.unsplash.com/random/100x100?10",
    "email": "annette.butler@google.tv",
    "phone": "+38 (907) 455-2523",
    "departmentId": 16
  },
  {
    "_id": "605e170696430390e9ccdcd0",
    "firstName": "Nadine",
    "lastName": "Cochran",
    "avatarUrl": "https://source.unsplash.com/random/100x100?4",
    "email": "nadine.cochran@google.org",
    "phone": "+38 (845) 411-2020",
    "departmentId": 1
  },
  {
    "_id": "605e1706e5346f94cbaed2e0",
    "firstName": "Kara",
    "lastName": "Austin",
    "avatarUrl": "https://source.unsplash.com/random/100x100?8",
    "email": "kara.austin@google.name",
    "phone": "+38 (820) 511-2229",
    "departmentId": 13
  },
  {
    "_id": "605e17069e87a0cc8e5a2363",
    "firstName": "Rowland",
    "lastName": "Harrell",
    "avatarUrl": "https://source.unsplash.com/random/100x100?2",
    "email": "rowland.harrell@google.net",
    "phone": "+38 (923) 405-3434",
    "departmentId": 13
  },
  {
    "_id": "605e1706db2cc4bd348abe26",
    "firstName": "Margarita",
    "lastName": "Owen",
    "avatarUrl": "https://source.unsplash.com/random/100x100?7",
    "email": "margarita.owen@google.ca",
    "phone": "+38 (921) 524-3160",
    "departmentId": 19
  },
  {
    "_id": "605e1706ae82fe543353942f",
    "firstName": "Alexander",
    "lastName": "Green",
    "avatarUrl": "https://source.unsplash.com/random/100x100?4",
    "email": "alexander.green@google.info",
    "phone": "+38 (874) 517-3571",
    "departmentId": 14
  },
  {
    "_id": "605e1706eeee620a00dac819",
    "firstName": "Guy",
    "lastName": "Guerra",
    "avatarUrl": "https://source.unsplash.com/random/100x100?7",
    "email": "guy.guerra@google.me",
    "phone": "+38 (959) 524-3244",
    "departmentId": 16
  },
  {
    "_id": "605e1706997128c5f0908c9a",
    "firstName": "Vasquez",
    "lastName": "Holland",
    "avatarUrl": "https://source.unsplash.com/random/100x100?6",
    "email": "vasquez.holland@google.io",
    "phone": "+38 (874) 537-2453",
    "departmentId": 5
  },
  {
    "_id": "605e1706fe522827e2e6d1d0",
    "firstName": "Lott",
    "lastName": "Patel",
    "avatarUrl": "https://source.unsplash.com/random/100x100?5",
    "email": "lott.patel@google.biz",
    "phone": "+38 (816) 471-2737",
    "departmentId": 10
  },
  {
    "_id": "605e170616512beafe035b88",
    "firstName": "Tyson",
    "lastName": "Bauer",
    "avatarUrl": "https://source.unsplash.com/random/100x100?1",
    "email": "tyson.bauer@google.us",
    "phone": "+38 (920) 518-2008",
    "departmentId": 6
  },
  {
    "_id": "605e1706b823d8d8dcb40536",
    "firstName": "Rush",
    "lastName": "Juarez",
    "avatarUrl": "https://source.unsplash.com/random/100x100?9",
    "email": "rush.juarez@google.biz",
    "phone": "+38 (967) 464-3598",
    "departmentId": 9
  },
  {
    "_id": "605e1706cebc868172412c48",
    "firstName": "Woodward",
    "lastName": "Campos",
    "avatarUrl": "https://source.unsplash.com/random/100x100?1",
    "email": "woodward.campos@google.com",
    "phone": "+38 (971) 449-3391",
    "departmentId": 3
  },
  {
    "_id": "605e1706e9d63eff28bb2a62",
    "firstName": "Nicole",
    "lastName": "Hester",
    "avatarUrl": "https://source.unsplash.com/random/100x100?1",
    "email": "nicole.hester@google.tv",
    "phone": "+38 (987) 487-3047",
    "departmentId": 5
  },
  {
    "_id": "605e170660814c75bb39be76",
    "firstName": "Erica",
    "lastName": "Reed",
    "avatarUrl": "https://source.unsplash.com/random/100x100?2",
    "email": "erica.reed@google.org",
    "phone": "+38 (829) 452-3758",
    "departmentId": 15
  },
  {
    "_id": "605e17060c374523c6cfb93a",
    "firstName": "Shelby",
    "lastName": "White",
    "avatarUrl": "https://source.unsplash.com/random/100x100?4",
    "email": "shelby.white@google.name",
    "phone": "+38 (868) 476-2353",
    "departmentId": 15
  },
  {
    "_id": "605e17060f83793d0080a840",
    "firstName": "Isabel",
    "lastName": "Huber",
    "avatarUrl": "https://source.unsplash.com/random/100x100?9",
    "email": "isabel.huber@google.net",
    "phone": "+38 (812) 446-3260",
    "departmentId": 10
  }
]

function Students() {

  let handleClickDelete = (id) => {
    console.log('delete student: ', id);
  }

  let [pageOfItems, setPageOfItems] = useState([]);

  let onChangePage = (pageOfItems) => {
    setPageOfItems(pageOfItems);
  }

  return (
    <>
      <h1>Список студентов</h1>

      <table className="table table-hover table-striped">
        <thead>
        <tr>
          <th scope="col">Фото</th>
          <th scope="col">Имя</th>
          <th scope="col">E-mail</th>
          <th scope="col">Телефон</th>
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
            <td className="align-middle">{item.email && <a href={`mailto:${item.email}`}>{item.email}</a>}</td>
            <td className="align-middle">{item.phone && <a href={`tel:${item.email}`}>{item.phone}</a>}</td>
            <td className="align-middle">Название факультета</td>
            <td className="align-middle">
              <DeleteButton onClick={() => handleClickDelete(item._id)}/>
            </td>
          </tr>
        ))
        }
        </tbody>
      </table>

      <Pagination items={students} onChangePage={onChangePage} pageSize={10}/>
    </>
  );
}

export default Students;