import React, { useState, useEffect } from "react";

const MyComponent = () => {
  const [customers, setCustomers] = useState([
    { Name: "Alfreds Futterkiste", City: "Berlin", Country: "Germany" },
    {
      Name: "Bon app'",
      City: "Marseille",
      Country: "France",
    },
    {
      Name: "Bottom-Dollar Marketse",
      City: "Tsawassen",
      Country: "Canada",
    },
    {
      Name: "Cactus Comidas para llevar",
      City: "Buenos Aires",
      Country: "Argentina",
    },
    {
      Name: "Centro comercial Moctezuma",
      City: "México D.F.",
      Country: "Mexico",
    },
    {
      Name: "Chop-suey Chinese",
      City: "Bern",
      Country: "Switzerland",
    },
    {
      Name: "Comércio Mineiro",
      City: "São Paulo",
      Country: "Brazil",
    },
  ]);

  const [people, setPeople] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const numPerPage = 5;
  const maxSize = 5;
  const [table, setTable] = useState("");

  const numPages = () => {
    return Math.ceil(customers.length / numPerPage);
  };

  useEffect(() => {
    const begin = (currentPage - 1) * numPerPage;
    const end = begin + numPerPage;
    setPeople(customers.slice(begin, end));
  }, [currentPage, customers]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-2">Search:</div>
        <div className="col-md-10">
          <input
            type="text"
            className="search"
            value={table}
            onChange={(e) => setTable(e.target.value)}
          />
        </div>
      </div>
      <br />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {people
            .filter((customer) =>
              Object.values(customer)
                .join("")
                .toLowerCase()
                .includes(table.toLowerCase())
            )
            .map((customer, index) => (
              <tr key={index}>
                <td>{customer.Name}</td>
                <td>{customer.City}</td>
                <td>{customer.Country}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        <Pagination
          numPages={numPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          maxSize={maxSize}
        />
      </div>
    </div>
  );
};

const Pagination = ({ numPages, currentPage, setCurrentPage, maxSize }) => {
  const pages = Array.from({ length: numPages() }, (_, i) => i + 1);

  return (
    <div>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={currentPage === page ? "active" : ""}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyComponent;
