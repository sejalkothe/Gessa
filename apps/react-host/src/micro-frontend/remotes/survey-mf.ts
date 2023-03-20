import { IMicroFrontend } from '.';
import { environment } from '../../environments/environment';

const MFSurvey = {
  url: environment.NX_SURVEY_MF,
  scope: 'Survey',
  components: {
    SurveyComponent: './SurveyComponent',
  },
  slices: {
    // grid: './grid',
  },
  routes: {
    // default: './RoutingDemoConfig',
  },
};

export default MFSurvey;
