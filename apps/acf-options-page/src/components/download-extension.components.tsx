import { CoverLayout } from '@acf-options-page/app/cover-layout';
import { BoxSeam, CHROME_WEB_STORE } from '@acf-options-page/utils';

const DownloadExtension = () => {
  return (
    <CoverLayout>
      <div className='d-flex justify-content-center align-items-center mb-4'>
        <img
          className='img-fluid me-3'
          srcSet='https://getautoclicker.com/brand/bootstrap-social-logo.png, https://getautoclicker.com/brand/bootstrap-social-logo@2x.png 2x'
          src='https://getautoclicker.com/brand/bootstrap-social-logo.png'
          alt='Auto Clicker Auto Fill'
          width='72'
          height='72'
        />
        <h1>Auto Clicker Auto Fill</h1>
      </div>
      <p className='lead'>
        Auto Clicker Auto Fill is a powerful automation extension designed to simplify repetitive tasks and save you hours of manual effort. Whether you're filling out forms, clicking through
        workflows, or running data-driven processes, this tool has you covered.
      </p>
      <a className={`btn btn-bd-primary btn-lg fw-bold`} href={`${CHROME_WEB_STORE}${import.meta.env.VITE_PUBLIC_CHROME_EXTENSION_ID}`} target='_blank' rel='noreferrer'>
        <BoxSeam className='bi me-3' /> Download
      </a>
    </CoverLayout>
  );
};
export default DownloadExtension;
