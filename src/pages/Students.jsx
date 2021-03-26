import React, {useState} from 'react';
import DeleteButton from "../components/DeleteButton";
import Pagination from "../components/Pagination";

let students = [
  {
    "_id": "605def59bc0c254f5ac05671",
    "firstName": "Roberson",
    "lastName": "Shepherd",
    "email": "roberson.shepherd@google.com",
    "phone": "+38 (852) 579-2803",
    "departmentId": 7
  },
  {
    "_id": "605def59d824a9ac5c55f710",
    "firstName": "Wyatt",
    "lastName": "Goodwin",
    "email": "wyatt.goodwin@google.net",
    "phone": "+38 (874) 451-3830",
    "departmentId": 5
  },
  {
    "_id": "605def59b989051dcd5159a8",
    "firstName": "Washington",
    "lastName": "Stuart",
    "email": "washington.stuart@google.biz",
    "phone": "+38 (875) 591-3158",
    "departmentId": 16
  },
  {
    "_id": "605def59ce5f485791a8088d",
    "firstName": "Cantrell",
    "lastName": "Spencer",
    "email": "cantrell.spencer@google.name",
    "phone": "+38 (842) 560-3888",
    "departmentId": 17
  },
  {
    "_id": "605def594274eba18f0b2f1a",
    "firstName": "Knapp",
    "lastName": "Rowland",
    "email": "knapp.rowland@google.tv",
    "phone": "+38 (956) 523-2941",
    "departmentId": 11
  },
  {
    "_id": "605def59ae2cae647c129974",
    "firstName": "Selena",
    "lastName": "Mendoza",
    "email": "selena.mendoza@google.biz",
    "phone": "+38 (976) 590-3530",
    "departmentId": 3
  },
  {
    "_id": "605def59a48529a4e7f7d382",
    "firstName": "Cohen",
    "lastName": "Buck",
    "email": "cohen.buck@google.info",
    "phone": "+38 (831) 560-2743",
    "departmentId": 5
  },
  {
    "_id": "605def59e2d5a8667f8ec3cd",
    "firstName": "Hahn",
    "lastName": "Hendrix",
    "email": "hahn.hendrix@google.org",
    "phone": "+38 (842) 479-2910",
    "departmentId": 6
  },
  {
    "_id": "605def593e62f4ba4cb10f9c",
    "firstName": "Rhodes",
    "lastName": "Mack",
    "email": "rhodes.mack@google.ca",
    "phone": "+38 (844) 536-2617",
    "departmentId": 13
  },
  {
    "_id": "605def59e9ee616fbf32e8d9",
    "firstName": "Ingrid",
    "lastName": "Sanford",
    "email": "ingrid.sanford@google.io",
    "phone": "+38 (866) 543-2016",
    "departmentId": 10
  },
  {
    "_id": "605def59c69d89512941a1a2",
    "firstName": "Amelia",
    "lastName": "Peterson",
    "email": "amelia.peterson@google.me",
    "phone": "+38 (839) 495-2567",
    "departmentId": 3
  },
  {
    "_id": "605def59f05a0b4a2f418e21",
    "firstName": "Samantha",
    "lastName": "Hubbard",
    "email": "samantha.hubbard@google.us",
    "phone": "+38 (841) 433-3470",
    "departmentId": 19
  },
  {
    "_id": "605def5995aa5949e64f4669",
    "firstName": "Julianne",
    "lastName": "Medina",
    "email": "julianne.medina@google.com",
    "phone": "+38 (926) 523-3893",
    "departmentId": 14
  },
  {
    "_id": "605def59ff5fe587064d3cc0",
    "firstName": "Bernadine",
    "lastName": "Buckley",
    "email": "bernadine.buckley@google.net",
    "phone": "+38 (808) 407-2688",
    "departmentId": 5
  },
  {
    "_id": "605def59d98f66d2c8f5afb7",
    "firstName": "Craig",
    "lastName": "Dawson",
    "email": "craig.dawson@google.biz",
    "phone": "+38 (871) 470-3241",
    "departmentId": 18
  },
  {
    "_id": "605def59089a4434a93a8bec",
    "firstName": "Casey",
    "lastName": "Logan",
    "email": "casey.logan@google.name",
    "phone": "+38 (879) 406-2581",
    "departmentId": 19
  },
  {
    "_id": "605def59ad3b7001fdbdef4d",
    "firstName": "Nettie",
    "lastName": "Hebert",
    "email": "nettie.hebert@google.tv",
    "phone": "+38 (859) 526-3906",
    "departmentId": 9
  },
  {
    "_id": "605def59e9d9ae765972dfdc",
    "firstName": "Juarez",
    "lastName": "Gross",
    "email": "juarez.gross@google.biz",
    "phone": "+38 (922) 511-3453",
    "departmentId": 10
  },
  {
    "_id": "605def5985deef0be6cd1223",
    "firstName": "Fitzpatrick",
    "lastName": "Duffy",
    "email": "fitzpatrick.duffy@google.info",
    "phone": "+38 (905) 520-3663",
    "departmentId": 1
  },
  {
    "_id": "605def59364df2467c71fe41",
    "firstName": "Oneil",
    "lastName": "Johns",
    "email": "oneil.johns@google.org",
    "phone": "+38 (974) 571-2564",
    "departmentId": 1
  },
  {
    "_id": "605def5953b0775d07f42712",
    "firstName": "Cochran",
    "lastName": "Santiago",
    "email": "cochran.santiago@google.ca",
    "phone": "+38 (835) 425-2083",
    "departmentId": 10
  },
  {
    "_id": "605def59c40c1db630262a28",
    "firstName": "Cassie",
    "lastName": "Snow",
    "email": "cassie.snow@google.io",
    "phone": "+38 (946) 559-3004",
    "departmentId": 16
  },
  {
    "_id": "605def59a73c173257ce15dc",
    "firstName": "Alexander",
    "lastName": "Lawson",
    "email": "alexander.lawson@google.me",
    "phone": "+38 (939) 401-3250",
    "departmentId": 15
  },
  {
    "_id": "605def59dd75be9fa566e42e",
    "firstName": "Effie",
    "lastName": "Glover",
    "email": "effie.glover@google.us",
    "phone": "+38 (850) 466-2255",
    "departmentId": 16
  },
  {
    "_id": "605def59bd254267f1d667c8",
    "firstName": "Russo",
    "lastName": "Manning",
    "email": "russo.manning@google.com",
    "phone": "+38 (838) 422-2975",
    "departmentId": 14
  },
  {
    "_id": "605def591c88491300ac9c18",
    "firstName": "Janis",
    "lastName": "Boyd",
    "email": "janis.boyd@google.net",
    "phone": "+38 (900) 567-2974",
    "departmentId": 1
  },
  {
    "_id": "605def59378e59b6d70efb4a",
    "firstName": "Sofia",
    "lastName": "Hampton",
    "email": "sofia.hampton@google.biz",
    "phone": "+38 (936) 552-2295",
    "departmentId": 12
  },
  {
    "_id": "605def59d341de7ba6de294d",
    "firstName": "Meyers",
    "lastName": "Pittman",
    "email": "meyers.pittman@google.name",
    "phone": "+38 (870) 517-3213",
    "departmentId": 14
  },
  {
    "_id": "605def5941414dc62f31f6a5",
    "firstName": "Jacobson",
    "lastName": "Obrien",
    "email": "jacobson.obrien@google.tv",
    "phone": "+38 (994) 413-3408",
    "departmentId": 3
  },
  {
    "_id": "605def59db3f1677c621704a",
    "firstName": "Sadie",
    "lastName": "Sargent",
    "email": "sadie.sargent@google.biz",
    "phone": "+38 (915) 566-3346",
    "departmentId": 14
  },
  {
    "_id": "605def59d616af3b49c32831",
    "firstName": "Gail",
    "lastName": "Jensen",
    "email": "gail.jensen@google.info",
    "phone": "+38 (872) 592-2792",
    "departmentId": 10
  },
  {
    "_id": "605def594a51514eac30e557",
    "firstName": "Logan",
    "lastName": "Lowery",
    "email": "logan.lowery@google.org",
    "phone": "+38 (964) 538-2176",
    "departmentId": 14
  },
  {
    "_id": "605def59353f8dd91e3062be",
    "firstName": "Adams",
    "lastName": "Herring",
    "email": "adams.herring@google.ca",
    "phone": "+38 (812) 434-2836",
    "departmentId": 16
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

        {pageOfItems?.map((item, index) => (
          <tr key={item._id}>
            <td>Фото</td>
            <td>{item.firstName} {item.lastName}</td>
            <td>{item.email && <a href={`mailto:${item.email}`}>{item.email}</a>}</td>
            <td>{item.phone && <a href={`tel:${item.email}`}>{item.phone}</a>}</td>
            <td>Название факультета</td>
            <td>
              <DeleteButton onClick={() => handleClickDelete(item._id)}/>
            </td>
          </tr>
        ))
        }
        </tbody>
      </table>

      <Pagination items={students} onChangePage={onChangePage} pageSize={7}/>
    </>
  );
}

export default Students;