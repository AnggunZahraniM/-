import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../header.jsx';

function Search() {
  const { search } = useParams();
  const [data, setData] = useState([]);

  const http = axios.create({
    baseURL: 'https://manganya-api.asasoft.id',
  });

  const getManga = async () => {
    const response = await http.get('/api/search?q=' + search);

    if (response.status === 200 && response.data.status) {
      setData(response.data.manga_list);
    }
  };

  useEffect(() => {
    getManga().then(() => {});
  }, [search]);

  return (
    <>
      <Header />
      <main className="container">
        <h2 className="text-center mt-3 ">
          Pencarian <b>`{search}`</b>
        </h2>
        <div className="row mt-3 ">
          {data.map((item) => {
            return (
              <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 py-3" key={item.endpoint}>
                <div className="card p-0">
                  <img src={item.thumb} className="card-img-top" alt="" />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.updated_on}</p>
                    <a href={`/manga/` + item.endpoint} className="btn btn-primary w-100 ">
                      <small>Baca</small>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}

export default Search;
