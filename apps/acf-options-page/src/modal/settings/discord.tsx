import { Discord } from '@dhruv-techapps/acf-common';
import { DiscordOauthService } from '@dhruv-techapps/discord-oauth';
import { FirebaseDatabaseService } from '@dhruv-techapps/firebase-database';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Badge, Button, Form, Image } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { appSelector, switchLogin } from '../../store/app.slice';

function SettingDiscord({ onChange, label, checked }) {
  const [discord, setDiscord] = useState<Discord>();
  const { user } = useAppSelector(appSelector);
  const [error, setError] = useState<Error>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    FirebaseDatabaseService.getDiscord<Discord>(window.EXTENSION_ID)
      .then((result) => {
        if (result) {
          setDiscord(result);
        }
      })
      .catch(setError);
  }, []);

  const connect = () => {
    DiscordOauthService.login(window.EXTENSION_ID)
      .then((response) => {
        if (response) {
          setDiscord(response);
        }
      })
      .catch(setError);
  };

  const remove = () => {
    FirebaseDatabaseService.deleteDiscord(window.EXTENSION_ID)
      .then(() => {
        setDiscord(undefined);
      })
      .catch(setError);
  };

  console.log(error?.name, error?.message, error?.stack);

  if (discord) {
    return (
      <div className='w-100'>
        <div className='d-flex justify-content-between align-items-center'>
          <Form.Label className='ms-2 mt-2 me-auto' htmlFor='discord'>
            <div className='fw-bold mb-2'>{label}</div>
            <Image
              alt={discord.displayName}
              className='me-2'
              title={discord.displayName}
              src={`https://cdn.discordapp.com/avatars/${discord.id}/${discord.avatar}.png`}
              roundedCircle
              width='30'
              height='30'
            />
            {discord.username}
            <Button variant='link' onClick={remove}>
              (remove)
            </Button>
          </Form.Label>
          <Form.Check type='switch' id='discord' onChange={onChange} checked={checked || false} name='discord' data-testid='discord-switch' />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <p>
        Please
        <Button variant='link' title='login' onClick={() => dispatch(switchLogin())}>
          Login
        </Button>
        to your account before connecting with Discord.
      </p>
    );
  }

  return (
    <div>
      <Button variant='link' onClick={connect} data-testid='discord-connect'>
        Connect with discord
      </Button>
      {error?.message && <Badge bg='danger'>{error?.message}</Badge>}
    </div>
  );
}

SettingDiscord.displayName = 'SettingDiscord';
SettingDiscord.propTypes = {
  checked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
export { SettingDiscord };
