import React from 'react';
import { Modal, Container, Row, Col } from 'react-bootstrap';
import './ModalWindow.css';

const ModalWindow = ({
  showModal, setShowModal, user
  }) => {

  return (
    <Modal
      size="xl"
      show={showModal}
      onHide={() => setShowModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          User information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {user && <div className="profile">
          <Container>
            <Row className="profile-content content">
              <Col xs={12} md={4} className="side-content">
                <div className="personal-data">
                  <h2 className="data-title">Personal data</h2>
                  <img
                      className="profile-avatar"
                      src={user['picture.large']}
                      alt=""
                  />
                  <h3 className="full-name">{`${user['name.title']} ${user['name.first']} ${user['name.last']}`}</h3>
                  <p className='data-text'><span>Gender:</span> {user.gender}</p>
                  <p className='data-text'><span>Birthday:</span> {`${new Date(user['dob.date']).toLocaleDateString()}, Age: ${user['dob.age']}`}</p>
                  <p className='data-text'><span>Nationality:</span> {user['picture.nat']}</p>
                  <p className='data-text'><span>Phone:</span> {user['registered.phone']}</p>
                  <p className='data-text'><span>E-mail:</span> {user['timezone.email']}</p>
                  <p className='data-text'><span>Adress:</span> {`${user['street.postcode']}, ${user['street.country']},
                  ${user['street.state']}, ${user['street.city']}, ${user['street.name']},
                  ${user['street.number']}`}</p>
                  <p className='data-text'><span>Location:</span> {`${user['coordinates.latitude']}, ${user['coordinates.longitude']}`}</p>
                  <p className='data-text'><span>Timezone:</span> {`${user['timezone.description']}, ${user['timezone.offset']}`}</p>
                </div>
              </Col>
              <Col className="main-content" xs={12} md={8}>
                <div className="register-data">
                  <h2 className="data-title">Registered data</h2>
                  <p className='data-text'><span>Registered age:</span> {user['registered.age']}</p>
                  <p className='data-text'><span>Registered date:</span> {new Date(user['registered.date']).toLocaleDateString()}</p>
                  <p className='data-text'><span>Registered cell:</span> {user['registered.cell']}</p>
                </div>
                <div className="login-data">
                  <h2 className="data-title">Login data</h2>
                  <p className='data-text'><span>Username:</span> {user['login.username']}</p>
                  <p className='data-text'><span>Password:</span> {user['login.password']}</p>
                  <p className='data-text'><span>UUID:</span> {user['login.uuid']}</p>
                  <p className='data-text'><span>MD5:</span> {user['login.md5']}</p>
                  <p className='data-text'><span>Salt:</span> {user['login.salt']}</p>
                  <p className='data-text'><span>SHA1:</span> {user['login.sha1']}</p>
                  <p className='data-text'><span>SHA256:</span> {user['login.sha256']}</p>
                  <p className='data-text'><span>ID.name:</span> {user['id.name']}</p>
                  <p className='data-text'><span>ID.value:</span> {user['id.value']}</p>
                </div>
                <div className="pictures-data">
                  <h2 className="data-title">Photos URLs</h2>
                  <p className='data-text'><span>Large:</span> <a href={user['picture.large']}>{user['picture.large']}</a></p>
                  <p className='data-text'><span>Medium:</span> <a href={user['picture.medium']}>{user['picture.medium']}</a></p>
                  <p className='data-text'><span>Thumbnail:</span> <a href={user['picture.thumbnail']}>{user['picture.thumbnail']}</a></p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>}
      </Modal.Body>
    </Modal>
  );
}

export { ModalWindow };