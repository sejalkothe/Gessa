import { Box, useTheme } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import AppMain from './AppMain/AppMain';
import AppMenu from './AppMenu/AppMenu';
import { ITheme } from '../../theme/index';
// import './Classic.css';
import childMenuContext from '../pages/projects/component/ChildMenusContext';
import { useParams } from 'react-router-dom';
import { selectAllMenu } from '../pages/projects/store/appMenuSlice';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { selectAllSortedMenuById } from '../pages/projects/store/sortedMenuSlice';

function Classic({ right = false }) {
  const theme: ITheme = useTheme();
  const rootState = useSelector((state: IRootState) => state);
  const [menuData, setMenuData] = useState<any>();
  const childMenus: any = useContext(childMenuContext);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const params: any = useParams();
  const allMenus = selectAllMenu(rootState);
  const sortedMenus = selectAllSortedMenuById(rootState) || [];
  const [openMenuPage, setOpenMenuPage] = useState<any>();
  const [openSubmenu, setOpenSubmenu] = useState<any>([]);
  const [selectedPage, setSelectedPage] = useState<string>('');

  const toggleDrawer =
    (open: boolean) => (event: React.MouseEvent<HTMLButtonElement>) => {
      if (event && event.type === 'keydown') {
        return;
      }
      setDrawerOpen(open);
    };

  useEffect(() => {
    setSelectedPage('');
    if (params && params.menuId && childMenus.length === 0) {
      if (sortedMenus && sortedMenus.length > 0) {
        const menuIndex = sortedMenus[0].data.findIndex(
          (value: any) => value.data.name === params.menuId
        );
        if (menuIndex !== -1) {
          if (sortedMenus[0].data[menuIndex].child.length > 0) {
            setOpenMenuPage(sortedMenus[0].data[menuIndex].child);
            const pageIndex = sortedMenus[0].data[menuIndex].child.findIndex(
              (value: any) => value.name === params.subMenuId
            );
            if (pageIndex !== -1) {
              setSelectedPage(
                sortedMenus[0].data[menuIndex].child[pageIndex].pageId
              );
            }
          } else {
            setOpenMenuPage(sortedMenus[0].data[menuIndex].data);
            setSelectedPage(sortedMenus[0].data[menuIndex].data.pageId);
          }
        }
      }
    } else if (childMenus && childMenus.length > 0) {
      setOpenMenuPage({});
      const pageIndex =
        childMenus &&
        childMenus.findIndex((value: any) => value.name === params.subMenuId);
      // console.log(pageIndex);
      // setSelectedPage('');
      if (pageIndex !== -1) {
        setSelectedPage(childMenus[pageIndex].pageId);
      }
      // console.log('childMenus', childMenus);
    }
  }, [params, sortedMenus]);

  useEffect(() => {
    // console.log('selectedPage', selectedPage);
  }, [selectedPage]);

  return (
    <div
      // className={`container__classic ${right && 'container__classic__RT'}`}
      style={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        height: 'calc(100vh - 8vh)',
        overflowX: 'hidden',
        overflowY: 'hidden',
        width: '100%',
      }}
    >
      {childMenus && childMenus.length > 0 && (
        <Box
          sx={{
            backgroundColor: theme.palette?.light?.c50,
            color: theme.palette.text?.primary,
            borderRight: `1px solid ${theme.palette?.text?.c100}`,
            height: 'calc(100vh - 8vh)',
            width: '260px',
          }}
        >
          <AppMenu
            menuList={openMenuPage}
            menuType="classic"
            openPage={(e: any) => {
              setSelectedPage('');
              setMenuData(e);
              setOpenMenuPage(e);
            }}
          />
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',

          backgroundColor: theme.palette.background?.default,
          color: theme.palette.text?.primary,
          height: 'calc(100vh - 8vh)',
          width:
            childMenus && childMenus.length > 0 ? 'calc(100% - 260px)' : '100%',
        }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.background?.default,
            color: theme.palette.text?.primary,
            width: '100%',
            overflowY: 'auto',
          }}
        >
          {selectedPage && selectedPage.length > 0 && (
            <AppMain pageId={selectedPage || ''} />
          )}
        </Box>
      </Box>
    </div>
  );
}

export default Classic;
