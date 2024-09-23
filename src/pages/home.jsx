import Header from '../header.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  const http = axios.create({
    baseURL: 'https://manganya-api.asasoft.id',
  });

  const getManga = async () => {
    setLoading(true);
    const response = await http.get('/api/manga/popular/' + page);

    if (response.status === 200 && response.data.status) {
      setPage(page + 1);
      setData((old) => {
        /*
         * menggabungan data lama dengan yang baru
         */
        const items = [...old, ...response.data.manga_list];

        /*
         * membuat data menjadi unik dan menghilangan duplikasi data
         */
        return Array.from(new Set(items.map((item) => JSON.stringify(item)))).map((item) => JSON.parse(item));
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    getManga().then(() => {});
  }, []);

  return (
    <>
      <Header />
      <main className="container">
        <h2 className="text-center mt-3 ">Populer</h2>
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
        <div className="laod-button container text-center mt-3">
          {!!loading && (
            <>
              <div>Loading ...</div>
            </>
          )}
          {!loading && (
            <>
              <button className="btn btn-primary" onClick={getManga}>
                muat lainnya
              </button>
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default Home;
