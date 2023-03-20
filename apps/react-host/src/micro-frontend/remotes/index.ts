import MFViewPageApp from './react-remote-app';
import MFSurvey from './survey-mf';
export { default as ViewPageApp } from './react-remote-app';
export { default as Survey } from './react-remote-app';

export interface IMicroFrontend {
  url: string;
  scope: string;
  components: {
    [key: string]: string;
  };
  slices: {
    [key: string]: string;
  };
  routes: {
    [key: string]: string;
  };
}

export interface IMicroFrontends {
  [key: string]: IMicroFrontend;
}

const microFrontends: IMicroFrontends = {
  viewpageApp: MFViewPageApp,
  survey: MFSurvey
};

export default microFrontends;
