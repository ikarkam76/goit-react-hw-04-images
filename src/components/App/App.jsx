import { useEffect, useState } from "react";
import { AppContainer } from "components/App/App.styled";
import { SearchBar } from "components/Searchbar/Searchbar";
import { ImageGallery } from "components/ImageGallery/ImageGallery";
import { Button } from "components/Button/Button";
import { Loader } from "components/Loader/Loader";
import { getImages } from "components/services/getImages";
import { Modal } from "components/Modal/Modal";

export const App = () => {
  const [searchName, setSearchName] = useState('');
  const [page, setPage] = useState(0);
  const [hits, setHits] = useState([]);
  const [showLoader, setShowloader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setlargeImageURL] = useState('');

  useEffect(() => {
    if (searchName === '' || page === 0) {
      return;
    }
    fetchImages();
  }, [page])

  useEffect(() => {
    if (searchName === '' || page === 0) {
      return;
    }
    setHits([]);
    setPage(1);
    fetchImages();
  }, [searchName]);


  const fetchImages = () => {
    getImages(searchName, page)
      .then(val => {
        setHits([...hits, ...val.data.hits]);
        setShowloader(false);
      }
      )
      .catch(() => alert('Something went wrong'));
  };

  const onLoadMore = () => {
    setPage(page => page + 1);
    setShowloader(true);
  };

  const handleSubmit = ev => {
    const searchName = ev.currentTarget[1].value.trim().split(' ').join('+');
    if (!searchName) {
      alert('Wow! The search field must not be empty!');
    } else {
      setPage(page => page + 1);
      setSearchName(searchName);
      setShowloader(true);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    // setState(({ showModal }) => ({ showModal: !showModal }));
  };

  const handleOpenModal = (largeImageURL) => {
    toggleModal();
    setlargeImageURL(largeImageURL);
  };

    return (
      <AppContainer>
        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={largeImageURL} alt={hits.tags} />
          </Modal>
        )}
        <SearchBar onSubmit={handleSubmit} />
        <ImageGallery
          images={hits}
          onOpen={largeImageURL => handleOpenModal(largeImageURL)}
        />
        {hits.length > 0 && <Button onLoadMore={onLoadMore} />}
        <Loader visible={showLoader} />
      </AppContainer>
    );
};
