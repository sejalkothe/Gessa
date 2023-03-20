import { IconComponent } from '@gessa/component-library';
import { Box, Stack } from '@mui/material';
import { useTheme } from '@mui/system';
import { IRootState } from 'apps/react-host/src/store';
import themes from 'apps/react-host/src/theme';
import Survey from '../../../assets/Survey.svg';

import generateRandomString from 'apps/react-host/src/utils/randomString';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import {
  selectAllSortedMenuById,
  setActiveMenuName,
  setPageId,
} from './store/sortedMenuSlice';

export interface ISideNav {
  menuList: any;
  selectedMenuName: string;
  setSelectedMenuName: (data: any) => any;
}
const SideNav = (props: ISideNav) => {
  const theme = useTheme();
  const themesChart = themes.default;
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const rootState = useSelector((state: IRootState) => state);
  const [appMenu, setAppMenu]: any = useState<Array<any>>([]);
  const [isClicked, setClicked]: any = useState(false);
  const sortedMenus = selectAllSortedMenuById(rootState);
  const [selectedMenu, setSelectedMenu] = useState<string>(
    params.menuId || props.selectedMenuName
  );

  useEffect(() => {
    if (sortedMenus && sortedMenus.length > 0) {
      setAppMenu(sortedMenus[0].data);
    }
  }, [sortedMenus]);

  useEffect(() => {
    if (params && params.menuId) {
      setSelectedMenu(params.menuId);
      dispatch(setActiveMenuName(params.menuId));
    }
  }, [params]);

  return (
    <Box
      sx={{
        width: '84px',
        height: '93vh',
        // backgroundColor:'red',
        justifyContent: 'center',
        display: 'flex',
        overflowY: 'auto',
        background: themesChart?.palette?.background?.bacopWhite,
        borderRight: `1px solid ${themesChart?.palette?.neutral?.neu100}`,
      }}
    >
      <img src={Survey} style={{height:'30px', width:'30px', marginTop:'10px'}} />
      <Stack direction="column">
        {appMenu &&
          appMenu.length > 0 &&
          appMenu.map((item: any, index: any) => {
            return (
              <div
                key={generateRandomString()}
                style={{
                  minWidth: '50px',
                  minHeight: '50px',

                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '10px',
                  borderRadius: '4px',
                  background:
                    selectedMenu === item.data.name
                      ? themesChart?.palette?.primary?.pri300Main
                      : themesChart?.palette?.background?.bacopWhite,
                  color:
                    selectedMenu === item.data.name
                      ? theme?.palette?.primary?.main
                      : theme?.palette?.text?.main,
                }}
                onClick={() => {
                  setClicked(isClicked !== index ? index : -1);
                  setSelectedMenu(item.data.name);

                  dispatch(setActiveMenuName(item.data.name));
                  if (item && item.child && item.child.length > 0) {
                    dispatch(setPageId(''));
                  } else {
                    dispatch(setPageId(item.data.pageId));
                  }
                  props.setSelectedMenuName(item.data.name);
                  navigate(
                    `/project/${params.projectId}/${
                      item.data.name || params.menuId
                    }`
                  );
                }}
              >
                {/* <IconComponent
                  name={item.data.icon.trim() || 'Menu-Info'}
                  size={30}
                  label={item.data.name}
                  color={
                    selectedMenu === item.data.name
                      ? themesChart?.palette?.background?.bacopWhite
                      : themesChart?.palette?.text?.tex300Main
                  }
                /> */}
              </div>
              // </Link>
            );
          })}
      </Stack>
    </Box>
  );
};

