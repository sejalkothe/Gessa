import { Microfrontend } from 'apps/react-host/src/micro-frontend';
import MFSurvey from 'apps/react-host/src/micro-frontend/remotes/survey-mf';
import React, { memo } from 'react';

export interface IViewPageProps {
  tabData: any;
}

const surveyUi = (props: IViewPageProps) => {
  return (
    <Microfrontend
      url={MFSurvey.url}
      scope={MFSurvey.scope}
      module={MFSurvey.components.SurveyComponent}
      props={props.tabData}
    />
  );
};

export default memo(surveyUi);
