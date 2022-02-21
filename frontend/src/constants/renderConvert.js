/* eslint-disable arrow-body-style */
/* eslint-disable prefer-template */
// eslint-disable-next-line import/prefer-default-export
export const renderMoney = (value) => {
  // eslint-disable-next-line no-useless-concat
  return <>{` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ' + '₫'}</>;
};
