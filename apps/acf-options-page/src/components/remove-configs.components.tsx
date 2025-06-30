import { useTimeout } from '@acf-options-page/hooks';
import { RANDOM_UUID } from '@dhruv-techapps/core-common';
import { FormCheck } from '@dhruv-techapps/ui-components';
import { ChangeEvent, FormEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ErrorAlert, Loading } from '../components';
import { configRemoveGetAPI, configRemoveSelector, configRemoveUpdateAPI, setConfigRemoveMessage, switchConfigRemoveSelection, useAppDispatch, useAppSelector } from '../store';
import { InfoAlert } from './alert';

const RemoveConfigs = () => {
  const { configs, loading, message, error } = useAppSelector(configRemoveSelector);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(configRemoveUpdateAPI(configs));
  };

  useEffect(() => {
    dispatch(configRemoveGetAPI());
  }, [dispatch]);

  useTimeout(() => {
    dispatch(setConfigRemoveMessage());
  }, message);

  const remove = (e: ChangeEvent<HTMLInputElement>) => {
    const { dataset } = e.currentTarget;
    if (dataset.id) {
      dispatch(switchConfigRemoveSelection(dataset.id as RANDOM_UUID));
    }
  };

  const checkedConfigLength = () => {
    const length = configs?.filter((config) => config.checked)?.length;
    return length ? length + 1 : 0;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='container mt-3'>
      <form onSubmit={onSubmit} id='remove-configs'>
        <h2>{t('configuration.removeConfigs')}</h2>
        <InfoAlert message={message} />
        <ErrorAlert error={error} />
        <p className='text-muted'>This action cant be reverted.</p>
        <ul className='list-group'>
          {configs?.map((config) => (
            <li className='list-group-item' key={config.id}>
              <FormCheck
                type='checkbox'
                checked={config.checked || false}
                onChange={remove}
                className={config.checked ? 'text-danger' : ''}
                data-id={config.id}
                name={`remove-configs-${config.id}`}
                disabled={!config.checked && configs.length === checkedConfigLength()}
                id={`configuration-checkbox-${config.id}`}
                label={
                  <>
                    {config.name ?? 'configuration - ' + config.id}
                    {!config.enable && <span className='badge rounded-pill text-bg-secondary ms-2'>{t('common.disabled')}</span>}
                  </>
                }
              />
            </li>
          ))}
        </ul>
        <div className='d-flex justify-content-end mt-3'>
          <button type='submit' className='btn btn-danger px-5' id='remove-configs-button' data-testid='configurations-remove-save'>
            {t('configuration.removeConfigs')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RemoveConfigs;
