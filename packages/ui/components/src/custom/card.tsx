import React from 'react';

export const Card = (props: React.HTMLAttributes<HTMLElement>) => {
  const { children } = props;
  return (
    <div {...props} className={`card`}>
      {children}
    </div>
  );
};

const CardBody = (props: React.HTMLAttributes<HTMLElement>) => {
  return <div className={'card-body'} {...props} />;
};

export default Object.assign(Card, {
  Body: CardBody
});
