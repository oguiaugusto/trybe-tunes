import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { ProfileEditContainer } from './styled';

const THREE = 3;

function ProfileEditForm({
  user, profileImage, handleChange, disabledBtn, onSaveClick,
}) {
  return (
    <ProfileEditContainer className="px-3 py-4 mx-2">
      <Form>
        <div className="img-row">
          <div className="img-container">
            <img src={ profileImage } alt="Default user icon" />
          </div>
          <Form.Control
            data-testid="edit-input-image"
            placeholder="Insira um Link"
            className="img-input"
            type="text"
            name="image"
            value={ user.image }
            onChange={ handleChange }
          />
        </div>
        <Form.Group className="my-3">
          <Form.Label className="mb-1">Name</Form.Label>
          <Form.Control
            data-testid="edit-input-name"
            placeholder="How would you like to be called?"
            name="name"
            value={ user.name }
            onChange={ handleChange }
          />
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Label className="mb-1">Email</Form.Label>
          <Form.Control
            data-testid="edit-input-email"
            placeholder="Type your best email!"
            name="email"
            value={ user.email }
            onChange={ handleChange }
          />
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Label className="mb-1">Description</Form.Label>
          <Form.Control
            data-testid="edit-input-description"
            as="textarea"
            rows={ THREE }
            placeholder="About you"
            name="description"
            value={ user.description }
            onChange={ handleChange }
          />
        </Form.Group>
        <div className="d-flex flex-column">
          <Button
            data-testid="edit-button-save"
            variant="outline-light"
            disabled={ disabledBtn() }
            onClick={ onSaveClick }
          >
            Salvar
          </Button>
        </div>
      </Form>
    </ProfileEditContainer>
  );
}

export default ProfileEditForm;

ProfileEditForm.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  profileImage: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  disabledBtn: PropTypes.func.isRequired,
  onSaveClick: PropTypes.func.isRequired,
};
