import { settingsSelector, updateSettings, useAppDispatch, useAppSelector } from '@acf-options-page/store';
import { getFieldNameValue, REGEX } from '@acf-options-page/utils';
import { RETRY_OPTIONS, Settings } from '@dhruv-techapps/acf-common';
import { FormCheck } from '@dhruv-techapps/ui-components';
import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

function SettingRetry() {
  const { t } = useTranslation();
  const { settings } = useAppSelector(settingsSelector);
  const dispatch = useAppDispatch();
  const onUpdate = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const update = getFieldNameValue<Settings>(e, settings);
    if (update) {
      dispatch(updateSettings(update));
    }
  };

  return (
    <>
      <div className='card border-warning'>
        <div className='card-body d-flex gap-3'>
          <div className='input-group'>
            <span className='input-group-text'>{t('modal.settings.retry.title')}</span>
            <input className='form-control' placeholder='5' autoComplete='off' name='retry' defaultValue={settings.retry} onBlur={onUpdate} type='number' pattern={REGEX.NUMBER} list='retry' />
            <div className='invalid-feedback'>{t('error.number')} </div>
          </div>
          <div className='input-group'>
            <span className='input-group-text'>
              {t('modal.settings.retry.interval')}&nbsp;<small>({t('common.sec')})</small>
            </span>
            <input className='form-control' placeholder='1' autoComplete='off' name='retryInterval' defaultValue={settings.retryInterval} onBlur={onUpdate} pattern={REGEX.INTERVAL} list='interval' />
            <div className='invalid-feedback'>{t('error.number')} </div>
          </div>
        </div>
      </div>
      <div className='card border-danger mt-3'>
        <div className='card-body'>
          <p>{t('modal.settings.retry.hint')}</p>
          <div className='d-flex justify-content-between mt-3'>
            <FormCheck type='radio' value={RETRY_OPTIONS.STOP} checked={settings.retryOption === RETRY_OPTIONS.STOP} onChange={onUpdate} name='retryOption' label={t('modal.settings.retry.stop')} />
            <FormCheck type='radio' value={RETRY_OPTIONS.SKIP} checked={settings.retryOption === RETRY_OPTIONS.SKIP} onChange={onUpdate} name='retryOption' label={t('modal.settings.retry.skip')} />
            <FormCheck
              type='radio'
              value={RETRY_OPTIONS.RELOAD}
              checked={settings.retryOption === RETRY_OPTIONS.RELOAD}
              onChange={onUpdate}
              name='retryOption'
              label={t('modal.settings.retry.refresh')}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export { SettingRetry };
