import { BoxSeam, Braces, CHROME_WEB_STORE } from '@acf-options-page/utils';

export const DownloadExtension = () => {
  return (
    <div className='container my-5'>
      <div className='p-5 text-center bg-body-tertiary rounded-3'>
        <img
          className='img-fluid mx-auto d-none d-sm-block mb-3'
          srcSet='https://getautoclicker.com/brand/bootstrap-social-logo.png, https://getautoclicker.com/brand/bootstrap-social-logo@2x.png 2x'
          src='https://getautoclicker.com/brand/bootstrap-social-logo.png'
          alt='Auto Clicker Auto Fill'
          width='118'
          height='118'
        />
        <h1 className='text-body-emphasis'>Auto Clicker Auto Fill</h1>
        <p className='col-lg-8 mx-auto fs-5 text-muted'>
          Auto Clicker Auto Fill is a powerful automation extension designed to simplify repetitive tasks and save you hours of manual effort. Whether you're filling out forms, clicking through
          workflows, or running data-driven processes, this tool has you covered.
        </p>
        <div className='d-inline-flex gap-2 mb-5'>
          <a
            className='d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill fs-3'
            type='button'
            href={`${CHROME_WEB_STORE}${import.meta.env.VITE_PUBLIC_CHROME_EXTENSION_ID}`}
            target='_blank'
            rel='noreferrer'
          >
            <BoxSeam className='bi me-3' /> Download
          </a>
        </div>
        <div className='text-start'>
          <h2 className='display-5 mb-2 fw-semibold lh-sm'>
            <div className='masthead-followup-icon d-inline-block me-2' style={{ '--bg-rgb': 'var(--bd-pink-rgb)' } as React.CSSProperties}>
              <Braces />
            </div>
            Features
          </h2>
          <ul className='fs-4 '>
            <li>Auto record and playback mouse and keyboard actions</li>
            <li>
              Autofill everything works on all input types (checkbox, color, date, email, hidden, number, password, radio, range, search, text, time), textarea fields, select/option fields, content
              editable elements,
            </li>
            <li>Seamlessly integrate and fill out data from Google Sheets</li>
            <li>Sync your configuration with Google Drive</li>
            <li>Manage all your configurations with ease: search, filter, and update from a single interface</li>
            <li>Access a library of publicly available configurations</li>
            <li>Run either manually or automatically</li>
            <li>Addon: Add conditions to your actions based on elements, their text, or their values</li>
            <li>Import and export your data to and from json files</li>
            <li>Repeat actions as many times as you want</li>
            <li>Schedule your actions to run at a specific time</li>
            <li>Retry if an action fails</li>
            <li>Receive notifications on Chrome or Discord when an action fails or completes</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
