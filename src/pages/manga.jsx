import Header from '../header.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Manga() {
  const { manga } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const http = axios.create({
    baseURL: 'https://manganya-api.asasoft.id',
  });

  const getData = async () => {
    setLoading(true);
    const response = await http.get('/api/manga/detail/' + manga);

    if (response.status === 200) {
      setData(response.data);
    }

    setLoading(false);
  };

  useEffect(() => {
    getData().then();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />

      <main className="container">
        <div className="card mt-3">
          <div className="card-body">
            <div className="text-center">
              <img src={data.thumb} alt="" />
            </div>
            <div className="mt-3">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Title</td>
                    <td className="text-center">:</td>
                    <td>{data.title}</td>
                  </tr>
                  <tr>
                    <td>Genre</td>
                    <td className="text-center">:</td>
                    <td>{data.genre_list.map((item) => item.genre_name).join(', ')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <h3>Synopsis</h3>
              {data.synopsis}
            </div>
          </div>
        </div>
        <div className="card mt-3">
          <div className="card-body">
            <table className="table">
              <tbody>
                {data.chapter.map((item) => {
                  return (
                    <>
                      <tr key={item.chapter_endpoint}>
                        <td>
                          <a href={`/chapter` + item.chapter_endpoint}>{item.chapter_title}</a>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}

export default Manga;
