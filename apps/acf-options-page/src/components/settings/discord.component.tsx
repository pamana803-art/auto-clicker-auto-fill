import { useEffect } from 'react';
import { Button, Form, Image } from 'react-bootstrap';
import { discordDeleteAPI, discordGetAPI, discordLoginAPI, settingsSelector, useAppDispatch, useAppSelector } from '../../store';

type SettingDiscordProps = {
  readonly checked: boolean;
  readonly label: string;
  readonly onChange: React.ChangeEventHandler<HTMLInputElement>;
};

function SettingDiscord({ onChange, label, checked }: SettingDiscordProps) {
  const { discord } = useAppSelector(settingsSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!discord) {
      dispatch(discordGetAPI());
    }
  }, [discord, dispatch]);

  const connect = () => {
    dispatch(discordLoginAPI());
  };

  const remove = () => {
    dispatch(discordDeleteAPI());
  };

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
              (disconnect)
            </Button>
          </Form.Label>
          <Form.Check type='switch' id='discord' onChange={onChange} checked={checked || false} name='discord' data-testid='discord-switch' />
        </div>
      </div>
    );
  }

  return (
    <Button variant='link' onClick={connect} data-testid='discord-connect'>
      Connect with discord
    </Button>
  );
}

SettingDiscord.displayName = 'SettingDiscord';

export { SettingDiscord };
