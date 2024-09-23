import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Header() {
  const { search } = useParams();
  const [searchInput, setSearchInput] = useState(search ?? '');

  const navigate = useNavigate();

  const submit = (event) => {
    event.preventDefault();
    navigate('/search/' + searchInput);
  };

  return (
    <>
      <header className="bg-white">
        <div className="navbar-wrapper border-bottom p-2">
          <nav className="navbar navbar-expand-lg container">
            <div className="container-fluid">
              <a className="navbar-brand" href="/">
                Manganya
              </a>
              <div>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                <form className="d-flex" role="search" onSubmit={submit}>
                  <input className="form-control me-2" type="search" placeholder="Cari Manga" aria-label="Cari Manga" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                  <button className="btn btn-primary" type="submit">
                    Cari
                  </button>
                </form>
              </div>
            </div>
          </nav>
        </div>
        <div className="catgorry-wrapper p-2 border-bottom">
          <nav className="nav container gap-2">
            <a className="btn btn-sm btn-secondary" href="/">
              Populer
            </a>
            <a className="btn btn-sm btn-secondary" href="/genre/manga">
              Manga
            </a>
            <a className="btn btn-sm btn-secondary" href="/genre/manhwa">
              Manhwa
            </a>
            <a className="btn btn-sm btn-secondary" href="/genre/manhua">
              Manhua
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
