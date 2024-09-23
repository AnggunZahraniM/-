import Header from '../header.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Chapter() {
  const { chapter } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const http = axios.create({
    baseURL: 'https://manganya-api.asasoft.id',
  });

  const getData = async () => {
    setLoading(true);
    const response = await http.get('/api/chapter/' + chapter);

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

      <main className="bg-black">
        <div className="container">
          {data.chapter_image.map((item) => {
            return (
              <>
                <img src={item.chapter_image_link} alt="" key={item.image_number} className="w-100" />
              </>
            );
          })}
        </div>
      </main>
    </>
  );
}

export default Chapter;
