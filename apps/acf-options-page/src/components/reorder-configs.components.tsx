import { useTimeout } from '@acf-options-page/hooks';
import { Configuration } from '@dhruv-techapps/acf-common';
import { closestCenter, DndContext, DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FormEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ErrorAlert, Loading } from '../components';
import { configReorderGetAPI, configReorderSelector, configReorderUpdateAPI, setConfigReorderMessage, updateConfigReorder, useAppDispatch, useAppSelector } from '../store';
import { ArrowDown, ArrowUp } from '../utils';
import { InfoAlert } from './alert';

const ReorderConfigs = () => {
  const { configs, loading, error, message } = useAppSelector(configReorderSelector);
  const [sort, setSort] = useState<boolean>();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(configReorderGetAPI());
  }, [dispatch]);

  useTimeout(() => {
    dispatch(setConfigReorderMessage());
  }, message);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(configReorderUpdateAPI(configs));
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const sortActions = () => {
    setSort(!sort);
    if (configs) {
      dispatch(
        updateConfigReorder(
          [...configs].sort((a, b) => {
            const first = sort ? a.name ?? a.url : b.name ?? b.url;
            const second = sort ? b.name ?? b.url : a.name ?? a.url;
            return first.localeCompare(second);
          })
        )
      );
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id && configs) {
      const oldIndex = configs.findIndex((config) => config.id === active.id);
      const newIndex = configs.findIndex((config) => config.id === over?.id);
      dispatch(updateConfigReorder(arrayMove(configs, oldIndex, newIndex)));
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='container mt-3'>
      <form onSubmit={onSubmit} id='reorder-configs'>
        <h2>{t('modal.reorder.title')}</h2>
        <InfoAlert message={message} />
        <ErrorAlert error={error} />
        <p className='text-muted'>{t('modal.reorder.hint')}</p>
        <button type='button' onClick={sortActions} className='mb-3 btn btn-outline-primary'>
          Reorder {sort !== undefined && <span>{sort ? <ArrowUp /> : <ArrowDown />}</span>}
        </button>
        <div className='list-group'>
          <DndContext onDragEnd={handleDragEnd} sensors={sensors} collisionDetection={closestCenter}>
            <SortableContext items={configs} strategy={verticalListSortingStrategy}>
              {configs?.map((config) => (
                <SortableItem key={config.id} {...config} />
              ))}
            </SortableContext>
          </DndContext>
        </div>
        <div className='d-flex justify-content-end mt-3'>
          <button type='submit' className='btn btn-primary px-5' id='reorder-configs-button' data-testid='configurations-reorder-save'>
            {t('common.save')}
          </button>
        </div>
      </form>
    </div>
  );
};

export function SortableItem(props: Readonly<Configuration>) {
  const { t } = useTranslation();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };
  return (
    <li className='list-group-item' key={props.id} ref={setNodeRef} {...attributes} {...listeners} style={style}>
      {props.name ?? 'configuration - ' + props.id}
      {!props.enable && <span className='badge rounded-pill text-bg-secondary ms-2'>{t('common.disabled')}</span>}
    </li>
  );
}

export default ReorderConfigs;