export default SideNav;
// import { Box, Stack, Typography, useTheme } from '@mui/material';
// import { useEffect, useMemo, useState } from 'react';
// import Header from './component/Header/Header';
// // import { IconComponent } from '@gessa/component-library';
// import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
// import Logo from '../../../assets/Vector.svg';
// import { useAppDispatch } from '../../../context/redux';
// import { ITheme } from '../../../theme/index';
// import AppMain from '../../layouts/AppMain/AppMain';
// import ChildMenuContext from './component/ChildMenusContext';
// import Survey from '../../../assets/Survey.svg';
// // import { Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
// import Tooltip from '@mui/material/Tooltip';
// // import {
// //   accounts,
// //   accountsSelected,
// //   dashboard,
// //   dashboardSelected,
// //   records,
// //   recordsSelected,
// //   settings,
// //   settingsSelected,
// //   templets,
// //   templetsSelected,
// // } from 'apps/container-ss/src/assets';
// function Project() {
//   const theme: ITheme = useTheme();
//   const [widgetData, setWidgetData] = useState([]);
//   const [appMenu, setAppMenu]: any = useState();
//   const [isClicked, setClicked]: any = useState(1);
//   const dispatch = useAppDispatch();
//   const location = useLocation();
//   const urlParams = useParams();
//   const menuPath = urlParams['*']?.split('/')?.[1];
//   const menuName: any = useMemo(() => {
//     let menuChild: any[] = [];
//     const menu = urlParams['*']?.split('/')?.[1];
//     appMenu?.forEach((item: any, index: any) => {
//       if (item.data.name === menu) {
//         menuChild = item.child;
//       }
//     });
//     return { menu, menuChild };
//   }, [appMenu, urlParams]);
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (location.pathname.startsWith('/menu/5/')) {
//       setClicked(5);
//     } else if (location.pathname.startsWith('/menu/4/')) {
//       setClicked(4);
//     } else if (location.pathname.startsWith('/menu/3/')) {
//       setClicked(3);
//     } else if (location.pathname.startsWith('/menu/2/')) {
//       setClicked(2);
//     } else {
//       setClicked(1);
//     }
//     navigate(location.pathname === '/' ? '/menu/1/' : location.pathname);
//   }, []);
//   // const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
//   //   <Tooltip {...props} arrow classes={{ popper: className }} />  // ))(({ theme }) => ({
//   //   [`& .${tooltipClasses.arrow}`]: {
//   //     color: '#848B96',
//   //   },
//   //   [`& .${tooltipClasses.tooltip}`]: {
//   //     backgroundColor: '#848B96',
//   //   },
//   // }));
//   return (
//     <Box
//       sx={{
//         // background: theme.palette?.background?.default,
//         display: 'flex',
//         flexDirection: 'column',
//         // overflow: 'hidden',
//         height: '100vh',
//       }}
//     >
//           <img src= {Survey} />
//           <Stack direction="column">
//             {' '}
//             <Link to={'menu/' + 1 + '/'} style={{ textDecoration: 'none' }}>
//               {' '}
//               <Box
//                 sx={{
//                   width: '50px',
//                   height: '50px',
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   marginTop: '30px',
//                   borderRadius: '4px',
//                   // background:
//                   //   isClicked == 1
//                   //     ? theme?.palette?.background?.default
//                   //     : theme?.palette?.light?.c50,
//                 }}
//                 onClick={() => setClicked(1)}
//               >
//                 {' '}
//                 {/* <Tooltip
//                   title={<Typography variant="caption">Dashboard</Typography>}
//                   sx={{ color: '#848B96' }}
//                   arrow
//                 > */}
//                   {' '}
//                   <img
//                     // src={isClicked === 1 ? dashboardSelected : dashboard}
//                     alt="choose connector"
//                     height={23}
//                     width={23}
//                   />{' '}
//                 {/* </Tooltip>{' '} */}
//                 {/* <AssignmentTurnedInIcon
//                   sx={{
//                     color:
//                       isClicked == 1
//                         ? theme.palette?.primary?.main
//                         : theme.palette?.text?.disabled,
//                   }}
//                 /> */}
//               </Box>{' '}
//             </Link>{' '}
//             <Link to={'menu/' + 1 + '/'} style={{ textDecoration: 'none' }}>
//               {' '}
//               <Box
//                 sx={{
//                   width: '50px',
//                   height: '50px',
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   marginTop: '30px',
//                   borderRadius: '4px',
               
//                 }}
//                 onClick={() => setClicked(2)}
//               >
//                 {' '}
//                 {/* <Tooltip
//                   title={<Typography variant="caption">Records</Typography>}
//                   arrow
//                 >
//                   {' '}
//                   <img
//                     src={isClicked === 2 ? recordsSelected : records}
//                     alt="choose connector"
//                     height={23}
//                     width={23}
//                   />{' '}
//                 </Tooltip>{' '} */}
//                 {/* <ViewInArIcon
//                   sx={{
//                     color:
//                       isClicked == 2
//                         ? theme.palette?.primary?.main
//                         : theme.palette?.text?.disabled,
//                   }}
//                 /> */}
//               </Box>{' '}
//             </Link>{' '}
           
          
           
//           </Stack>{' '}
      
      
//     </Box>
//   );
// }
// export default Project;
